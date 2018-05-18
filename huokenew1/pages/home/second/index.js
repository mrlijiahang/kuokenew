Page({
  data: {
    indexSize: 0,
    indicatorDots: false,
    autoplay: false,
    duration: 0,
    list: '',
    msg: '0',
    ljh: [],
    detail: []
  },
  onLoad: function (options) {
    console.log('数据源===>');
    console.log(JSON.parse(wx.getStorageSync('listData')));
    this.setData({
      indexSize: options.index - 1,
      detail: JSON.parse(wx.getStorageSync('listData'))
    })
  },
  bgclick: function (e) {
    var indexSize = this.data.indexSize;
    var index = e.currentTarget.dataset.index;
    var select = e.currentTarget.dataset.select;
    let start = 'detail[' + indexSize + '].list[' + index + '].isSelect';
    let isSelect = this.data.detail[indexSize].list[index].isSelect;
    this.setData({
      [start]: !isSelect
    })
    // 我自己写的
    // 数据源
    var dataSource = this.data.detail;
    var chooseArr = [];
    var chooseArr1 = [];
    for (let i = 0; i < 10; i++) {
      for (let x = 0; x < 4; x++) {
        if (dataSource[i].list[x].isSelect) {
          chooseArr.push(dataSource[i].list[x].cid)
          chooseArr1.push({ name: dataSource[i].list[x].name, img: dataSource[i].list[x].image })
        }
      }
    }
    wx.setStorageSync('abc', chooseArr);
    wx.setStorageSync('abc1', chooseArr1);
    this.setData({
      msg: wx.getStorageSync('abc').length
    })
  },
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.indexes);
    wx.navigateTo({
      url: '../detail/index?indexes=' + e.currentTarget.dataset.indexes + '&index=' + e.currentTarget.dataset.index + '&type=' + e.currentTarget.dataset.type,
    })
  },
  change(e) {
    this.setData({
      indexSize: e.detail.current
    })
  },
  scrollTo(e) {
    this.setData({
      indexSize: e.target.dataset.index
    })
  },
  imgClick() {
    console.log(1)
  },
  reservationClick: function () {
    console.log(this.data.msg)
    if (this.data.msg == '0') {
      wx.showToast({
        title: '请选择服务',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.navigateTo({
        url: '../order/index',
      })
    }
  }
})