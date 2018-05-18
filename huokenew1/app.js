import { Session } from './utils/session.js';
import { dataSource } from './utils/dataSource.js';
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log('品牌===' + res.brand);
        console.log('型号===' + res.model); 
        console.log('微信版本===' + res.version); 
      }
    })
    console.log('swiper是否能使用===>' + wx.canIUse('swiper'));
    console.log('scroll是否能使用===>' + wx.canIUse('scroll-view'));
    // 校验层
    var session = new Session();
    session.verify();
    // 数据层
    var Data = new dataSource();
    Data.fetch();
  }
})

