// pages/home/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '您的订单',
    array: []
  },
  submit: function(){
    console.log('是否有手机号')
    console.log(wx.getStorageSync('abc'))
    if (wx.getStorageSync('needPerfect') === true){
      // 调用借口
      wx.request({
        url: 'http://huoke.chinabyte.net/index.php/order/add_order',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
        },
        data:{
          uid: wx.getStorageSync('userId'),
          cids: wx.getStorageSync('abc')
        },
        success:res=>{
          if(res.data.code === 1000){
            wx.showToast({
              title: '订单提交成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              success:()=>{
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 2
                  })
                },1500)
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

  

    } else if (wx.getStorageSync('needPerfect') === false){
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
      array: wx.getStorageSync('abc1')
    })
    console.log(this.data.array+ 'dasdsa')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getStorageSync("uid"))
    console.log(wx.getStorageSync('abc'));
    // wx.request({
    //   url: 'http://huoke.chinabyte.net/index.php/order/add_order',
    //   method:"POST",
    //   header:{
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     'Cookie': 'ci_session=' + wx.getStorageSync('sessionID')
    //   },
    //   data:{
    //     "uid": wx.getStorageSync('uid')
    //   },
    //   success:res=>{
    //     console.log(res)
    //   }

    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})