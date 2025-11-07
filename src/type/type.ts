import { StringHashMap } from "expo"

export type Facility = {
  facilityId: number
  name: string
  category: string
}

export type Comment = {
  commentId: number
  userId: number
  accommodationId: number
  text: string
  rating: number
}

export type User = {
  userId: number
  mobileNumber: string
  email: string
  password: string
  firstName: string
  lastName: string
  profileImage: string // URL
}

export type Accommodation = {
  accomodationId: number
  title: string
  description: string
  location: string
  price: number
  rating: number
  typeOfPlace: string
  numberOfGuest: number
  image: string
  facilityIds: number[] // Changed from Facility[] to number[]
}

export type Booking = {
  bookingId: number
  userId: number
  accomodationId: number
  bookingDate: string
  bookingTime: StringHashMap
  paymentMethod: string
  totalPrice: number
}

export type Favorite = {
  favoriteId: number
  userId: number
  accomodationId: number
}

// --- Định nghĩa cho Navigation ---
export type RootStackParamList = {
  Tabs:
    | {
        screen: keyof TabParamList
        params?: TabParamList[keyof TabParamList]
      }
    | undefined
  AccommodationDetail: { accommodationId: number }
  BookingDetail: { accommodation: Accommodation; checkInDate?: string; checkOutDate?: string } 
  Login: undefined
  Register: undefined
}

export type TabParamList = {
  Home: undefined
  Favorites: undefined
  Bookings: undefined
  Profile: { user?: User }
}

export type DataJson = {
  facilities: Facility[]
  users: User[]
  accommodations: Accommodation[]
  bookings: Booking[]
  comments: Comment[]
  favorites: Favorite[]
}
