import { NavLink, useParams } from 'react-router-dom'
import styles from './Exercise.module.css'
import { EXERCISE } from '../Modules/AppRouter/consts'
import ExercisesSingleElement from './Exercise/ExercisesSingleElement'
import { exerciseWithId } from '../UI/exerciseWithId'
import { useSelector } from 'react-redux'
import { selectExerciseData } from '../State/exerciseDataSlice'

function Exercise() {
  const dataExercise = useSelector(selectExerciseData)

  const dataExerciseId = exerciseWithId(dataExercise)
  const params = useParams()
  const exerciseCurrentList = dataExerciseId.filter(
    (el) => el.path === `/${params.name}`
  )

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
        exerciseCurrentList.map((currentList) => {
          return (
            <div className={styles.right_content_container}>
              <ExercisesSingleElement
                key={currentList.id}
                currentList={currentList}
              />
            </div>
          )
        })
      ) : (
        <div className={styles.select_exercise}>
          <h1>Подберите упражнение</h1>
        </div>
      )}
    </div>
  )
}

export default Exercise
