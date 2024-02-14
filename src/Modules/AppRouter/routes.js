import {
  MAIN_PAGES,
  CALENDAR,
  DREAM,
  EXERCISE,
  NUTRITILON,
  PROGRESS,
} from './consts'

import MainPages from '../../Pages/MainPages'
import Dream from '../../Pages/Dream'
import Exercise from '../../Pages/Exercise'
import Nutritilon from '../../Pages/Nutritilon'
import Progress from '../../Pages/Progress'
import MyCalendar from '../../Pages/MyCalendar'

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
]
