import React, { useState, useCallback } from 'react';
import {
  View,
 Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ProductListScreen({ navigation }) {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(
        'http://192.168.0.18:3000/productos',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProductos(res.data);

    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar productos');
      console.log(err.response?.data || err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('ProductDetail', { producto: item })
      }
    >
      <Text style={styles.name}>{item.nombre}</Text>
      <Text>Stock: {item.stock}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Escanear QR"
        onPress={() => navigation.navigate('QRScanner')}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});