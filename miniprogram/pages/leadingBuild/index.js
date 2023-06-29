// pages/leadingBuild/index.js
var gData;
Page({
  navbarTap: function(e){
    let newData = JSON.parse(JSON.stringify(gData))
    this.setData({
      leadingBuildData:newData
    })
    let srr = this.data.leadingBuildData.filter(item=>{
      return item.title == e.currentTarget.dataset.itemdata
    })
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      currentItem:e.currentTarget.dataset.itemdata,
      leadingBuildData:srr
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    leadingBuildData:[],
    navbar: ['清廉企业', '党建活动', '非公党建联盟'],
    currentTab: 0,
    currentItem:'清廉企业',
    vertical: false,
    autoplay: true,
    interval: 6000,
    duration: 500
  },

  getData(){
    wx.showLoading({
      title: '数据正在加载中....',
    })
    wx.cloud.callFunction({
      name:'getLeadingBuild'
    }).then(res=>{
      gData = res.result.data[0].data;
      let newda = JSON.parse(JSON.stringify(gData))
      let firstDATA = newda.filter(item=>{
        return item.title == this.data.currentItem
      })
      this.setData({
        text:'uuuuu',
        leadingBuildData:firstDATA
      })
      console.log(this.data.leadingBuildData)
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})