import { products } from '~/server/models'

export default defineEventHandler(async (event) => {
  const productId = event.context.params!.id

  console.log(`GET/api/products/${productId}`)
  try {
    console.log('Find Product')
    const productData = await products.findOne({
      id: productId
    })
    if (productData) {
      console.log('product found in product')
      await products.findByIdAndDelete(productData._id)
      console.log('상품을 제거했습니다')
      const cartData = await products.find()
      return cartData.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      }))
    } else {
      console.log('product not found')
      event.node.res.statusCode = 404
      return {
        code: 'PRODUCT_NOT_FOUND',
        message: `아이디가 ${productId}인 상품을 찾을 수 없습니다 `
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
