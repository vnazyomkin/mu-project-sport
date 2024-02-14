import { configureStore } from '@reduxjs/toolkit'
import exerciseSlice from './exerciseSlice'
import exerciseDay from './exerciseDay'

const store = configureStore({
  reducer: {
    exercise: exerciseSlice,
    day: exerciseDay,
  },
})

export default store
