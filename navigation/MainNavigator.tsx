import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Registro from '../screnn/Registro';
import Login from '../screnn/Login';
import JuegoScreen from '../screnn/JuegoScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Registro" component={Registro} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Juego" component={JuegoScreen} />
    </Drawer.Navigator>
    );
}

export default function MainNav() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    )
}
