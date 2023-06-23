import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import JokeItem from './components/JokeItem';

export default function App() {
  return (
    <SafeAreaView  className="flex-1 items-center justify-center bg-white">
      <StatusBar/>
      <Text>Open up your app!</Text>
      <JokeItem />
    </SafeAreaView>
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
