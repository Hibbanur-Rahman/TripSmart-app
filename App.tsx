import React, {useEffect, useState} from 'react';
import './global.css';
import {enableScreens} from 'react-native-screens';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home/home';
import Account from './src/screens/account';
import Trip from './src/screens/trip';
import Login from './src/screens/login';
import Register from './src/screens/register';
import StartScreen from './src/screens/startScreen';
import tw from 'twrnc'; // Tailwind styles
import BottomNavbar from './src/components/bottomNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {handleIsAuthenticated} from './src/redux/slices/auth/authSlice';
import Layout from './src/layout/appLayout';
import PlaceDetail from './src/screens/home/placeDetail';

// Define the types for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  Trip: undefined;
  Login: undefined;
  Register: undefined;
  StartScreen: undefined;
  Layout: undefined;
  PlaceDetail: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const [authInitialRouteName, setAuthInitialRouteName] = useState<
    keyof RootStackParamList | undefined
  >(undefined);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  // Handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    if (storedToken) {
      dispatch(handleIsAuthenticated({isAuthenticated: true}));
      setAuthInitialRouteName('Layout'); // If token is present, navigate to Home
    } else {
      dispatch(handleIsAuthenticated({isAuthenticated: false}));
      setAuthInitialRouteName('StartScreen'); // Otherwise, show StartScreen
    }
  };

  // Fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
  }, []);
  // Fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
  }, [isAuthenticated]);

  // Sync with Redux isAuthenticated state to adjust navigation dynamically
  useEffect(() => {
    if (isAuthenticated) {
      setAuthInitialRouteName('Layout');
    } else {
      setAuthInitialRouteName('StartScreen');
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        {authInitialRouteName && (
          <Stack.Navigator initialRouteName={authInitialRouteName}>
            <Stack.Screen
              name="Layout"
              component={Layout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Trip"
              component={Trip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PlaceDetail"
              component={PlaceDetail}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Add styles here if needed later
});

export default App;
