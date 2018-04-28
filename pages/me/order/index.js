// pages/me/order/index.js
Page({
  data: {
    dataSource:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://huoke.chinabyte.net/index.php/order/order_list',
      data: {
        uid: wx.getStorageSync('userId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          dataSource: res.data.data.orders
        })
      }
    })
  }
})