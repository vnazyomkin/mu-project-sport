import {
  MAIN_PAGES,
  CALENDAR,
  DREAM,
  EXERCISE,
  NUTRITILON,
  PROGRESS,
} from './consts'

import MainPages from '../../Pages/MainPages'
import Dream from '../../Pages/Dream/Dream'
import Exercise from '../../Pages/Exercise'
import Nutritilon from '../../Pages/Nutritilon/Nutritilon'
import Progress from '../../Pages/Progress'
import MyCalendar from '../../Pages/MyCalendar'
import ExerciseDay from '../../Pages/Exercise/ExerciseDay'

export const routes = [
  {
    path: MAIN_PAGES,
    Component: MainPages,
  },
  {
    path: CALENDAR,
    Component: MyCalendar,
  },
  {
    path: DREAM,
    Component: Dream,
  },
  {
    path: EXERCISE,
    Component: Exercise,
  },
  {
    path: NUTRITILON,
    Component: Nutritilon,
  },
  {
    path: PROGRESS,
    Component: Progress,
  },
  {
    path: EXERCISE + `/:name`,
    Component: Exercise,
  },
  { path: NUTRITILON + `/:id`, Component: Nutritilon },
  { path: DREAM + `/:id`, Component: Dream },
  { path: EXERCISE + `/:params` + `/:id`, Component: ExerciseDay },
]
