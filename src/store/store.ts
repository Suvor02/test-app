import {AnyAction, combineReducers, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {postsReducer} from "./reducer.ts";



const rootReducer = combineReducers({
    todos: postsReducer
})
export const store = configureStore({reducer: rootReducer})
// тип всех редюсеров
export type AppRootStateType = ReturnType<typeof rootReducer>;
// тип  для работы с санками
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
// тип для работы с dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
