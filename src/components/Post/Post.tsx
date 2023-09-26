import {useState} from "react";
import {NavLink} from "react-router-dom";

import {PostType} from "../../store/reducer.ts";

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
    };

    const handleMouseLeave = () => {
        // когда убрал курсор
        setShowButton(false);
    };

    return <div className={s.post}>
        {/* здесь номер поста*/}
        <div className={s.divId}>{p.id} </div>
        <div className={s.divTitle}>{p.title}</div>
        {/* здесь текст поста*/}
        <div className={s.divBody}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>

            <div className={s.bodyText}>
                {p.body}
            </div>
            {showButton && <button className={s.button}
                     onClick={getInfoPost}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                <NavLink to={"/info"}>смотреть</NavLink>
            </button>}
            </div>
        {/*</div>*/}
    </div>
}

export default Post