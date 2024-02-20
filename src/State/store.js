import { configureStore } from '@reduxjs/toolkit'
import exerciseSlice from './exerciseSlice'
import exerciseDay from './exerciseDay'
import calendarDay from './calendarDay'

const store = configureStore({
  reducer: {
    days: calendarDay,
    exercise: exerciseSlice,
    day: exerciseDay,
  },
})

export default store
