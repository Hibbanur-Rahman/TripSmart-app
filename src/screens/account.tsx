import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import tw from 'twrnc';
import { User, Settings, Bell, Clock, Headphones, LogOut, CreditCard, Heart, Shield, ChevronRight } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleLogout=async()=>{
    console.log('Logout button clicked');
    await AsyncStorage.clear();
    navigation.navigate('Login')
  }
  const menuItems = [
    {
      id: 1,
      title: 'Personal Details',
      icon: <User size={22} color="#3B82F6" />,
      bgColor: '#EBF5FF'
    },
    {
      id: 2,
      title: 'Payment Methods',
      icon: <CreditCard size={22} color="#10B981" />,
      bgColor: '#ECFDF5'
    },
    {
      id: 3,
      title: 'My Bookings',
      icon: <Clock size={22} color="#F59E0B" />,
      bgColor: '#FEF3C7'
    },
    {
      id: 4,
      title: 'Saved Places',
      icon: <Heart size={22} color="#EF4444" />,
      bgColor: '#FEE2E2'
    },
    {
      id: 5,
      title: 'Notifications',
      icon: <Bell size={22} color="#8B5CF6" />,
      bgColor: '#EDE9FE',
      badge: 3
    },
    {
      id: 6,
      title: 'Privacy & Security',
      icon: <Shield size={22} color="#6B7280" />,
      bgColor: '#F3F4F6'
    },
    {
      id: 7,
      title: 'Help & Support',
      icon: <Headphones size={22} color="#0EA5E9" />,
      bgColor: '#E0F2FE'
    },
    {
      id: 8,
      title: 'Settings',
      icon: <Settings size={22} color="#6B7280" />,
      bgColor: '#F3F4F6'
    }
  ];

  // Stats data
  const statsData = [
    { label: 'Trips', value: '12' },
    { label: 'Reviews', value: '8' },
    { label: 'Saved', value: '24' }
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header with gradient overlay */}
        <View style={tw`h-32 bg-blue-500 rounded-b-3xl`}>
          <View style={tw`absolute top-4 right-4 flex-row`}>
            <TouchableOpacity style={tw`p-2 bg-white bg-opacity-20 rounded-full`}>
              <Icon name="edit" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Profile Info Card */}
        <View style={tw`mx-4 -mt-16 bg-white rounded-xl shadow-md p-4`}>
          <View style={tw`flex-row items-center`}>
            <Image 
              source={require('../assets/images/profile-img.png')} 
              style={tw`w-20 h-20 rounded-full border-4 border-white`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-xl font-bold text-gray-800`}>Sujaan Arora</Text>
              <Text style={tw`text-blue-500 mt-1`}>+91 9876543210</Text>
              <View style={tw`bg-blue-100 px-3 py-1 rounded-full self-start mt-2`}>
                <Text style={tw`text-xs text-blue-600 font-medium`}>Premium Member</Text>
              </View>
            </View>
          </View>
          
          {/* Stats */}
          <View style={tw`flex-row justify-between mt-6 pt-4 border-t border-gray-100`}>
            {statsData.map((stat, index) => (
              <View key={index} style={tw`items-center`}>
                <Text style={tw`text-xl font-bold text-gray-800`}>{stat.value}</Text>
                <Text style={tw`text-gray-500 text-sm mt-1`}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={tw`mx-4 mt-6`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-2 px-2`}>Account Settings</Text>
          <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden`}>
            {menuItems.slice(0, 4).map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={tw`flex-row items-center py-3.5 px-4 ${index < 3 ? 'border-b border-gray-100' : ''}`}
              >
                <View style={tw`w-10 h-10 rounded-full ${item.bgColor} items-center justify-center`}>
                  {item.icon}
                </View>
                <Text style={tw`flex-1 text-base text-gray-800 font-medium ml-4`}>{item.title}</Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={tw`mx-4 mt-6`}>
          <Text style={tw`text-lg font-bold text-gray-800 mb-2 px-2`}>Preferences</Text>
          <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden`}>
            {menuItems.slice(4).map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={tw`flex-row items-center py-3.5 px-4 ${index < 3 ? 'border-b border-gray-100' : ''}`}
              >
                <View style={tw`w-10 h-10 rounded-full ${item.bgColor} items-center justify-center`}>
                  {item.icon}
                </View>
                <Text style={tw`flex-1 text-base text-gray-800 font-medium ml-4`}>{item.title}</Text>
                {item.badge && (
                  <View style={tw`bg-red-500 w-6 h-6 rounded-full items-center justify-center mr-2`}>
                    <Text style={tw`text-white text-xs font-bold`}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Log Out Button */}
        <TouchableOpacity style={tw`mx-4 mt-6 mb-8 bg-white py-3.5 px-4 rounded-xl shadow-sm flex-row items-center justify-center`} onPress={()=>handleLogout()}>
          <LogOut size={20} color="#EF4444" style={tw`mr-2`} />
          <Text style={tw`text-red-500 font-medium text-base`}>Log Out</Text>
        </TouchableOpacity>
        
        {/* Version info */}
        <View style={tw`items-center mb-8`}>
          <Text style={tw`text-gray-400 text-sm`}>App Version 2.4.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;