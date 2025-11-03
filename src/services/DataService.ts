import accommodationData from "../../data/data.json"

export interface Accommodation {
  accomodationId: number
  title: string
  description: string
  location: string
  price: number
  rating: number
  typeOfPlace: string
  numberOfGuest: number
  image: string
  facilityIds: Facility[]
}

export interface Facility {
  facilityId: number
  name: string
  category: string
}

export interface Comment {
  commentId: number
  userId: number
  accommodationId: number
  text: string
  rating: number
}

export interface User {
  userId: number
  name: string
  email: string
  phone: string
  location: string
  avatar: string | null
  totalBookings: number
  totalSpent: number
}

export interface Booking {
  bookingId: number
  userId: number
  accommodationId: number
  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
}

export interface Favorite {
  favoriteId: number
  userId: number
  accommodationId: number
}

export const dataService = {
  // Accommodation methods
  getAccommodations: (): Accommodation[] => {
    return accommodationData.accommodations || []
  },

  getAccommodationById: (id: number): Accommodation | undefined => {
    return accommodationData.accommodations?.find((acc) => acc.accomodationId === id)
  },

  getAccommodationsByLocation: (location: string): Accommodation[] => {
    return (
      accommodationData.accommodations?.filter((acc) => acc.location.toLowerCase().includes(location.toLowerCase())) ||
      []
    )
  },

  getAccommodationsByPriceRange: (minPrice: number, maxPrice: number): Accommodation[] => {
    return accommodationData.accommodations?.filter((acc) => acc.price >= minPrice && acc.price <= maxPrice) || []
  },

  // User methods
  getUserById: (userId: number): User | undefined => {
    return accommodationData.users?.find((user) => user.userId === userId)
  },

  getAllUsers: (): User[] => {
    return accommodationData.users || []
  },

  // Booking methods
  getBookingsByUser: (userId: number): Booking[] => {
    return accommodationData.bookings?.filter((booking) => booking.userId === userId) || []
  },

  getBookingById: (bookingId: number): Booking | undefined => {
    return accommodationData.bookings?.find((booking) => booking.bookingId === bookingId)
  },

  getAllBookings: (): Booking[] => {
    return accommodationData.bookings || []
  },

  // Comment/Review methods
  getCommentsByAccommodation: (accommodationId: number): Comment[] => {
    return accommodationData.comments?.filter((comment) => comment.accommodationId === accommodationId) || []
  },

  getAllComments: (): Comment[] => {
    return accommodationData.comments || []
  },

  // Favorite methods
  getFavoritesByUser: (userId: number): Accommodation[] => {
    const favoriteIds =
      accommodationData.favorites?.filter((fav) => fav.userId === userId).map((fav) => fav.accommodationId) || []

    return accommodationData.accommodations?.filter((acc) => favoriteIds.includes(acc.accomodationId)) || []
  },

  // Facility methods
  getAllFacilities: (): Facility[] => {
    return accommodationData.facilities || []
  },
}