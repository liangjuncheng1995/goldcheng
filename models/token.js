import { config } from "../config.js"

class Token {
  getTokenFromServer() {
    return new Promise((resolve,reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: config.api_base_url + '/token',
              method: "POST",
              data: {
                account: res.code,
                type: 100
              },
              success: (res) => {
                const code = res.statusCode.toString()
                if (code.startsWith('2')) {
                  wx.setStorageSync('token', res.data.token)
                }
                resolve()
              }
            })
          }
        }
      })
    })
  }
}

export { Token }