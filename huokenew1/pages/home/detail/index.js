Page({
  onLoad: function (options) {
    let data1 = JSON.parse(wx.getStorageSync('listData'));
    let data2 = JSON.parse(wx.getStorageSync('showData'));
    
    console.log(data2);
    // console.log(options.item);
    // console.log(data2[parseInt(options.item)]);
    let type = options.type;
    if (type === '1') {
      this.setData({
        isShow: false,
        dataSource: data1[parseInt(options.indexes)].list[parseInt(options.index)]
      })
    } else {
      this.setData({
        isShow: true,
        dataSource: data2[parseInt(options.item)]
      })
    }
  },
  submit: function () {
    // 调用订单接口那一套
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
          cids: this.data.dataSource.cid.toString()
        },
        success: res => {
          if (res.data.code === 1000) {
            wx.showToast({
              title: '订单提交成功',
              icon: 'success',
              mask: true,
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            })
          } else {
            wx.showToast({
              title: '订单提交失败',
              icon: 'none',
              mask: true,
              duration: 1000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
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
  data: {
    dataSource: {},
    isShow: false
  }
})