import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

//Pages
import Landing from '../src/pages/Landing'
import TeacherForm from '../src/pages/TeacherForm'
import TeacherList from '../src/pages/TeacherList'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={ Landing } exact/>
      <Route path="/study" component={ TeacherList }/>
      <Route path="/give-classes" component={ TeacherForm }/>
    </BrowserRouter>
  )
}

export default Routes