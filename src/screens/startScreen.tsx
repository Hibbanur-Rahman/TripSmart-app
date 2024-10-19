import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
import {useState} from 'react';

const StartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [slideActive, setSlideActive] = useState(1);
  const handleSlideActive = () => {
    if (slideActive >= 3) {
      navigation.navigate('Login');
      setSlideActive(1);
    }
    setSlideActive(slideActive + 1);
  };
  return (
    <SafeAreaView style={[tw`h-full w-full`]}>
      <ScrollView
        style={[tw`h-full w-full`]}
        showsVerticalScrollIndicator={false}>
        {/**======= slide 1 ======= */}
        <View style={[tw`flex items-center justify-center h-full w-full px-5`]}>
          {slideActive === 1 && <SlideImg1 height={400} style={[tw`w-full`]} />}
          {slideActive === 2 && <SlideImg2 height={400} style={[tw`w-full`]} />}
          {slideActive === 3 && <SlideImg3 height={400} style={[tw`w-full`]} />}

          <View style={[tw`w-full`]}>
            <Text style={[tw`text-black text-5xl  font-bold`]}>
              {slideActive === 1 && 'Explore the world easily'}
              {slideActive === 2 && 'Reach the unknown spot'}
              {slideActive === 3 && 'Make connects with TripSmart'}
            </Text>
            <Text style={[tw`text-[#929292] text-3xl`]}>
              {slideActive === 1 && 'To your desire'}
              {slideActive === 2 && 'To your destination'}
              {slideActive === 3 && 'To your dram trip'}
            </Text>
          </View>
          <View
            style={[
              tw`flex flex-row  justify-between items-center gap-[5px] w-full mt-[70px]`,
            ]}>
            <View style={[tw`flex flex-row gap-[5px] `]}>
              <TouchableOpacity
                onPress={() => setSlideActive(1)}
                style={[
                  tw`w-[30px] h-[10px] rounded-xl ${
                    slideActive == 1 ? 'bg-[#FF3951]' : 'bg-[#FFB6B6]'
                  }`,
                ]}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSlideActive(2)}
                style={[
                  tw`w-[30px] h-[10px] rounded-xl ${
                    slideActive == 2 ? 'bg-[#FF3951]' : 'bg-[#FFB6B6]'
                  }`,
                ]}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSlideActive(3)}
                style={[
                  tw`w-[30px] h-[10px] rounded-xl ${
                    slideActive == 3 ? 'bg-[#FF3951]' : 'bg-[#FFB6B6]'
                  }`,
                ]}></TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleSlideActive()}
              style={[
                tw`bg-black h-[50px] w-[50px] rounded-full flex items-center justify-center`,
              ]}>
              <MaterialIcons name="navigate-next" color={'#fff'} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StartScreen;
