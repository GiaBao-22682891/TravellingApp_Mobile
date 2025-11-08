import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const EditProfileScreen = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [mobileNumber, setMobileNumber] = useState(currentUser?.mobileNumber || "");
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || "");

  const handleSave = async () => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${currentUser.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentUser,
          firstName,
          lastName,
          mobileNumber,
          profileImage,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      const updatedUser = await res.json();
      setCurrentUser(updatedUser);

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Unable to update profile");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Mobile Number"
      />
      <TextInput
        style={styles.input}
        value={profileImage}
        onChangeText={setProfileImage}
        placeholder="Profile Image URL"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#00BCD4",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});

export default EditProfileScreen;
