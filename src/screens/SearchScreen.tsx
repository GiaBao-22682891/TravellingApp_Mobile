// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native"
// import { Ionicons } from "@expo/vector-icons"

// interface SearchResult {
//   id: string
//   name: string
//   location: string
//   price: number
//   rating: number
//   image: string
// }

// const SearchScreen = ({ navigation }: any) => {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [results, setResults] = useState<SearchResult[]>([
//     {
//       id: "1",
//       name: "Luxury Beach Villa",
//       location: "Bali, Indonesia",
//       price: 250,
//       rating: 4.8,
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
//     },
//     {
//       id: "2",
//       name: "Mountain Cabin",
//       location: "Swiss Alps",
//       price: 180,
//       rating: 4.6,
//       image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
//     },
//     {
//       id: "3",
//       name: "City Apartment",
//       location: "New York, USA",
//       price: 220,
//       rating: 4.5,
//       image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
//     },
//   ])

//   const handleSearch = (text: string) => {
//     setSearchQuery(text)
//     if (text.length > 0) {
//       const filtered = results.filter(
//         (item) =>
//           item.name.toLowerCase().includes(text.toLowerCase()) ||
//           item.location.toLowerCase().includes(text.toLowerCase()),
//       )
//       setResults(filtered)
//     }
//   }

//   const renderSearchItem = ({ item }: { item: SearchResult }) => (
//     <TouchableOpacity
//       style={styles.searchItem}
//       onPress={() => navigation.navigate("AccomodationDetail", { accommodation: item })}
//     >
//       <View style={styles.searchItemContent}>
//         <Text style={styles.searchItemName}>{item.name}</Text>
//         <View style={styles.searchItemMeta}>
//           <Ionicons name="location" size={14} color="#666" />
//           <Text style={styles.searchItemLocation}>{item.location}</Text>
//         </View>
//         <View style={styles.searchItemBottom}>
//           <Text style={styles.searchItemPrice}>${item.price}/night</Text>
//           <View style={styles.ratingBadge}>
//             <Ionicons name="star" size={12} color="#FFD700" />
//             <Text style={styles.ratingText}>{item.rating}</Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Search</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       {/* Search Input */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search destinations..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           placeholderTextColor="#999"
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity
//             onPress={() => {
//               setSearchQuery("")
//               setResults([])
//             }}
//           >
//             <Ionicons name="close-circle" size={20} color="#999" />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Search Results */}
//       <FlatList
//         data={results}
//         renderItem={renderSearchItem}
//         keyExtractor={(item) => item.id}
//         scrollEnabled={false}
//         style={styles.resultsList}
//         ListEmptyComponent={
//           searchQuery.length === 0 ? (
//             <View style={styles.emptyState}>
//               <Ionicons name="search" size={48} color="#ddd" />
//               <Text style={styles.emptyText}>Start searching for destinations</Text>
//             </View>
//           ) : (
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyText}>No results found</Text>
//             </View>
//           )
//         }
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 12,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   resultsList: {
//     paddingHorizontal: 16,
//   },
//   searchItem: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//   },
//   searchItemContent: {
//     gap: 8,
//   },
//   searchItemName: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#333",
//   },
//   searchItemMeta: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   searchItemLocation: {
//     fontSize: 12,
//     color: "#666",
//   },
//   searchItemBottom: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   searchItemPrice: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#FF5A5F",
//   },
//   ratingBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//     backgroundColor: "#fff",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   ratingText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#333",
//   },
//   emptyState: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: "#999",
//     marginTop: 8,
//   },
// })

// export default SearchScreen