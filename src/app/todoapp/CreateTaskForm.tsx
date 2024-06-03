"use client"
import { ITodo } from '@/interfaces/interfaces';
import { useState } from 'react';
import React from 'react'
import toast from "react-hot-toast";
import { CreateTask } from '@/services/TodoService';
import { mutate } from 'swr';


export default function CreateTaskForm({ mutate }: any) {
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState("");


    const todo: ITodo = {
        content: text,
        deadline: deadline,
        completed: false
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const content = todo.content
        const deadline = todo.deadline

        if (content.trim().length > 0) {
            if (new Date(deadline).getTime() < Date.now()) {
                toast.error("Deadline must be in the future!");
            } else if (!deadline) {
                toast.error("Deadline mustn't be empty!");
            }
            else if (content.trim().length > 250) {
                toast.error("Task must not be than 250 characters!");
            } else {
                toast.promise(
                    CreateTask(todo),
                    {
                        loading: 'Creating...',
                        success: <b>Create new task successfully!</b>,
                        error: <b>Could not save.</b>,
                    }
                );
                setText("");
                setDeadline("");
                mutate()
            }
        } else {
            toast.error("Task must not be empty!");
        }
    }

    return (
        <div className="text-center">
            <h1 className='font-semibold text-xl mb-4'>Task Management</h1>
            <form onSubmit={handleSubmit} >
                <textarea
                    className=" w-[300px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='Enter you task here.'
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                />

                <div className='mt-2'>
                    <input
                        className='rounded-md w-[210px] shadow-sm px-1.5 py-1.5 ring-1 ring-inset ring-gray-300'
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => { setDeadline(e.target.value) }} />
                    <button
                        className="ml-4 cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}
