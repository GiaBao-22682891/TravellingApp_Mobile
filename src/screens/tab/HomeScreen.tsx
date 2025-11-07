import { useState } from "react"

import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useFetch } from "../../hook/useFetch"
import AccommodationCard from "../../components/AccommodationCard"
import type { Accommodation } from "../../type/type"

const HomeScreen = () => {
  const { data: accommodationsData, loading, error } = useFetch<Accommodation[]>("/accommodations")
  const [selectedCategory, setSelectedCategory] = useState<string>("Beach")
  const [searchText, setSearchText] = useState("")

  // Filter accommodations based on selected category
  const filteredAccommodations = (accommodationsData || []).filter((item) =>
    item.typeOfPlace.toLowerCase().includes(selectedCategory.toLowerCase()),
  )

  const categories = ["Beach", "Mountain", "Camping"]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Beach":
        return "🏖️"
      case "Mountain":
        return "⛰️"
      case "Camping":
        return "🏕️"
      default:
        return "📍"
    }
  }

  const renderAccommodation = ({ item }: { item: Accommodation }) => (
    <AccommodationCard key={item.accomodationId.toString()} accommodation={item} />
  )

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <Text style={styles.emptyText}>Loading accommodations...</Text>
      ) : error ? (
        <Text style={styles.emptyText}>Error: {error}</Text>
      ) : (
        <Text style={styles.emptyText}>No accommodations found in {selectedCategory}</Text>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header and Search Section */}
        <View style={styles.headerContainer}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              placeholder="Where do you want to stay?"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>

          {/* Category Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={styles.categoryButton}
                >
                  {/* Category Icon */}
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{getCategoryIcon(category)}</Text>
                  </View>

                  {/* Category Name and Underline */}
                  <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
                    {category}
                  </Text>
                  {selectedCategory === category && <View style={styles.underline} />}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Accommodations List */}
        <FlatList
          data={filteredAccommodations}
          renderItem={renderAccommodation}
          keyExtractor={(item) => item.accomodationId.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1a1a1a",
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 24,
  },
  categoryButton: {
    alignItems: "center",
    paddingBottom: 8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  categoryTextActive: {
    color: "#00BCD4",
  },
  underline: {
    width: 48,
    height: 4,
    backgroundColor: "#00BCD4",
    borderRadius: 2,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
})

export default HomeScreen
