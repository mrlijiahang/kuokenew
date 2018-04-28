// pages/me/index.js
Page({
  data: {
    userName: wx.getStorageSync('userName'),
    avatarUrl: wx.getStorageSync('avatarUrl')
  },
  click: function(){
    wx.navigateTo({
      url: './order/index',
    })
  }
})