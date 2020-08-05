import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

//Services
import api from '../../services/api'

//Styles
import './styles.css'

//Assets/Icons
import warningIcon from '../../assets/images/icons/warning.svg'

//Components
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import PageHeader from '../../components/PageHeader'

function TeacherForm() {

  const history = useHistory()

  //User data
  const [ bio, setBio ] = useState('')
  const [ name, setName ] = useState('')
  const [ avatar, setAvatar ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')

  //Class data
  const [ cost, setCost ] = useState('')
  const [ subject, setSubject ] = useState('')

  //Schedule data
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post('/classes',{
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })

    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems
    });
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value}
      }

      return scheduleItem
    })

    console.log(updatedScheduleItems);

    setScheduleItems(updatedScheduleItems)
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário."
      />
      <main>

        <form onSubmit={handleCreateClass}>

          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value)}}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value)}}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value)}}
            />
            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value)}}
            />

          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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

            <Input
              label="Custo da sua hora/aula"
              name="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value)}}
            />

          </fieldset>

          <fieldset>

            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>


            {scheduleItems.map((item, index) => {
              return (
                <div className="schedule-item" key={item.week_day}>
                  <Select
                    label="Dia da semana"
                    name="week_day"
                    value={item.week_day}
                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                    name="from"
                    label="Das"
                    type="time"
                    value={item.from}
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={item.to}
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              )
            })}

          </fieldset>

          <footer>

            <p>
              <img src={ warningIcon } alt="Aviso importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>

          </footer>

        </form>

      </main>

    </div>
  )
}

export default TeacherForm
