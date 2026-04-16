export interface UserPhoto {
    id: number
    photoUrl: string
    isMain: boolean
}

export interface Author {
    id: number
    firstName: string
    lastName: string
    city: string
    photos: UserPhoto[]
}

export interface Article {
    id: number
    caption: string
    location: string
    likes_count: number
    likes: { id: number; user_id: number }[]
    author: Author
    photos: { id: number; photo_url: string }[]
}

export interface Like {
    action: string
}
