import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

import {AppThunk} from "./store.ts";


const slice = createSlice({
    name: "posts",
    // {} потому что легче допилить функционал 😃
    initialState: {
        posts: [] as PostType[],
        info: {} as PostType,
        currentPage:1,
        fetching:true,
        totalCount:1
    },
    reducers: {
        // получаем посты с сервера
        setPosts: (state, action: PayloadAction<{ posts: PostType[] }>) => {
            // action.payload.posts.forEach((p) => {
            //     state.posts=[{ ...p }]
            // })
            action.payload.posts.forEach((p) => {
                state.posts.push({...p})
            })
            // state.posts = [...action.payload.posts]
            // state.posts.push(...action.payload.posts)
        },
        // по id смотрим пост и отрисовываем его в инфо
        showInfo: (state, action: PayloadAction<{ id: number, post: PostType }>) => {
            state.posts.forEach((p) => p.id === action.payload.id
                ? state.info = {...action.payload.post}
                : p)
        },
        setTotalCount:(state, action:PayloadAction<{count:number}>)=>{
            state.totalCount = action.payload.count
        },
        setCurrentPage:(state, action:PayloadAction<{page:number}>)=>{
            // ... да
            state.currentPage += action.payload.page
        },
        setFetching:(state, action:PayloadAction<{f:boolean}>)=>{
            state.fetching = action.payload.f
        }
    }
})
// экшен для основной работы
export const postsAction = slice.actions
// редюсер для того чтобы запилить в стор
export const postsReducer = slice.reducer
// тип постов которые приходят с сервера
export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}

// получаем посты с сервера и сетаем его в массив
export const getPostsTS = (page:number): AppThunk => {
    return (dispatch) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=15&_page=${page}`)
            .then((res) => {
                dispatch(postsAction.setPosts({posts: res.data}))
                // получаем кол-во постов которые есть на сервере
                dispatch(postsAction.setTotalCount({count:res.headers["x-total-count"]}))
                // переключаем следующую страницу
                dispatch(postsAction.setCurrentPage({page:1}))
                console.log(page)
            })
            .catch((e) => {
                console.log(e.message)
            })
            .finally(() => {
                dispatch(postsAction.setFetching({f:false}))
                console.log("getPosts")
            })
    }
}

export const infoTS = (id:number,post:PostType): AppThunk => {
    return (dispatch) => {
       dispatch(postsAction.showInfo({id:id,post:post}))
    }
}
