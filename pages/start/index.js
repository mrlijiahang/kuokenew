
Page({
  data: {
    firstLogin: false
  },
  onLoad: function () {
    this.setData({
      firstLogin: JSON.parse(wx.getStorageSync('firstLogin'))
    })
    if (!JSON.parse(wx.getStorageSync('firstLogin'))) {
      setTimeout(function () {
        wx.switchTab({
          url: '../home/index'
        })
      }, 2000);
    }
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log(e.detail.userInfo);
      wx.setStorageSync('userName', e.detail.userInfo.nickName);
      wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
      wx.setStorageSync('firstLogin', 'false');
      that.needPerfect(wx.getStorageSync('userId'))
    } else {
      //用户按了拒绝按钮
      console.log('用户拒绝');
      wx.setStorageSync('userName', '未授权');
      wx.setStorageSync('avatarUrl', 'http://www.chinabyte.com/w/n/yanghao/img/nj.jpg');
      wx.setStorageSync('firstLogin', 'true');
    }
    wx.switchTab({
      url: '../home/index'
    })
  },
  // 判断用户信息是否需要完善信息
  needPerfect(parm) {
    wx.request({
      url: 'https://huoke.chinabyte.com/index.php/user/get_userinfo',
      data: {
        uid: parm
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      method: 'POST',
      success: function (res) {
        if (!res.data.data.telephone) {
          wx.setStorageSync('needPerfect', false);
        } else {
          wx.setStorageSync('needPerfect', true);
        }
      }
    })
  }
})