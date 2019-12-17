// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
    like: {
      type: Boolean,
      value: false,
      observer: function() {

      }
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    //封装在内部，开发出来的
    //哪些功能在组件里面
    
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png" 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGetUserInfo(e) {
      console.log(e.detail.userInfo)
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        console.log(25)
      } else {
        console.log(27)
        //用户按了拒绝按钮
      }
    },
    onLike(event) {

      if(this.properties.readOnly) {
        return
      }

      let like = this.properties.like
      let count = this.properties.count

      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like 
      })
      console.log(like)
      // this.properties.like = !like
      //激活自定义的参数(组件向外传递数据)
      let behavior = this.properties.like ? "like" : "cancel"
      this.triggerEvent("like",{
        behavior: behavior
      },{})
    }
  }
})
