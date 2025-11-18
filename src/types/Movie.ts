export type Root = Root2[]

export interface Root2 {
  title: string
  thumbnail: Thumbnail
  year: number
  category: string
  rating: string
  isBookmarked: boolean
  isTrending: boolean
}

export interface Thumbnail {
  trending?: Trending
  regular: Regular
}

export interface Trending {
  small: string
  large: string
}

export interface Regular {
  small: string
  medium: string
  large: string
}
