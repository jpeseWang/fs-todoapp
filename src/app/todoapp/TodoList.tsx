"use client"
import React from 'react'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/Loading/Loading'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { mutate } from 'swr';

import { DeleteTask } from '@/services/TodoService'
import { getTaskStatus } from '@/utils/getTaskStatus'

export default function TodoList({ todos, isLoading, mutate }: any) {

    const handleDeleteTask = (id: any) => {
        try {
            DeleteTask(id)
            toast('Deleted task!', {
                icon: '🗑️',
            });
            mutate()
        } catch (err) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div>
            {isLoading ?
                <LoadingComponent /> :
                <div>
                    <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
                        {todos?.map((task: any, index: any) => {
                            const taskStatus = getTaskStatus(task)
                            return (
                                <li key={task._id}>
                                    <div className="px-4 py-5 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            {/* <div className="flex items-center mb-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="cursor-pointer w-5 h- text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </div> */}
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">{task.content}</h3>

                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-500"> <span className={`${taskStatus === "Finished" ? "text-green-500" : taskStatus === "Overdue" ? "text-red-500" : "text-yellow-600"}`}>
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
