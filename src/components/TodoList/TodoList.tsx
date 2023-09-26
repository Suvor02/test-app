import {useDispatch, useSelector} from "react-redux";
import { useEffect, useRef} from "react";

import {AppDispatch, AppRootStateType} from "../../store/store.ts";

import {getPostsTS, infoTS, postsAction, PostType} from "../../store/reducer.ts";


import s from "./todoList.module.css"
import Post from "../Post/Post.tsx";

const TodoList = () => {
    const ref = useRef<HTMLDivElement |null>(null)

    // получаем массив постов для отрисовки
    const posts = useSelector<AppRootStateType, PostType[]>(state => state.todos.posts)
    // количество постов
    const totalCount = useSelector<AppRootStateType, number>(state => state.todos.totalCount)
    // номер старницы
    const page = useSelector<AppRootStateType, number>(state => state.todos.currentPage)
    // условие по которому выполняем запрос на сервер
    const fetching = useSelector<AppRootStateType, boolean>(state => state.todos.fetching)
    const dispatch = useDispatch<AppDispatch>()
//     выполняем асинхронную операцию
    useEffect(() => {
        if (fetching) {
            const thunk = getPostsTS(page)
            dispatch(thunk)
        }
    }, [dispatch,fetching,page])
//     выполняем асинхронную операцию
    useEffect(() => {
        const scrollHandler = (e: Event) => {
            const {scrollHeight, scrollTop, clientHeight} = e.target as HTMLElement


            // if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 100 &&
            if (scrollHeight - (scrollTop + clientHeight) < 100 &&

                posts.length < totalCount) {
                dispatch(postsAction.setFetching({f: true}))
            }
        }

        // Получаем ссылку на блок, у которого нужно отслеживать событие скролла
        const block = ref.current
        // вешаем слушателя
        block?.addEventListener("scroll", scrollHandler)
        //
        return function () {
            // зачищаем за собой
            block?.removeEventListener("scroll", scrollHandler)
        }




    }, [dispatch, posts.length, totalCount])
    const getInfo = (id: number, post: PostType) => {
        // чтобы не делоть доп запрос на сервер
        const thunk = infoTS(id, post)
        dispatch(thunk)
    }



    return (
        // коробка с постами
        <div className={s.todoList}>
            <div className={s.header}>
                List of posts
            </div>
            <div className={s.divPosts} ref={ref}>
                {/*    здесть будет список постов*/}
                {posts.map((p, index) => {
                    return <div key={index} className={s.posts}>
                        {/*пост передаю данные и функцию для страницы информации*/}
                        <Post id={p.id}
                              title={p.title}
                              body={p.body}
                              userId={p.userId}
                              getInfo={getInfo}/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TodoList