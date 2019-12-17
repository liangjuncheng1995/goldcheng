import { config } from "../config.js"
import { Base64 } from 'js-base64'
import { Token } from "../models/token.js"
// import { config as config1 } from "/config.js" 使用的时候可以用 as 来取导出的名字
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效， 请前往申请',
  3000: "期刊不存在"
}
// 解构
class HTTP {
  request({url, data, method}) {
    
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url,resolve,reject,data,method, noRefetch = false) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json",
        // "appkey": config.appkey
        Authorization: this._encode()
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // if(params.success)
          resolve(res.data)

        } else {
          if (code == "403") {
            if (!noRefetch) {
              this._refetch(
                url,
                resolve,
                reject,
                data,
                method
              )
            }
          } else {
            reject()
            const error_code = res.data.error_code
            this._show_error(error_code)
          }
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? top : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  _refetch(...params) {
    var token = new Token()
    token.getTokenFromServer().then((res) => {
      this._request(...params, true)
    })
  }

  _encode() {
    const token = wx.getStorageSync("token")
    const base64 = Base64.encode(token + ':')
    return "Basic " + base64
  }
}

export { HTTP }