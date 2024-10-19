import {
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
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box';

import LoginImg from '../assets/images/login.svg';
import {useEffect, useState} from 'react';
import axios from 'axios';
import API_URL from '../../environmentVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';


const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState<String | null>(null);

  const handleRegister = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        userName:fullName,
        mobileNumber:phoneNumber,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoader(false);
        console.log(response.data);
        await AsyncStorage.setItem('access_token', response.data.data.token);
        navigation.navigate('Home');
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
    if (token) {
      navigation.navigate('Home');
    }
  });
  return (
    <SafeAreaView style={[tw`flex-1 bg-white`]}>
      <ScrollView
        contentContainerStyle={[tw`flex-grow`]}
        showsVerticalScrollIndicator={false}>
        <View style={[tw`w-full  flex  relative `]}>
          <View
            style={[tw`flex flex-row w-full justify-center items-center mt-5`]}>
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
              Get Started
            </Text>
            <Text style={[tw`text-[#252525] text-lg text-black `]}>
              by creating a free account
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
                placeholder="Full name"
                placeholderTextColor="rgba(0,0,0,0.5)"
                autoCapitalize="none"
                value={fullName}
                onChangeText={setFullName}
              />
              <Feather
                name="user"
                style={[
                  tw` text-[rgba(0,0,0,0.5)] absolute right-[15px] top-[10px]`,
                ]}
                size={30}
              />
            </View>
            <View
              style={[
                tw`relative w-full my-2 flex items-center justify-center`,
              ]}>
              <TextInput
                style={[
                  tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgba(196,196,196,0.2)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
                ]}
                placeholder="Valid email"
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
                tw`relative w-full my-2 flex items-center justify-center`,
              ]}>
              <TextInput
                style={[
                  tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgba(196,196,196,0.2)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
                ]}
                placeholder="Phone number"
                placeholderTextColor="rgba(0,0,0,0.5)"
                autoCapitalize="none"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <Ionicons
                name="phone-portrait-outline"
                style={[
                  tw` text-[rgba(0,0,0,0.5)] absolute right-[10px] top-[15px]`,
                ]}
                size={30}
              />
            </View>
            <View
              style={[
                tw`relative w-full mt-2 flex items-center justify-center`,
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
        </View>
        <View style={tw`flex-row items-center px-5 my-4`}>
          <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            style={tw`mr-2`}
          />
          <Text style={tw`text-sm text-black`}>
            By checking this box, you agree to our{' '}
            <Text style={tw`text-red-500`}>Terms</Text> and{' '}
            <Text style={tw`text-red-500`}>Conditions</Text>
          </Text>
        </View>

        <View style={[tw`px-5 w-full mt-7`]}>
          {loader ? (
            <TouchableOpacity
              style={[
                tw`w-full py-4 rounded-xl bg-[#FF3951] flex justify-center items-center`,
              ]}>
              <Text style={[tw`text-white text-xl`]}>Signuping........</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleRegister}
              style={[
                tw`w-full py-4 rounded-xl bg-[#FF3951] flex justify-center items-center`,
              ]}>
              <Text style={[tw`text-white text-xl`]}>Signup</Text>
            </TouchableOpacity>
          )}

          <Text style={[tw`text-[#252525] text-lg text-center my-2`]}>
            Already a Member? <Text style={[tw`text-[#FF3951]`]} onPress={()=>navigation.navigate('Login')}>Log In</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
