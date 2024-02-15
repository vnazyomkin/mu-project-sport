import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addExercise } = exerciseSlice.actions

export const selectExerciseDay = (state) => state.exercise
export default exerciseSlice.reducer
