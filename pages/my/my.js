// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    anthorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 新版授权
    // button 让用户主动授权
    // 用户是否授权
    this.userAuthorized()

    this.getMyBookCount()

    this.getMyFavor()

    // wx.getUserInfo({
    //   success: data=> {
    //     console.log(data)
    //   }
    // })
  },
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
  getUserInfo(event) {
    console.log(event)
  },
  getMyFavor() {
    // classicModel.getMyFavor(res => {
    //   console.log(res)
    //   this.setData({
    //     classics: res
    //   })
    //   console.log(this.data.classics)
    // })
    classicModel.getMyFavor().then(res => {
      console.log(res)
      this.setData({
        classics: res
      })
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if(userInfo) {
      this.setData({
        anthorized: true,
        userInfo: userInfo
      })
    }
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  userAuthorized() {
    wx.getSetting({
      success:data=> {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data=> {
              this.setData({
                anthorized: true,
                userInfo: data.userInfo
              })
              console.log(this.data.userInfo)
            }
          })
        }
      }
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