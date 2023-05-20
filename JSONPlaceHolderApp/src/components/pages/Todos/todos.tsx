import { Container, Row, Col } from "react-bootstrap";
import TodosList from "./child-components/todos-list";

export default function Todos() {
  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Todos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <TodosList />
        </Col>
      </Row>
    </Container>
  );
}
