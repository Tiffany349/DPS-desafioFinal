import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
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

    if (stockNumero < 0) {
      Alert.alert('Error', 'No se permite stock negativo');
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
      console.log(err.response?.data || err.message);

      Alert.alert(
        'Error',
        err.response?.data?.error || 'No se pudo actualizar'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{detalle.nombre}</Text>
      <Text>Precio: ${detalle.precio}</Text>
      <Text>Stock actual: {detalle.stock}</Text>

      <TextInput
        style={styles.input}
        value={nuevoStock}
        onChangeText={setNuevoStock}
        keyboardType="numeric"
      />

      <Button
        title="Actualizar Stock"
        onPress={actualizarStock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    borderRadius: 8
  }
});