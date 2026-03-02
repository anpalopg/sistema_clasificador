import {useSelector} from "react-redux"
import type{RootState} from "../Redux/store"

export const useAppSelector = useSelector.withTypes<RootState>()