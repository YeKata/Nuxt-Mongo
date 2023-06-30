// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-mongoose'],
  css: ['@/assets/css/reset.css'],
  runtimeConfig: {
    mongoUrl: process.env.MONGODB_URI,
    public: {
      restApi: process.env.REST_API,
      redirectUri: process.env.REDIRECT_URI,
      adminKey: process.env.SERVICE_APP_ADMIN_KEY
    }
  },
  nitro: {
    plugins: ['~/server/index.ts']
  },
  app: {
    head: {
      script: [
        {
          src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js'
        }
      ],
      link: [
        {
          integrity: 'sha384-2Iizs9d663Ml4F6X4f1lrOBfWnVoYLE+AJX24nl8Vof23ke3SqL5VJRzYSGoZxhW',
          crossorigin: 'anonymous'
        }
      ]
    }
  }

})
