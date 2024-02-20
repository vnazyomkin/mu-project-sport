import React from 'react'
import { Link } from 'react-router-dom'

import { NUTRITILON } from '../Modules/AppRouter/consts'

import { selectDay } from '../State/calendarDay'
import { useSelector } from 'react-redux'

function Dream() {
  const dayList = useSelector(selectDay)
  return (
    <div>
      {' '}
      <Link to={NUTRITILON + `/${dayList[0].id}`}>ПЕРХОД</Link>
    </div>
  )
}

export default Dream
