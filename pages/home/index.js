// pages/home/index.js
Page({
  data: {
    dataSource: []
  },
  click: function(e){
    var index = e.target.dataset.index;
    wx.navigateTo({
      url: 'second/index?index=' + index,
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://huoke.chinabyte.net/index.php/category/category_list',
      data: {
        'is_show': 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      },
      method: 'POST',
      success: function(res) {
        var dataSource = res.data.data;
        dataSource.map(item => {
          item.desc = item.desc.replace(/<.*?>/ig, "");
        })
        wx.setStorageSync('showData', JSON.stringify(dataSource))
        that.setData({
          dataSource: dataSource
        })
      }
    })
  },
  pushClick: function (e) {
    wx.navigateTo({
      url: './detail/index?type=' + e.currentTarget.dataset.type + '&item=' + e.currentTarget.dataset.item,
    })
  },
  onShareAppMessage: function () {
    return {
      title: '获客营销',
      desc: '一款神奇的营销程序',
      path: '/pages/home/index'
    }
  },
})