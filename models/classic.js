import {HTTP} from '../util/http-p.js'
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    return this.request({
      url: '/classic/latest',
      // 写入缓存的操作可以在外面操作
      // success: (res) => {
      //   sCallback(res)
      //   this._setLatestIndex(res.index)
      //   let key = this._getKey(res.index)
      //   wx.setStorageSync(key, res)
      // }
    })
  }
  //下一篇和上一篇的方法
  getClassic(index,nextOrPrevious,sCallback) {
    //从缓存中拿数据
    let key = nextOrPrevious=='next' ?  this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      return this.request({
        // url: '/classic/' + index + '/' + nextOrPrevious,
        url: `/classic/${index}/${nextOrPrevious}`,
        // success: (res) => {
        //   wx.setStorageSync(this._getKey(res.index), res)
        //   sCallback(res)
        // }
      })
    } else {
      classic.storage = true
      return this._promise(classic)
    }
  }
  _promise(res) {
    return new Promise((resolve,reject) => {
      resolve(res)
    })
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  getMyFavor(success) {
    const params = {
      url: '/classic/favor',
      success: success
    }
    return this.request(params)
  }


  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

}

export { ClassicModel }