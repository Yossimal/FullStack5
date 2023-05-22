import { ListGroup, ListGroupItem, Card, Button } from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import Comment from "../../../../lib/data/dataObjects/Comment";
import { useState } from "react";

type PostItemProps = {
  post: Post;
  selectedPost: string;
  setSelectedPost: any;
};

export default function PostsItem({ post, selectedPost, setSelectedPost}: PostItemProps) {
  if (!post) return <></>;

  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState<Boolean>(false);
  const selected = selectedPost === post.id;

  const handleCommentClick = () => {
    console.log(typeof post);
    post.comments.then((comments) => {
      setComments(comments);
      setShowComments(!showComments);
    });
  };

  return (
    <ListGroupItem>
      <div onClick={() => setSelectedPost(post.id)}>
        <Card>
          <Card.Body>
            <Card.Title style={{ fontWeight: selected ? "bold" : "normal" }}>{post.title}</Card.Title>
            <Card.Text style={{ fontWeight: selected ? "bold" : "normal" }}>{post.body}</Card.Text>
            <Button onClick={handleCommentClick}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </Button>
          </Card.Body>
        </Card>

        {showComments && (
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Comments</Card.Title>
              <ListGroup>
                {comments.map((comment) => (
                  <ListGroup.Item key={comment.id}>
                    <h5>{comment.name}</h5>
                    <p>{comment.body}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </div>
    </ListGroupItem>
  );
}
