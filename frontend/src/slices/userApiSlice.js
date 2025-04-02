import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (data) => ({
                url: '/api/users', // backend url
                method: 'POST',
                body: data
            })
        }),

        userRegister: builder.mutation({
            query: (data) => ({
                url: '/api/users/register',
                method: 'POST',
                body: data
            })
        })

    })
})

export const {
    useUserLoginMutation,
    useUserRegisterMutation
} = userApiSlice