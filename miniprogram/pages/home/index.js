// pages/leadingBuild/index.js
var gData;
Page({
  navbarTap: function(e){
    
 
  
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      currentItem:e.currentTarget.dataset.itemdata,

    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    leadingBuildData:[],
    navbar: ['评价标准', '评价公示'],
    currentTab: 0,
    currentItem:'清廉企业',
    vertical: false,
    autoplay: false,
    interval: 1000,
    duration: 500
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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