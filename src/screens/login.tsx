import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';

import LoginImg from '../assets/images/login.svg';
import {useEffect, useState} from 'react';
import axios from 'axios';
import API_URL from '../../environmentVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import { useDispatch } from 'react-redux';
import { handleIsAuthenticated } from '../redux/slices/auth/authSlice';
const Login = () => {
  const dispatch=useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<String | null>(null);

  const handleLogin = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoader(false);
        console.log(response.data);
        await AsyncStorage.setItem('access_token', response.data.data.token);
        dispatch(handleIsAuthenticated({isAuthenticated:true}));
        navigation.navigate('Layout');

      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };
  //handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    setToken(storedToken);
  };

  //fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
    if(token){
      navigation.navigate('Layout')
    }
  });
  return (
    <SafeAreaView style={[tw`h-full w-full bg-white`]}>
      <ScrollView style={[tw`h-full w-full bg-white flex `]}>
        <View style={[tw`flex h-full w-full justify-between flex-1`]}>
          <View style={[tw`w-full h-full flex  relative `]}>
            <View
              style={[
                tw`flex flex-row w-full justify-center items-center mt-5`,
              ]}>
              <LoginImg
                width={400}
                height={300}
                style={[tw`relative left-[60px]`]}
              />
            </View>
            <View
              style={[
                tw`w-full flex relative mt-[-135px] mb-[50px] justify-center items-center`,
              ]}>
              <Text style={[tw`text-3xl text-[#252525] font-bold`]}>
                Welcome back
              </Text>
              <Text style={[tw`text-[#252525] text-lg text-black `]}>
                Sign in to access your account
              </Text>
            </View>
            <View style={[tw`w-full flex px-5`]}>
              <View
                style={[
                  tw`relative w-full my-2 flex items-center justify-center`,
                ]}>
                <TextInput
                  style={[
                    tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgba(196,196,196,0.2)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
                  ]}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <EvilIcons
                  name="envelope"
                  style={[
                    tw` text-[rgba(0,0,0,0.5)] absolute right-[10px] top-[10px]`,
                  ]}
                  size={40}
                />
              </View>
              <View
                style={[
                  tw`relative w-full mt-4 flex items-center justify-center`,
                ]}>
                <TextInput
                  style={[
                    tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgba(196,196,196,0.2)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  autoCapitalize="none"
                  secureTextEntry={!isPasswordShow}
                  value={password}
                  onChangeText={setPassword}
                />
                <Ionicons
                  onPress={() => setIsPasswordShow(!isPasswordShow)}
                  name={isPasswordShow ? 'eye-outline' : 'eye-off-outline'}
                  style={[
                    tw` text-[rgba(0,0,0,0.5)] absolute right-[14px] top-[10px]`,
                  ]}
                  size={35}
                />
              </View>
            </View>
            <View style={[tw`w-full flex flex-row justify-between px-5 my-3`]}>
              <View style={[tw`flex flex-row gap-[30px] items-center`]}>
                <CheckBox
                  style={[tw`flex border-[#CBCBCB] p-0 flex-1`]}
                  isChecked={isChecked}
                  leftText={'CheckBox'}
                  onClick={() => setIsChecked(!isChecked)}
                />
                <Text style={[tw`text-[#252525] text-lg`]}>Remember me</Text>
              </View>
              <Text style={[tw`text-[#FF3951] text-lg`]}>Forgot password?</Text>
            </View>
          </View>
          <View style={[tw`px-5 w-full`]}>
            {loader ? (
              <TouchableOpacity
                style={[
                  tw`w-full py-4 rounded-xl bg-[#FF3951] flex justify-center items-center`,
                ]}>
                <ActivityIndicator size={20} color={'#fff'}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={[
                  tw`w-full py-4 rounded-xl bg-[#FF3951] flex justify-center items-center`,
                ]}>
                <Text style={[tw`text-white text-xl`]}>Next</Text>
              </TouchableOpacity>
            )}

            <Text style={[tw`text-[#252525] text-lg text-center my-2`]}>
              New Member? <Text style={[tw`text-[#FF3951]`]} onPress={()=>navigation.navigate('Register')}>Register now</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
