import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
import Todo from "../../../../lib/data/dataObjects/Todo";
import TodosItem from "./todos-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";
import { FilterBy, SortBy } from "../types";

type TodosListProps = {
  sortBy: string;
  filterBy: string;
};

export default function TodosList({sortBy, filterBy}: TodosListProps) {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);


  if (!user?.id) return <></>;

  const handleSort = () => {
    let sortedPosts: Todo[];

    switch (sortBy) {
      case SortBy.NAME:
        sortedPosts = [...shownTodos].sort((a, b) => {
          if (a.title && b.title) { return a.title.localeCompare(b.title) }
          return 0;
        });
        break;
      case SortBy.ID:
        sortedPosts = [...shownTodos].sort((a, b) => {
          if (a.id && b.id) {
            const idA = String(a.id);
            const idB = String(b.id);
            return idA.localeCompare(idB);
          }
          // Handle the case where either a.id or b.id is undefined
          return 0;
        });
        break;
      case SortBy.CHECKED:
        sortedPosts = [...shownTodos].sort((a, b) => {
          if (a.completed && !b.completed) {
            return -1; // a comes before b
          }
          if (!a.completed && b.completed) {
            return 1; // b comes before a
          }
          return 0; // the order remains unchanged
        });
        break;
      default:
        sortedPosts = shownTodos;
        break;
    }
    setShownTodos(sortedPosts);
  }

  const handleFilter = () => {
    let filteredTodos: Todo[];

    switch (filterBy) {
      case FilterBy.DONE:
        filteredTodos = [...todos].filter((a) => a.completed);
        break;
      case FilterBy.NOT_DONE:
        filteredTodos = [...todos].filter((a) => !a.completed);
        break;
      case FilterBy.NONE:
      default:
        filteredTodos = todos;
        break;
    }
    setShownTodos(filteredTodos);
  }

  useEffect(() => {
    user.todos.then((todos) => {
      setTodos(todos);
      setShownTodos(todos)
    });
  }, [user]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  useEffect(() => {
    handleFilter();
  }, [filterBy]);

  const todosDOM = shownTodos.map((todo: Todo) => {
    return <TodosItem todo={todo} key={todo.id} />;
  });

  return <ListGroup>{todosDOM}</ListGroup>;
}
