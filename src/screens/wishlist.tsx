import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import {
  Heart,
  Search,
  MapPin,
  Calendar,
  Star,
  Trash2,
  Plus,
} from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HyderabadImg from '../assets/images/hyderabad.png';
import LucknowImg from '../assets/images/lucknow.png';
import PatnaImg from '../assets/images/patna.png';
const Wishlist = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Beach', 'Mountain', 'City', 'Countryside'];

  const wishlistItems = [
    {
      id: 1,
      name: 'Hyderabad, Telangana',
      image: HyderabadImg,
      category: 'Monument',
      rating: 4.9,
      savedDate: 'Saved 2 weeks ago',
      notes: 'Visit the blue domes and watch sunset at Oia',
    },
    {
      id: 2,
      name: 'Lucknow, U.P',
      image: LucknowImg,
      category: 'City',
      rating: 4.7,
      savedDate: 'Saved 1 month ago',
      notes: 'See cherry blossoms in spring, visit temples',
    },
    {
      id: 3,
      name: 'Patna, Bihar',
      image: PatnaImg,
      category: 'Towering',
      rating: 4.8,
      savedDate: 'Saved 3 days ago',
      notes: 'Hiking in summer, skiing in winter',
    },
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? wishlistItems
      : wishlistItems.filter(item => item.category === selectedCategory);

  const searchFilteredItems =
    searchText.length > 0
      ? filteredItems.filter(
          item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.notes.toLowerCase().includes(searchText.toLowerCase()),
        )
      : filteredItems;

  const WishlistCard = ({item}) => (
    <View style={tw`bg-white rounded-xl shadow-md mb-4 overflow-hidden`}>
      <View style={tw`relative`}>
        {/* Placeholder for image - in real app use actual image */}
        <Image source={item?.image} style={tw`h-48 w-full bg-gray-200`} />

        {/* Category tag */}
        <View
          style={tw`absolute top-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded-full`}>
          <Text style={tw`text-blue-600 font-medium text-xs`}>
            {item.category}
          </Text>
        </View>

        {/* Delete button */}
        <TouchableOpacity
          style={tw`absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm`}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-start`}>
          <Text style={tw`text-lg font-bold text-gray-800 flex-1`}>
            {item.name}
          </Text>
          <View style={tw`flex-row items-center`}>
            <Star size={16} color="#FBBF24" style={tw`mr-1`} />
            <Text style={tw`text-gray-700`}>{item.rating}</Text>
          </View>
        </View>

        <View style={tw`flex-row items-center mt-2`}>
          <MapPin size={14} color="#6B7280" style={tw`mr-1`} />
          <Text style={tw`text-gray-500 text-xs`}>{item.name}</Text>
        </View>

        <Text style={tw`text-gray-500 text-xs mt-1`}>{item.savedDate}</Text>

        {item.notes && (
          <View style={tw`mt-3 bg-gray-50 p-3 rounded-lg`}>
            <Text style={tw`text-gray-600 text-sm`}>{item.notes}</Text>
          </View>
        )}

        <View style={tw`flex-row mt-4`}>
          <TouchableOpacity
            style={tw`flex-1 mr-2 py-2 border border-blue-500 rounded-lg flex-row justify-center items-center`}>
            <Icon
              name="date-range"
              size={16}
              color="#3B82F6"
              style={tw`mr-1`}
            />
            <Text style={tw`text-blue-500 font-medium`}>Plan Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-1 ml-2 py-2 bg-blue-500 rounded-lg flex-row justify-center items-center`}>
            <Icon name="flight" size={16} color="white" style={tw`mr-1`} />
            <Text style={tw`text-white font-medium`}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Header */}
      <View style={tw`pt-12 pb-4 px-4 bg-white shadow-sm`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>My Wishlist</Text>
          <View style={tw`flex-row`}>
            <TouchableOpacity style={tw`p-2 bg-blue-50 rounded-full mr-2`}>
              <Icon name="sort" size={22} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-2 bg-blue-500 rounded-full`}>
              <Plus size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar */}
        <View style={tw`relative mb-2`}>
          <View style={tw`absolute left-3 top-2.5 z-10`}>
            <Search size={18} color="#9CA3AF" />
          </View>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={"#000"}
            placeholder="Search your dream destinations"
            style={tw`bg-gray-100 pl-10 pr-4 py-2 rounded-xl text-black`}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mt-2`}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={tw`mr-2 px-4 py-1.5 rounded-full ${
                selectedCategory === category ? 'bg-blue-500' : 'bg-gray-100'
              }`}>
              <Text
                style={tw`font-medium ${
                  selectedCategory === category ? 'text-white' : 'text-gray-700'
                }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Wishlist Items */}
      <ScrollView style={tw`flex-1 p-4`}>
        {searchFilteredItems.length > 0 ? (
          searchFilteredItems.map(item => (
            <WishlistCard key={item.id} item={item} />
          ))
        ) : (
          <View style={tw`items-center justify-center p-8 mt-12`}>
            <Heart size={64} color="#D1D5DB" />
            <Text style={tw`text-gray-500 text-lg text-center mt-4`}>
              No destinations in this category yet
            </Text>
            <TouchableOpacity
              style={tw`mt-4 bg-blue-500 py-2 px-6 rounded-lg flex-row items-center`}>
              <Plus size={18} color="white" style={tw`mr-1`} />
              <Text style={tw`text-white font-medium`}>Add Destination</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Additional spacing at bottom */}
        <View style={tw`h-6`} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;
