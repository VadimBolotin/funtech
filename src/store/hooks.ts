import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from './index'

// Используем в компонентах вместо useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Используем в компонентах вместо useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

