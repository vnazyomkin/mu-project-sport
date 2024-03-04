import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import {
  EXERCISE,
  NUTRITILON,
  DREAM,
  CALENDAR,
  PROGRESS,
  MAIN_PAGES,
} from '../Modules/AppRouter/consts'
import logo from '../img/logo.png'
import { resetInfo } from '../State/dataProfileSlice'
import { useDispatch } from 'react-redux'

function Header({ setAuthorization }) {
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <NavLink to={MAIN_PAGES}>
          <img src={logo} alt="logo" width="50px" height="40px" />
        </NavLink>
        <div className={styles.container_sport}>
          <NavLink
            to={EXERCISE}
            className={({ isActive }) =>
              isActive ? styles.active : styles.noActive
            }
          >
            Упражнения
          </NavLink>
          <NavLink
            to={NUTRITILON}
            className={({ isActive }) =>
              isActive ? styles.active : styles.noActive
            }
          >
            Питание
          </NavLink>
          <NavLink
            to={DREAM}
            className={({ isActive }) =>
              isActive ? styles.active : styles.noActive
            }
          >
            Сон
          </NavLink>
        </div>
        <NavLink
          to={MAIN_PAGES}
          className={styles.exit}
          onClick={() => setAuthorization(false)}
        >
          Выйти
        </NavLink>
      </div>
    </div>
  )
}

export default Header
