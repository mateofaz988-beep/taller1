<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Registro() {
  return (
    <View>
      <Text>Registro</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
=======
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log("Registrando Gamer:", username);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEW PLAYER</Text>
      <Text style={styles.subtitle}>Crea tu cuenta de jugador</Text>

      <TextInput
        style={styles.input}
        placeholder="Gamer Tag (Usuario)"
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>INICIAR AVENTURA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00f2fe',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1b1b2f',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#7f00ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
>>>>>>> christopher
