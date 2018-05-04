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
    this.setData({
      indexSize: options.index - 1,
      detail: JSON.parse(wx.getStorageSync('listData'))
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
  imageClick: function (e) {
    var indexSize = this.data.indexSize;
    var index = e.target.dataset.index;
    var select = e.target.dataset.select;
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
          chooseArr1.push({name:dataSource[i].list[x].name ,img:dataSource[i].list[x].image})
        }
      }
    }
    console.log(JSON.stringify(chooseArr1))
    console.log(this.data.detail)
   
    
    wx.setStorageSync('abc', chooseArr);
    wx.setStorageSync('abc1', chooseArr1);
    this.setData({
      msg: wx.getStorageSync('abc').length
    })
  },
  reservationClick: function () {
    console.log(wx.getStorageSync('abc'));
    console.log(wx.getStorageSync('abc2'))
    wx.navigateTo({
      url: '../order/index',
    })
  }
})