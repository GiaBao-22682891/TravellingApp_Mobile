import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const EditProfileScreen = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigation = useNavigation();

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>No user data found.</Text>
      </View>
    );
  }

  const [form, setForm] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    mobileNumber: currentUser.mobileNumber,
    email: currentUser.email,
    profileImage: currentUser.profileImage,
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
      // const res = await fetch(`http://172.20.10.2:3000/users/${currentUser.id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentUser, ...form }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedUser = await res.json();
      setCurrentUser(updatedUser);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={form.mobileNumber}
        onChangeText={(text) => handleChange("mobileNumber", text)}
        placeholder="Mobile Number"
      />
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={form.profileImage}
        onChangeText={(text) => handleChange("profileImage", text)}
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
