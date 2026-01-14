import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen() {
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")

    function login() {
        console.log("--- INTENTO DE LOGIN ---");
        console.log("Usuario ingresado: " + usuario);
        console.log("Password ingresado: " + password);

        // Validación básica manual
        if (usuario === "admin" && password === "123") {
            Alert.alert("Bienvenido", "Acceso correcto");
        } else {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
        }
    }

    function limpiar() {
        setUsuario("");
        setPassword("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>MI JUEGO</Text>

            <TextInput
                placeholder='Nombre de usuario'
                style={styles.input}
                onChangeText={(texto) => setUsuario(texto)}
                value={usuario}
            />

            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                onChangeText={(texto) => setPassword(texto)}
                value={password}
                secureTextEntry={true}
            />

            <View style={styles.buttonContainer}>
                <Button title='Iniciar Sesión' onPress={login} color="#4CAF50" />
                <View style={{ marginVertical: 10 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        fontSize: 18,
        backgroundColor: "#fff",
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        marginTop: 20,
    }
})