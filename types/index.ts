export interface product {
    id: number,
    name: string,
    price: string,
    imageUrl: string,
}

export interface logout{
    id:string
}

export interface cartItem {
    id: number,
    name: string,
    price: string,
    imageUrl: string,
    count: number
}
