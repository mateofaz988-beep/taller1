import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import LoginScreen from '../screnn/Login';



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Guardar" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="save" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Leer" component={LoginScreen} />
      
    </Tab.Navigator>
  );
}

export default function MainNav() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}