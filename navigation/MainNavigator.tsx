import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importaciones de tus pantallas
import Login from '../screnn/Login';
import Registro from '../screnn/Registro';
import JuegoScreen from '../screnn/JuegoScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            {/* screenOptions={{ headerShown: false }} oculta la barra de arriba para que se vea pantalla completa */}
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="Juego" component={JuegoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}