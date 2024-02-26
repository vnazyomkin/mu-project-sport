import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { selectDay } from '../../State/calendarDay'
import { useSelector } from 'react-redux'
import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ExerciseSingleElement.module.css'
import { changeDay, deleteDay } from '../../State/calendarDay'
import { useDispatch } from 'react-redux'
import { IoSaveOutline } from 'react-icons/io5'
import { TiDeleteOutline } from 'react-icons/ti'
import { FaCheck } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { RiAddCircleFill } from 'react-icons/ri'
import { FaSpinner } from 'react-icons/fa'

function ExerciseDay() {
  // показать/скрыть спиннер
  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false)

  // стейт для добавления нового упражнения
  const [newDayExercise, setNewDayExercise] = useState({
    title: '',
    current: '',
    max: '',
  })

  // отправка в store
  const dispatch = useDispatch()

  //   получение стейта из store
  const dayList = useSelector(selectDay)

  //   Параметры пути и получение текущего дня
  const params = useParams()
  const day = dayList.find((el) => el.id === params.id)

  //   Начальный стейт
  const [exerciseArr, setExerciseArr] = useState([])

  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
    // end: '',
  })

  //   Действия при рендеринге страницы
  useEffect(() => {
    if (params.id) {
      setExerciseArr(day.exercise)
      setNewEvents({ ...newEvents, start: day.start })
    }
  }, [])

  // отмечаем понравившиеся упражнения
  const handleToggleIsFavorite = (id) => {
    let changeExercise = exerciseArr.map((el) =>
      el.id === id ? { ...el, isFavorite: !el.isFavorite } : el
    )
    setExerciseArr(changeExercise)
  }

  //   Сохранение
  const changeExercise = () => {
    dispatch(
      changeDay({
        params: params.params,
        title: day.title,
        exercise: exerciseArr,
        start: newEvents.start,
        end: newEvents.start,
        color: '#006103',
        id: params.id,
      })
    )
    setIsVisibleSpinner(true)
    setTimeout(() => {
      setIsVisibleSpinner(false)
    }, 1500)
  }

  //   Удаление
  const deleteExercise = () => {
    dispatch(deleteDay(params.id))
    setExerciseArr(exerciseArr)
    setNewEvents({
      start: '',
    })
  }

  // добавляем новые упражнения
  const handleAddNewExercise = () => {
    if (newDayExercise.title && newDayExercise.current && newDayExercise.max) {
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
      setNewDayExercise({
        title: '',
        current: '',
        max: '',
      })
    }
  }

  return (
    <>
      {!!day ? (
        <div className={styles.day_container}>
          <h1>{day.title}</h1>
          <div
            className={
              params.params !== 'running'
                ? styles.day_content
                : styles.day_content_running
            }
          >
            <div
              className={
                params.params !== 'running'
                  ? styles.content
                  : styles.content_running
              }
            >
              {!!exerciseArr.length && params.params !== 'running' ? (
                exerciseArr.map((el) => {
                  return (
                    <ul
                      className={
                        el.isFavorite ? styles.ul_check : styles.ul_deafult
                      }
                    >
                      <li
                        key={el.id}
                        onClick={() => handleToggleIsFavorite(el.id)}
                      >
                        <div className={styles.content_txt}>
                          <h2> {el.title}</h2>
                        </div>
                        {el.isFavorite ? (
                          <TiDeleteOutline
                            style={{
                              color: 'red',
                              width: '40px',
                              height: '40px',
                            }}
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
            {params.params !== 'running' ? (
              <div className={styles.add_exercise_container}>
                <div>
                  <span className={styles.add_exercise__header_title}>
                    Добавить упражнение
                  </span>
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
                      onClick={handleAddNewExercise}
                    />
                  </div>
                </div>
              </div>
            ) : (
              true
            )}
          </div>
          <div>
            <div className={styles.footer_menu}>
              <div className={styles.calendar_container}>
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
              <IoSaveOutline
                onClick={changeExercise}
                style={{ width: '40px', height: '40px' }}
                className={styles.footer_icons}
              />
              <MdDeleteForever
                onClick={deleteExercise}
                className={styles.footer_icons_delete}
              />
            </div>
          </div>
        </div>
      ) : (
        true
      )}
      {isVisibleSpinner ? <FaSpinner className={styles.spinner} /> : false}
    </>
  )
}

export default ExerciseDay
