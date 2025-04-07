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
  Image,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {handleIsAuthenticated} from '../redux/slices/auth/authSlice';
import LoginImg from '../assets/images/login.svg';
import API_URL from '../../environmentVariables';
const Login = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    // Basic validation
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('access_token', response.data.data.token);
        dispatch(handleIsAuthenticated({isAuthenticated: true}));
        navigation.navigate('Layout');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken) {
        navigation.navigate('Layout');
      }
    };
    checkToken();
  }, []);

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
            <View style={tw`items-center mb-8 mt-[-100px]`}>
              <LoginImg
                width={400}
                height={300}
                style={[tw`relative left-[60px]`]}
              />
              <Text style={tw`text-3xl font-bold text-gray-900 mt-[-100px]`}>
                Welcome Back
              </Text>
              <Text style={tw`text-lg text-gray-600 mt-2`}>
                Sign in to continue your journey
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

            {/* Email Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2 font-medium`}>
                Email Address
              </Text>
              <View
                style={[
                  tw`border rounded-xl px-4 flex-row items-center`,
                  emailError
                    ? tw`border-red-500 bg-red-50`
                    : tw`border-gray-300 bg-gray-50`,
                ]}>
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
                <MaterialIcons name="email" size={20} color="#6b7280" />
              </View>
              {emailError && (
                <Text style={tw`text-red-500 mt-1 text-sm`}>{emailError}</Text>
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

            {/* Remember Me & Forgot Password */}
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <TouchableOpacity
                onPress={() => setIsRememberMe(!isRememberMe)}
                style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-5 h-5 rounded-md border mr-2 flex items-center justify-center`,
                    isRememberMe
                      ? tw`bg-indigo-600 border-indigo-600`
                      : tw`border-gray-400`,
                  ]}>
                  {isRememberMe && (
                    <MaterialIcons name="check" size={16} color="white" />
                  )}
                </View>
                <Text style={tw`text-gray-700`}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={tw`text-[#FF3951] font-medium`}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              style={tw`bg-[#FF3951] rounded-xl py-4 flex-row justify-center items-center shadow-lg`}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={20}
                    color="white"
                    style={tw`ml-2`}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={tw`flex-row justify-center mt-4`}>
              <Text style={tw`text-gray-600`}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={tw`text-[#FF3951] font-bold`}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
