import React, { useState } from 'react'
import styles from './Authorization.module.css'
import { FaSpinner } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {
  addAge,
  addHeight,
  addName,
  addWeight,
} from '../../State/dataProfileSlice'

function AutorizationPage({ setAuthorization }) {
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false)

  const [registration, setRegistration] = useState(false)

  const dispatch = useDispatch()

  const handelSumbit = () => {
    if (password && name) {
      dispatch(addName(name))
      setIsVisibleSpinner(true)
      setTimeout(() => {
        setIsVisibleSpinner(false)
        setAuthorization(true)
        dispatch(addWeight(''))
        dispatch(addAge(''))
        dispatch(addHeight(''))
      }, 2500)
    }
  }
  return (
    <div className={styles.auth_container}>
      {isVisibleSpinner ? (
        <FaSpinner className={styles.spinner} />
      ) : (
        <form>
          <h2>{registration ? 'Авторизация' : 'Регистрация'}</h2>
          <div className={styles.input_container}>
            <label htmlFor="name">Введите имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="password">Введите пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {registration ? (
            <span
              onClick={() => setRegistration(false)}
              className={styles.select_registration_auth}
            >
              Не зарегистрированы?
            </span>
          ) : (
            <span
              onClick={() => setRegistration(true)}
              className={styles.select_registration_auth}
            >
              Уже есть аккаунт?
            </span>
          )}
          <span onClick={handelSumbit} className={styles.btn}>
            {registration ? 'Войти' : 'Зарегистрироваться'}
          </span>
        </form>
      )}
    </div>
  )
}

export default AutorizationPage
