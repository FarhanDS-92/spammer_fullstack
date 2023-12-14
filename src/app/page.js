import Feed from "@/components/Feed.jsx";
import NewPost from "@/components/NewPost.jsx";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <h1>Spammer Blog</h1>
      <NewPost />
      <Feed />
    </main>
  );
}
