import { v4 as uuidv4 } from 'uuid'

export const createDayWithId = (day) => {
  return { ...day, id: uuidv4() }
}
