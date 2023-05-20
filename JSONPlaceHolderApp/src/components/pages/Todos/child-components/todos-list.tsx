import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
import Todo from "../../../../lib/data/dataObjects/Todo";
import TodosItem from "./todos-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

export default function TodosList() {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [todos, setTodos] = useState<Todo[]>([]);

  console.log(user);

  if (!user?.id) return <></>;

  useEffect(() => {
    console.log(user);
    user.todos.then((todos) => {
      console.log(todos);
      setTodos(todos);
    });
  }, [user]);

  const todosDOM = todos.map((todo: Todo) => {
    return <TodosItem todo={todo} key={todo.id} />;
  });

  return <ListGroup>{todosDOM}</ListGroup>;
}
