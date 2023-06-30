import { carts } from '~/server/models'

export default defineEventHandler(async (event) => {
  const cartId = event.context.params!.id

  console.log(`GET/api/products/${cartId}`)
  try {
    console.log('Find Product')
    const productData = await carts.findOne({
      id: cartId
    })
    if (productData) {
      console.log('product found in cart')
      await carts.findByIdAndDelete(productData._id)
      console.log('상품을 제거했습니다')
      const cartData = await carts.find()
      return cartData.map(cart => ({
        id: cart.id,
        name: cart.name,
        price: cart.price,
        imageUrl: cart.imageUrl
      }))
    } else {
      console.log('product not found')
      event.node.res.statusCode = 404
      return {
        code: 'PRODUCT_NOT_FOUND',
        message: `아이디가 ${cartId}인 상품을 찾을 수 없습니다 `
      }
    }
  } catch (err) {
    console.dir(err)
    event.node.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something went wrong.'
    }
  }
})
