import { products } from '~/server/models'
import { product } from '~/types'
export default defineEventHandler(async (event) => {
  const { id, name, price, imageUrl } = await readBody<product>(event)
  try {
    const productData = await products.findOne({
      id
    })
    if (productData) {
      console.log(`${id}번 상품은 이미 있습니다.`)
      event.node.res.statusCode = 409
      return {
        code: 'PRODUCT_EXISTS',
        message: '이미 존재하는 상품입니다'
      }
    } else {
      console.log('상품이 등록 되었습니다')
      const newProductData = await products.create({
        id,
        name,
        price,
        imageUrl
      })
      return {
        id: newProductData.id,
        name: newProductData.name,
        price: newProductData.price,
        imageUrl: newProductData.imageUrl
      }
    }
  } catch (error) {
    console.dir(error)
    event.node.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong'
    }
  }
})
