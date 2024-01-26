import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import {
  EXERCISE,
  NUTRITILON,
  DREAM,
  CALENDAR,
  PROGRESS,
  MAIN_PAGES,
} from '../Modules/AppRouter/consts'
import logo from '../img/logo.png'

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <Link to={MAIN_PAGES}>
          <img src={logo} alt="logo" width="50px" height="40px" />
        </Link>
        <Link to={PROGRESS}>Прогресс</Link>
        <div className={styles.container_sport}>
          <Link to={EXERCISE}>Упражнения</Link>
          <Link to={NUTRITILON}>Питание</Link>
          <Link to={DREAM}>Сон</Link>
        </div>
        <Link to={CALENDAR}>Календарь</Link>
      </div>
    </div>
  )
}

export default Header
