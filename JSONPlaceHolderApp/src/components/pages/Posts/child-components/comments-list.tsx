import { ListGroup, Card } from "react-bootstrap";
import Post from "../../../../lib/data/dataObjects/Post";
import Comment from "../../../../lib/data/dataObjects/Comment";
import { useEffect, useMemo, useState } from "react";

type CommentsListProps = {
  post: Post;
  showComments: Boolean;
};

export default function CommentsList({
  post,
  showComments,
}: CommentsListProps) {
  if (!post) return <></>;

  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = useMemo(() => {
    return post.comments;
  }, [post.id]);

  const fetchComments = () => {
    getComments.then((comments) => {
      setComments(comments);
    });
  };

  useEffect(() => {
    showComments && fetchComments();
  }, [showComments]);

  return (
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
  );
}
