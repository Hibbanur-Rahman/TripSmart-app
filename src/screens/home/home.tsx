'use client';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../../App';
import {useSelector} from 'react-redux';

import Feather from 'react-native-vector-icons/Feather';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  //handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    setToken(storedToken);
  };

  //fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const tabs = ['All', 'Popular', 'Neraby', 'Recomended'];

  return (
    <SafeAreaView style={tw`h-full bg-[#f6f6f6]`}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      <View style={tw`px-5 pt-4 flex-row justify-between items-center`}>
        <TouchableOpacity>
          <Image
            style={tw`w-6 h-6`}
            source={require('../../assets/images/menu.png')}
          />
        </TouchableOpacity>
        <Text style={tw`text-[#6f7789] text-xl font-medium`}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={require('../../assets/images/profile-img.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false}>
        <View style={tw`mt-6`}>
          <Text style={tw`text-[#121212] text-3xl font-bold`}>
            Wonderful Indonesia
          </Text>
          <Text style={tw`text-[#6f7789] text-lg mt-1`}>
            Let's Explore Together
          </Text>
        </View>

        {/* Tabs */}
        <View style={tw`flex-row mt-6`}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(tab)}
              style={tw`mr-5`}>
              <Text
                style={tw`${
                  activeTab === tab
                    ? 'text-[#ee684a] border-b-2 border-[#ee684a]'
                    : 'text-[#6f7789]'
                } text-base font-medium pb-1`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Destination Cards */}
        <View style={tw`flex-row mt-6`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`w-full`}>
            {/* Card 1 */}
            <TouchableOpacity
              style={tw`mr-4 bg-white rounded-2xl overflow-hidden shadow-sm w-60`}
              onPress={() => navigation.navigate('PlaceDetail')}>
              <Image
                style={tw`w-full h-40`}
                source={require('../../assets/images/place-img-1.png')}
                resizeMode="cover"
              />
              <View style={tw`p-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-[#121212] text-lg font-semibold`}>
                    Ranu Kumbolo
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather
                      name='star'
                      width={14}
                      height={14}
                      fill="#ee684a"
                      stroke="#ee684a"
                    />
                    <Text style={tw`text-[#6f7789] text-sm ml-1`}>4.8</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name='map-pin' width={14} height={14} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-sm ml-1`}>
                    Lumajang, Jawa timur
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity
              style={tw`mr-4 bg-white rounded-2xl overflow-hidden shadow-sm w-60`}>
              <Image
                style={tw`w-full h-40`}
                source={require('../../assets/images/place-img-2.png')}
                resizeMode="cover"
              />
              <View style={tw`p-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-[#121212] text-lg font-semibold`}>
                    Ijen Crater
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather name='star'
                      width={14}
                      height={14}
                      fill="#ee684a"
                      stroke="#ee684a"
                    />
                    <Text style={tw`text-[#6f7789] text-sm ml-1`}>4.8</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name='map-pin' width={14} height={14} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-sm ml-1`}>
                    Banyuwangi, Jawa timur
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Top Place Section */}
        <View style={tw`mt-8 flex-row justify-between items-center`}>
          <Text style={tw`text-[#121212] text-xl font-bold`}>Top Place</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#6f7789]`}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Top Place Cards */}
        <View style={tw`mt-4`}>
          <TouchableOpacity
            style={tw`flex-row bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}>
            <Image
              style={tw`w-20 h-20 rounded-xl m-2`}
              source={require('../../assets/images/mount-bromo.png')}
              resizeMode="cover"
            />
            <View style={tw`flex-1 justify-center p-2`}>
              <Text style={tw`text-[#121212] text-lg font-semibold`}>
                Mount Bromo
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Feather name='map-pin' width={14} height={14} stroke="#6f7789" />
                <Text style={tw`text-[#6f7789] text-sm ml-1`}>Jawa timur</Text>
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Feather name='star' width={14} height={14} fill="#ee684a" stroke="#ee684a" />
                <Text style={tw`text-[#6f7789] text-sm ml-1`}>4.8</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}>
            <Image
              style={tw`w-20 h-20 rounded-xl m-2`}
              source={require('../../assets/images/mount-rinjani.png')}
              resizeMode="cover"
            />
            <View style={tw`flex-1 justify-center p-2`}>
              <Text style={tw`text-[#121212] text-lg font-semibold`}>
                Mount Rinjani
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Feather name='map-pin' width={14} height={14} stroke="#6f7789" />
                <Text style={tw`text-[#6f7789] text-sm ml-1`}>Lombok</Text>
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Feather name='star' width={14} height={14} fill="#ee684a" stroke="#ee684a" />
                <Text style={tw`text-[#6f7789] text-sm ml-1`}>4.7</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
