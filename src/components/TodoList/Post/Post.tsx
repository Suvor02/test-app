import {useState} from "react";
import {NavLink} from "react-router-dom";

import {PostType} from "../../../store/reducer.ts";

import s from "./post.module.css"

type PostPropsType = PostType & {
    getInfo: (id: number, post: PostType) => void
}
const Post = (p: PostPropsType) => {
    const [showButton, setShowButton] = useState(false);
    const getInfoPost = () => {
        // передаю id поста и поностью пост
        p.getInfo(p.id, p)
    }
    const handleMouseEnter = () => {
        // при навидении
        setShowButton(true);
        console.log("яяяя")
    };

    const handleMouseLeave = () => {
        // когда убрал курсор
        setShowButton(false);
    };

    return <div className={s.post}>
        {/* здесь номер поста*/}
        <span className={s.divId}>{p.id} </span>
        <span className={s.divTitle}>{p.title}</span>
        {/* здесь текст поста*/}
        <span className={s.divBody}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
            {/*{(p.body).length > 40 ? p.body.slice(0, 40) + "..." : (p.body)}*/}
            {p.body}

        </span>
        {/*если навести на спан курсор - будет кнопка*/}
        {showButton &&
            <button className={s.button}
                    onClick={getInfoPost}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                <NavLink to={"/info"}> смотреть</NavLink>
            </button>}
    </div>
}

export default Post