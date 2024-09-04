import { Restaurant } from "./restaurant"
import { User } from "./user"

export interface Comment {
    id :number 
    title: string
    content : string
    rating: number
    createdOn: Date
    restaurantId: number
    restaurant: Restaurant 
    appUserId : String
    appUser:User
  } 