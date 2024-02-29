import React, { useState } from 'react'
import { useEffect } from 'react'
import ChartComponent from '../UI/ChartComponent'
import { useSelector } from 'react-redux'
import { selectDay } from '../State/calendarDay'
import { dataProgressExercise } from '../UI/dataProgress/dataProgressExercise'
import dataExercise from './Exercise/dataExercise'

function Progress() {
  // Выбор типа данных (упражнения, сон, питание)
  const [option, setOption] = useState('')

  // Выбор категории в упражнениях
  const [exerciseCategory, setExerciseCategory] = useState('')

  // Выбор упражнения
  const [exerciseCategoryValue, setExerciseCategoryValue] = useState('')

  // Данные для функции диаграмы упражнений
  const [valueName, setValueName] = useState('/chest')
  const [valueExercise, setVlueExrcise] = useState(
    'Разводки лёжа горизонтально'
  )

  // изменение названия мышечной группы и её индикатора
  const changeValueCategory = (el) => {
    setExerciseCategory(el.name)
    setValueName(el.path)
  }

  // изменение упражнения и его индикатора
  const changeValueExercise = (el) => {
    setVlueExrcise(el)
    setExerciseCategoryValue(el)
  }

  // подписываемся на стейт всех данных
  const day = useSelector(selectDay)

  // данные для отправки в функцию отрисовки диаграмы (для упражнений)
  const [myData, setMyData] = useState(
    dataProgressExercise(day, valueName, valueExercise)
  )

  console.log(valueExercise)

  // подставляем данные в зависимости от выбранного упражнения
  useEffect(() => {
    setMyData(dataProgressExercise(day, valueName, valueExercise))
  }, [valueName, valueExercise])

  const userData = {
    labels: option === 'Упражнения' ? myData.map((el) => el.date) : [1],
    datasets: [
      {
        data: option === 'Упражнения' ? myData.map((el) => el.max) : true,
        label: 'Max',
        borderColor: '#3333ff',
        fill: true,
        lineTension: 0.5,
      },
      option === 'Упражнения'
        ? {
            data:
              option === 'Упражнения' ? myData.map((el) => el.current) : true,
            label: 'Current',
            borderColor: '#ff3333',

            fill: true,
            lineTension: 0.5,
          }
        : true,
    ],
  }
  return (
    <div>
      <div style={{ width: 700 }}>
        <ChartComponent chartData={userData} />
      </div>
      <div>
        <label>
          <input
            checked={option === 'Упражнения' ? true : false}
            type="radio"
            name="changeCategory"
            value="Упражнения"
            onClick={() => setOption('Упражнения')}
          />
          Упражнения
        </label>
        <label>
          <input
            checked={option === 'Питание' ? true : false}
            type="radio"
            name="changeCategory"
            value="Питание"
            onClick={() => setOption('Питание')}
          />
          Питание
        </label>
        <label>
          <input
            checked={option === 'Сон' ? true : false}
            type="radio"
            name="changeCategory"
            value="Сон"
            onClick={() => setOption('Сон')}
          />
          Сон
        </label>
      </div>
      {option === 'Упражнения' ? (
        <div>
          {dataExercise.map((el) => {
            return (
              <label>
                <input
                  type="radio"
                  checked={exerciseCategory === el.name ? true : false}
                  name="changeCategoryExercise"
                  value={el.path}
                  onClick={() => changeValueCategory(el)}
                />
                {el.name}
              </label>
            )
          })}
        </div>
      ) : (
        false
      )}
      <div>
        {option === 'Упражнения'
          ? dataExercise
              .filter((el) => el.name === exerciseCategory)
              .map((elem) =>
                elem.exercise.map((elems) => {
                  return (
                    <label>
                      <input
                        type="radio"
                        checked={
                          exerciseCategoryValue === elems.title ? true : false
                        }
                        name="changeExercise"
                        value={elems.title}
                        onClick={() => changeValueExercise(elems.title)}
                      />
                      {elems.title}
                    </label>
                  )
                })
              )
          : false}
      </div>
    </div>
  )
}

export default Progress
