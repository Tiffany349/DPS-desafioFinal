import React, { useState, useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function QRScannerScreen({ navigation }) {
  //permisos de camara
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  //solicitar permiso
  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <Text>Solicitando permiso...</Text>;
  }

  if (!permission.granted) {
    return <Text>Permiso denegado</Text>;
  }
  //funcion principal
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('QR leído:', data);
      //numero
      if (!isNaN(data)) { //buscar produ
        const res = await axios.get(
          `http://192.168.0.18:3000/productos/${data}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        //navegar al detalle
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
        //registramos producto
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
    //camara
    <CameraView
      style={{ flex: 1 }}
      //configuración qr
      barcodeScannerSettings={{
        barcodeTypes: ['qr']
      }}
      //evento      sbe
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    />
  );

  

return (
  <View style={{ flex: 1, backgroundColor: '#000' }}>

    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ['qr']
      }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    />

    <View style={styles.overlay}>
      <Text style={styles.scanText}>
        Escanea un código QR
      </Text>
    </View>

  </View>
);

const styles = {
  overlay: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center'
  },

  scanText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 15
  }
}};