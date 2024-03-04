import { useDispatch, useSelector } from 'react-redux'
import {
  addAge,
  addHeight,
  addName,
  addPassword,
  addWeight,
  selectDataProfile,
} from '../../State/dataProfileSlice'
import styles from './MyPages.module.css'
import { useState } from 'react'
import { CgAddR } from 'react-icons/cg'
import { FaExchangeAlt } from 'react-icons/fa'
import { MdPublishedWithChanges } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { PROGRESS, CALENDAR } from '../../Modules/AppRouter/consts'
import Progress from './img/Progress.png'
import Calendar from './img/Calendar.png'

function MainPages() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [visibleForm, setVisibleForm] = useState(false)

  const getWeight = () => {
    dispatch(addWeight(weight))
    setWeight('')
  }

  const getHeight = () => {
    dispatch(addHeight(height))
    setHeight('')
  }

  const getAge = () => {
    dispatch(addAge(age))
    setAge('')
  }

  const getNameAndPassword = () => {
    if (name && password) {
      dispatch(addName(name))
      dispatch(addPassword(password))
      setName('')
      setPassword('')
      setVisibleForm(false)
    }
    if (name) {
      dispatch(addName(name))
      setName('')
      setVisibleForm(false)
    }
    if (password) {
      dispatch(addPassword(password))
      setPassword('')
      setVisibleForm(false)
    }
    return setVisibleForm(false)
  }

  const profileData = useSelector(selectDataProfile)
  const dispatch = useDispatch()
  return (
    <div className={styles.container}>
      <div className={styles.profile_info}>
        <h1>{`Приветствуем, ${profileData.name}! Будем действовать!`}</h1>
        {profileData.weight ? (
          <div className={styles.info__container}>
            <h2>{`Вес: ${profileData.weight} кг`}</h2>
            <FaExchangeAlt
              onClick={() => dispatch(addWeight(''))}
              className={styles.info__icon}
            />
          </div>
        ) : (
          <div className={styles.add_info__container}>
            <label>
              <input
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
              Добавить данные о весе
            </label>
            <CgAddR onClick={getWeight} className={styles.add_info__icon} />
          </div>
        )}
        {profileData.height ? (
          <div className={styles.info__container}>
            <h2>{`Рост: ${profileData.height} см`}</h2>
            <FaExchangeAlt
              onClick={() => dispatch(addHeight(''))}
              className={styles.info__icon}
            />
          </div>
        ) : (
          <div className={styles.add_info__container}>
            <label>
              <input
                type="number"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
              Добавить данные о росте
            </label>
            <CgAddR onClick={getHeight} className={styles.add_info__icon} />
          </div>
        )}
        {profileData.age ? (
          <div className={styles.info__container}>
            <h2>{`Возраст: ${profileData.age}`}</h2>
            <FaExchangeAlt
              onClick={() => dispatch(addAge(''))}
              className={styles.info__icon}
            />
          </div>
        ) : (
          <div className={styles.add_info__container}>
            <label>
              <input
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
              Добавить данные о возрасте
            </label>
            <CgAddR onClick={getAge} className={styles.add_info__icon} />
          </div>
        )}
        <div className={styles.info_footer}>
          {visibleForm ? (
            <div className={styles.footer__form_container}>
              <input
                placeholder="Новое имя"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                placeholder="Новый пароль"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <MdPublishedWithChanges
                onClick={getNameAndPassword}
                className={styles.footer_icon}
              />
            </div>
          ) : (
            <span onClick={() => setVisibleForm(true)}>
              Изменить данные для авторизации
            </span>
          )}
        </div>
      </div>
      <div className={styles.section_container}>
        <NavLink
          className={styles.section_item}
          to={PROGRESS}
          style={{ backgroundImage: `url(${Progress})` }}
        >
          <h2>Прогресс</h2>
        </NavLink>
        <NavLink
          className={styles.section_item}
          to={CALENDAR}
          style={{ backgroundImage: `url(${Calendar})` }}
        >
          <h2 className={styles.item_txt}>Календарь</h2>
        </NavLink>
      </div>
    </div>
  )
}

export default MainPages
