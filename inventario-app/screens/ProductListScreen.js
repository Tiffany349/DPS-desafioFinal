
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ProductListScreen({ navigation }) {
  //Estado de productos 
  const [productos, setProductos] = useState([]);

  //Función caga productos
  const cargarProductos = async () => {
    try {

      //obtener token 
      const token = await AsyncStorage.getItem('token');

      //solicitud get
      const res = await axios.get(
        'http://192.168.0.18:3000/productos',
        {
          //Adjuntar token
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      //Guardar

      setProductos(res.data);

    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar productos');
    }
  };

    //cargar...........

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetail', { producto: item })
      }
    >
      <Text style={styles.name}>{item.nombre}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Stock:</Text>
        <Text style={styles.stock}>{item.stock}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.price}>${item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Inventario</Text>

      <TouchableOpacity
        style={styles.qrButton}
        onPress={() => navigation.navigate('QRScanner')}
      >
        <Text style={styles.qrButtonText}>Escanear QR</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A120B',
    padding: 20
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFB703',
    marginBottom: 20,
    textAlign: 'center'
  },

  qrButton: {
    backgroundColor: '#E76F51',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20
  },

  qrButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  card: {
    backgroundColor: '#3C2A21',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 5
  },

  label: {
    color: '#FFD6A5',
    fontSize: 16,
    marginRight: 10
  },

  stock: {
    color: '#FFB703',
    fontWeight: 'bold',
    fontSize: 16
  },

  price: {
    color: '#FFD166',
    fontWeight: 'bold',
    fontSize: 16
  }
});