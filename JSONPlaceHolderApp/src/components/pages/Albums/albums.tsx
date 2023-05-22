import { Container, Row, Col } from "react-bootstrap";
import AlbumsList from "./child-components/albums-list";

export default function Posts() {
  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Albums</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AlbumsList />
        </Col>
      </Row>
    </Container>
  );
}
