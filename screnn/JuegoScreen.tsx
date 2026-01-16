import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default function JuegoScreen({ navigation }: any) {
    
    // Estados del juego
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10); // 10 segundos de juego
    const [juegoActivo, setJuegoActivo] = useState(true);
    const [posicion, setPosicion] = useState({ top: 100, left: 100 });

    // 1. TEMPORIZADOR (Requisito del PDF)
    useEffect(() => {
        if (tiempo > 0 && juegoActivo) {
            const temporizador = setTimeout(() => {
                setTiempo(tiempo - 1);
            }, 1000);
            return () => clearTimeout(temporizador);
        } else if (tiempo === 0 && juegoActivo) {
            terminarJuego();
        }
    }, [tiempo, juegoActivo]);

    // Función para mover el bicho
    function aplastar() {
        if (juegoActivo) {
            setPuntos(puntos + 1);
            // Mover insecto aleatoriamente
            const nuevaTop = Math.floor(Math.random() * 500) + 50;
            const nuevaLeft = Math.floor(Math.random() * 300) + 20;
            setPosicion({ top: nuevaTop, left: nuevaLeft });
        }
    }

    // 2. GUARDAR EN FIREBASE (Requisito del PDF)
    const terminarJuego = async () => {
        setJuegoActivo(false);
        try {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const userRef = doc(db, "usuarios", uid);
                
                // Opcional: Solo guardar si es el puntaje más alto (opcional)
                // Por ahora guardamos el último puntaje jugado
                await updateDoc(userRef, {
                    puntos: puntos
                });
                
                Alert.alert("¡Tiempo Fuera!", `Hiciste ${puntos} puntos. ¡Guardados en la nube!`);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo guardar el puntaje");
        }
    };

    const reiniciar = () => {
        setPuntos(0);
        setTiempo(10);
        setJuegoActivo(true);
    };

    const cerrarSesion = () => {
        auth.signOut();
        navigation.replace('Login');
    };

    return (
        <View style={styles.containerJuego}>
            <Text style={styles.titulo}>BUG SMASHER</Text>
            
            <View style={styles.marcador}>
                <Text style={styles.textoInfo}>⏳ Tiempo: {tiempo}s</Text>
                <Text style={styles.textoInfo}>🎯 Puntos: {puntos}</Text>
            </View>

            {juegoActivo ? (
                <TouchableOpacity
                    onPress={aplastar}
                    style={[styles.insecto, { top: posicion.top, left: posicion.left }]}
                >
                    <Text style={{ fontSize: 50 }}>🪳</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.gameOver}>
                    <Text style={styles.finTexto}>GAME OVER</Text>
                    <Button title="Jugar de nuevo" onPress={reiniciar} color="#4CAF50" />
                </View>
            )}

            <View style={styles.botonSalir}>
                <Button title="Cerrar Sesión" onPress={cerrarSesion} color="red" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerJuego: {
        flex: 1,
        backgroundColor: '#2e7d32', // Verde oscuro (pasto)
        paddingTop: 50
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20
    },
    marcador: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10
    },
    textoInfo: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    insecto: {
        position: 'absolute',
        padding: 10,
    },
    gameOver: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    finTexto: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    botonSalir: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: '80%',
    }
});