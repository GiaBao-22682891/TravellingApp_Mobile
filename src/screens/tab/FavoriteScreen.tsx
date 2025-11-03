"use client"

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useEffect, useState } from "react"
import { dataService, type Accommodation } from "../../services/DataService"

interface FavoriteItem {
  id: string
  title: string
  location: string
  rating: number
  price: number
  image?: string
}

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState<Accommodation[]>([])

  useEffect(() => {
    // Simulating user ID 1 - in real app would come from auth
    const data = dataService.getFavoritesByUser(1)
    setFavorites(data)
  }, [])

  const removeFavorite = (id: number) => {
    console.log("[v0] Removed favorite:", id)
    setFavorites(favorites.filter((fav) => fav.accomodationId !== id))
  }

  const renderFavoriteItem = ({ item }: { item: Accommodation }) => (
    <View key={item.accomodationId.toString()} style={styles.favoriteCard}>
      <Image source={{ uri: item.image }} style={styles.imagePlaceholder} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.location}>
              <Ionicons name="location" size={12} color="#666" /> {item.location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeFavorite(item.accomodationId)}>
            <Ionicons name="heart" size={20} color="#FF5A5F" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FF5A5F" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>${item.price}/night</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} saved places</Text>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.accomodationId.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  favoriteCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#FF5A5F",
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5A5F",
  },
})

export default FavoriteScreen