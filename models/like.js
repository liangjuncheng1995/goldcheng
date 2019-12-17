import {HTTP} from "../util/http-p.js"

class LikeModel extends HTTP {
  //artID 喜欢的是哪一种的订阅
  like(behavior, artID, category) {
    let url = behavior == "like" ? "/like" : "/like/cancel"
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID,category,sCallback) {
    return this.request({
      url: "/classic/" + category + "/" + artID + "/favor",
      // url: `classic/${category}/${artID}/favor`,
      success: sCallback
    })
  }

  
}

export { LikeModel }

