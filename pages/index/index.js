// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.setData({
        items:[]
      });
      var that = this;
      app.globalData.hotapp.wxlogin(function(res) {
          that.onLoadData();
      });
  },

  onNewItem:function(event) {
      wx.navigateTo({
        url: '../create/create',
      })
  },

  onEditItem:function(event) {
      wx.navigateTo({
        url: '../edit//index?key=' + event.currentTarget.dataset.key,
      })
  },

  onLoadData: function(){
      var that = this;
      app.getItems(function(items) {
          that.setData({
              items:items
          });
      });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      wx.showToast({
        title: '正在同步数据',
        icon:'loading'
      });

      var tempData = this.data.items;
      var that = this;
      app.checkVersion(function(shouldPullData) {
          if(shouldPullData) {
            var filters = {
              prefix:app.globalData.hotapp.getPrefix('item')
            };
            app.globalData.hotapp.searchkey(filters, function(res) {
              if(res.ret == 0) {
                app.updataVersion(function(success) {
                  if(success) {
                    tempData = that.syncServerDatatoLocal(tempData, res.data.items);
                    tempData.forEach(function(item, index, arr) {
                        arr[index] = app.formatItem(item);
                        arr[index].state = 2;
                    });
                    that.setData({
                      items:tempData
                    });
                    wx.setStorageSync('items', tempData);
                    that.syncLocalDataToServer(tempData);
                  }
                });
              }
            });
          } else {
            that.syncLocalDataToserver(tempData);
          }
      });
  },

  syncServerDatatoLocal: function(localData, serverData) {
    var that = this;
    var localHash = new Array();
    localData.forEach(function(item) {
      localHash[item.key] = item;
    });

    serverData.forEach(function(item) {
      var t = localHash[item.key];
      if(!t) {
        localHash[item.key] = item;
      }
      if(t && t.state !=3) {
        item.state = 2;
        item = app.formatItem(item);
        localHash[item.key] = item;
      }
    });

    localData.forEach(function(item, index, arr) {
      var t = serverHash[item.key];
      if(!t && item.state ==2) {
        console.log(item);
        delete localHash[item.key];
      }
    });

    var result = new Array();
    for(var prob in localHash) {
      result.push(localHash[prob]);
    }

    result.sort(function(a,b) {
      return a.create_time < b.create_time;
    });

    console.log(result);

    return result;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})