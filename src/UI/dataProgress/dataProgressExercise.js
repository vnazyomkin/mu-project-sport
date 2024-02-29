export const dataProgressExercise = (data, name, exercise) => {
  // ищем массив с ногами
  let legsArr1 = data.filter((elem) => `/${elem.params}` === name)
  // приводим к дате для сортировки и оставляем выбранное упражнение с определённым названием
  let legsArr2 = legsArr1.map((el) => {
    return {
      start: new Date(el.start),
      exercise: el.exercise.filter(
        (elem) => elem.title === exercise && elem.isFavorite
      ),
    }
  })
  // оставляем объекты со значениями (пустые удаляем)
  let legsArr3 = legsArr2.filter((el) => el.exercise.length !== 0)

  // сортируем по дате
  let legsArr4 = legsArr3.sort((a, b) => a.start - b.start)

  // приводим данные к читаемой дате
  let legsArr5 = legsArr4.map((el) => {
    const dateSrc = el.start.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    let dateDst = dateSrc.split('.').reverse().join('-')
    return {
      date: dateDst,
      max: el.exercise.map((el) => el.max).toString(),
      current: el.exercise.map((el) => el.current).toString(),
    }
  })

  return legsArr5
}
