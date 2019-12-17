import {HTTP} from '../util/http-p.js'

class KeywordModel extends HTTP {
  key = 'q'
  maxlength = 10
  getHistory() {
    var words = wx.getStorageSync(this.key)
    if(!words) {
      return []
    }
    return words
  }

 

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    //获取缓存
    let words = this.getHistory()
    const has = words.includes(keyword)
    //队列
    if(!has) {//如果没有缓存就写入缓存
      // 数组末尾删除， keyword数组第一位
      const length = words.length
      if (length >= this.maxlength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export { KeywordModel }