import { NavLink, useParams } from 'react-router-dom'
import styles from './Exercise.module.css'
import { EXERCISE } from '../Modules/AppRouter/consts'
import dataExercise from './Exercise/dataExercise'
import ExercisesSingleElement from './Exercise/ExercisesSingleElement'
import { exerciseWithId } from '../UI/exerciseWithId'

function Exercise() {
  const dataExerciseId = exerciseWithId(dataExercise)
  const params = useParams()
  const exerciseCurrentList = dataExerciseId.filter(
    (el) => el.path === `/${params.name}`
  )
  console.log(exerciseCurrentList)

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        {dataExerciseId.map((el, id) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.noActive
              }
              key={id}
              to={EXERCISE + `${el.path}`}
              // onClick={() => console.log(params.name)}
            >
              {el.name}
            </NavLink>
          )
        })}
      </div>
      {!!exerciseCurrentList.length ? (
        exerciseCurrentList.map((el) => {
          return (
            <div className={styles.right_content_container}>
              <ExercisesSingleElement key={el.id} el={el} />
            </div>
          )
        })
      ) : (
        <h1>Выбор упражнения</h1>
      )}
    </div>
  )
}

export default Exercise
