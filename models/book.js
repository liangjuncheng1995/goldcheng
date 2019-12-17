import {
  HTTP 
} from '../util/http-p.js'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: "/book/hot_list",
    })
  }

  getMyBookCount() {
    return this.request({
      url: "/book/favor/count"
    })
  }

  getBookCount() {
    return this.request({
      url: "/book/favor/count"
    })
  }

  getDetail(bid) { //获取书籍的详细信息
    return this.request({
      url: `/book/${bid}/detail`
    })
  }

  getLikeStatus(bid) { //获取当前书籍的点赞状态
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  getComments(bid) { //获取当前书籍的短评信息
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }

  postComment(bid, comment) { //提交当前书籍的短评
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  //搜索接口
  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }

}


export {
  BookModel
}