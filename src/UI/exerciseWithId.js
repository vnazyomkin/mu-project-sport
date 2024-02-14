import { v4 as uuidv4 } from 'uuid'

export const exerciseWithId = (data) => {
  let dataWithID = data.map(({ path, name, exercise }) => {
    let exerciseId = exercise.map((el) => {
      return { ...el, id: uuidv4(), maxWeight: '', currentWeight: '' }
    })
    return { path, name, exerciseId }
  })
  return dataWithID
}
