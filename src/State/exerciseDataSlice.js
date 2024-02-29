import { createSlice } from '@reduxjs/toolkit'
import dataExercise from '../Pages/Exercise/dataExercise'

const initialState = dataExercise

const exerciseData = createSlice({
  name: 'exerciseData',
  initialState,
  reducers: {
    addExercise: (state, action) => {
      let i = state.findIndex((el) => el.path === `/${action.payload.path}`)
      state[i].exercise = action.payload.exercise
      return state
    },
  },
})

export const { addExercise } = exerciseData.actions

export const selectExerciseData = (state) => state.exercise
export default exerciseData.reducer
