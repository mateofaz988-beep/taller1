import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screnn/LoginScreen';
import RegistroScreen from '../screnn/RegistroScreen';
import JuegoScreen from '../screnn/JuegoScreen';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
    return (
        
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="Registro" component={RegistroScreen} />
                <Drawer.Screen name="Juego" component={JuegoScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}