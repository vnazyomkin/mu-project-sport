import { v4 as uuidv4 } from 'uuid'

export const createNutritilonWithId = (nutritilon) => {
  return { ...nutritilon, id: uuidv4() }
}
