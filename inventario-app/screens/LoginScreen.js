
import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  //Estados para uardar las credenciales 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Función principar del login 
  const handleLogin = async () => {
    try {
      //Petición POST al servidor
                  //Guardar token
      const res = await axios.post('http://192.168.0.18:3000/login', {
        email,
        password
      });

      await AsyncStorage.setItem('token', res.data.token);

      Alert.alert('Éxito', 'Login exitoso');
      //Navegar al inventario
      navigation.navigate('ProductList');

          //Manejo de errores
    } catch (err) {
      console.log('ERROR LOGIN:', err.response?.data || err.message);
      Alert.alert('Error', 'Credenciales inválidas');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>Inventario App</Text>
        <Text style={styles.subtitle}>Inicia sesión</Text>
//capturamos
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A120B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  card: {
    width: '100%',
    backgroundColor: '#3C2A21',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFB703',
    textAlign: 'center',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 18,
    color: '#FFF3E2',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#5C3D2E',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16
  },

  button: {
    backgroundColor: '#E76F51',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});