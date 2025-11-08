import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from "react-native"
import { useFetch } from "../../hook/useFetch"
import type { Accommodation, Favorite } from "../../type/type"
import AccommodationCard from "../../components/AccommodationCard"
import { useState, useMemo } from "react"

const FavoriteScreen = () => {
  const { data: favorites, loading, error } = useFetch<Favorite[]>("/favorites")
  const { data: accommodations } = useFetch<Accommodation[]>("/accommodations")
  const [searchQuery, setSearchQuery] = useState("")

  const favoriteAccommodations = useMemo(() => {
    if (!favorites || !accommodations) return []

    const favoriteAccommodationIds = favorites.map((fav: any) => fav.accomodationId)
    return accommodations.filter((acc: Accommodation) => favoriteAccommodationIds.includes(acc.accomodationId))
  }, [favorites, accommodations])

  const filteredAccommodations = useMemo(() => {
    return favoriteAccommodations.filter(
      (accommodation: Accommodation) =>
        accommodation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        accommodation.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [favoriteAccommodations, searchQuery])

  if (loading) {
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
          keyExtractor={(item) => item.accomodationId.toString()}
          renderItem={({ item }) => <AccommodationCard accommodation={item} />}
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
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
    marginBottom: 8,
    color: "#333",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#cc0000",
    textAlign: "center",
  },
})

export default FavoriteScreen
