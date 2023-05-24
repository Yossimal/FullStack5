import { ListGroupItem, Form } from "react-bootstrap";
import Todo from "../../../../lib/data/dataObjects/Todo";
import { useState, useEffect} from "react";

type TodosItemProps = {
  todo: Todo;
};

export default function TodosItem({ todo }: TodosItemProps) {
  if (!todo || todo.completed == null) return <></>;

  const [checked, setChecked] = useState<boolean>(todo.completed);

  useEffect(() => {
    const newTodo = new Todo({
      id: todo.id,
      userId: todo.userId,
      title: todo.title,
      completed: checked
    });
    newTodo.save();
  }, [checked])

  return (
    <ListGroupItem>
      <Form.Check onClick={() => {console.log(checked); setChecked(!checked)}} type="checkbox" checked={checked} label={<span style={{ textDecoration: checked ? "line-through" : "none" }}>{todo.title}</span>} />
    </ListGroupItem>
  );
}
