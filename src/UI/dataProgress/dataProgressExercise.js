export const dataProgressExercise = (data) => {
  let legsArr2
  if (data.map((el) => el.params === 'legs')) {
    let legsArr1 = data.filter((elem) => elem.params === 'legs')
    legsArr2 = legsArr1.map((el) =>
      el.exercise.filter(
        (elem) => elem.title === 'Приседания' && elem.isFavorite
      )
    )
    let legsArr3 = legsArr2.filter((el) => el.length !== 0)
    // legsArr = legsArr3.map((el)=>el.map((el.)))
  }
  return legsArr2
}
