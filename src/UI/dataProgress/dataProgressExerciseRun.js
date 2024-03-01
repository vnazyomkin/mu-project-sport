export const dataProgressExerciseRun = (data, name) => {
  // ищем массив с ногами
  let step1 = data.filter((elem) => `/${elem.params}` === name)
  // приводим к дате для сортировки и оставляем выбранное упражнение с определённым названием
  let step2 = step1.map((el) => {
    return {
      start: new Date(el.start),
      exercise: el.exercise.filter((elem) => elem.isFavorite),
    }
  })
  // оставляем объекты со значениями (пустые удаляем)
  let step3 = step2.filter((el) => el.exercise.length !== 0)

  // сортируем по дате
  let step4 = step3.sort((a, b) => a.start - b.start)

  // приводим данные к читаемой дате
  let step5 = step4.map((el) => {
    const dateSrc = el.start.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    let dateDst = dateSrc.split('.').reverse().join('-')
    return {
      date: dateDst,
      distance: el.exercise.map((el) => el.distance).toString(),
      time: el.exercise.map((el) => el.time).toString(),
    }
  })
  return step5
}
