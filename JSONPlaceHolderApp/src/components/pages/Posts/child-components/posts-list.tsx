import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState,useMemo } from "react";
import Post from "../../../../lib/data/dataObjects/Post";
import PostsItem from "./posts-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";
import { SortBy } from "../types";

type PostlistProps = {
  sortBy: string;
};

export default function PostsList({ sortBy }: PostlistProps) {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Nullable<string>>();


  if (!user?.id) return <></>;

    const loadPosts = useMemo(():Promise<Post[]>=>{
        return user.posts;
    },[user.id])
  const handleSort = () => {
    let sortedPosts: Post[];

    switch (sortBy) {
      case SortBy.NAME:
        sortedPosts = [...posts].sort((a, b) => {
          if (a.title && b.title) { return a.title.localeCompare(b.title) }
          return 0;
        });
        break;
      case SortBy.ID:
        sortedPosts = [...posts].sort((a, b) => {
          if (a.id && b.id) {
            const idA = String(a.id);
            const idB = String(b.id);
            return idA.localeCompare(idB);
          }
          // Handle the case where either a.id or b.id is undefined
          return 0;
        });
        break;
      default:
        sortedPosts = posts;
        break;
    }
    setPosts(sortedPosts);
  }

  useEffect(() => {
    loadPosts.then((posts) => {
      setPosts(posts);
    });
  }, [user]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  const postsDOM = posts.map((post: Post) => {
    return <PostsItem post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} key={post.id} />;
  });

  return <ListGroup>{postsDOM}</ListGroup>;
}