import React from 'react'
import { Link } from 'react-router-dom'
import { DREAM, EXERCISE, NUTRITILON } from '../Modules/AppRouter/consts'
import styles from './Modal.module.css'
import { useDispatch } from 'react-redux'
import { deleteDay } from '../State/calendarDay'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

function Modal({ event, setActive }) {
  const dispatch = useDispatch()
  const deleteEvent = () => {
    dispatch(deleteDay(event.id))
    setActive(false)
  }
  console.log(event)
  return (
    <div className={styles.container} style={{ backgroundColor: event.color }}>
      <IoIosCloseCircleOutline
        onClick={() => setActive(false)}
        className={styles.close}
      />

      <h1>{event.color !== 'red' ? event.title : `Всего: ${event.title}`}</h1>
      <div className={styles.content_container}>
        {event.color === '#006103' ? (
          event.exercise
            .filter((elem) => elem.isFavorite)
            .map((el) => {
              return (
                <div className={styles.content_element}>
                  <h2>{el.title}</h2>
                </div>
              )
            })
        ) : event.color === 'red' ? (
          <>
            <div className={styles.content_element__nutritilon}>
              <h2>Утро</h2>
              <h2>{`${event.calories[0]} кКал`}</h2>
            </div>
            <div className={styles.content_element__nutritilon}>
              <h2>День</h2>
              <h2>{`${event.calories[1]} кКал`}</h2>
            </div>
            <div className={styles.content_element__nutritilon}>
              <h2>Вечер</h2>
              <h2>{`${event.calories[2]} кКал`}</h2>
            </div>
          </>
        ) : (
          <div className={styles.content_element__dream}>
            <div className={styles.conteiner_element__dream}>
              <h1>Отход ко сну</h1>
              <h2>{event.dremStart}</h2>
            </div>
            <div className={styles.conteiner_element__dream}>
              <h1>Пробуждение</h1>
              <h2>{event.dreamEnd}</h2>
            </div>
          </div>
        )}
      </div>
      <div className={styles.details_container}>
        <Link
          to={
            event.path === NUTRITILON
              ? `${event.path}/${event.id}`
              : event.path === DREAM
              ? `${event.path}/${event.id}`
              : EXERCISE + `/${event.params}` + `/${event.id}`
          }
        >
          Подробнее
        </Link>
        <MdDelete onClick={deleteEvent} className={styles.delete} />
      </div>
    </div>
  )
}

export default Modal
