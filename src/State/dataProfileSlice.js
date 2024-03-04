import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  password: '',
  age: '',
  weight: '',
  height: '',
}

const dataProfileSlice = createSlice({
  name: 'dataProfileSlice',
  initialState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload
    },
    addPassword: (state, action) => {
      state.password = action.payload
    },
    addAge: (state, action) => {
      state.age = action.payload
    },
    addWeight: (state, action) => {
      state.weight = action.payload
    },
    addHeight: (state, action) => {
      state.height = action.payload
    },
    resetInfo: (state, action) => {
      state = action.payload
    },
  },
})

export const { addName, addPassword, addAge, addWeight, addHeight, resetInfo } =
  dataProfileSlice.actions

export const selectDataProfile = (state) => state.dataProfileSlice
export default dataProfileSlice.reducer
