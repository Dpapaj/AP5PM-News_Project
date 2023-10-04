import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsOverview from '../Screens/NewsOverview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Home from '../Screens/Home';
import Saved from '../Screens/Saved';
import { Entypo,MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Maps from '../Screens/Maps';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen options={{tabBarIcon(props){
                return <Entypo name="home" size={24} color="black" />
            },}} name="Home" component={Home} />
            <Tab.Screen options={{tabBarIcon(props){
                return <MaterialIcons name="favorite" size={24} color="black" />
            },}} name="Saved" component={Saved} />
            <Tab.Screen options={{tabBarIcon(props){
                return <FontAwesome name="map" size={24} color="black" />
            },}} name="Maps" component={Maps} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return ( 
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="NewsOverview" component={NewsOverview}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}