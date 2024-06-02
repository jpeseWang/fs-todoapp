import React, { useContext, useEffect } from "react";
import { TodoContext, FILTER_OPTIONS } from "../../context/TodoContext";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import { GetAllTask } from "../../../../services/TodoService";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Todo } from "@/interfaces/interfaces";
import LoadingComponent from "@/components/Loading/Loading";

interface TodoListProps {
  openUpdateModal: (
    todoId: number,
    todoText: string,
    todoDeadline: string
  ) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ openUpdateModal }) => {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    "/api/task/getAll",
    fetcher
  );

  const { state, dispatch } = useContext(TodoContext);
  const { todos, filter } = state;
  let filteredTodos = data;

  useEffect(() => {
    const loadTodos = async () => {
      // const { todos, isLoading, isError } = await GetAllTask();
      if (data) {
        dispatch({ type: "SET_TODOS", payload: data });
      }
    };
    loadTodos();
  }, [dispatch, state.todos.length]);

  if (filter === FILTER_OPTIONS.ACTIVE) {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (filter === FILTER_OPTIONS.COMPLETED) {
    filteredTodos = todos.filter((todo) => todo.completed);
  }
  if (data?.length === 0) {
    return (
      <h1 className={styles.noti}>
        Congratulations, no task need to be finished!{" "}
      </h1>
    );
  }

  console.log(data);
  console.log("todos", todos);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {filteredTodos?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              openUpdateModal={(todoId, todoText, todoDeadline) =>
                openUpdateModal(todoId, todoText, todoDeadline)
              }
            />
          ))}
        </>
      )}
    </div>
  );
};
