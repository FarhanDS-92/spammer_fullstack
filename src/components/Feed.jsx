import PostsAndComments from "./PostsAndComments.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function Feed() {
  const feed = await prisma.post.findMany();

  // hi
  return (
    <div id="feed">
      {feed.map((post) => {
        return <PostsAndComments key={post.id} post={post} />;
      })}
    </div>
  );
}
