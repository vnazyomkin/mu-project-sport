import React, { useState } from 'react'
import { selectExerciseSlice, setExerciseTittle } from '../State/exerciseSlice'
import { useDispatch, useSelector } from 'react-redux'

function MainPages() {
  const txt = useSelector(selectExerciseSlice)
  const dispatch = useDispatch()

  const handleSetText = (event) => {
    dispatch(setExerciseTittle(event.target.value))
  }
  return (
    <div>
      <input onChange={handleSetText}></input>
      <h1>{txt}</h1>
    </div>
  )
}

export default MainPages
