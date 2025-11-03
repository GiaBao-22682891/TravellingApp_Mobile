"use client"

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { dataService, type Accommodation } from "../../services/DataService"

const HomeScreen = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])

  useEffect(() => {
    const data = dataService.getAccommodations()
    setAccommodations(data)
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            placeholder="Anywhere, 23 - 31 May, 2 guests"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
          <Ionicons name="options" size={18} color="#999" />
        </View>
      </View>

      {/* Price Toggle */}
      <View style={styles.priceToggle}>
        <Text style={styles.priceToggleLabel}>Present total price</Text>
        <View style={styles.priceToggleLabel}>
          <Text style={styles.priceToggleSubLabel}>All-inclusive, pre-tax</Text>
          <View style={styles.checkbox} />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="water" size={24} color="#00BFB3" />
          <Text style={styles.categoryText}>Beach</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="mountain" size={24} color="#00BFB3" />
          <Text style={styles.categoryText}>Mountain</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Ionicons name="camping" size={24} color="#00BFB3" />
          <Text style={styles.categoryText}>Camping</Text>
        </TouchableOpacity>
      </View>

      {/* Accommodations List */}
      <View style={styles.accommodationsList}>
        {accommodations.slice(0, 5).map((accommodation) => (
          <View key={accommodation.accomodationId} style={styles.accommodationCard}>
            <View style={styles.cardImageContainer}>
              <Image source={{ uri: accommodation.image }} style={styles.cardImage} />
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{accommodation.title}</Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="location" size={12} color="#999" />
                    <Text style={styles.cardLocation}>{accommodation.location}</Text>
                  </View>
                </View>
                <View style={styles.rating}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{accommodation.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardPrice}>${accommodation.price}/night</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  priceToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
  },
  priceToggleLabel: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  priceToggleSubLabel: {
    fontSize: 12,
    color: "#999",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#00BFB3",
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    justifyContent: "space-around",
  },
  categoryButton: {
    alignItems: "center",
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  accommodationsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  accommodationCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardImageContainer: {
    position: "relative",
    height: 200,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: "#999",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
})

export default HomeScreen
