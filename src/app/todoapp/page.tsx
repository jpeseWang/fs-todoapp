"use client"
import React from 'react'
import CreateTaskForm from './CreateTaskForm';
import { GetAllTask } from '@/services/TodoService';
import TodoList from './TodoList';
export default function ToDoApp() {

    const { todos, isLoading, isError, mutate } = GetAllTask();
    mutate()
    console.log("todos > >", todos)

    return (
        <div className="my-9">
            <div className='mt-36'>
                <CreateTaskForm mutate={mutate} />
            </div>
            <TodoList
                todos={todos}
                isLoading={isLoading}
                mutate={mutate}
            />

        </div>
    )
}
