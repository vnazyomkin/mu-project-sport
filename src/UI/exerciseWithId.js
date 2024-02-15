import { v4 as uuidv4 } from 'uuid'

export const exerciseWithId = (data) => {
  let dataWithID = data.map(({ path, name, exercise }) => {
    let exerciseId = exercise.map((el) => {
      return name === 'Бег'
        ? { ...el, id: uuidv4(), distance: '', time: '', isFavorite: true }
        : { ...el, id: uuidv4(), current: '', max: '' }
    })
    return { path, name, exerciseId }
  })
  return dataWithID
}
