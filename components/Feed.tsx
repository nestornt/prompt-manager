'use client';

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }: { data: any[], handleTagClick: (tagName: any) => void }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: any) => {
    // The "i" flag is passed to make the search case-insensitive
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: any) => {
    //  By clearing the timeout, we ensure that the search operation is delayed and only triggered after a specific period of inactivity.
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    // By storing the timeout ID returned by setTimeout, you can later clear the timeout using clearTimeout
    // to cancel the execution of the callback if needed.
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed