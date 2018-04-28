Page({
  onLoad: function (options) {
    let data1 = JSON.parse(wx.getStorageSync('listData'));
    let data2 = JSON.parse(wx.getStorageSync('showData'));
    console.log(data2);
    console.log(options.item);
    console.log(data2[parseInt(options.item)]);
    let type = options.type;
    if (type === '1') {
      this.setData({
        isShow: false,
        dataSource: data1[parseInt(options.indexes)].list[parseInt(options.index)]
      })
    }else{
      this.setData({
        isShow: true,
        dataSource: data2[parseInt(options.item)]
      })
    }
  },
  data: {
    dataSource: {},
    isShow: false
  }
})