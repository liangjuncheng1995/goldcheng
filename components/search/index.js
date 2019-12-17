// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev 
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords:[],
    // dataArray: [],
    searching: false,
    q: '',
    // loading: false,
    loadingCenter: false
  },

  attached() {
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      console.log("搜索组件的滚动事件")
      if(!this.data.q) {
        return
      }
      if(this.isLocked()) {
        return
      }
      if(this.hasMore()) {
        this.locked()//加锁
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unlocked() //解锁
        },() => {//网络请求失败的时候需要解锁
          this.unlocked() //解锁
        })
      }
    },
    

    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },
    onDelete() {
      this.initialize()
      this.closeResult()
      this.hideLoadingCenter()
    },
    onConfirm(event) {
      this.showResult()
      this.showLoadingCenter()
      this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
       
        keywordModel.addToHistory(q)
        this.hideLoadingCenter()
      })
    },
    showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    showResult() {
      this.setData({
        searching: true
      })
    },
    closeResult() {
      this.setData({
        searching: false,
        q: ""
      })
    }
  }
})
