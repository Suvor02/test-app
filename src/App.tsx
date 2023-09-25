import './App.css'
import TodoList from "./components/TodoList/TodoList.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {Route, Routes} from "react-router-dom";
import InfoPost from "./components/TodoList/InfoPost/InfoPost.tsx";

function App() {

    return (
        // начало
        <>
            {/*без провайдера ругался useSelector*/}
            <Provider store={store}>
                {/*роуты 6й версии*/}
                <Routes>
                    <Route path={"/"}element={<TodoList/>}/>
                    <Route path={"/info"}element={<InfoPost/>}/>
                </Routes>
            </Provider>
        </>
    )
}

export default App
