import { carts } from '~/server/models'

export default defineEventHandler(async (event) => {
  try {
    const cartData = await carts.find()
    return cartData.map(cart => ({
      id: cart.id,
      name: cart.name,
      price: cart.price,
      imageUrl: cart.imageUrl
    }))
  } catch (error) {
    console.dir(error)
    event.node.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'SomeThing went wrong'
    }
  }
})
