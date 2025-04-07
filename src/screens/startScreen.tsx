import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

import SlideImg1 from '../assets/images/start-screen-1.svg';
import SlideImg2 from '../assets/images/start-screen-2.svg';
import SlideImg3 from '../assets/images/start-screen-3.svg';
import {useEffect, useState, useRef} from 'react';

const {width} = Dimensions.get('window');

const StartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [slideActive, setSlideActive] = useState(1);
  const [token, setToken] = useState<String | null>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSlideActive = () => {
    if (slideActive >= 3) {
      navigation.navigate('Login');
      setSlideActive(1);
      return;
    }
    
    // Animate transition
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSlideActive(slideActive + 1);
      slideAnim.setValue(width);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleDotPress = (index: number) => {
    if (index !== slideActive) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      setSlideActive(index);
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
      navigation.navigate('Home')
    }
    
    // Initial animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  },[]);

  const slides = [
    {
      id: 1,
      image: <SlideImg1 height={400} style={[tw`w-full`]} />,
      title: 'Explore the world easily',
      subtitle: 'To your desire',
    },
    {
      id: 2,
      image: <SlideImg2 height={400} style={[tw`w-full`]} />,
      title: 'Reach the unknown spot',
      subtitle: 'To your destination',
    },
    {
      id: 3,
      image: <SlideImg3 height={400} style={[tw`w-full`]} />,
      title: 'Make connects with TripSmart',
      subtitle: 'To your dream trip',
    },
  ];

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`]}>
      <View style={[tw`flex-1 justify-center px-8`]}>
        {/* Animated Slide Content */}
        <Animated.View 
          style={[
            tw`flex-1 justify-center`, 
            { 
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }] 
            }
          ]}
        >
          <View style={[tw`items-center mb-12`]}>
            {slides[slideActive - 1].image}
          </View>
          
          <View style={[tw`mb-8`]}>
            <Text style={[tw`text-4xl font-bold text-gray-900 mb-2 leading-tight`]}>
              {slides[slideActive - 1].title}
            </Text>
            <Text style={[tw`text-xl text-gray-500`]}>
              {slides[slideActive - 1].subtitle}
            </Text>
          </View>
        </Animated.View>

        {/* Navigation Controls */}
        <View style={[tw`flex-row justify-between items-center mb-12`]}>
          {/* Dots Indicator */}
          <View style={[tw`flex-row gap-2`]}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDotPress(index + 1)}
                style={[
                  tw`w-4 h-2 rounded-full`,
                  slideActive === index + 1 ? tw`bg-[#FF3951] w-6` : tw`bg-[#FFB6B6]`,
                ]}
              />
            ))}
          </View>
          
          {/* Next Button */}
          <TouchableOpacity
            onPress={handleSlideActive}
            style={[
              tw`bg-black h-14 w-14 rounded-full items-center justify-center`,
              { elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 }
            ]}
          >
            <MaterialIcons 
              name={slideActive === 3 ? "check" : "navigate-next"} 
              color={'#fff'} 
              size={32} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Skip Button (only shown on first two slides) */}
        {slideActive < 3 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[tw`self-center mb-8`]}
          >
            <Text style={[tw`text-gray-500 text-lg font-medium`]}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;