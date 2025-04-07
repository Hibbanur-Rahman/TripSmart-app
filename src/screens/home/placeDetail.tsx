"use client"

import { useState } from "react"
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../../App"
// import { MapPin, Star, ChevronLeft, Bookmark } from "react-native-feather"
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get("window")

const PlaceDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [activeTab, setActiveTab] = useState("About")

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />

      {/* Header Image */}
      <View style={tw`relative`}>
        <Image
          source={require("../../assets/images/raja-ampat-large.png")}
          style={{ width: width, height: width * 0.8 }}
          resizeMode="cover"
        />
        <View style={tw`absolute top-12 left-4`}>
          <TouchableOpacity style={tw`bg-white/20 p-2 rounded-full`} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" width={24} height={24} stroke="white" />
          </TouchableOpacity>
        </View>
        <View style={tw`absolute top-12 right-4`}>
          <TouchableOpacity style={tw`bg-white/20 p-2 rounded-full`}>
            <Feather name="bookmark" width={24} height={24} stroke="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={tw`bg-white rounded-t-3xl -mt-6 pt-6 px-5 flex-1`}>
        <View style={tw`mb-4`}>
          <Text style={tw`text-[#121212] text-2xl font-bold`}>Raja Ampat Islands</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <Feather name="map-pin" width={16} height={16} stroke="#ee684a" fill="#ee684a" />
            <Text style={tw`text-[#6f7789] ml-1`}>Raja Ampat, Papua Barat</Text>
          </View>
          <View style={tw`flex-row mt-2`}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Feather name="star" key={index} width={18} height={18} fill="#ee684a" stroke="#ee684a" style={tw`mr-1`} />
            ))}
            <Text style={tw`text-[#6f7789] ml-1`}>4.8</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={tw`flex-row border-b border-[#dfdfdf]`}>
          {["About", "Review", "Photo", "Video"].map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => setActiveTab(tab)} style={tw`mr-6 pb-2`}>
              <Text
                style={tw`${
                  activeTab === tab ? "text-[#ee684a] border-b-2 border-[#ee684a]" : "text-[#6f7789]"
                } text-base font-medium pb-1`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={tw`flex-1 mt-4`} showsVerticalScrollIndicator={false}>
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#121212] text-xl font-bold mb-2`}>Description</Text>
            <Text style={tw`text-[#6f7789] leading-5`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu amet tempor, in massa, habitasse habitasse
              fermentum, sed faucibus. Augue arcu, ac proin accumsan urna morbi diam nunc, tincidunt. Ac turpis amet
              vitae dui aliquam vitae nunc. Non enim, lorem duis maecenas odio
              <Text style={tw`text-[#ee684a]`}> Read More</Text>
            </Text>
          </View>
        </ScrollView>

        {/* Save Trip Button */}
        <TouchableOpacity style={tw`bg-[#f36d72] py-4 rounded-full mb-4 items-center`}>
          <Text style={tw`text-white font-bold text-lg`}>Save a Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PlaceDetail

