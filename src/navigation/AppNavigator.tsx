import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@pages/Home';
import Dogs from '@pages/Dogs';
import Profile from '@pages/Profile';
import DogDetail from '@pages/DogDetail';
import MyShifts from '@pages/MyShifts';
import Reservations from '@pages/Reservations';

export type RootStackParamList = {
  Home: undefined;
  Dogs: undefined;
  Profile: undefined;
  DogDetail: undefined;
  MyShifts: undefined;
  Reservations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Dogs" component={Dogs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="DogDetail" component={DogDetail} options={{ headerShown: false }} />
        <Stack.Screen name="MyShifts" component={MyShifts} options={{ headerShown: false }} />
        <Stack.Screen name="Reservations" component={Reservations} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
