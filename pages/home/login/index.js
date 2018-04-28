// pages/home/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getMsg: '获取验证码',
    timer: 1,
    disabled: false,
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value,
    })
  },
  formSubmit: function(e){
    wx.request({
      url: 'http://huoke.chinabyte.net/index.php/user/update_user',
      method:'POST',
      data:{
        "uid" : wx.getStorageSync('uid').toString(),
        "name": e.detail.value.inputName.toString(),
        "telephone":e.detail.value.inputPhone.toString(),
        "company": e.detail.value.inputCompany.toString(),
        "address": e.detail.value.inputAddress.toString(),
        "industry": e.detail.value.inputIndustry.toString(),
        "email": e.detail.value.inputEmail.toString(),
        "url":e.detail.value.inputUrl.toString()
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionID')
      },
      success: res => {
        console.log(res)
      }

    })

    console.log(e.detail.value.inputName)
    console.log(e.detail.value.inputPhone)
    console.log(e.detail.value.inputCompany)
    console.log(e.detail.value.inputAddress)
    console.log(e.detail.value.inputIndustry)
    console.log(e.detail.value.inputEmail)
    console.log(e.detail.value.inputUrl)
  },
  sendmessg: function(){
    console.log('获取验证码');
    wx.request({
      url: 'http://huoke.chinabyte.net/index.php/generic/sms_code',
      method:'POST',
      data:{
        mobile:'15840124304'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie':'ci_session='+wx.getStorageSync('sessionID')
      },
      success :function(res){
        console.log('成功')
        console.log(res)
      },    
    })

    var timer = this.data.timer;
    if (timer == 1) {
      var that = this;
      var time = 59;
      var inter = setInterval(function () {
        console.log("倒计时");
        that.setData({
          getMsg: time + "s",
          disabled: true
        })
        time--;
        if (time < 0) {
          timer = 1;
          clearInterval(inter);
          that.setData({
            getMsg: "获取验证码",
            timer: 1,
            disabled: false
          })
        }
      }, 1000)
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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