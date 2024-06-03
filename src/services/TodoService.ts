import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ITodo } from "@/interfaces/interfaces";

export const GetAllTask = () => {

  const { data, error, isLoading, mutate } = useSWR<ITodo[]>(
    "/api/task/getAll",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: true
    }
  );
  return { todos: data, isLoading, isError: error, mutate };
};

export const CreateTask = async (taskObj: ITodo) => {
  await fetch("/api/task/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...taskObj }),
  });
};

export const UpdateTask = async (
  id: number,
  text: string,
  deadline: string,
  completed: boolean
): Promise<any> => {
  try {
    const response = await fetch(`/task/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        text,
        deadline,
        completed,
      }),
    });
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteTask = async (id: any): Promise<any> => {
  try {
    await fetch(`/api/task/delete/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};
