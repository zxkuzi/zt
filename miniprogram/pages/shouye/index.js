// pages/shouye/index.js
var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[
      { title: '郑投产业园组织开展“诚信，让河南更出彩”主题宣传教育活动' },
      { title: '郑投产业园组织开展社会主义核心价值观宣传教育' },
      { title: '郑投产业园公司组织开展“爱岗敬业、诚实守信、奉献社会”职业道德教育活动' },
      { title: '郑投产业园组织开展社会公德、个人品德教育活动' },
      { title: '以诚待人，以信律己│郑投产业园组织开展诚信教育主题活动' }
    ],
    picArr:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },
  getData(){
    db.collection('swiperList').get().then(res=>{
      this.setData({
        picArr:res.data[0].data
      })
    })
  },
  goLeadingBuild(){
    wx.navigateTo({
      url: './../leadingBuild/index',
    })
  },
  goInfoCollection(){
    wx.navigateTo({
      url: './../infoCollection/index',
    })
  },
  gopj(){
    wx.navigateTo({
      url: './../home/index',
    })
  },
  goAdvice(){
    wx.navigateTo({
      url: './../suggestion/index',
    })
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
    this.getData();
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