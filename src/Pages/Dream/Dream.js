import { useState } from 'react'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { changeDay, selectDay, deleteDay } from '../../State/calendarDay'
import 'react-clock/dist/Clock.css'
import styles from './Dream.module.css'
import ReactDatePicker from 'react-datepicker'
import { DREAM } from '../../Modules/AppRouter/consts'
import { createDayWithId } from '../../UI/createDayWithId'
import { addDay } from '../../State/calendarDay'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { IoSaveOutline } from 'react-icons/io5'
import { FaSpinner } from 'react-icons/fa'

function Dream() {
  // показать/скрыть спиннер
  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false)
  const params = useParams()
  const dispatch = useDispatch()
  const dayList = useSelector(selectDay)

  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
    // end: '',
  })
  const [startSleep, setStartSleep] = useState('')
  const [endSleep, setEndSleep] = useState('')

  // при открытии с id добавляем данные из ридакс
  useEffect(() => {
    if (params.id) {
      const day = dayList.find((el) => el.id === params.id)
      setStartSleep(day.dremStart)
      setEndSleep(day.dreamEnd)
      setNewEvents({ ...newEvents, start: day.start })
    }
  }, [])

  // считаем время сна
  const timeSleep = () => {
    if (startSleep && endSleep) {
      let hoursResum =
        parseInt(endSleep.slice(0, 2)) > parseInt(startSleep.slice(0, 2))
          ? parseInt(endSleep.slice(0, 2)) -
            1 -
            parseInt(startSleep.slice(0, 2))
          : 23 +
            parseInt(endSleep.slice(0, 2)) -
            parseInt(startSleep.slice(0, 2))
      let timeResum =
        parseInt(endSleep.slice(3, 5)) + 60 - parseInt(startSleep.slice(3, 5))

      let timeResult = timeResum > 59 ? timeResum - 60 : timeResum
      let hoursResult = timeResum > 59 ? hoursResum + 1 : hoursResum
      let hoursResult2 = hoursResult > 23 ? 0 : hoursResult

      return `${
        hoursResult2.toString() === '0' ? '' : `${hoursResult2.toString()} ч`
      } ${
        timeResult < 10 ? '0' + timeResult.toString() : timeResult.toString()
      } мин`
    }
  }

  // создаём объект для ридакс
  const newDream = createDayWithId({
    path: DREAM,
    title: `Cон: ${timeSleep()}`,
    dremStart: startSleep,
    dreamEnd: endSleep,
    start: newEvents.start,
    end: newEvents.start,
    color: '#3d3d3d',
  })

  // добавляем новый день в ридакс
  const addDayDream = () => {
    if (startSleep && endSleep && newEvents.start) {
      dispatch(addDay(newDream))
      setStartSleep('')
      setEndSleep('')
      setNewEvents({
        start: '',
      })
    }
  }

  // заменяем день в ридакс
  const changeDayDream = () => {
    dispatch(
      changeDay({
        path: DREAM,
        title: `Cон: ${timeSleep()}`,
        dremStart: startSleep,
        dreamEnd: endSleep,
        start: newEvents.start,
        end: newEvents.start,
        color: '#3d3d3d',
        id: params.id,
      })
    )
    setIsVisibleSpinner(true)
    setTimeout(() => {
      setIsVisibleSpinner(false)
    }, 1500)
  }

  // удаляем день
  const deleteDreamDay = () => {
    dispatch(deleteDay(params.id))
    setStartSleep('')
    setEndSleep('')
    setNewEvents({
      start: '',
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.item_content}>
          <h1>Отход ко сну</h1>
          <TimePicker
            clockIcon={null}
            clearAriaLabel="Toggle clock"
            onChange={setStartSleep}
            value={startSleep}
            className={styles.clock_container}
          />
        </div>
        <div className={styles.item_content}>
          <h1>Пробуждение</h1>
          <TimePicker
            clockIcon={null}
            clearAriaLabel="Toggle clock"
            onChange={setEndSleep}
            value={endSleep}
            className={styles.clock_container}
          />
        </div>
      </div>
      <div className={styles.footer_container}>
        <ReactDatePicker
          className={styles.calendar_footer}
          value={newEvents.start}
          placeholderText="Выбор даты"
          style={{
            marginRight: '10px',
            width: '400px',
            height: '70%',
            textAlign: 'center',
          }}
          selected={newEvents.start}
          onChange={(start) =>
            setNewEvents({
              ...newEvents,
              start,
            })
          }
        />

        {params.id ? (
          <div className={styles.footer_btn}>
            <IoSaveOutline
              onClick={changeDayDream}
              className={styles.change_icon}
            />
            <MdDeleteForever
              onClick={deleteDreamDay}
              className={styles.delete_icon}
            />
            <div>
              {isVisibleSpinner ? (
                <FaSpinner className={styles.spinner} />
              ) : (
                false
              )}
            </div>
          </div>
        ) : (
          <IoIosAddCircleOutline
            onClick={addDayDream}
            className={styles.add_icon}
          />
        )}
      </div>
      <div className={styles.summ_sleep_footer}>
        {!!startSleep && !!endSleep ? <h2>{`Сон: ${timeSleep()}`}</h2> : true}
      </div>
    </div>
  )
}

export default Dream
