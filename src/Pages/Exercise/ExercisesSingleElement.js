import { createDayWithId } from '../../UI/createDayWithId'
import ReactDatePicker from 'react-datepicker'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDay } from '../../State/exerciseDay'
import { addExercise } from '../../State/exerciseSlice'

function ExercisesSingleElement({ el }) {
  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
    end: '',
  })

  // при смене данных меняем упражнения
  useEffect(() => {
    setDataExercise(el)
  }, [el])

  // инфо данных для выбора упражнений
  const [dataExercise, setDataExercise] = useState(el)
  const dispatch = useDispatch()

  // подготавливаем данные для отправки в магазин (общая информация)
  const createDayId = createDayWithId({
    title: dataExercise.name,
    exercise: dataExercise.exerciseId.filter((el) => el.isFavorite),
    startDay: newEvents.start,
    endDay: newEvents.end,
  })

  const handleToggleIsFavorite = (id) => {
    let { path, name, exerciseId } = dataExercise
    let changeExercise = exerciseId.map((el) =>
      el.id === id ? { ...el, isFavorite: !el.isFavorite } : el
    )
    exerciseId = changeExercise

    setDataExercise({ path, name, exerciseId })
  }

  const handleEventsFunction = () => {
    dispatch(
      addDay({ start: newEvents.start, end: newEvents.end, title: el.name })
    )
    dispatch(addExercise(createDayId))
    setDataExercise(el)
    setNewEvents({ ...newEvents, start: '', end: '' })
    // setWeightInfo(weightInfo)
  }

  return (
    <div>
      <h1>Упражнения</h1>
      <div>
        {!!dataExercise.exerciseId.length ? (
          dataExercise.exerciseId.map((el) => {
            return (
              <ul>
                <li key={el.id}>
                  <div>
                    <h2> {el.title}</h2>
                  </div>
                  <div>
                    <button onClick={() => handleToggleIsFavorite(el.id)}>
                      {`${el.isFavorite ? 'Убрать' : 'Добавить'}`}
                    </button>
                    <button onClick={() => console.log(dataExercise)}>
                      Показать
                    </button>
                    {el.isFavorite ? (
                      <>
                        {/* <div>
                          <label htmlFor={el.title}>Рабочий вес</label>
                          <input
                            type="number"
                            id={el.title}
                            value={el.currentWeight}
                            onChange={(event) =>
                              currentWeightToggle(event, el.id)
                            }
                          />
                        </div> */}
                        {/* <div>
                          <label htmlFor="max weight">Максимальный вес</label>
                          <input
                            type="number"
                            id="title"
                            value={el.maxWeight}
                            onChange={(event) =>
                              setDataExercise({
                                ...el,
                                maxWeight: event.target.value,
                              })
                            }
                          />
                        </div> */}
                      </>
                    ) : (
                      true
                    )}
                  </div>
                </li>
              </ul>
            )
          })
        ) : (
          <>
            <input placeholder="Дистанция"></input>
            <input placeholder="Время"></input>
          </>
        )}
        <ReactDatePicker
          showTimeSelect
          placeholderText="Start day"
          style={{ marginRight: '10px', width: '400px' }}
          selected={newEvents.start}
          onChange={(start) =>
            setNewEvents({
              ...newEvents,
              start,
            })
          }
        />
        <ReactDatePicker
          showTimeSelect
          placeholderText="End day"
          selected={newEvents.end}
          onChange={(end) =>
            setNewEvents({
              ...newEvents,
              end,
            })
          }
        />
      </div>
      <button onClick={handleEventsFunction}>Добавить</button>
    </div>
  )
}

export default ExercisesSingleElement
