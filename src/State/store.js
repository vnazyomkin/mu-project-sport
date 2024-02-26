import { configureStore } from '@reduxjs/toolkit'
import calendarDay from './calendarDay'

const store = configureStore({
  reducer: {
    days: calendarDay,
  },
})

export default store
