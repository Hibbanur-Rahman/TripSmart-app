"use client"

import { useState } from "react"
import { SafeAreaView, ScrollView, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../App"
// import { MapPin, Star, Search as SearchIcon } from "react-nat"
import Feather from 'react-native-vector-icons/Feather';

const Search = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [searchText, setSearchText] = useState("")

  const categories = [
    {
      name: "Mount",
      image: require("../../assets/images/mount-category.jpg"),
    },
    {
      name: "Beach",
      image: require("../../assets/images/beach-category.jpg"),
    },
    {
      name: "Crater",
      image: require("../../assets/images/crater-category.jpg"),
    },
    {
      name: "Waterfall",
      image: require("../../assets/images/waterfall-category.jpg"),
    },
  ]

  return (
    <SafeAreaView style={tw`h-full bg-[#f6f6f6]`}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      <View style={tw`px-5 pt-4 flex-row justify-between items-center`}>
        <TouchableOpacity>
          <Image style={tw`w-6 h-6`} source={require("../../assets/images/menu.png")} />
        </TouchableOpacity>
        <Text style={tw`text-[#6f7789] text-xl font-medium`}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Image style={tw`h-10 w-10 rounded-full`} source={require("../../assets/images/profile-img.png")} />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={tw`mt-6`}>
          <View style={tw`flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm`}>
            <Feather name="search" width={20} height={20} stroke="#6f7789" />
            <TextInput
              style={tw`flex-1 ml-2 text-[#121212]`}
              placeholder="Search"
              placeholderTextColor="#6f7789"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-[#121212] text-xl font-bold mb-4`}>Category</Text>
          <View style={tw`flex-row justify-between`}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={tw`items-center`}>
                <View style={tw`w-16 h-16 rounded-full overflow-hidden`}>
                  <Image source={category.image} style={tw`w-full h-full`} resizeMode="cover" />
                </View>
                <Text style={tw`text-[#121212] mt-2`}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommend */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-[#121212] text-xl font-bold mb-4`}>Recommend</Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {/* Card 1 */}
            <TouchableOpacity
              style={tw`w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}
              onPress={() => navigation.navigate("PlaceDetail")}
            >
              <Image style={tw`w-full h-32`} source={require("../../assets/images/raja-ampat.jpg")} resizeMode="cover" />
              <View style={tw`p-3`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-[#121212] text-base font-semibold`}>Raja Ampat Islands</Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather name='star' width={12} height={12} fill="#ee684a" stroke="#ee684a" />
                    <Text style={tw`text-[#6f7789] text-xs ml-1`}>4.8</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather  name='map-pin' width={12} height={12} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-xs ml-1`}>Raja Ampat, Papua Barat</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity style={tw`w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}>
              <Image style={tw`w-full h-32`} source={require("../../assets/images/ijen-crater.jpg")} resizeMode="cover" />
              <View style={tw`p-3`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-[#121212] text-base font-semibold`}>Ijen Crater</Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather name='star' width={12} height={12} fill="#ee684a" stroke="#ee684a" />
                    <Text style={tw`text-[#6f7789] text-xs ml-1`}>4.8</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name='map-pin' width={12} height={12} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-xs ml-1`}>Banyuwangi, Jawa timur</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 3 */}
            <TouchableOpacity style={tw`w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}>
              <Image style={tw`w-full h-32`} source={require("../../assets/images/borobudur.jpg")} resizeMode="cover" />
              <View style={tw`p-3`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-[#121212] text-base font-semibold`}>Borobudur</Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather name='star' width={12} height={12} fill="#ee684a" stroke="#ee684a" />
                    <Text style={tw`text-[#6f7789] text-xs ml-1`}>4.7</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name='map-pin' width={12} height={12} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-xs ml-1`}>Magelang, Jawa Tengah</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 4 */}
            <TouchableOpacity style={tw`w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm mb-4`}>
              <Image style={tw`w-full h-32`} source={require("../../assets/images/bali-beach.jpg")} resizeMode="cover" />
              <View style={tw`p-3`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-[#121212] text-base font-semibold`}>Kuta Beach</Text>
                  <View style={tw`flex-row items-center`}>
                    <Feather name='star' width={12} height={12} fill="#ee684a" stroke="#ee684a" />
                    <Text style={tw`text-[#6f7789] text-xs ml-1`}>4.6</Text>
                  </View>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Feather name='map-pin' width={12} height={12} stroke="#6f7789" />
                  <Text style={tw`text-[#6f7789] text-xs ml-1`}>Kuta, Bali</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={tw`flex-row justify-around items-center bg-black py-4 rounded-t-3xl`}>
        <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate("Home")}>
          <Image style={tw`w-6 h-6`} source={require("../../assets/images/home-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Image style={tw`w-6 h-6`} source={require("../../assets/images/location-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Image style={tw`w-6 h-6`} source={require("../../assets/images/chat-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`items-center`}>
          <Image style={tw`w-6 h-6`} source={require("../../assets/images/profile-icon.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Search

