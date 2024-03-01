export const dataProgressNutritilon = (data) => {
  // ищем массив с ногами
  let step1 = data.filter((elem) => elem.path === '/nutritilon')
  // приводим к дате для сортировки
  let step2 = step1.map((el) => {
    return {
      start: new Date(el.start),
      value: el.calories.reduce((a, b) => a + b, 0),
    }
  })

  // сортируем по дате
  let step3 = step2.sort((a, b) => a.start - b.start)

  // приводим данные к читаемой дате
  let step4 = step3.map((el) => {
    const dateSrc = el.start.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    let dateDst = dateSrc.split('.').reverse().join('-')
    return {
      date: dateDst,
      value: el.value,
    }
  })

  return step4
}
