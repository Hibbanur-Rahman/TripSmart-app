import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

const Account = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={[tw`text-black`]}>Account</Text>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={[
          tw`w-full py-4 rounded-xl bg-[#FF3951] flex justify-center items-center`,
        ]}>
        <Text style={[tw`text-white text-xl`]}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;
