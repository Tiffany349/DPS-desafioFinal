import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <Text>Solicitando permiso...</Text>;
  }

  if (!permission.granted) {
    return <Text>Permiso denegado</Text>;
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('QR leído:', data);
      if (!isNaN(data)) {
        const res = await axios.get(
          `http://192.168.0.18:3000/productos/${data}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        navigation.navigate('ProductDetail', {
          producto: res.data
        });

      } else {
        let producto;

        try {
        producto = JSON.parse(data.trim());
        } catch {
          Alert.alert('Error', 'QR inválido');
          setScanned(false);
          return;
        }

        await axios.post(
          'http://192.168.0.18:3000/productos',
          producto,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        Alert.alert('Éxito', 'Producto agregado');
        navigation.navigate('ProductList');
      }

    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.error || 'No se pudo procesar el QR'
      );
    }

    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ['qr']
      }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    />
  );
}