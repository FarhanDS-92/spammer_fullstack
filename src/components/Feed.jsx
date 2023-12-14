import PostsAndComments from "./PostsAndComments.jsx";
import { prisma } from "@/lib/prisma.js";

export const dynamic = "force-dynamic";

export default async function Feed() {
  const feed = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(feed);

  return (
    <div id="feed">
      {feed.map((post) => {
        return <PostsAndComments key={post.id} post={post} />;
      })}
    </div>
  );
}
