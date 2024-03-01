export const dataProgressDream = (data) => {
  // ищем массив с ногами
  let step1 = data.filter((elem) => elem.path === '/dream')
  // приводим к дате для сортировки
  let step2 = step1.map((el) => {
    let minValueOnly = parseInt(el.title.slice(4, 8))
    let minValueOnlyResult = minValueOnly / 60
    let hoursValue = parseInt(el.title.slice(4, 7))
    let minValue = parseInt(el.title.slice(9, 13))
    let minValueResult = minValue / 60

    return {
      start: new Date(el.start),
      valueDream:
        el.title.split('').length <= 12
          ? minValueOnlyResult
          : hoursValue + minValueResult,
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
      value: el.valueDream,
    }
  })

  return step4
}
