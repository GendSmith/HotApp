// pages/create/create.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      item: {
        key: "",
        value: {
          title:"",
          content:""
        },
        creat_time:"",
        update_time:"",
        state:1
      },
      isNew:false,
      focus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var item = this.data.item;
      item.key = app.globalData.hotapp.genPrimaryKey('item');
      this.setData({
        item:item;
      })
  },

  onSubmit:function(event) {
    console.log(event);
    var item = this.data.item;
    item.value.title = event.detail.value.title;
    item.value.content = event.detail.value.content;
    this.setData ({
      item:item
    });
    this.saveData();
  },

  saveData:function() {
    var item = this.data.item;
    var now = Data.parse(new Data())/1000;
    item.update_item = now;
    item.create_time = now;
    this.setData({
      item: item
    });
    app.store(this.data.item, function(res) {
      if(res) {
        wx.showToast({
          title: '保存成功',
        });
        wx.navigateBack({
        });
      }else {
        wx.showToast({
          title: '保存失败',
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})