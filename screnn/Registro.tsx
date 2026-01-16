import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Registro({ navigation }: any) {
    const [nick, setNick] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registrarUsuario = async () => {
        if (nick === '' || edad === '' || email === '' || password === '') {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }

        try {
           
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            
            await setDoc(doc(db, "usuarios", uid), {
                nick: nick,
                edad: edad,
                email: email,
                puntos: 0 
            });

            Alert.alert("¡Éxito!", "Usuario registrado correctamente");
            navigation.navigate('Login');

        } catch (error: any) {
            Alert.alert("Error en registro", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Crear Cuenta</Text>
            
            <TextInput placeholder="Nick (Apodo)" style={styles.input} onChangeText={setNick} value={nick} />
            <TextInput placeholder="Edad" style={styles.input} keyboardType="numeric" onChangeText={setEdad} value={edad} />
            <TextInput placeholder="Correo Electrónico" style={styles.input} keyboardType="email-address" onChangeText={setEmail} value={email} autoCapitalize="none" />
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />

            <Button title="Registrarse" onPress={registrarUsuario} color="#2196F3" />
            
            <View style={{ marginTop: 20 }}>
                <Button title="Ya tengo cuenta (Login)" onPress={() => navigation.navigate('Login')} color="gray" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    titulo: { fontSize: 30, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 }
});