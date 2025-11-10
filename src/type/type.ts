export type Facility = {
  facilityId: string
  name: string
  category: string
  id: string
}

export type Comment = {
  commentId: string
  userId: string
  accommodationId: string
  text: string
  rating: number
  id: string
}

export type User = {
  userId: string
  mobileNumber: string
  email: string
  password: string
  firstName: string
  lastName: string
  profileImage: string // URL
  id: string
}

export type Accommodation = {
  accomodationId: string
  title: string
  description: string
  location: string
  price: number
  rating: number
  typeOfPlace: string
  numberOfGuest: number
  image: string
  facilityIds: string[]
  id: string
}

export type Booking = {
  bookingId: string
  userId: string
  accomodationId: string
  bookingDate: string
  bookingTime: string
  paymentMethod: string
  totalPrice: number
  id: string
}

export type Favorite = {
  favoriteId: string
  userId: string
  accomodationId: string
  id: string
}

// --- Navigation ---
export type RootStackParamList = {
  Tabs:
    | {
        screen: keyof TabParamList
        params?: TabParamList[keyof TabParamList]
      }
    | undefined
  AccommodationDetail: { accommodationId: string }
  BookingDetail: { accommodation: Accommodation; checkInDate?: string; checkOutDate?: string }
  Success: {
    bookingId: string
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
