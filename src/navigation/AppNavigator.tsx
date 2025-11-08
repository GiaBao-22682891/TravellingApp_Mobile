import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../type/type"

// Import các Navigator phụ
import TabNavigator from "./TabNavigator"

// Import các màn hình Stack Screen

import AccommodationDetailScreen from "../screens/AccomodationDetailScreen"
import BookingDetailScreen from "../screens/BookingDetailScreen"
import FilterScreen from "../screens/FilterScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import SuccessScreen from "../screens/SuccessScreen"
import EditProfileScreen from "../screens/EditProfileScreen"

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    // NavigationContainer quản lý trạng thái điều hướng
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Màn hình chứa Tab Bar (Home, Favorites, Bookings, Profile) */}
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />

        {/* --- Màn hình Chi tiết --- */}
        <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
        <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
        {/* --- Màn hình thành công --- */}
        <Stack.Screen name="Success" component={SuccessScreen} />

        {/* --- Màn hình Chức năng (Tìm kiếm/Lọc) --- */}
        {/* <Stack.Screen name="Filter" component={FilterScreen} /> */}

        {/* --- Màn hình Xác thực (Authentication) --- */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
