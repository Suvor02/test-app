import s from "./todoList.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store.ts";
import {useEffect} from "react";
import Post from "./Post/Post.tsx";
import {getPostsTS, infoTS, postsAction, PostType} from "../../store/reducer.ts";

const TodoList = () => {



    // получаем массив постов для отрисовки
    const posts = useSelector<AppRootStateType, PostType[]>(state => state.todos.posts)
    // количество постов
    const totalCount = useSelector<AppRootStateType,number>(state => state.todos.totalCount)
    // номер старницы
    const page = useSelector<AppRootStateType,number>(state => state.todos.currentPage)
    // условие по которому выполняем запрос на сервер
    const fetching = useSelector<AppRootStateType,boolean>(state => state.todos.fetching)
    const dispatch = useDispatch<AppDispatch>()
//     выполняем асинхронную операцию
    useEffect(() => {
        if(fetching){
            const thunk = getPostsTS(page)
            dispatch(thunk)
        }
    }, [fetching])
//     выполняем асинхронную операцию
    useEffect(() => {
        // Получаем ссылку на блок, у которого нужно отслеживать событие скролла
        const block = document.getElementById('block-id-posts') as HTMLElement
        // вешаем слушателя
        block.addEventListener("scroll", scrollHandler)
        //
        return function () {
            // зачищаем за собой
            block.removeEventListener("scroll", scrollHandler)
        }
    }, [])
    const getInfo = (id: number, post: PostType) => {
        // чтобы не делоть доп запрос на сервер
        const thunk = infoTS(id,post)
        dispatch(thunk)
    }

    const scrollHandler = (e:any) => {
if ( e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 100 &&
    posts.length< totalCount){
   dispatch(postsAction.setFetching({f:true}))
}

    }

    return (
        // коробка с постами
        <div className={s.todoList}>
            <div className={s.header}>
                List of posts
            </div>
            <div className={s.divPosts} id={"block-id-posts"}>
                    {/*    здесть будет список постов*/}
                    {posts.map((p, index) => {
                        return <div key={index} className={s.posts} >
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