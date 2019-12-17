// pages/book/book.js
import { BookModel } from "../../models/book.js"
import {
  random
} from '../../util/common.js'
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //纯粹callback 会陷入回调的地狱 剥夺return
    //promise 解决回调地狱，，代码风格 多个异步等待合并
    // async await ES2017
    // 一次调用，多次调用服务器API 链式调用

    books: [],
    searching: false,
    more: ""

  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("book")
    const hotList = bookModel.getHotList()
    hotList.then(res => {
      // console.log(res)
      this.setData({
        books: res
      })
    })



    // const hotList = bookModel.getHotList()
    // hotList.then(res => {
    //   console.log(res)
    //   return bookModel.getBookCount()
    // }).then(res => {
    //   console.log(res)
    // })

    //Promise 对象 函数
    //对象可以保存状态，函数不行
    //闭包函数可以保存状态

    // Promise第一步
    // 异步代码 写在Promise的函数中，第二步
    // const promise = new Promise((resolve, reject) => {
    //   //Promise的三种状态
    //   //pending(进行中) fulfilled(已成功) reject(已失败)
      
    //   wx.getSystemInfo({
    //     success: function(res) {
    //       resolve(res)
    //     },
    //     fail: function(res) {
    //       console.log(res) 
    //       reject(res)
    //     }
    //   })
    // })
    // promise.then((res) => {
    //   console.log(res)
    // },(error) => {
    //   console.log(error)
    // })
  },
  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  },
  // 监听页面滚动到底部
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  },
})