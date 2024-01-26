import {
  MAIN_PAGES,
  CALENDAR,
  DREAM,
  EXERCISE,
  NUTRITILON,
  PROGRESS,
} from './consts'

import MainPages from '../../Pages/MainPages'
import Calendar from '../../Pages/Calendar'
import Dream from '../../Pages/Dream'
import Exercise from '../../Pages/Exercise'
import Nutritilon from '../../Pages/Nutritilon'
import Progress from '../../Pages/Progress'

export const routes = [
  {
    path: MAIN_PAGES,
    Component: MainPages,
  },
  {
    path: CALENDAR,
    Component: Calendar,
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
]
