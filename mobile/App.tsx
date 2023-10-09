import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [pound, setPound] = useState('');

  return (
    <View style={styles.container}>
      <Text>Weight Converter</Text>
      <Text>Pounds: </Text>
      <TextInput
        keyboardType='numeric'
        placeholder='Enter a number'
        value={pound}
        onChangeText={(e)=> setPound(e)}
      />
      <Text>Your weight in kg is:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
