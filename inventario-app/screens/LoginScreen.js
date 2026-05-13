import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.0.18:3000/login', {
        email,
        password
      });

      Alert.alert('Éxito', res.data.message);
      navigation.navigate('ProductList');

    } catch (err) {
      console.log('ERROR LOGIN:', err.response?.data || err.message);

      Alert.alert(
        'Error',
        err.response?.data?.error || 'Servidor no accesible'
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10
        }}
      />

      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}