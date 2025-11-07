import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { UserProvider } from "./src/context/UserContext"
import AppNavigator from "./src/navigation/AppNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
