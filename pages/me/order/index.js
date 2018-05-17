// pages/me/order/index.js
Page({
  data: {
    dataSource:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://huoke.chinabyte.com/index.php/order/order_list',
      data: {
        uid: wx.getStorageSync('userId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      method: 'POST',
      success: function(res) {
        // console.log(res.data.data.orders.map((item)=>{
        //   return item.create_time
        // }))
        // that.setData({
        //   dataSource: res.data.data.orders
        // })
        res.data.data.orders.map((item) => {
          item.create_time = that.timestampToTime(item.create_time)
        })
        that.setData({
          dataSource: res.data.data.orders
        })
      }
    })
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    return Y+ M + D;
  }

})