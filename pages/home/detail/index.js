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
  submit :function(){
    // 调用订单接口那一套
    if (wx.getStorageSync('needPerfect') === true){
      console.log(this.data.dataSource.cid)
      wx.navigateTo({
        url: '../login/index',
      })
      // wx.request({
      //   url: 'http://huoke.chinabyte.net/index.php/order/add_order',
      //   method:'POST',
      //   header:{
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'Cookie': 'ci_session=' + wx.getStorageSync('sessionId')
      //   },
      //   data:{
      //     uid: wx.getStorageSync('userId'),
      //     cids:this.data.dataSource.cid.toString()
      //   },
      //   success :res=>{
      //     console.log(res)
      //   }
      // })
    } else if (wx.getStorageSync('needPerfect') === false){
  
    
    }
   
  },
  data: {
    dataSource: {},
    isShow: false
  }
})