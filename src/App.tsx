import { UseQueryResult, useMutation, UseMutationResult, useQuery } from "@tanstack/react-query"

type PostProps = {
  id: number | string,
  title: string 
}

const POSTS: PostProps[] = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
]

const App = () => {
  console.log(POSTS);
  
  const postsQuery: UseQueryResult<PostProps[]> = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })



  const newPostMutation: UseMutationResult<PostProps, unknown, string, PostProps> = useMutation(
    async (title: string) => {
      await wait(1000);
      const newPost: PostProps = { id: crypto.randomUUID(), title };
      POSTS.push(newPost);
      return newPost;
    }
  );
  


  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={() => newPostMutation.mutate("new post")}>
        Add New
      </button>
    </div>
  )
}

const wait = (duration: number | undefined) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
