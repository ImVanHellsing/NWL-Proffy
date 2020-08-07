import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

//Pages
import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'

//StudyTabsRouter
import StudyTabs from './StudyTabs'

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={ Landing }/>
        <Screen name="StudyTabs" component={ StudyTabs }/>
        <Screen name="GiveClasses" component={ GiveClasses }/>
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack