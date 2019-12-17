// pages/classic/classic.js
import { ClassicModel } from "../../models/classic.js"
import { LikeModel } from "../../models/like.js"
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    test: 1,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let a = "123"
    // console.log(`${a}456`)
    // console.log(`${this.test()}456`)
   
    const getLatest = classicModel.getLatest()
    getLatest.then(res => {
      // 写入缓存
      classicModel._setLatestIndex(res.index)
      let key = classicModel._getKey(res.index)
      wx.setStorageSync(key, res)
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
        // 扩展运算符
        // ...res
      })
    })
    // classicModel.getLatest((res) => {
    //   console.log(res)
    //   this.setData({
    //     classic: res,
    //     likeCount: res.fav_nums,
    //     likeStatus: res.like_status
    //     // 扩展运算符
    //     // ...res
    //   })
    // })
  },
  // test() {
  //   return 123
  // },
  //点击喜欢和取消喜欢的事件
  onLike(event) {
    console.log(event)
    // 接受组件传过来的参数（状态）
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
  },
  onNext() {//下一期
    this._undateClassic('next')
  },
  onPre() {//上一期
    this._undateClassic('previous')
  },
  _undateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious).then((res)  => {
      if (!res.storage) {
        // 写入缓存
        wx.setStorageSync(classicModel._getKey(res.index), res)
      }
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category).then((res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})