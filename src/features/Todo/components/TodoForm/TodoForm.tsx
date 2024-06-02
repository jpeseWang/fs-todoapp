import React, { useState, useContext } from "react";
import { Todo } from "../../../../interfaces/interfaces";
import { TodoContext } from "../../context/TodoContext";
import toast from "react-hot-toast";
import { Button } from "../../../../components/Button/Button";
import btn from "../../../../components/Button/Button.module.css";
import { Input } from "../../../../components/Input/Input";
import ipt from "../../../../components/Input/Input.module.css";
import classnames from "classnames";

import { CreateTask } from "../../../../services/TodoService";
export const TodoForm: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  const lastId = state.todos.length > 0 ? state.todos.length + 1 : 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoObj = {
      id: lastId,
      text: text,
      completed: false,
      deadline: deadline,
    };
    const res = await CreateTask(todoObj);
    if (res !== null) {
      if (text.trim().length > 0) {
        if (new Date(deadline).getTime() < Date.now()) {
          toast.error("Deadline must be in the future!");
        } else if (text.trim().length > 250) {
          toast.error("Task must not be than 250 characters!");
        } else {
          const newTodo: Todo = {
            id: lastId + 1,
            text,
            completed: false,
            deadline,
          };
          dispatch({ type: "ADD_TODO", payload: newTodo });
          toast.success("Create new task successfully!");
          setText("");
          setDeadline("");
        }
      } else {
        toast.error("Task must not be empty!");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => {
        setText("");
        setDeadline("");
      }}
    >
      <Input
        className={ipt.textarea2}
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Create your new task..."
      />
      <Input
        className={ipt.textarea2}
        type="datetime-local"
        value={deadline}
        onChange={handleDeadlineChange}
      />

      <Button
        type="submit"
        className={classnames(btn["btn-primary"], btn["btn-group"])}
      >
        Add Task
      </Button>
    </form>
  );
};
