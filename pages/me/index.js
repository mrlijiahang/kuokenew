// pages/me/index.js
Page({
  data: {
    userName: '',
    avatarUrl: ''
  },
  onLoad: function (options){
    this.setData({
      userName: wx.getStorageSync('userName'),
      avatarUrl: wx.getStorageSync('avatarUrl')
    })
  },
  onShow: function (){
    this.setData({
      userName: wx.getStorageSync('userName'),
      avatarUrl: wx.getStorageSync('avatarUrl')
    })
  },
  click: function(){
    wx.navigateTo({
      url: './order/index',
    })
  }
})