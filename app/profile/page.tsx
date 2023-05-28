"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Profile from '@components/Profile';
import { Session } from 'next-auth';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user) {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    }

    console.log(posts)
    console.log("🚀 ~ file: page.tsx:26 ~ useEffect ~ session?.user:", session?.user)
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }

  }

   return (
    <Profile
      name="My"
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile