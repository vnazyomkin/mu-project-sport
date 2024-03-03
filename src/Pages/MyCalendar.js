import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectDay } from '../State/calendarDay'
import styles from './MyCalendar.module.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from '../UI/Modal'
import { Link, NavLink } from 'react-router-dom'
import { NUTRITILON } from '../Modules/AppRouter/consts'
import { useState } from 'react'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function MyCalendar() {
  const [active, setActive] = useState(true)
  const [wDay, setWday] = useState()
  const fn = (event) => {
    setActive(true)
    setWday(event)
  }

  const allEvents = useSelector(selectDay)

  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '670px', margin: '0px' }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.color,
            },
          }
        }}
        onDoubleClickEvent={(event) => fn(event)}
      />
      {/* <button onClick={() => console.log(wDay.title)}>click</button> */}
      {wDay && active ? <Modal event={wDay} setActive={setActive} /> : true}
    </div>
  )
}

export default MyCalendar
