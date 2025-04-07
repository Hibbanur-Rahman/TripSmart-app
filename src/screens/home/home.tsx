import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import tw from 'twrnc';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../../App';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('All');
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  // Handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    setToken(storedToken);
  };

  // Fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const tabs = ['All', 'Popular', 'Nearby', 'Recommended'];

  // Featured locations data
  const featuredLocations = [
    {
      id: 1,
      name: 'Taj Mahal',
      location: 'Agra, Uttar Pradesh',
      rating: 4.9,
      image: require('../../assets/images/taj-mahal.png'),
    },
    {
      id: 2,
      name: 'Varanasi Ghats',
      location: 'Varanasi, Uttar Pradesh',
      rating: 4.8,
      image: require('../../assets/images/varanasi.png'),
    },
    {
      id: 3,
      name: 'Jaipur Palace',
      location: 'Jaipur, Rajasthan',
      rating: 4.7,
      image: require('../../assets/images/jaipur.png'), 
    },
  ];

  // Top places data
  const topPlaces = [
    {
      id: 1,
      name: 'Dal Lake',
      location: 'Srinagar, Kashmir',
      rating: 4.8,
      image: require('../../assets/images/mount-bromo.png'), 
    },
    {
      id: 2,
      name: 'Golden Temple',
      location: 'Amritsar, Punjab',
      rating: 4.9,
      image: require('../../assets/images/mount-rinjani.png'), 
    },
    {
      id: 3,
      name: 'Goa Beaches',
      location: 'Goa',
      rating: 4.7,
      image: require('../../assets/images/mount-bromo.png'), 
    },
  ];

  return (
    <SafeAreaView style={tw`h-full bg-[#f8f9fa]`}>
      <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
      
      {/* Header section with search bar */}
      <View style={tw`px-5 pt-4 pb-2`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity style={tw`p-2 bg-white rounded-full shadow-sm`}>
            <Feather name="menu" size={22} color="#484848" />
          </TouchableOpacity>
          
          <Text style={tw`text-[#2d3748] text-xl font-bold`}>Incredible India</Text>
          
          <TouchableOpacity 
            style={tw`p-0.5 border-2 border-[#e53e3e] rounded-full`}
            onPress={() => navigation.navigate('Account')}>
            <Image
              style={tw`h-9 w-9 rounded-full`}
              source={require('../../assets/images/profile-img.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          style={tw`mt-4 flex-row items-center bg-white p-3 rounded-xl shadow-sm`}
          onPress={() => navigation.navigate('Search')}>
          <Feather name="search" size={20} color="#6B7280" />
          <Text style={tw`ml-2 text-[#6B7280]`}>Search destinations...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={tw`px-5 py-4`}>
          <Text style={tw`text-[#1a202c] text-3xl font-bold`}>
            Incredible India
          </Text>
          <Text style={tw`text-[#4a5568] text-lg`}>
            Discover the wonders of India
          </Text>
        </View>

        {/* Tabs */}
        <View style={tw`px-5`}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`pb-2`}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(tab)}
                style={tw`mr-6 py-2 ${
                  activeTab === tab ? 'border-b-2 border-[#e53e3e]' : ''
                }`}>
                <Text
                  style={tw`${
                    activeTab === tab
                      ? 'text-[#e53e3e] font-bold'
                      : 'text-[#4a5568]'
                  } text-base`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Destinations */}
        <View style={tw`mt-2`}>
          <View style={tw`px-5 flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-[#1a202c] text-xl font-bold`}>Featured</Text>
            <TouchableOpacity>
              <Text style={tw`text-[#e53e3e]`}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`pl-5`}>
            {featuredLocations.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={tw`mr-4 bg-white rounded-2xl overflow-hidden shadow-md w-64`}
                onPress={() => navigation.navigate('PlaceDetail', {id: item.id})}>
                <ImageBackground
                  style={tw`w-full h-44`}
                  source={item.image}
                  resizeMode="cover">
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={tw`absolute bottom-0 left-0 right-0 h-20 justify-end p-3`}>
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-white text-lg font-bold`}>
                        {item.name}
                      </Text>
                      <View style={tw`flex-row items-center bg-white/30 px-2 py-1 rounded-full`}>
                        <Feather name="star" size={14} color="#FFD700" />
                        <Text style={tw`text-white text-sm ml-1`}>{item.rating}</Text>
                      </View>
                    </View>
                    <View style={tw`flex-row items-center mt-1`}>
                      <Feather name="map-pin" size={12} color="#ffffff" />
                      <Text style={tw`text-white text-xs ml-1`}>
                        {item.location}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={tw`mt-6 px-5`}>
          <Text style={tw`text-[#1a202c] text-xl font-bold mb-3`}>Categories</Text>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity style={tw`items-center`}>
              <View style={tw`bg-[#feebc8] w-16 h-16 rounded-full items-center justify-center mb-1`}>
                <Feather name="sunrise" size={24} color="#dd6b20" />
              </View>
              <Text style={tw`text-[#4a5568] text-xs`}>Beaches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <View style={tw`bg-[#e9d8fd] w-16 h-16 rounded-full items-center justify-center mb-1`}>
                <Feather name="map" size={24} color="#6b46c1" />
              </View>
              <Text style={tw`text-[#4a5568] text-xs`}>Heritage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <View style={tw`bg-[#c6f6d5] w-16 h-16 rounded-full items-center justify-center mb-1`}>
                <Feather name="coffee" size={24} color="#38a169" />
              </View>
              <Text style={tw`text-[#4a5568] text-xs`}>Cuisine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`items-center`}>
              <View style={tw`bg-[#bee3f8] w-16 h-16 rounded-full items-center justify-center mb-1`}>
                <Feather name="compass" size={24} color="#3182ce" />
              </View>
              <Text style={tw`text-[#4a5568] text-xs`}>Adventure</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Places Section */}
        <View style={tw`mt-6 px-5`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-[#1a202c] text-xl font-bold`}>Top Places</Text>
            <TouchableOpacity>
              <Text style={tw`text-[#e53e3e]`}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Top Place Cards */}
          {topPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={tw`flex-row bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}
              onPress={() => navigation.navigate('PlaceDetail', {id: place.id})}>
              <Image
                style={tw`w-24 h-24 rounded-l-2xl`}
                source={place.image}
                resizeMode="cover"
              />
              <View style={tw`flex-1 justify-center p-3`}>
                <Text style={tw`text-[#1a202c] text-lg font-bold`}>
                  {place.name}
                </Text>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name="map-pin" size={14} color="#4a5568" />
                  <Text style={tw`text-[#4a5568] text-sm ml-1`}>{place.location}</Text>
                </View>
                <View style={tw`flex-row justify-between items-center mt-2`}>
                  <View style={tw`flex-row items-center`}>
                    <Feather name="star" size={14} color="#F59E0B" />
                    <Text style={tw`text-[#4a5568] text-sm ml-1`}>{place.rating}</Text>
                  </View>
                  <TouchableOpacity style={tw`bg-[#e53e3e] px-3 py-1 rounded-full`}>
                    <Text style={tw`text-white text-xs font-medium`}>Explore</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Offers */}
        <View style={tw`mt-2 px-5 pb-8`}>
          <Text style={tw`text-[#1a202c] text-xl font-bold mb-3`}>Special Offers</Text>
          <TouchableOpacity style={tw`bg-white rounded-2xl overflow-hidden shadow-md`}>
            <ImageBackground
              style={tw`w-full h-48`}
              source={require('../../assets/images/place-img-1.png')} // Replace with offer image
              resizeMode="cover">
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.2)']}
                style={tw`absolute inset-0 p-4 justify-between`}>
                <View style={tw`bg-[#e53e3e] self-start px-3 py-1 rounded-full`}>
                  <Text style={tw`text-white text-xs font-bold`}>LIMITED TIME</Text>
                </View>
                <View>
                  <Text style={tw`text-white text-xl font-bold`}>Kashmir Holiday Package</Text>
                  <Text style={tw`text-white text-sm mb-2`}>7 days, 6 nights | All inclusive</Text>
                  <TouchableOpacity style={tw`bg-white px-4 py-2 rounded-full self-start`}>
                    <Text style={tw`text-[#e53e3e] font-bold`}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;