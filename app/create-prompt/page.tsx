'use client';

import Form from "@components/Form";
import { Session } from "next-auth";
import { useSession } from "next-auth/react"; // to know current logged in user
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
          userId: session?.user.id,
          tag: post.tag
        })
      })

      console.log("🚀 ~ file: page.tsx:32 ~ createPrompt ~ session?.user:", session?.user)

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