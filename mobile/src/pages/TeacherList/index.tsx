import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, ScrollView, TextInput, Text } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

//Styles
import styles from './styles'

//Components
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

//Services
import api from '../../services/api'

function TeacherList() {

  const [ isFilterVisible, setIsFiltersVisible ] = useState(false)
  const [ favorites, setFavorites ] = useState<number[]>([])
  const [ teachers, setTeachers ] = useState([])
  
  //Filters
  const [ subject, setSubject ] = useState('')
  const [ week_day, setWeek_day ] = useState('')
  const [ time, setTime ] = useState('')

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if(res) {

        const favoritedTeachers = JSON.parse(res)

        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }
  
  function handleToggleFilters() {
    setIsFiltersVisible(!isFilterVisible)
  }
  
  async function handleFiltersSubmit() {
    loadFavorites()

    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    
    setIsFiltersVisible(false)
    setTeachers(res.data)    
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  )

  return (
    <View style={styles.container}>

      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )}
      >

        { isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#c1bccc"
              placeholder="Qual a matéria"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>

              <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da Semana</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#c1bccc"
                    placeholder="Qual o dia"
                    value={week_day}
                    onChangeText={text => setWeek_day(text)}
                  />
              </View>
              
              <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#c1bccc"
                    placeholder="Qual horário"
                    value={time}
                    onChangeText={text => setTime(text)}
                  />
              </View>

            </View>

            <RectButton 
              style={styles.submitButton} 
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
        )}


      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList