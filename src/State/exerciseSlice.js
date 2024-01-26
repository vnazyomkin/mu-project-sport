import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
}

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExerciseTittle: (state, action) => {
      state.title = action.payload
    },
  },
})

export const { setExerciseTittle } = exerciseSlice.actions

export const selectExerciseSlice = (state) => state.exercise.title
export default exerciseSlice.reducer
