import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectDay } from '../State/exerciseDay'
import styles from './MyCalendar.module.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'

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
  const allEvents = useSelector(selectDay)

  return (
    <div className={styles.container}>
      <h1>Календарь</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '850px', margin: '50px' }}
      />
    </div>
  )
}

export default MyCalendar
