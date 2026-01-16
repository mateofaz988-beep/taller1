import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const iniciarSesion = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Si funciona, entra al juego
            navigation.replace('Juego'); 
        } catch (error: any) {
            Alert.alert("Error de acceso", "Correo o contraseña incorrectos");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Iniciar Sesión</Text>
            
            <TextInput placeholder="Correo" style={styles.input} keyboardType="email-address" onChangeText={setEmail} value={email} autoCapitalize="none" />
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />

            <Button title="Entrar" onPress={iniciarSesion} color="#4CAF50" />
            
            <View style={{ marginTop: 20 }}>
                <Button title="Crear Cuenta" onPress={() => navigation.navigate('Registro')} color="gray" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#dcedc8' },
    titulo: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#2e7d32' },
    input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 }
});