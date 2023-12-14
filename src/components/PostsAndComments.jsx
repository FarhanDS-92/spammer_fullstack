import PostAndButtons from "./PostAndButtons.jsx";
import { prisma } from "@/lib/prisma.js";

export const dynamic = "force-dynamic";

export default async function PostsAndComments({ post }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
  });

  return (
    <>
      <PostAndButtons post={post} />

      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="replySection" key={comment.id}>
              <p className="arrow">↳</p>
              <li> {comment.text} </li>
            </div>
          );
        })}
      </div>
    </>
  );
}
