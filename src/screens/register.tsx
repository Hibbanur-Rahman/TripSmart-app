import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import LoginImg from '../assets/images/login.svg';
import API_URL from '../../environmentVariables';

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  // Error states
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/;
    return re.test(phone);
  };

  const handleRegister = async () => {
    setError(null);
    setFullNameError(null);
    setEmailError(null);
    setPhoneError(null);
    setPasswordError(null);
    setTermsError(null);

    // Basic validation
    let isValid = true;

    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!phoneNumber) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isChecked) {
      setTermsError('You must accept the terms and conditions');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        userName: fullName,
        mobileNumber: phoneNumber,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('access_token', response.data.data.token);
        navigation.navigate('Layout');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}>
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center`}
          keyboardShouldPersistTaps="handled">
          <View style={tw`px-8 py-6`}>
            {/* Header */}
            <View style={tw`items-center mb-8 `}>
              <LoginImg
                width={400}
                height={300}
                style={[tw`relative left-[60px]`]}
              />
              <Text style={tw`text-3xl font-bold text-gray-900 mt-[-100px]`}>
                Create Account
              </Text>
              <Text style={tw`text-lg text-gray-600 mt-2`}>
                Join us to start your journey
              </Text>
            </View>

            {/* Error Message */}
            {error && (
              <View
                style={tw`bg-red-100 p-3 rounded-lg mb-4 flex-row items-center`}>
                <MaterialIcons name="error-outline" size={20} color="#dc2626" />
                <Text style={tw`text-red-700 ml-2`}>{error}</Text>
              </View>
            )}

            {/* Full Name Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Full Name</Text>
              <View
                style={[
                  tw`border rounded-xl px-4 flex-row items-center`,
                  fullNameError
                    ? tw`border-red-500 bg-red-50`
                    : tw`border-gray-300 bg-gray-50`,
                ]}>
                <Feather
                  name="user"
                  size={20}
                  color={fullNameError ? '#ef4444' : '#6b7280'}
                  style={tw`mr-2`}
                />
                <TextInput
                  style={tw`flex-1 py-3 text-lg text-gray-900`}
                  placeholder="John Doe"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={text => {
                    setFullName(text);
                    if (fullNameError) setFullNameError(null);
                  }}
                />
              </View>
              {fullNameError && (
                <Text style={tw`text-red-500 mt-1 text-sm`}>{fullNameError}</Text>
              )}
            </View>

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Email Address</Text>
              <View
                style={[
                  tw`border rounded-xl px-4 flex-row items-center`,
                  emailError
                    ? tw`border-red-500 bg-red-50`
                    : tw`border-gray-300 bg-gray-50`,
                ]}>
                <EvilIcons
                  name="envelope"
                  size={24}
                  color={emailError ? '#ef4444' : '#6b7280'}
                  style={tw`mr-1`}
                />
                <TextInput
                  style={tw`flex-1 py-3 text-lg text-gray-900`}
                  placeholder="your@email.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (emailError) setEmailError(null);
                  }}
                />
              </View>
              {emailError && (
                <Text style={tw`text-red-500 mt-1 text-sm`}>{emailError}</Text>
              )}
            </View>

            {/* Phone Number Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Phone Number</Text>
              <View
                style={[
                  tw`border rounded-xl px-4 flex-row items-center`,
                  phoneError
                    ? tw`border-red-500 bg-red-50`
                    : tw`border-gray-300 bg-gray-50`,
                ]}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={phoneError ? '#ef4444' : '#6b7280'}
                  style={tw`mr-2`}
                />
                <TextInput
                  style={tw`flex-1 py-3 text-lg text-gray-900`}
                  placeholder="+1234567890"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={text => {
                    setPhoneNumber(text);
                    if (phoneError) setPhoneError(null);
                  }}
                />
              </View>
              {phoneError && (
                <Text style={tw`text-red-500 mt-1 text-sm`}>{phoneError}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>Password</Text>
              <View
                style={[
                  tw`border rounded-xl px-4 flex-row items-center`,
                  passwordError
                    ? tw`border-red-500 bg-red-50`
                    : tw`border-gray-300 bg-gray-50`,
                ]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={passwordError ? '#ef4444' : '#6b7280'}
                  style={tw`mr-2`}
                />
                <TextInput
                  style={tw`flex-1 py-3 text-lg text-gray-900`}
                  placeholder="••••••••"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (passwordError) setPasswordError(null);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons
                    name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
              {passwordError && (
                <Text style={tw`text-red-500 mt-1 text-sm`}>
                  {passwordError}
                </Text>
              )}
            </View>

            {/* Terms Checkbox */}
            <View style={tw`flex-row items-center mb-6`}>
              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-5 h-5 rounded-md border mr-2 flex items-center justify-center`,
                    isChecked
                      ? tw`bg-indigo-600 border-indigo-600`
                      : tw`border-gray-400`,
                  ]}>
                  {isChecked && (
                    <MaterialIcons name="check" size={16} color="white" />
                  )}
                </View>
                <Text style={tw`text-gray-700`}>
                  I agree to the{' '}
                  <Text style={tw`text-[#FF3951]`}>Terms</Text> and{' '}
                  <Text style={tw`text-[#FF3951]`}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>
            {termsError && (
              <Text style={tw`text-red-500 mt-[-16px] mb-4 text-sm`}>
                {termsError}
              </Text>
            )}

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              style={tw`bg-[#FF3951] rounded-xl py-4 flex-row justify-center items-center shadow-lg`}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={tw`text-white font-bold text-lg`}>Sign Up</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={20}
                    color="white"
                    style={tw`ml-2`}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={tw`flex-row justify-center mt-4`}>
              <Text style={tw`text-gray-600`}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={tw`text-[#FF3951] font-bold`}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;