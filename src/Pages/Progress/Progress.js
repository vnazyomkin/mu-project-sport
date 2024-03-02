import React, { useState } from 'react'
import { useEffect } from 'react'
import ChartComponent from './ChartComponent'
import { useSelector } from 'react-redux'
import { selectDay } from '../../State/calendarDay'
import { dataProgressExercise } from '../../UI/dataProgress/dataProgressExercise'
import { dataProgressExerciseRun } from '../../UI/dataProgress/dataProgressExerciseRun'
import { selectExerciseData } from '../../State/exerciseDataSlice'
import { dataProgressDream } from '../../UI/dataProgress/dataProgressDream'
import { dataProgressNutritilon } from '../../UI/dataProgress/dataProgressNutritilon'
import styles from './Progress.module.css'

function Progress() {
  const [chartGraph, setChartGraph] = useState('graph')

  const dataExercise = useSelector(selectExerciseData)
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

  // подставляем данные в зависимости от выбранного упражнения
  useEffect(() => {
    if (option === 'Упражнения') {
      valueName !== '/running'
        ? setMyData(dataProgressExercise(day, valueName, valueExercise))
        : setMyData(dataProgressExerciseRun(day, valueName))
    }
    if (option === 'Сон') {
      setMyData(dataProgressDream(day))
    }
    if (option === 'Питание') {
      setMyData(dataProgressNutritilon(day))
    }
  }, [valueName, valueExercise, option])
  console.log(myData)

  let objectAllData = {
    data:
      option === 'Упражнения'
        ? valueName !== '/running'
          ? myData.map((el) => el.max)
          : myData.map((el) => el.distance)
        : myData.map((el) => el.value),
    label:
      option === 'Упражнения'
        ? valueName !== '/running'
          ? 'Маx'
          : 'Дистанция (m)'
        : option === 'Сон'
        ? 'Сон (ч)'
        : option === 'Питание'
        ? 'кКал'
        : '',
    borderColor: '#3333ff',
    backgroundColor: 'red',
    fill: true,
    lineTension: 0.5,
  }

  let objectOnlyExerciseData = {
    data: myData.map((el) => el.current),
    label: 'Средний',
    borderColor: '#ff3333',
    backgroundColor: 'blue',
    fill: true,
    lineTension: 0.5,
  }

  let objectOnlyExerciseDataLine = {
    data: myData.map((el) => el.current),
    label: 'Средний',
    borderColor: 'blue',
    fill: true,
    lineTension: 0.5,
  }

  let objectAllDataLine = {
    data:
      option === 'Упражнения'
        ? valueName !== '/running'
          ? myData.map((el) => el.max)
          : myData.map((el) => el.distance)
        : myData.map((el) => el.value),
    label:
      option === 'Упражнения'
        ? valueName !== '/running'
          ? 'Маx'
          : 'Дистанция (m)'
        : option === 'Сон'
        ? 'Сон (ч)'
        : option === 'Питание'
        ? 'кКал'
        : '',
    borderColor: 'red',
    fill: true,
    lineTension: 0.5,
  }

  const userData = {
    labels: myData.map((el) => el.date),
    datasets:
      option === 'Упражнения' && valueName !== '/running'
        ? [objectAllData, objectOnlyExerciseData]
        : [objectAllData],
  }

  const userDataLine = {
    labels: myData.map((el) => el.date),
    datasets:
      option === 'Упражнения' && valueName !== '/running'
        ? [objectAllDataLine, objectOnlyExerciseDataLine]
        : [objectAllDataLine],
  }
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <ChartComponent
          chartData={userData}
          userDataLine={userDataLine}
          chartGraph={chartGraph}
        />
        <div className={styles.content__btn_container}>
          <span
            onClick={() => setChartGraph('graph')}
            className={
              chartGraph === 'graph'
                ? styles.content__btn_active
                : styles.content__btn
            }
          >
            График
          </span>
          <span
            onClick={() => setChartGraph('line')}
            className={
              chartGraph === 'line'
                ? styles.content__btn_active
                : styles.content__btn
            }
          >
            Диаграма
          </span>
        </div>
      </div>
      <div className={styles.radio_btn_container}>
        <div className={styles.btn_container__category}>
          <span
            onClick={() => setOption('Упражнения')}
            className={
              option === 'Упражнения' ? styles.category_active : styles.category
            }
          >
            Упражнения
          </span>
          <span
            onClick={() => setOption('Питание')}
            className={
              option === 'Питание' ? styles.category_active : styles.category
            }
          >
            Питание
          </span>
          <span
            onClick={() => setOption('Сон')}
            className={
              option === 'Сон' ? styles.category_active : styles.category
            }
          >
            Сон
          </span>
        </div>
        <div className={styles.exercise_category__content_container}>
          {option === 'Упражнения' ? (
            <div className={styles.exercise_category__container}>
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
          <div className={styles.exercise_category__select_container}>
            {option === 'Упражнения'
              ? dataExercise
                  .filter((el) => el.name === exerciseCategory)
                  .map((elem) =>
                    elem.exercise.map((elems) => {
                      return elems.title !== 'Время' ? (
                        <label>
                          <input
                            type="radio"
                            checked={
                              exerciseCategoryValue === elems.title
                                ? true
                                : false
                            }
                            name="changeExercise"
                            value={elems.title}
                            onClick={() => changeValueExercise(elems.title)}
                          />
                          {elems.title}
                        </label>
                      ) : (
                        // задел под бег
                        true
                      )
                    })
                  )
              : false}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
