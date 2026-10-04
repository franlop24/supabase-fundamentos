"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { supabase } from "./lib/client";
import { Post } from "./types";


export default function Home() {
  //const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function getPost(){
      const {data: posts, error} = await supabase
        .from('posts')
        .select('*')
        .order('created_at', {ascending: false})

      if(error){
        console.error('No se pudieron recuperar los posts', error)
      } else {
        setPosts(posts)
        console.log(posts)
      }
    }

    getPost()
  }, [])

  const handleLike = (postId: number | string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card-bg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
          <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Supagram
          </h1>
        </div>
      </header>

      {/* Feed de posts */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      </main>
    </div>
  );
}
