import { useState } from 'react'
import { createNutritilonWithId } from '../../UI/createNutricilon'
import ReactDatePicker from 'react-datepicker'
import { createDayWithId } from '../../UI/createDayWithId'
import { useDispatch } from 'react-redux'
import { addDay } from '../../State/exerciseDay'
import styles from './Nutritilon.module.css'
import { IoTrashBinOutline } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'

function Nutritilon() {
  const menuDay = {
    data: newEvents.start,
    breakfast: [],
    lunch: [],
    dinner: [],
  }

  const dispatch = useDispatch()

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

  // стейты приёмов пищи
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])

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
      }
      if (timeOfReceipt === 'lunch' && nameProduct && calories) {
        setLunch([...lunch, newNutritilon])
      }
      if (timeOfReceipt === 'dinner' && nameProduct && calories) {
        setDinner([...dinner, newNutritilon])
      }
    }

    setCalories('')
    setNameProduct('')
  }

  // Функции для удаления
  const handleToggleReceiptBreakfast = (el) => {
    return setBreakfast(breakfast.filter((elem) => elem.id !== el.id))
  }

  const handleToggleReceiptLunch = (el) => {
    return setLunch(lunch.filter((elem) => elem.id !== el.id))
  }
  const handleToggleReceiptDinner = (el) => {
    return setDinner(dinner.filter((elem) => elem.id !== el.id))
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
  const createDayId = createDayWithId({
    title: sumCalories,
    // breakfast: breakfast,
    // lunch: lunch,
    // dinner: dinner,
    star: newEvents.start,
    end: newEvents.start,
  })

  // отправляем в ридакс
  const addDayNutritilon = () => {
    dispatch(
      addDay({
        title: `${sumCalories} кКал`,
        start: newEvents.start,
        end: newEvents.start,
      })
    )
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
          {/* <button onClick={() => console.log(fnArrays())}>Показать</button> */}
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
        <ReactDatePicker
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
        <button onClick={addDayNutritilon}>Отправить</button>
        <h3 style={{ color: 'white' }}>{`Всего: ${sumCalories} кКал`}</h3>
      </div>
    </div>
  )
}

export default Nutritilon
