import { products } from '~/server/models'

export default defineEventHandler(async (event) => {
  const productName = event.context.params!.name

  console.log(`GET/api/name/${productName}`)
  try {
    console.log('Find Product')
    const query = { name: { $regex: productName, $options: 'i' } }
    const productData = await products.find(query)
    if (productData) {
      console.log('product found')
      return productData.map(product => ({
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
        message: `${productName}가 포함된 상품을 찾을 수 없습니다 `
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
