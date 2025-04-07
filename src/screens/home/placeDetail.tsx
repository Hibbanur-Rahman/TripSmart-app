'use client';

import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../../App';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const PlaceDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('About');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Dummy data for the selected place
  const placeData = {
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    rating: 4.9,
    reviews: 2354,
    price: '₹1,500',
    description:
      'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.',
    features: [
      'UNESCO Heritage Site',
      'Open 6 AM - 6:30 PM',
      'Closed on Fridays',
      'Photography Allowed',
    ],
    photos: [
      require('../../assets/images/taj-mahal.png'),
      require('../../assets/images/raja-ampat-large.png'),
      require('../../assets/images/place-img-1.png'),
      require('../../assets/images/place-img-2.png'),
    ],
    nearbyPlaces: [
      {
        id: 1,
        name: 'Agra Fort',
        image: require('../../assets/images/place-img-1.png'),
        distance: '3.5 km',
      },
      {
        id: 2,
        name: 'Fatehpur Sikri',
        image: require('../../assets/images/place-img-2.png'),
        distance: '40 km',
      },
    ],
  };

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: require('../../assets/images/profile-img.png'),
      rating: 5,
      date: 'March 15, 2025',
      comment:
        'Absolutely breathtaking! The marble work is incredible and the history behind it makes it even more special.',
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: require('../../assets/images/profile-img.png'),
      rating: 4,
      date: 'February 28, 2025',
      comment:
        'Beautiful architecture and well maintained. Very crowded though, so try to visit early morning.',
    },
  ];

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      {/* <StatusBar backgroundColor="transparent" translucent barStyle="light-content" /> */}

      {/* Header Image with Gradient Overlay */}
      <View style={tw`relative`}>
        <ImageBackground
          source={placeData.photos[0]}
          style={{width: width, height: width * 0.9}}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.4)']}
            style={tw`absolute inset-0`}
          />

          {/* Header Actions */}
          <View
            style={tw`flex-row justify-between items-center px-4 pt-12 pb-4`}>
            <TouchableOpacity
              style={tw`bg-black/30 p-2.5 rounded-full`}
              onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={22} color="white" />
            </TouchableOpacity>

            <View style={tw`flex-row`}>
              <TouchableOpacity
                style={tw`bg-black/30 p-2.5 rounded-full mr-3`}
                onPress={() => setLiked(!liked)}>
                <Feather
                  name={liked ? 'heart' : 'heart'}
                  size={22}
                  color={liked ? '#e53e3e' : 'white'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-black/30 p-2.5 rounded-full`}
                onPress={() => setSaved(!saved)}>
                <Feather
                  name={saved ? 'bookmark' : 'bookmark'}
                  size={22}
                  color={saved ? '#e53e3e' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Content */}
      <View style={tw`bg-white rounded-t-3xl -mt-6 pt-6 px-5 flex-1`}>
        {/* Title and Rating */}
        <View style={tw`mb-4`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-[#1a202c] text-2xl font-bold`}>
                {placeData.name}
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <Feather name="map-pin" size={14} color="#4a5568" />
                <Text style={tw`text-[#4a5568] ml-1.5`}>
                  {placeData.location}
                </Text>
              </View>
            </View>

            <View style={tw`bg-[#fff8f0] px-3 py-1.5 rounded-lg items-center`}>
              <View style={tw`flex-row items-center`}>
                <Feather name="star" size={16} color="#f59e0b" />
                <Text style={tw`text-[#f59e0b] font-bold ml-1`}>
                  {placeData.rating}
                </Text>
              </View>
              <Text style={tw`text-[#4a5568] text-xs`}>
                {placeData.reviews} reviews
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="w-full flex flex-row">
          {['About', 'Photos', 'Reviews', 'Map'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(tab)}
              style={tw`mr-8 pb-3`}>
              <Text
                style={tw`${
                  activeTab === tab
                    ? 'text-[#e53e3e] font-bold'
                    : 'text-[#4a5568]'
                } text-base`}>
                {tab}
              </Text>
              {activeTab === tab && (
                <View
                  style={tw`absolute bottom-0 left-0 right-0 h-0.5 bg-[#e53e3e] rounded-full`}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          style={tw`flex-1 mt-4`}
          showsVerticalScrollIndicator={false}>
          {activeTab === 'About' && (
            <>
              {/* Description */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-[#1a202c] text-lg font-bold mb-2`}>
                  Description
                </Text>
                <Text style={tw`text-[#4a5568] leading-6`}>
                  {showFullDescription
                    ? placeData.description
                    : placeData.description.slice(0, 150) + '...'}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}>
                  <Text style={tw`text-[#e53e3e] font-medium mt-1`}>
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Features */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-[#1a202c] text-lg font-bold mb-2`}>
                  Features
                </Text>
                <View style={tw`flex-row flex-wrap`}>
                  {placeData.features.map((feature, index) => (
                    <View
                      key={index}
                      style={tw`bg-[#f7fafc] mr-2 mb-2 px-3 py-1.5 rounded-lg`}>
                      <Text style={tw`text-[#4a5568]`}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Nearby Places */}
              <View style={tw`mb-6`}>
                <View style={tw`flex-row justify-between items-center mb-2`}>
                  <Text style={tw`text-[#1a202c] text-lg font-bold`}>
                    Nearby Places
                  </Text>
                  <TouchableOpacity>
                    <Text style={tw`text-[#e53e3e]`}>View All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {placeData.nearbyPlaces.map(place => (
                    <TouchableOpacity
                      key={place.id}
                      style={tw`mr-4 bg-white rounded-xl overflow-hidden shadow-sm w-40`}>
                      <Image
                        source={place.image}
                        style={tw`w-full h-24`}
                        resizeMode="cover"
                      />
                      <View style={tw`p-2`}>
                        <Text style={tw`text-[#1a202c] font-medium`}>
                          {place.name}
                        </Text>
                        <View style={tw`flex-row items-center mt-1`}>
                          <Feather
                            name="navigation"
                            size={12}
                            color="#4a5568"
                          />
                          <Text style={tw`text-[#4a5568] text-xs ml-1`}>
                            {place.distance}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          )}

          {activeTab === 'Photos' && (
            <View style={tw`mb-6`}>
              <Text style={tw`text-[#1a202c] text-lg font-bold mb-2`}>
                Photo Gallery
              </Text>
              <View style={tw`flex-row flex-wrap justify-between`}>
                {placeData.photos.map((photo, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tw`mb-3 rounded-xl overflow-hidden`,
                      {width: (width - 50) / 2},
                    ]}>
                    <Image
                      source={photo}
                      style={{width: '100%', height: 120}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View style={tw`mb-6`}>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-[#1a202c] text-lg font-bold`}>
                  Reviews
                </Text>
                <TouchableOpacity
                  style={tw`bg-[#e53e3e] px-3 py-1 rounded-full`}>
                  <Text style={tw`text-white font-medium`}>Add Review</Text>
                </TouchableOpacity>
              </View>

              {reviews.map(review => (
                <View
                  key={review.id}
                  style={tw`mb-4 pb-4 border-b border-[#e2e8f0]`}>
                  <View style={tw`flex-row items-center mb-2`}>
                    <Image
                      source={review.avatar}
                      style={tw`w-10 h-10 rounded-full`}
                    />
                    <View style={tw`ml-2`}>
                      <Text style={tw`text-[#1a202c] font-medium`}>
                        {review.name}
                      </Text>
                      <Text style={tw`text-[#718096] text-xs`}>
                        {review.date}
                      </Text>
                    </View>
                    <View style={tw`ml-auto flex-row`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Feather
                          key={i}
                          name="star"
                          size={14}
                          color="#f59e0b"
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={tw`text-[#4a5568]`}>{review.comment}</Text>
                </View>
              ))}

              <TouchableOpacity style={tw`items-center py-2`}>
                <Text style={tw`text-[#e53e3e] font-medium`}>
                  View All Reviews
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Map' && (
            <View style={tw`mb-6 items-center justify-center`}>
              <View
                style={tw`bg-[#f7fafc] w-full h-64 rounded-xl items-center justify-center`}>
                <Feather name="map" size={48} color="#a0aec0" />
                <Text style={tw`text-[#4a5568] mt-2`}>Map View</Text>
                <Text style={tw`text-[#718096] text-xs`}>
                  Would display map here
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Book Now Button */}
        <View style={tw`pb-4 pt-2 border-t border-[#e2e8f0]`}>
          <TouchableOpacity
            style={tw`bg-[#e53e3e] py-4 rounded-xl items-center flex-row justify-center`}>
            <Feather name="calendar" size={20} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-bold text-lg`}>Add To Trip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlaceDetail;
