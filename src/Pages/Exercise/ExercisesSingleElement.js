import { createDayWithId } from '../../UI/createDayWithId'
import ReactDatePicker from 'react-datepicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDay } from '../../State/exerciseDay'
import { addExercise } from '../../State/exerciseSlice'
import { useParams } from 'react-router-dom'
import styles from './ExerciseSingleElement.module.css'
import { FaCheck } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdOutlineClose } from 'react-icons/md'
// import { IoAddSharp } from 'react-icons/io5'

function ExercisesSingleElement({ currentList }) {
  const params = useParams()

  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
    // end: '',
  })

  // при смене данных меняем упражнения
  useEffect(() => {
    setExerciseArr(currentList.exerciseId)
  }, [currentList])

  // инфо данных для выбора упражнений
  const [exerciseArr, setExerciseArr] = useState(currentList.exerciseId)

  const dispatch = useDispatch()

  // подготавливаем данные для отправки в магазин (общая информация)
  const createDayId = createDayWithId({
    title: currentList.name,
    exercise: exerciseArr.filter((el) => el.isFavorite),
    startDay: newEvents.start,
    endDay: newEvents.start,
  })

  const handleToggleIsFavorite = (id) => {
    let changeExercise = exerciseArr.map((el) =>
      el.id === id ? { ...el, isFavorite: !el.isFavorite } : el
    )
    setExerciseArr(changeExercise)
  }

  const handleEventsFunction = () => {
    dispatch(
      addDay({
        start: newEvents.start,
        end: newEvents.start,
        title: currentList.name,
      })
    )
    dispatch(addExercise(createDayId))
    setExerciseArr(currentList.exerciseId)
    // setNewEvents({ ...newEvents, start: '', end: '' })
  }

  return (
    <div className={styles.container}>
      <h1>Упражнения</h1>
      <div className={styles.content}>
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
                      style={{ color: 'green', width: '30px', height: '30px' }}
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

        {/* <ReactDatePicker
          showTimeSelect
          placeholderText="End day"
          selected={newEvents.end}
          onChange={(end) =>
            setNewEvents({
              ...newEvents,
              end,
            })
          }
        /> */}
      </div>
      <div className={styles.calendar_btn_menu}>
        {/* Заглушка для добавления новых упражнений */}
        {/* <IoAddSharp className={styles.add_exercise_btn} /> */}
        <div className={styles.calendar_container}>
          <MdOutlineClose
            onClick={() => setNewEvents({ ...newEvents, start: '', end: '' })}
            className={styles.reset_calendar_btn}
          />
          <ReactDatePicker
            className={styles.calendar}
            // showTimeSelect
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
    </div>
  )
}

export default ExercisesSingleElement
