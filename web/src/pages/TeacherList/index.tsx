import React, { useState, FormEvent } from 'react'

//Services
import api from '../../services/api'

//Styles
import './styles.css'

//Components
import Input from '../../components/Input'
import Select from '../../components/Select'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'


function TeacherList() {

  //Teacher List
  const [ teachers, setTeachers ] = useState([])

  //Filters data
  const [ subject, setSubject ] = useState('')
  const [ week_day, setWeek_day ] = useState('')
  const [ time, setTime ] = useState('')

  async function searchTeachers(e: FormEvent) {
    e.preventDefault()

    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    console.log(res.data);

    setTeachers(res.data);
  }

  return (
    <div id="page-teacher-list" className="container">

      <PageHeader title="Estes são os proffys desponíveis.">

        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value)}}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Programação', label: 'Programação' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Matemática', label: 'Matemática' }
              ]}
            />
            <Select
              label="Dia da semana"
              name="week_day"
              value={week_day}
              onChange={(e) => { setWeek_day(e.target.value)}}
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
              ]}
            />
            <Input
              type="time"
              name="time"
              label="Hora"
              value={time}
              onChange={(e) => { setTime(e.target.value)}}
            />

            <button type="submit">
              Buscar
            </button>

        </form>
      </PageHeader>

      <main>

        {teachers.map((teacher: Teacher ) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}

      </main>

    </div>
  )
}

export default TeacherList
