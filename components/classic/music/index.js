// components/classic/music/index.js
import { classicBeh } from "../classic-beh.js"
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   * 音乐api 老板API 新版API
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false,
  },
  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached() {
    // mMgr.pause()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus() {
      if(mMgr.paused) {
        this.setData({
          playing: false
        })
        return 
      }
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(() => {//界面上点击播放
        this._recoverStatus()
      })
      mMgr.onPause(() => {//界面上点击停止
        this._recoverStatus()
      })
      mMgr.onStop(() => {//自带的播放器关掉
        this._recoverStatus()
      })
      mMgr.onEnded(() => {//自然播放完成的情况
        this._recoverStatus()
      })
    }
  }
})
