import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
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
      console.log('QR leído:', data);

      // Si es un número → buscar producto
      if (!isNaN(data)) {
        const res = await axios.get(
          `http://192.168.0.18:3000/productos/${data}`
        );

        navigation.navigate('ProductDetail', {
          producto: res.data
        });

      } else {
        let producto;

        try {
          producto = JSON.parse(data);
        } catch {
          Alert.alert(
            'QR inválido',
            'El código no contiene un producto válido'
          );
          setScanned(false);
          return;
        }

        await axios.post(
          'http://192.168.0.18:3000/productos',
          producto
        );

        Alert.alert('Éxito', 'Producto agregado');

        navigation.navigate('ProductList');
      }

    } catch (err) {
      console.log('ERROR QR:', err.response?.data || err.message);

      Alert.alert(
        'Error',
        'No se pudo procesar el QR'
      );
    }

    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      onBarcodeScanned={
        scanned ? undefined : handleBarCodeScanned
      }
    />
  );
}