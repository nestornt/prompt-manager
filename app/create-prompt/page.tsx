'use client';

import Form from "@components/Form";
import { User } from "next-auth";
import { useSession } from "next-auth/react"; // to know current logged in user
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e: FormDataEvent) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(session?.user)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: user?.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt