import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const calendarDay = createSlice({
  name: 'calendarDay',
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.push(action.payload)
    },
    changeDay: (state, action) => {
      let id = state.indexOf(action.payload.id)
      state.splice(id, 1, action.payload)
    },
    deleteDay: (state, action) => {
      return state.filter((elem) => elem.id !== action.payload)
    },
  },
})

export const { addDay, changeDay, deleteDay } = calendarDay.actions

export const selectDay = (state) => state.days
export default calendarDay.reducer
