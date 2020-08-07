import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { View, ImageBackground, Text } from 'react-native'

//Styles
import styles from './styles'

//Assets/Icons
import giveClassesBackgroundImg from '../../assets/images/give-classes-background.png'

function GiveClasses() {

  const { goBack } = useNavigation()

  function handleNavigateBack() {
    goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.content} 
        source={giveClassesBackgroundImg}
        resizeMode="contain"
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web. 
        </Text>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses