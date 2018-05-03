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
  onShareAppMessage:function(){
    return{
      title: '获客营销',
      desc: '一款神奇的营销程序',
      path:'/pages/login/index'
    }
  },
  formSubmit: function(e){
    wx.request({
      url: 'http://huoke.chinabyte.net/index.php/user/update_user',
      method:'POST',
      data:{
        "uid": wx.getStorageSync('userId').toString(),
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
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      success: res => {
        console.log(res)
        wx.setStorageSync('needPerfect', true);
        wx.navigateBack({
          delta: 1
        })
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
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
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
  }
})