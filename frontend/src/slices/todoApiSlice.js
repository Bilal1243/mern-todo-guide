import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url: '/api/todos/getTodos'
            })
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: '/api/todos/createTodo',
                method: 'POST',
                body: data
            })
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/api/todos/${id}`,
                method: 'DELETE'
            })
        }),
        getTodoById: builder.query({
            query: (params) => ({
                url: '/api/todos/getTodoById',
                params
            })
        }),
        updateTodo: builder.mutation({
            query: (data) => ({
                url: '/api/todos/updateTodo',
                method: 'PATCH',
                body: data
            })
        })
    })
})


export const {
    useGetTodosQuery,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useGetTodoByIdQuery,
    useUpdateTodoMutation
} = todoApiSlice