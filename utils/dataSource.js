import { Config } from 'config.js';
class dataSource {
  constructor() {
    this.dataUrl = Config.restUrl + 'category/category_list';
  }
  fetch() {
    wx.request({
      url: this.dataUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      method: 'POST',
      success: function(res) {
        var data1 = res.data.data.slice(0, 10);
        data1.map(item => {
          item.list = [];
        })
        var data2 = res.data.data.slice(10, 50);
        data2.map(item => {
          item.isSelect = false;
        })
        var dataSource = [];
        for (var i = 0; i < 10; i ++){
          data1[i].list.push(data2[4*i]);
          data1[i].list.push(data2[4*i+1]);
          data1[i].list.push(data2[4*i+2]);
          data1[i].list.push(data2[4*i+3]);                              
        }
        wx.setStorageSync('listData', JSON.stringify(data1))
      }
    })
  }
}
export { dataSource };