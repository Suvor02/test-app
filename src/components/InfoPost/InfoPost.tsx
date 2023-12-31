import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import {AppRootStateType} from "../../store/store.ts";
import {PostType} from "../../store/reducer.ts";

import style from "./infoPost.module.css"
const InfoPost = () => {
    // здесь отоброжается информация поста
    const post = useSelector<AppRootStateType, PostType>(state => state.todos.info)
    return <div>
        <div>{post.id}</div>
        <div>{post.title}</div>
        <div>{post.body}</div>
        <button className={style.button}>
            <NavLink to={"/"}> назад</NavLink>
        </button>
    </div>
}

export default InfoPost