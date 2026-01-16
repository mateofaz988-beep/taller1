import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default function JuegoScreen({ navigation }: any) {
    
    const [puntos, setPuntos] = useState(0);
    const [tiempo, setTiempo] = useState(10);
    const [juegoActivo, setJuegoActivo] = useState(true);
    const [posicion, setPosicion] = useState({ top: 100, left: 100 });

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

    function aplastar() {
        if (juegoActivo) {
            setPuntos(puntos + 1);
            const nuevaTop = Math.floor(Math.random() * 500) + 50;
            const nuevaLeft = Math.floor(Math.random() * 300) + 20;
            setPosicion({ top: nuevaTop, left: nuevaLeft });
        }
    }

    const terminarJuego = async () => {
        setJuegoActivo(false);
        try {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const userRef = doc(db, "usuarios", uid);
                await updateDoc(userRef, {
                    puntos: puntos
                });
                // AQUÍ ESTABA EL ERROR: Se agregaron las comillas invertidas (`)
                Alert.alert("TIEMPO AGOTADO", `Has recolectado ${puntos} almas.`);
            }
        } catch (error) {
            Alert.alert("ERROR", "No se pudo registrar tu hazaña.");
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            <View style={styles.header}>
                <Text style={styles.titulo}>CAMPOS DE BATALLA</Text>
                <View style={styles.marcadorContainer}>
                    <View style={styles.marcadorBox}>
                        <Text style={styles.label}>TIEMPO</Text>
                        <Text style={styles.valor}>{tiempo}s</Text>
                    </View>
                    <View style={styles.marcadorBox}>
                        <Text style={styles.label}>ALMAS</Text>
                        <Text style={styles.valor}>{puntos}</Text>
                    </View>
                </View>
            </View>

            {juegoActivo ? (
                <TouchableOpacity
                    onPress={aplastar}
                    activeOpacity={0.8}
                    style={[styles.insecto, { top: posicion.top, left: posicion.left }]}
                >
                    <View style={styles.enemigoVisual}>
                        <Text style={{ fontSize: 40 }}>👺</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.finTexto}>FIN DEL JUEGO</Text>
                    <TouchableOpacity style={styles.botonReinicio} onPress={reiniciar}>
                        <Text style={styles.textoBoton}>LUCHAR DE NUEVO</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
                <Text style={styles.textoBotonSalir}>ABANDONAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f13',
        paddingTop: 40,
        borderWidth: 5,
        borderColor: '#2a2a2a',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d4af37',
        letterSpacing: 3,
        marginBottom: 15,
        textShadowColor: '#b22222',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    marcadorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    marcadorBox: {
        backgroundColor: '#1c1c1c',
        padding: 10,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#3a3a3a',
        alignItems: 'center',
        minWidth: 100,
    },
    label: {
        color: '#a0a0a0',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    valor: {
        color: '#f0f0f0',
        fontSize: 24,
        fontWeight: 'bold',
    },
    insecto: {
        position: 'absolute',
        padding: 10,
    },
    enemigoVisual: {
        shadowColor: "#ff0000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    gameOverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    finTexto: {
        fontSize: 40,
        color: '#8b0000',
        fontWeight: 'bold',
        letterSpacing: 4,
        marginBottom: 30,
        textShadowColor: '#fff',
        textShadowRadius: 2,
    },
    botonReinicio: {
        backgroundColor: '#2e7d32',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderWidth: 2,
        borderColor: '#1b5e20',
        borderRadius: 2,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 2,
    },
    botonSalir: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#8b0000',
        paddingBottom: 5,
    },
    textoBotonSalir: {
        color: '#8b0000',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 2,
    }
});