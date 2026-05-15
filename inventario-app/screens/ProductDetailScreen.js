

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params;

  const [detalle, setDetalle] = useState(producto);
  const [nuevoStock, setNuevoStock] = useState(producto.stock.toString());

  const actualizarStock = async () => {
    const stockNumero = parseInt(nuevoStock);

    if (isNaN(stockNumero)) {
      Alert.alert('Error', 'Ingrese un número válido');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.put(
        `http://192.168.0.18:3000/productos/${detalle.id}`,
        {
          stock: stockNumero
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDetalle(res.data);
      setNuevoStock(res.data.stock.toString());

      Alert.alert('Éxito', 'Stock actualizado');

    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>{detalle.nombre}</Text>

        <Text style={styles.info}>
          Precio: ${detalle.precio}
        </Text>

        <Text style={styles.stock}>
          Stock actual: {detalle.stock}
        </Text>

        <TextInput
          style={styles.input}
          value={nuevoStock}
          onChangeText={setNuevoStock}
          keyboardType="numeric"
          placeholder="Nuevo stock"
          placeholderTextColor="#94A3B8"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={actualizarStock}
        >
          <Text style={styles.buttonText}>Actualizar Stock</Text>
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
    padding: 20
  },

  card: {
    backgroundColor: '#3C2A21',
    padding: 25,
    borderRadius: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFB703',
    marginBottom: 20,
    textAlign: 'center'
  },

  info: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10
  },

  stock: {
    color: '#FFB703',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
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
    fontWeight: 'bold',
    fontSize: 18
  }
});