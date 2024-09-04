export interface Restaurant {
    id: number,
    name: string,
    type: string,
    isOpen: boolean,
    country:string,
    city:string,
    address:string,
    phone:string,
    price_Rating:number,
    acceptTerms: boolean,
    image:string,
    comments:Comment[]
    
  } 

  export interface RestaurantType {
    key: number,
    value: string
  }