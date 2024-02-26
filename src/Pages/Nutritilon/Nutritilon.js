import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectDay } from '../../State/calendarDay'
import { createNutritilonWithId } from '../../UI/createNutricilon'
import ReactDatePicker from 'react-datepicker'
import { createDayWithId } from '../../UI/createDayWithId'
import { useDispatch } from 'react-redux'
import { addDay, changeDay, deleteDay } from '../../State/calendarDay'
import { useParams } from 'react-router-dom'
import styles from './Nutritilon.module.css'
import { IoTrashBinOutline, IoSaveOutline, IoAddSharp } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { NUTRITILON } from '../../Modules/AppRouter/consts'
import { FaSpinner } from 'react-icons/fa'

function Nutritilon() {
  // получаем стейт из ридакса
  const dayList = useSelector(selectDay)

  // параметры пути
  const params = useParams()

  const dispatch = useDispatch()

  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false)

  // инфо про дату
  const [newEvents, setNewEvents] = useState({
    start: '',
    // end: '',
  })

  // селектор выбора времени приёма пищи
  const [timeOfReceipt, setTimeOfReceipt] = useState('breakfast')

  // инпуты ввода продукта и каллорий
  const [nameProduct, setNameProduct] = useState('')
  const [calories, setCalories] = useState('')

  // начальный стейт меню
  const [menuDay, setMenuDay] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  })

  // получанм меню по индексу
  useEffect(() => {
    if (params.id) {
      const day = dayList.find((el) => el.id === params.id)
      let { breakfast, lunch, dinner } = day.menu
      setMenuDay({ ...menuDay, breakfast, lunch, dinner })
      setBreakfast(breakfast)
      setLunch(lunch)
      setDinner(dinner)
      setNewEvents({ ...newEvents, start: day.start })
    }
  }, [])

  // стейты приёмов пищи
  const [breakfast, setBreakfast] = useState(menuDay.breakfast)
  const [lunch, setLunch] = useState(menuDay.lunch)
  const [dinner, setDinner] = useState(menuDay.dinner)

  // подготовка к сохранению данных
  const newNutritilon = createNutritilonWithId({
    categories: timeOfReceipt,
    name: nameProduct,
    calories: calories,
  })

  // добавление данных в список
  const handleAddProduct = () => {
    {
      if (timeOfReceipt === 'breakfast' && nameProduct && calories) {
        setBreakfast([...breakfast, newNutritilon])
        setMenuDay({ ...menuDay, breakfast: breakfast })
      }
      if (timeOfReceipt === 'lunch' && nameProduct && calories) {
        setLunch([...lunch, newNutritilon])
        setMenuDay({ ...menuDay, lunch: lunch })
      }
      if (timeOfReceipt === 'dinner' && nameProduct && calories) {
        setDinner([...dinner, newNutritilon])
        setMenuDay({ ...menuDay, dinner: dinner })
      }
    }

    setCalories('')
    setNameProduct('')
  }

  // Функции для удаления
  const handleToggleReceiptBreakfast = (el) => {
    setBreakfast(breakfast.filter((elem) => elem.id !== el.id))
    setMenuDay({ ...menuDay, breakfast: breakfast })
  }

  const handleToggleReceiptLunch = (el) => {
    setLunch(lunch.filter((elem) => elem.id !== el.id))
    setMenuDay({ ...menuDay, lunch: lunch })
  }
  const handleToggleReceiptDinner = (el) => {
    setDinner(dinner.filter((elem) => elem.id !== el.id))
    setMenuDay({ ...menuDay, dinner: dinner })
  }

  // Считаем каллории
  const ccalBreakfast = () => {
    const ccalBreacfastArr = []
    breakfast.forEach((el) => ccalBreacfastArr.push(parseInt(el.calories)))
    return ccalBreacfastArr.reduce((acc, el) => {
      return acc + el
    }, 0)
  }

  const ccalDinner = () => {
    const ccalDinnerArr = []
    dinner.forEach((el) => ccalDinnerArr.push(parseInt(el.calories)))
    return ccalDinnerArr.reduce((acc, el) => {
      return acc + el
    }, 0)
  }

  const ccalLunch = () => {
    const ccalLunchArr = []
    lunch.forEach((el) => ccalLunchArr.push(parseInt(el.calories)))
    return ccalLunchArr.reduce((acc, el) => {
      return acc + el
    }, 0)
  }

  const sumCalories = ccalBreakfast() + ccalDinner() + ccalLunch()

  // отправляем в exerciseDay
  const dayId = createDayWithId({
    path: NUTRITILON,
    menu: { breakfast, lunch, dinner },
    calories: [ccalBreakfast(), ccalLunch(), ccalDinner()],
    title: `${sumCalories} кКал`,
    start: newEvents.start,
    end: newEvents.start,
    color: 'red',
  })

  // отправляем в ридакс
  const addDayNutritilon = () => {
    if (breakfast.length > 0 || dinner.length > 0 || lunch.length > 0) {
      dispatch(addDay(dayId))
      setMenuDay(dayId.menu)
      setBreakfast([])
      setLunch([])
      setDinner([])
      setNewEvents({
        start: '',
      })
    }
  }

  // сохраняем день
  const changeNutritilon = () => {
    dispatch(
      changeDay({
        path: NUTRITILON,
        menu: { breakfast, lunch, dinner },
        title: `${sumCalories} кКал`,
        calories: [ccalBreakfast(), ccalLunch(), ccalDinner()],
        start: newEvents.start,
        end: newEvents.start,
        color: 'red',
        id: params.id,
      })
    )
    setMenuDay(dayId.menu)
    setIsVisibleSpinner(true)
    setTimeout(() => {
      setIsVisibleSpinner(false)
    }, 1500)
  }

  // удаляем день
  const deleteNutritilon = () => {
    dispatch(deleteDay(params.id))
    setMenuDay(menuDay)
    setBreakfast([])
    setLunch([])
    setDinner([])
    setNewEvents({
      start: '',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.head_container}>
        <div className={styles.input_btn_container}>
          <input
            placeholder="Название"
            type="text"
            id="name"
            value={nameProduct}
            onChange={(event) =>
              setNameProduct(event.target.value.toLowerCase())
            }
          />
          <input
            placeholder="Каллории"
            type="number"
            id="calories"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
          <IoIosAddCircleOutline
            onClick={handleAddProduct}
            style={{ width: '40px', height: '40px' }}
            className={styles.add_nutritilon_btn}
          />
        </div>
      </div>
      <div className={styles.nutricilon_list_container}>
        <div className={styles.nutricilon_list_item}>
          <span
            onClick={() => setTimeOfReceipt('breakfast')}
            className={
              timeOfReceipt === 'breakfast' ? styles.span_active : styles.span
            }
          >
            <h2>Утро</h2>
          </span>
          <div className={styles.list_item_string_head}>
            <h2></h2>
            <h2>Блюдо</h2>
            <h2>Ккал</h2>
          </div>
          <div className={styles.item_content}>
            {breakfast.map((el) => (
              <div
                onClick={() => handleToggleReceiptBreakfast(el)}
                className={styles.list_item_string}
              >
                <IoTrashBinOutline className={styles.item_string_icons} />
                <h2>{el.name}</h2>
                <h2>{el.calories}</h2>
              </div>
            ))}
          </div>
          <h3 style={{ color: 'white' }}>{`${ccalBreakfast()} кКал`}</h3>
        </div>
        <div className={styles.nutricilon_list_item}>
          <span
            onClick={() => setTimeOfReceipt('lunch')}
            className={
              timeOfReceipt === 'lunch' ? styles.span_active : styles.span
            }
          >
            <h2>День</h2>
          </span>
          <div className={styles.list_item_string_head}>
            <h2></h2>
            <h2>Блюдо</h2>
            <h2>Ккал</h2>
          </div>
          <div className={styles.item_content}>
            {lunch.map((el) => (
              <div
                onClick={() => handleToggleReceiptLunch(el)}
                className={styles.list_item_string}
              >
                <IoTrashBinOutline className={styles.item_string_icons} />
                <h2>{el.name}</h2>
                <h2>{el.calories}</h2>
              </div>
            ))}
          </div>
          <h3 style={{ color: 'white' }}>{`${ccalLunch()} кКал`}</h3>
        </div>
        <div className={styles.nutricilon_list_item}>
          <span
            onClick={() => setTimeOfReceipt('dinner')}
            className={
              timeOfReceipt === 'dinner' ? styles.span_active : styles.span
            }
          >
            <h2>Вечер</h2>
          </span>
          <div className={styles.list_item_string_head}>
            <h2></h2>
            <h2>Блюдо</h2>
            <h2>Ккал</h2>
          </div>
          <div className={styles.item_content}>
            {dinner.map((el) => (
              <div
                onClick={() => handleToggleReceiptDinner(el)}
                className={styles.list_item_string}
              >
                <IoTrashBinOutline className={styles.item_string_icons} />
                <h2>{el.name}</h2>
                <h2>{el.calories}</h2>
              </div>
            ))}
          </div>
          <h3 style={{ color: 'white' }}>{`${ccalDinner()} кКал`}</h3>
        </div>
      </div>
      <div className={styles.nutritilon_footer_container}>
        {isVisibleSpinner ? <FaSpinner className={styles.spinner} /> : false}
        <h3 style={{ color: 'white' }}>{`Всего: ${sumCalories} кКал`}</h3>
        <ReactDatePicker
          className={styles.calendar}
          value={newEvents.start}
          placeholderText="Выбор даты"
          style={{ marginRight: '10px', width: '400px' }}
          selected={newEvents.start}
          onChange={(start) =>
            setNewEvents({
              ...newEvents,
              start,
            })
          }
        />
        {params.id ? (
          <>
            <IoSaveOutline
              onClick={changeNutritilon}
              className={styles.footer_icons}
            />
            <MdDeleteForever
              onClick={deleteNutritilon}
              className={styles.footer_icons_delete}
            />
          </>
        ) : (
          <IoAddSharp
            onClick={addDayNutritilon}
            className={styles.footer_icons}
          />
        )}
      </div>
    </div>
  )
}

export default Nutritilon
