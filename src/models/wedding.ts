export interface Wedding {
  id: number
  date: string
  location: Location
  message: {
    intro: string
    invitation: string
  }
  gallerImages: string[]
  attnendCount: number

  groom: Person & { parents: Person[] }
  bride: Person & { parents: Person[] }
}

export interface Location {
  lat: number
  lng: number
  name: string
  address: string
  link: string
  waytocome: {
    metro: string[]
    bus: string[]
    suttle: string[]
    car: string[]
  }
}

export interface Account {
  account: {
    bankName: string
    accountNumber: string
    kakaopayLink?: string
  }
}

interface Person {
  name: string
  account: Account
  phoneNumber: number
}
