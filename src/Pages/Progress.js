import React, { useState } from 'react'
import ChartComponent from '../UI/ChartComponent'
import { useSelector } from 'react-redux'
import { selectDay } from '../State/calendarDay'
import { dataProgressExercise } from '../UI/dataProgress/dataProgressExercise'

function Progress() {
  const day = useSelector(selectDay)
  const myData = dataProgressExercise(day)
  console.log(myData)

  const string = '2024-02-20T21:00:00.000Z'
  const arr = `${string.slice(5, 7)}.${string.slice(8, 10)}.${string.slice(
    0,
    4
  )}`

  const [userData, setUserData] = useState({
    labels: ['22.01.24', '23.12.24', '23.11.23', '22.01.24'],
    datasets: [
      {
        data: [2, 3, 11, 12],
        label: 'Infected',
        borderColor: '#3333ff',
        fill: true,
        lineTension: 0.5,
      },
      {
        data: [11111, 2, 0],
        label: 'Deaths',
        borderColor: '#ff3333',

        fill: true,
        lineTension: 0.5,
      },
      {
        data: [12111111, 2222, 1110],
        label: 'Deaths',
        borderColor: 'blue',

        fill: true,
        lineTension: 0.5,
      },
    ],
  })
  console.log(arr)
  return (
    <div style={{ width: 700 }}>
      <ChartComponent chartData={userData} />
    </div>
  )
}

export default Progress
