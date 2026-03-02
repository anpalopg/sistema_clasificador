import {configureStore,type Action,type ThunkAction} from "@reduxjs/toolkit"
import chatReduce from "./Slices/homeSlices"



const store = configureStore({
    reducer:{
        chatSesion:chatSesionReducer,
    }
})
export type AppStore = typeof store
export  type RootState = ReturnType <AppStore['getState']>
export type AppDispatch = AppStore ['dispatch']
export type AppThunk <ThunkReturnType = void > =ThunkAction<
ThunkReturnType,
RootState,
unknown,
Action
>
export default store;