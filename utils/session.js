import { Config } from 'config.js';
class Session {
  constructor() {
    this.loginUrl = Config.restUrl + 'user/login';
    this.getUserInfo = Config.restUrl + 'user/get_userinfo';
  }
  // 检查本地是否缓存有session
  verify() {
    // var session = wx.getStorageSync('session');
    // if (!session) {
    //   this.getSessionFromServer();
    // }
    this.getSessionFromServer();
  }
  // 没有就去服务器获取session
  getSessionFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.loginUrl,
          data: {"jscode": res.code},
          header: {'content-type': 'application/x-www-form-urlencoded'},
          method: "post",
          success: function (res) {
            wx.setStorageSync('userId', res.data.data.uid);
            wx.setStorageSync("sessionId", res.data.data.session_id);
            that.needPerfect(res.data.data.uid);
          },
          fail: function (res) { },
          complete: function (res) {
            // 获取用户信息
            wx.getUserInfo({
              success: res => {
                that.setUserInfo(res.userInfo.nickName, res.userInfo.avatarUrl);
                that.needPerfect(wx.getStorageSync('userId'))
              },
              fail: function () {
                console.log('授权失败');
                wx.setStorageSync('userName', '未授权');
                wx.setStorageSync('avatarUrl', 'http://www.chinabyte.com/w/n/yanghao/img/nj.jpg');
              }
            })
          },
        })
      }
    })
  }
  setUserInfo(parm1, parm2) {
    wx.setStorageSync('userName', parm1);
    wx.setStorageSync('avatarUrl', parm2);
  }
  // 判断用户信息是否需要完善信息
  needPerfect (parm){
    wx.request({
      url: this.getUserInfo,
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
}

export { Session };