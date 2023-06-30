import { defineStore } from 'pinia'
import { cartItem, product } from '~/types'

export const useProductStore = defineStore('products', () => {
  const cartItems:cartItem[] = reactive([])
  const isLogin = ref(false)
  const indexNum = ref()
  const idNum = ref()
  const userToken = ref()

  const addCartItem = (cartItem:product, id:string) => {
    const newCartItem = {
      ...cartItem,
      id: parseInt(`${cartItem.id}`),
      name: `${cartItem.name}`,
      price: `${cartItem.price}`,
      imageUrl: `${cartItem.imageUrl}`,
      count: 1
    }
    if (cartItems.length > 0) {
      let a = 0
      for (const i in cartItems) {
        if (parseInt(id) === cartItems[i].id) {
          cartItems[i].count++
          console.log('이프')
          a = 1
          return a
        }
      }
      if (a === 0) {
        cartItems.push(newCartItem)
      }
    } else {
      console.log('엘스2')
      cartItems.push(newCartItem)
    }
  }

  const deleteCartItem = (index: cartItem) => {
    const i = index.id
    for (const a in cartItems) {
      if (i === cartItems[a].id) {
        if (cartItems[a].count > 1) {
          cartItems[a].count--
          break
        } else {
          cartItems.splice(parseInt(a), 1)
          break
        }
      }
    }
  }

  return { isLogin, userToken, cartItems, indexNum, idNum, addCartItem, deleteCartItem }
})
