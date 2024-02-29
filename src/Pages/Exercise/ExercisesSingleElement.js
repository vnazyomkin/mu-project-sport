import { createDayWithId } from '../../UI/createDayWithId'
import { v4 as uuidv4 } from 'uuid'
import ReactDatePicker from 'react-datepicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ExerciseSingleElement.module.css'
import { FaCheck } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdOutlineClose } from 'react-icons/md'
import { addDay } from '../../State/calendarDay'
import { IoAddSharp } from 'react-icons/io5'
import { RiAddCircleFill } from 'react-icons/ri'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import { addExercise } from '../../State/exerciseDataSlice'

function ExercisesSingleElement({ currentList }) {
  console.log(currentList)
  const [isActicve, setIsActive] = useState(false)
  const [newDayExercise, setNewDayExercise] = useState({
    title: '',
    current: '',
    max: '',
  })

  const params = useParams()

  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
  })

  // при смене данных меняем упражнения
  useEffect(() => {
    setExerciseArr(currentList.exerciseId)
  }, [currentList])

  // инфо данных для выбора упражнений
  const [exerciseArr, setExerciseArr] = useState(currentList.exerciseId)

  const dispatch = useDispatch()

  // Добавляем свои упражнения
  const addCustomExercise = () => {
    {
      if (newDayExercise.title) {
        setExerciseArr([
          ...exerciseArr,
          {
            title: newDayExercise.title,
            isFavorite: false,
          },
        ])
        setExerciseArr([
          ...exerciseArr,
          {
            title: newDayExercise.title,
            isFavorite: true,
            max: newDayExercise.max,
            current: newDayExercise.current,
            id: uuidv4(),
          },
        ])
        setNewDayExercise({ title: '', current: '', max: '' })
        setIsActive(false)
      }
    }
  }

  // закрываем окно
  const closeAddCustomExercise = () => {
    setIsActive(false)
    setNewDayExercise({ title: '', current: '', max: '' })
  }

  // подготавливаем данные для отправки в магазин (общая информация)
  const createDayId = createDayWithId({
    params: params.name,
    title: currentList.name,
    exercise: exerciseArr,
    start: newEvents.start,
    end: newEvents.start,
    color: '#006103',
  })

  // отмечаем упражнения галочкой
  const handleToggleIsFavorite = (id) => {
    let changeExercise = exerciseArr.map((el) =>
      el.id === id ? { ...el, isFavorite: !el.isFavorite } : el
    )
    setExerciseArr(changeExercise)
  }

  // Отправляем в ридакс
  const handleEventsFunction = () => {
    if (newEvents.start) {
      dispatch(addDay(createDayId))
      dispatch(
        addExercise({
          path: params.name,
          exercise: exerciseArr,
        })
      )
      console.log(exerciseArr)
      // setExerciseArr(currentList.exerciseId)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Упражнения</h1>
      <div
        className={styles.content}
        style={{ pointerEvents: `${isActicve ? 'none' : ''}` }}
      >
        {!!exerciseArr.length && params.name !== 'running' ? (
          exerciseArr.map((el) => {
            return (
              <ul
                className={el.isFavorite ? styles.ul_check : styles.ul_deafult}
              >
                <li key={el.id} onClick={() => handleToggleIsFavorite(el.id)}>
                  <div className={styles.content_txt}>
                    <h2> {el.title}</h2>
                  </div>
                  {el.isFavorite ? (
                    <TiDeleteOutline
                      style={{ color: 'red', width: '40px', height: '40px' }}
                    />
                  ) : (
                    <FaCheck
                      style={{
                        color: 'green',
                        width: '30px',
                        height: '30px',
                      }}
                      className={styles.check_icons}
                    />
                  )}
                </li>
                {el.isFavorite ? (
                  <div className={styles.choose_input_weight}>
                    <div className={styles.input_weight}>
                      <label htmlFor="current">Рабочий вес (кг)</label>
                      <input
                        type="number"
                        id="current"
                        value={el.current}
                        onChange={(event) =>
                          setExerciseArr(
                            exerciseArr.map((elem) =>
                              elem.id === el.id
                                ? { ...el, current: event.target.value }
                                : elem
                            )
                          )
                        }
                      />
                    </div>
                    <div className={styles.input_weight}>
                      <label htmlFor="max">Максимальный вес (кг)</label>
                      <input
                        type="number"
                        id="max"
                        value={el.max}
                        onChange={(event) =>
                          setExerciseArr(
                            exerciseArr.map((elem) =>
                              elem.id === el.id
                                ? { ...el, max: event.target.value }
                                : elem
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  true
                )}
              </ul>
            )
          })
        ) : (
          <>
            {exerciseArr.map((el) => (
              <div className={styles.run_container}>
                <h2>Дистанция (км)</h2>
                <input
                  type="number"
                  id="distance"
                  value={el.distance}
                  onChange={(event) =>
                    setExerciseArr(
                      exerciseArr.map((elem) =>
                        elem.id === el.id
                          ? { ...el, distance: event.target.value }
                          : elem
                      )
                    )
                  }
                />
                <h2>Время (чч:мм)</h2>
                <input
                  type="time"
                  id="time"
                  value={el.time}
                  onChange={(event) =>
                    setExerciseArr(
                      exerciseArr.map((elem) =>
                        elem.id === el.id
                          ? { ...el, time: event.target.value }
                          : elem
                      )
                    )
                  }
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.calendar_btn_menu}>
        {params.name !== 'running' ? (
          <IoAddSharp
            className={styles.add_exercise_btn}
            onClick={() => setIsActive(!isActicve)}
          />
        ) : (
          true
        )}

        <div className={styles.calendar_container}>
          <MdOutlineClose
            onClick={() => setNewEvents({ ...newEvents, start: '', end: '' })}
            className={styles.reset_calendar_btn}
          />
          <ReactDatePicker
            className={styles.calendar}
            placeholderText="Выбор даты"
            style={{ marginRight: '10px', width: '400px' }}
            selected={newEvents.start}
            onChange={(start) =>
              setNewEvents({
                ...newEvents,
                start,
              })
            }
          />
        </div>
        <IoIosAddCircleOutline
          onClick={handleEventsFunction}
          style={{ width: '40px', height: '40px' }}
          className={styles.add_exercise_day_btn}
        />
      </div>

      <div
        className={
          isActicve
            ? styles.add_custom_exercise_container
            : styles.add_custom_exercise__none
        }
      >
        <div className={styles.add_exercise_container}>
          <div>
            <div className={styles.add_exercise_content}>
              <label htmlFor="title">Название</label>
              <input
                type="text"
                id="title"
                value={newDayExercise.title}
                onChange={(event) =>
                  setNewDayExercise({
                    ...newDayExercise,
                    title: event.target.value.toLocaleLowerCase(),
                  })
                }
              />
            </div>
            <div className={styles.add_exercise_content}>
              <label htmlFor="current">Средний вес</label>
              <input
                type="number"
                id="current"
                value={newDayExercise.current}
                onChange={(event) =>
                  setNewDayExercise({
                    ...newDayExercise,
                    current: event.target.value,
                  })
                }
              />
            </div>
            <div className={styles.add_exercise_content}>
              <label htmlFor="max">Максимальный вес</label>
              <input
                type="number"
                id="max"
                value={newDayExercise.max}
                onChange={(event) =>
                  setNewDayExercise({
                    ...newDayExercise,
                    max: event.target.value,
                  })
                }
              />
            </div>
            <div className={styles.add_new_exercise_btn_container}>
              <RiAddCircleFill
                className={styles.add_exercise_btn}
                onClick={addCustomExercise}
              />
              <IoIosCloseCircleOutline
                className={styles.close_exercise_btn}
                onClick={closeAddCustomExercise}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisesSingleElement
