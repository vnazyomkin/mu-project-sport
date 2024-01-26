import { configureStore } from '@reduxjs/toolkit'
import exerciseSlice from './exerciseSlice'

const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
  },
})

export default store
