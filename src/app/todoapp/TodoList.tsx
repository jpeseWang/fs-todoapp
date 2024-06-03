"use client"
import React from 'react'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/Loading/Loading'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { DeleteTask, UpdateTask } from '@/services/TodoService'
import { getTaskStatus } from '@/utils/getTaskStatus'
import { TaskStatus } from '@/interfaces/enum';
import { ITodo } from '@/interfaces/interfaces';

export default function TodoList({ todos, isLoading, mutate }: any) {

    const handleDeleteTask = async (id: any) => {
        try {
            await DeleteTask(id);
            toast('Deleted task!', {
                icon: '🗑️',
            });
            mutate();
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    const handleCompleteTask = async (task: ITodo) => {
        task.completed = true
        try {
            await UpdateTask(task);
            toast.success('Task finished!');
            mutate();
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };


    return (
        <div>
            {isLoading ?
                <LoadingComponent /> :
                <div>
                    <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                        {todos?.map((task: any) => {
                            const taskStatus = getTaskStatus(task)
                            return (
                                    <li key={task._id} className={`${task.completed ? "opacity-50" : "opacity-100"}`}>
                                    <div className="px-4 py-5 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="sr-only peer"
                                                    checked={task.completed}
                                                    disabled={task.completed}
                                                    onClick={() => { handleCompleteTask(task) }}
                                                />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400"></div>
                                            </label>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{task.content}</h3>

                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-500"> <span className={`${taskStatus === TaskStatus.Completed ? "text-green-500" : taskStatus === TaskStatus.Overdue ? "text-red-500" : "text-yellow-600"}`}>
                                                {taskStatus}
                                            </span></p>


                                            <div className='flex gap-3'>
                                                <PencilSquareIcon className='h-6 w-6 text-blue-600 hover:text-blue-400 cursor-pointer' />
                                                <TrashIcon onClick={() => { handleDeleteTask(task._id) }} className='h-6 w-6 text-red-600 hover:text-red-400 cursor-pointer' /></div>
                                        </div>
                                    </div>
                                </li>

                            )
                        }
                        )}

                    </ul>

                </div>
            }


        </div>

    )
}
