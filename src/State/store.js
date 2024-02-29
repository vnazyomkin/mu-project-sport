import { configureStore } from '@reduxjs/toolkit'
import calendarDay from './calendarDay'
import exerciseDataSlice from './exerciseDataSlice'

const store = configureStore({
  reducer: {
    exercise: exerciseDataSlice,
    days: calendarDay,
  },
})

export default store
