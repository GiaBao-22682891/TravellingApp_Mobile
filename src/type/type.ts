export type Facility = {
  facilityId: number
  name: string
  category: string
  id?: string
}

export type Comment = {
  commentId: number
  userId: number
  accommodationId: number
  text: string
  rating: number
  id?: string
}

export type User = {
  userId: number
  mobileNumber: string
  email: string
  password: string
  firstName: string
  lastName: string
  profileImage: string // URL
  id?: string
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
  id?: string
}

export type Booking = {
  bookingId: number
  userId: number
  accomodationId: number
  bookingDate: string
  bookingTime: string
  paymentMethod: string
  totalPrice: number
  id?: string
}

export type Favorite = {
  favoriteId: number
  userId: number
  accomodationId: number
  id?: string
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
  Success: {
    bookingId: number
    referenceNumber: string
    bookingDate: string
    bookingTime: string
    paymentMethod: string
    amount: number
  }
  Login: undefined
  Register: undefined
  EditProfile: undefined
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
