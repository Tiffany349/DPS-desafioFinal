import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import axios from 'axios';

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params;

  const [detalle, setDetalle] = useState(producto);
  const [nuevoStock, setNuevoStock] = useState(String(producto.stock));

  const actualizarStock = async () => {
    const stockNumero = Number(nuevoStock);

    if (isNaN(stockNumero)) {
      Alert.alert('Error', 'Ingresa un número válido');
      return;
    }

    try {
      const res = await axios.put(
        `http://192.168.0.18:3000/productos/${detalle.id}`,
        {
          stock: stockNumero
        }
      );

      setDetalle(res.data);

      Alert.alert('Éxito', 'Stock actualizado correctamente');

    } catch (err) {
      console.log('ERROR ACTUALIZAR:', err.response?.data || err.message);

      Alert.alert(
        'Error',
        'No se pudo actualizar el stock'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{detalle.nombre}</Text>

      <Text style={styles.texto}>
        Precio: ${detalle.precio}
      </Text>

      <Text style={styles.texto}>
        Stock actual: {detalle.stock}
      </Text>

      <TextInput
        style={styles.input}
        value={nuevoStock}
        onChangeText={setNuevoStock}
        keyboardType="numeric"
        placeholder="Nuevo stock"
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
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  texto: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20
  }
});