import { products } from '~/server/models'

export default defineEventHandler(async (event) => {
  try {
    const productData = await products.find()
    return productData.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
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
