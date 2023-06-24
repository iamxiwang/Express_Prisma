import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'
export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-orange-300">
      <TouchableOpacity className='p-6 bg-cyan-500 shadow-md shadow-gray-500 ' >
        <Text className='text-white font-bold text-3xl'>JOKES</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
