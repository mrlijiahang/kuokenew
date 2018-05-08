// pages/home/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '您的订单',
    num: 0,
    array: []
  },
  submit: function () {
    if (wx.getStorageSync('needPerfect') === true) {
      wx.request({
        url: 'https://huoke.chinabyte.com/index.php/order/add_order',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
        },
        data: {
          uid: wx.getStorageSync('userId'),
          cids: wx.getStorageSync('abc')
        },
        success: res => {
          if (res.data.code === 1000) {
            wx.showToast({
              title: '订单提交成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              success: () => {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 2
                  })
                }, 1500)
              }
            })
          } else {
            wx.showToast({
              title: '订单提交失败',
              icon: 'none',
              duration: 2000,
              mask: true,
              success: () => {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }
            })
          }
        }
      })
    } else if (wx.getStorageSync('needPerfect') === false) {
      wx.navigateTo({
        url: '../login/index',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      array: wx.getStorageSync('abc1'),
      num: wx.getStorageSync('abc1').length
    })
  }
})