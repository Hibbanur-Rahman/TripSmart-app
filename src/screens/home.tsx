import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
const Home = () => {
  return (
    <SafeAreaView style={tw`h-full pt-4 px-4 bg-white`}>
      <ScrollView
        style={tw`h-full w-full bg-white`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between items-center`}>
          <View>
            <Text
              style={[
                tw`text-[#2F2F2F] text-4xl font-semibold`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              Hi, Hibban 👋
            </Text>
            <Text
              style={[
                tw`text-gray-600 text-2xl font-regular`,
                {fontFamily: 'Poppins-SemiBold'},
              ]}>
              Explore the world
            </Text>
          </View>
          <View>
            <Image
              style={tw`h-[60px] w-[60px] rounded-full border`}
              source={require('../assets/images/profile-img.png')}
            />
          </View>
        </View>
        <View style={tw`w-full mt-8`}>
          <TextInput
            style={tw`w-full py-3 px-4 bg-white rounded-2xl border-[1px] border-[#D2D2D2] text-lg`}
            placeholder="Search places"
            placeholderTextColor="#726e80"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={tw`mt-4 flex flex-row justify-between items-center`}>
          <Text
            style={[
              tw`font-semibold text-black text-2xl`,
              {fontFamily: 'Poppins-Bold'},
            ]}>
            Popular places
          </Text>
          <Text style={[tw`text-lg text-gray-500`]}>View All</Text>
        </View>
        <ScrollView
          style={[tw`w-full  mt-6`]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={[tw` rounded-2xl  bg-[#2F2F2F] px-6 py-3 `]}>
            <Text style={[tw`text-white text-base`]}>Most Viewed</Text>
          </View>
          <View
            style={[
              tw` rounded-2xl mx-1 border-[1px] border-[#D2D2D2] bg-[#fff] px-6 py-3 `,
            ]}>
            <Text style={[tw`text-gray-600 text-base`]}>Nearby</Text>
          </View>
          <View
            style={[
              tw` rounded-2xl mx-1 border-[1px] border-[#D2D2D2]  bg-[#fff] px-6 py-3 `,
            ]}>
            <Text style={[tw`text-gray-600 text-base`]}>Latest</Text>
          </View>
          <View
            style={[
              tw` rounded-2xl mx-1 border-[1px] border-[#D2D2D2]  bg-[#fff] px-6 py-3 `,
            ]}>
            <Text style={[tw`text-gray-600 text-base`]}>Nearby</Text>
          </View>
          <View
            style={[
              tw` rounded-2xl mx-1 border-[1px] border-[#D2D2D2]  bg-[#fff] px-6 py-3 `,
            ]}>
            <Text style={[tw`text-gray-600 text-base`]}>Latest</Text>
          </View>
        </ScrollView>
        <ScrollView
          style={[tw`w-full flex flex-row mt-8`]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={[tw`w-[250px] flex flex-row justify-center relative`]}>
            <Image
              style={[tw`rounded-3xl w-[250px]`]}
              source={require('../assets/images/place-img-1.png')}
            />
            <View
              style={[
                tw`absolute bottom-[20px] bg-[rgba(29,29,29,0.8)] w-11/12 rounded-xl m-auto px-3 py-2`,
              ]}>
              <View style={[tw`flex flex-row items-center`]}>
                <Text style={[tw`text-white text-lg font-medium`]}>
                  Mount Fuji,
                </Text>
                <Text style={[tw`text-white text-base`]}> Tokyo</Text>
              </View>
              <View style={[tw`flex flex-row justify-between `]}>
                <View style={[tw`flex flex-row`]}>
                  <Text style={[tw`text-base text-[#CAC8C8]`]}>
                    Tokyo, Japan
                  </Text>
                </View>
                <View style={[tw`flex flex-row`]}>
                  <Text style={[tw`text-base text-[#CAC8C8]`]}>4.8</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[tw`w-[250px] flex flex-row justify-center relative mx-3`]}>
            <Image
              style={[tw`rounded-3xl w-[250px]`]}
              source={require('../assets/images/place-img-2.png')}
            />
            <View
              style={[
                tw`absolute bottom-[20px] bg-[rgba(29,29,29,0.8)] w-11/12 rounded-xl m-auto px-3 py-2`,
              ]}>
              <View style={[tw`flex flex-row items-center`]}>
                <Text style={[tw`text-white text-lg font-medium`]}>
                  London,
                </Text>
                <Text style={[tw`text-white text-base`]}> Tokyo</Text>
              </View>
              <View style={[tw`flex flex-row justify-between `]}>
                <View style={[tw`flex flex-row`]}>
                  <Text style={[tw`text-base text-[#CAC8C8]`]}>
                    Tokyo, England
                  </Text>
                </View>
                <View style={[tw`flex flex-row`]}>
                  <Text style={[tw`text-base text-[#CAC8C8]`]}>4.8</Text>
                </View>
              </View>
            </View>
          
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
