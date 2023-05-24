import { ListGroupItem, Card, Button, InputGroup, Form } from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import { useState } from "react";
import { Nullable, StateSetter } from "../../../../types/react.types";
import CommentsList from "./comments-list";
import Comment from "../../../../lib/data/dataObjects/Comment";
import User from "../../../../lib/data/dataObjects/User";


type PostItemProps = {
  post: Post;
  user: User;
  selectedPost: Nullable<string>;
  setSelectedPost: StateSetter<Nullable<string>>;
};

export default function PostsItem({ post, user, selectedPost, setSelectedPost}: PostItemProps) {
  if (!post) return <></>;

  const [showComments, setShowComments] = useState<Boolean>(false);
  // const [newCommentBody, setNewCommentBody] = useState<string>("");
  const selected = selectedPost === post.id;

  // const addComment = () => {
  //   const newComment = new Comment({postId: post.id, name: user.name, email: user.email, body: newCommentBody});
  //   newComment.push();
  //   setNewCommentBody("");
  //   setShowComments(true);
  // };

  return (
    <ListGroupItem>
      <div onClick={() => setSelectedPost(post.id)}>
        <Card>
          <Card.Body>
            <Card.Title style={{ fontWeight: selected ? "bold" : "normal" }}>{post.title}</Card.Title>
            <Card.Text style={{ fontWeight: selected ? "bold" : "normal" }}>{post.body}</Card.Text>
            <Button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
            
            {/* <InputGroup >
            <Button onClick={addComment}>Add Comment</Button>
            <Form.Control value={newCommentBody} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCommentBody(e.target.value)} />
            </InputGroup> */}
          </Card.Body>
        </Card>

        {showComments && <CommentsList post={post} user={user}/>}
        
      </div>
    </ListGroupItem>
  );
}
