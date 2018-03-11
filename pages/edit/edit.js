// pages/edit/edit.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      data: {
        item: {
          key: "",
          value: {
            title:"",
            content:""
          },
          create_time: "",
          update_time: "",
          state: 1
        },
        isNew:false,
        focus: true
      },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var item = this.data.item;
      item.key = options.key;
      this.setData ({
        item: item
      })
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
      this.loadData( this.data.item.key );
  },

  onSubmit:function(event) {
      var item = this.data.item;
      item.value.content = event.detail.value.content;
      this.setData( {
        item:item
      });
  },

  saveData: function() {
      var item = this.data.item;
      var now = Data.parse(new Data()) /1000;
      item.update_time = now;
      this.setData ({
          item: item
      });
      app.store(this.data.item, function(res) {
        if(res) {
          wx.showToast({
            title: '保存成功',
          });
          wx.navigateBack({});
        }else {
            wx.showToast({
              title: '保存失败',
            })
        }
      });
  },

  onDelete: function(event) {
      app.destroy(this.data.item, function(res) {
        if(res) {
          wx.showToast({
            title: '删除成功',
          });
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: '删除失败',
          });
        }

      })
  },

  loadData: function(key) {
    var that = this;
    app.show(this.data.item.key, function(res) {
      that.setData ({
        item: res
      });
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