"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert } from "react-native"
import { NavigationProp, useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParamList, TabParamList, User } from "../../type/type"
import { useFetch } from "../../hook/useFetch"
import { Ionicons } from '@expo/vector-icons';

type ProfileScreenRouteProp = RouteProp<TabParamList, "Profile">

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<ProfileScreenRouteProp>()
  const { data: users } = useFetch<User[]>("/users")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (route.params?.user) {
      setCurrentUser(route.params.user)
      setLoading(false)
    } else if (users && users.length > 0) {
      // Default to first user if no user passed
      setCurrentUser(users[0])
      setLoading(false)
    }
  }, [route.params?.user, users])

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: () => {
          setCurrentUser(null)
          Alert.alert("Success", "You have been logged out")
          navigation.navigate("Login")
        },
        style: "destructive",
      },
    ])
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Edit profile feature coming soon!")
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Ionicons name="person-circle-outline" size={80} color="#00BCD4" />
          <Text style={styles.emptyText}>No user logged in</Text>
          <Text style={styles.emptySubText}>Please login to view your profile</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Profile Header */}
          <View style={styles.headerSection}>
            <Image
              source={{ uri: currentUser.profileImage }}
              style={styles.profileImage}
              defaultSource={require("../../../assets/icon.png")}
            />
            <Text style={styles.userName}>
              {currentUser.firstName} {currentUser.lastName}
            </Text>
            <Text style={styles.userType}>Traveler</Text>
          </View>

          {/* Profile Information Cards */}
          <View style={styles.infoSection}>
            {/* Email Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="mail-outline" size={24} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{currentUser.email}</Text>
              </View>
            </View>

            {/* Phone Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="call-outline" size={24} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{currentUser.mobileNumber}</Text>
              </View>
            </View>

            {/* Name Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="person-outline" size={24} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>
                  {currentUser.firstName} {currentUser.lastName}
                </Text>
              </View>
            </View>

            {/* User ID Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="id-card-outline" size={24} color="#00BCD4" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValue}>#{currentUser.userId}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="pencil-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#00BCD4",
    backgroundColor: "#f0f0f0",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 15,
  },
  userType: {
    fontSize: 14,
    color: "#00BCD4",
    marginTop: 5,
    fontWeight: "500",
  },
  infoSection: {
    marginBottom: 30,
    gap: 12,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#00BCD4",
  },
  infoIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "600",
  },
  actionSection: {
    gap: 12,
    paddingBottom: 30,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#00BCD4",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ProfileScreen
