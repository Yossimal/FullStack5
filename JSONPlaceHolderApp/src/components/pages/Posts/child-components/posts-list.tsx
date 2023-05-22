import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
import Post from "../../../../lib/data/dataObjects/Post";
import PostsItem from "./posts-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

export default function PostsList() {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string>();


  if (!user?.id) return <></>;

  useEffect(() => {
    user.posts.then((posts) => {
      setPosts(posts);
    });
  }, [user]);

  const postsDOM = posts.map((post: Post) => {
    return <PostsItem post={post} selectedPost={selectedPost} setSelectedPost={setSelectedPost} key={post.id} />;
  });

  return <ListGroup>{postsDOM}</ListGroup>;
}