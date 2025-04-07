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
import {Calendar, PlusIcon, XIcon, CloudSun, Plane} from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import parisImage from '../assets/images/paris.png';
import tokyoImage from '../assets/images/tokyo.png';
import MumbaiImage from '../assets/images/mumbai.png';
const Trip = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddTrip, setShowAddTrip] = useState(false);

  // Sample trip data
  const trips = {
    upcoming: [
      {
        id: 1,
        destination: 'Mumbai, India',
        date: 'May 15-20, 2025',
        image: MumbaiImage,
        weather: 'Sunny, 22°C',
      },
      {
        id: 2,
        destination: 'Tokyo, Japan',
        date: 'June 8-16, 2025',
        image: tokyoImage,
        weather: 'Cloudy, 19°C',
      },
    ],
    past: [
      {
        id: 3,
        destination: 'New York, USA',
        date: 'March 3-8, 2025',
        image: parisImage,
        weather: 'Rainy, 15°C',
      },
      {
        id: 4,
        destination: 'Bali, Indonesia',
        date: 'January 12-20, 2025',
        image: tokyoImage,
        weather: 'Sunny, 30°C',
      },
    ],
  };

  const TripCard = ({trip}) => (
    <View style={tw`bg-black/70 rounded-xl  mb-4 overflow-hidden`}>
      <View style={tw`h-40 relative `}>
        {/* Using placeholder for image - in real app, use actual image */}
        <View style={tw`absolute  h-full w-full `}>
          <Image source={trip?.image} style={[tw`h-full w-full opacity-70`]} />
        </View>
        <View style={tw`w-full p-4 absolute bottom-0 left-0 right-0 z-[10]`}>
          <Text style={tw`text-white font-bold text-xl`}>
            {trip.destination}
          </Text>
          <View style={tw`flex-row items-center mt-1`}>
            <Calendar size={14} color="white" style={tw`mr-1`} />
            <Text style={tw`text-white text-sm`}>{trip.date}</Text>
          </View>
        </View>
      </View>
      <View style={tw`p-3 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <CloudSun size={16} color="#fff" style={tw`mr-1`} />
          <Text style={tw`text-white text-sm`}>{trip.weather}</Text>
        </View>
        <TouchableOpacity style={tw`bg-blue-500 py-1 px-3 rounded-full`}>
          <Text style={tw`text-white font-medium text-xs`}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const AddTripForm = () => (
    <View style={tw`bg-white rounded-xl shadow-md p-4 mb-4`}>
      <Text style={tw`text-lg font-bold mb-4 text-gray-800`}>
        Create New Trip
      </Text>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-700 mb-1 font-medium`}>Destination</Text>
        <TextInput
          placeholder="Where are you going?"
          style={tw`border border-gray-300 rounded-lg p-2 text-gray-800`}
        />
      </View>

      <View style={tw`flex-row mb-4`}>
        <View style={tw`flex-1 mr-2`}>
          <Text style={tw`text-gray-700 mb-1 font-medium`}>Start Date</Text>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-2 flex-row items-center`}>
            <Calendar size={16} color="#4B5563" style={tw`mr-2`} />
            <Text style={tw`text-gray-600`}>Select Date</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-1 ml-2`}>
          <Text style={tw`text-gray-700 mb-1 font-medium`}>End Date</Text>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-2 flex-row items-center`}>
            <Calendar size={16} color="#4B5563" style={tw`mr-2`} />
            <Text style={tw`text-gray-600`}>Select Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-700 mb-1 font-medium`}>Notes</Text>
        <TextInput
          placeholder="Any special notes for this trip?"
          multiline={true}
          numberOfLines={3}
          style={tw`border border-gray-300 rounded-lg p-2 text-gray-800`}
        />
      </View>

      <View style={tw`flex-row justify-end`}>
        <TouchableOpacity
          onPress={() => setShowAddTrip(false)}
          style={tw`mr-2 py-2 px-4 rounded-lg border border-gray-300`}>
          <Text style={tw`text-gray-600 font-medium`}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-lg`}>
          <Text style={tw`text-white font-medium`}>Create Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`p-4 bg-white shadow-sm`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>My Trips</Text>
          <TouchableOpacity
            onPress={() => setShowAddTrip(!showAddTrip)}
            style={tw`bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center`}>
            {showAddTrip ? (
              <XIcon size={24} color="white" />
            ) : (
              <PlusIcon size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* Add Trip Form */}
        {showAddTrip && <AddTripForm />}

        {/* Tabs */}
        <View style={tw`flex-row mb-4 bg-gray-200 rounded-lg p-1`}>
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            style={tw`flex-1 py-2 rounded-md ${
              activeTab === 'upcoming' ? 'bg-white shadow' : ''
            }`}>
            <Text
              style={tw`text-center font-medium ${
                activeTab === 'upcoming' ? 'text-blue-500' : 'text-gray-600'
              }`}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            style={tw`flex-1 py-2 rounded-md ${
              activeTab === 'past' ? 'bg-white shadow' : ''
            }`}>
            <Text
              style={tw`text-center font-medium ${
                activeTab === 'past' ? 'text-blue-500' : 'text-gray-600'
              }`}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trip List */}
        {trips[activeTab].length > 0 ? (
          trips[activeTab].map(trip => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <View
            style={tw`bg-white rounded-xl shadow-sm p-8 items-center justify-center`}>
            <Plane size={48} color="#9CA3AF" style={tw`mb-4`} />
            <Text style={tw`text-gray-500 text-center text-lg`}>
              {activeTab === 'upcoming'
                ? 'No upcoming trips planned yet!'
                : 'No past trips to show.'}
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity
                onPress={() => setShowAddTrip(true)}
                style={tw`mt-4 bg-blue-500 py-2 px-4 rounded-lg`}>
                <Text style={tw`text-white font-medium`}>Plan a Trip</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trip;
