// pages/home/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getMsg: '获取验证码',
    timer: 1,
    disabled: false,
    telphone: '',
    sms: ''
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '获客营销',
      desc: '一款神奇的营销程序',
      path: '/pages/login/index'
    }
  },
  formSubmit: function (e) {
    if (e.detail.value.inputName === "" && e.detail.value.inputPhone.length !== 11 && e.detail.value.inputCompany === "" && e.detail.value.inputEmail === "") {
      wx.showToast({
        title: '请填写必填项',
        icon: 'loading',
        duration: 1500
      })
    }
    else {
      wx.request({
        url: 'https://huoke.chinabyte.com/index.php/generic/check_sms_code',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
        },
        data: {
          sms_code: this.data.sms.toString()
        },
        success: res => {
          console.log('短信验证')
          console.log(res)
          if (res.data.code == 1000) {
            console.log(res.data.data)
            // 验证成功才行
            wx.request({
              url: 'https://huoke.chinabyte.com/index.php/user/update_user',
              method: 'POST',
              data: {
                "uid": wx.getStorageSync('userId').toString(),
                "name": e.detail.value.inputName.toString(),
                "telephone": e.detail.value.inputPhone.toString(),
                "company": e.detail.value.inputCompany.toString(),
                "address": e.detail.value.inputAddress.toString(),
                "industry": e.detail.value.inputIndustry.toString(),
                "email": e.detail.value.inputEmail.toString(),
                "url": e.detail.value.inputUrl.toString()
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
              },
              success: res => {
                console.log('请求成功')
                console.log(res)
                wx.setStorageSync('needPerfect', true);
                wx.showToast({
                  title: '信息提交成功',
                  icon: 'success',
                  duration: 1500
                })
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            e.detail.value.inputPhone = ''
            wx.showToast({
              title: '请填写验证码',
              icon: 'loading',
              duration: 1500
            })


          }
        }
      })
    }













    console.log(e.detail.value.inputName)
    console.log(e.detail.value.inputPhone)
  },
  telInput: function (e) {
    this.setData({
      telphone: e.detail.value
    })
  },
  smsCode: function (e) {
    this.setData({
      sms: e.detail.value
    })
  },
  sendmessg: function (e) {
    console.log('获取验证码');
    if (this.data.telphone.length !== 11){
      wx.showToast({
        title: '请填写手机号',
        icon: 'loading',
        duration: 1500
      })
      
    }else{
      wx.request({
        url: 'https://huoke.chinabyte.com/index.php/generic/sms_code',
        method: 'POST',
        data: {
          mobile: this.data.telphone.toString()
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
        },
        success: res => {
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
 
  }
})