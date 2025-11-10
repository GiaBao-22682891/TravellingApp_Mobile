import { useState, useMemo, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert } from "react-native"
import { useFetch } from "../../hook/useFetch"
import type { Accommodation, Favorite } from "../../type/type"
import AccommodationCard from "../../components/AccommodationCard"
import { useUser } from "../../context/UserContext"

const FavoriteScreen = () => {
  const { currentUser } = useUser()
  const { data: accommodations, loading: loadingAcc } = useFetch<Accommodation[]>("/accommodations")
  const { data: allFavorites, loading: loadingFav, error } = useFetch<Favorite[]>("/favorites")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Favorite[]>([])

  // Initialize current user's favorites
  useEffect(() => {
    if (currentUser && allFavorites) {
      setFavorites(allFavorites.filter(fav => fav.userId === currentUser.id))
    }
  }, [currentUser, allFavorites])

  const toggleFavorite = (accommodationId: string) => {
    if (!currentUser) {
      Alert.alert("Not logged in", "You must log in to favorite accommodations.")
      return
    }

    setFavorites(prev => {
      const exists = prev.find(fav => fav.accomodationId === accommodationId)
      if (exists) {
        return prev.filter(fav => fav.accomodationId !== accommodationId)
      } else {
        return [
          ...prev,
          {
            id: "", // leave empty, backend/state will assign
            userId: currentUser.id,
            accomodationId: accommodationId
          }
        ]
      }
    })
  }

  // Get favorite accommodations of current user
  const favoriteAccommodations = useMemo(() => {
    if (!accommodations) return []
    const favIds = favorites.map(fav => fav.accomodationId)
    return accommodations.filter(acc => favIds.includes(acc.id))
  }, [favorites, accommodations])

  // Apply search filter
  const filteredAccommodations = useMemo(() => {
    return favoriteAccommodations.filter(acc =>
      acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [favoriteAccommodations, searchQuery])

  if (loadingAcc || loadingFav) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load favorites</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Favorites List */}
      {filteredAccommodations.length > 0 ? (
        <FlatList
          data={filteredAccommodations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AccommodationCard
              accommodation={item}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Add accommodations to your favorites to see them here</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: "#fff" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  listContent: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  emptyText: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#333" },
  emptySubtext: { fontSize: 14, color: "#999", textAlign: "center" },
  errorText: { fontSize: 16, color: "#cc0000", textAlign: "center" },
})

export default FavoriteScreen
