import { Button, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function JuegoScreen() {

    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [logeado, setLogeado] = useState(false)

    const [puntos, setPuntos] = useState(0)
    const [posicion, setPosicion] = useState({ top: 100, left: 100 })

    function aplastar() {
        setPuntos(puntos + 1)
        const nuevaTop = Math.floor(Math.random() * 400) + 50
        const nuevaLeft = Math.floor(Math.random() * 250) + 20
        setPosicion({ top: nuevaTop, left: nuevaLeft })
    }

    function login() {
        if (usuario === usuario && password ===password ) {
            setLogeado(true)
        } else {
            Alert.alert("Error", "usuario o contraseña incorrectos")
        }
    }

    if (logeado) {
        return (
            <View style={styles.containerJuego}>
                <Text style={styles.puntosText}>Bugs Aplastados: {puntos}</Text>
                {/* El Insecto */}
                <TouchableOpacity
                    onPress={aplastar}
                    style={[styles.insecto, { top: posicion.top, left: posicion.left }]}
                >
                    <Text style={{ fontSize: 50 }}>🪳</Text>
                </TouchableOpacity>

                <View style={styles.botonSalir}>
                    <Button title="Cerrar Juego" onPress={() => setLogeado(false)} color="red" />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>BUG SMASHER</Text>
            <TextInput
                placeholder='Usuario'
                style={styles.input}
                onChangeText={(t) => setUsuario(t)}
                value={usuario}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                onChangeText={(t) => setPassword(t)}
                value={password}
                secureTextEntry
            />
            <Button title='Entrar a Jugar' onPress={login} color="#4CAF50" />
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
    containerJuego: {
        flex: 1,
        backgroundColor: '#2e7d32',
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    puntosText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginTop: 50,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 18,
        backgroundColor: "#fff",
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
    },
    insecto: {
        position: 'absolute',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonSalir: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '80%',
    }
})