import Post from "./post";

export default function Posts({ posts, call }: { posts: any[], call: () => void }) {
  return (
    <div className="w-full mt-4 mx-4 md:mx-8 lg:mx-16">
      <div className="flex flex-col items-center w-full">
        {posts.map((post, index) => (
          <Post key={index} post={post} call={call}></Post>
        ))}
      </div>
    </div>
  );
}
