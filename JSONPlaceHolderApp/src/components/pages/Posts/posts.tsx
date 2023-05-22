import { Container, Row, Col } from "react-bootstrap";
import PostsList from "./child-components/posts-list";

export default function Posts() {
  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Posts</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PostsList />
        </Col>
      </Row>
    </Container>
  );
}
