import { StyleSheet,View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  return (
    <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />  
      <Text>Loading</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Loading