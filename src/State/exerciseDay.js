import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const exerciseDay = createSlice({
  name: 'day',
  initialState,
  reducers: {
    addDay: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addDay } = exerciseDay.actions

export const selectDay = (state) => state.day
export default exerciseDay.reducer
