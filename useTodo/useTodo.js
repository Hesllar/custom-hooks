import { useEffect, useReducer } from "react"

import { todoRedurcer } from "./todoRedurcer";

const initialState = [];

const init = () =>{
    return JSON.parse(localStorage.getItem('Todos')) || [];
}

export const useTodo = () => {

    
    const [todos, dispatch] = useReducer(todoRedurcer, initialState, init);

      useEffect(() => {
        localStorage.setItem('Todos',JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (newTodo) =>{
        const action = {
            type:'[TODO] Add todo',
            payload:newTodo
        }

        dispatch(action)
    }

    const handleDeleteTodo = (id) =>{
        dispatch({
            type:'[TODO] Remove todo',
            payload:id
        })
    }

    const handleToggleTodo = (id) =>{
        dispatch({
            type:'[TODO] Toggle todo',
            payload:id
        })
    }


    return{
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount:todos.filter(todo => !todo.done).length
    }

 
}
