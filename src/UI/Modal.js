import React from 'react'
import { Link } from 'react-router-dom'
import { NUTRITILON } from '../Modules/AppRouter/consts'
import styles from './Modal.module.css'

function Modal({ event, setActive }) {
  console.log(event)
  return (
    <div className={styles.container}>
      <div className={styles.close_container}>
        <button onClick={() => setActive(false)}>Close</button>
      </div>
      <h2>{event.title}</h2>
      <div className={styles.details_container}>
        <Link to={`${event.path}/${event.id}`}>Переход</Link>
      </div>
    </div>
  )
}

export default Modal
