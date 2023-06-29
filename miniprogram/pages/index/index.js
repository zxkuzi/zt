const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    flag:false,
    password:'',
    userNameVal:'',
    companyNo:'',
    companyName:'',
    passwordVal:'',
    openid:'',
    isShowUserName:false,
    userInfo:null
  },
  getUserName(e){
    console.log(e)
  },
  gzc(){
    this.setData({
      flag:true,
      userNameVal:'',
      passwordVal:'',
      companyName:''
    })
  },
  backLogin(){
    this.setData({
      flag:false,
      userNameVal:'',
      passwordVal:'',
      companyName:''
    })
  },
   //获取用户信息
   getUserProfile(event){
     console.log(11)
    wx.getUserProfile({
      desc: '用于提供个人服务', //声明获取用途,会展示在弹框中
      success: (res) => {
          let user = res.userInfo
          console.log(res)
          wx.setStorageSync('user',user) //保存用户信息到本地缓存
          this.setData({
            isShowUserName : true,
            userInfo : user
          })
          const { userNameVal,passwordVal } = event
          wx.cloud.callFunction({
            name:"getLoginData",
            data:{
              userName:userNameVal,
              password:passwordVal
            }
          }).then(res=>{
              if(res.result.data && res.result.data.length==1) {
                wx.hideLoading()
                wx.showToast({
                  icon:"success",
                  title:"登录成功",
                  mask:true
                }).then(()=>{
                  let data = {
                    userNameVal:this.data.userNameVal,
                    passwordVal:this.data.passwordVal
                  }
                  wx.setStorageSync('companyInfo',data)
                  // wx.switchTab({
                  //   url:'./../shouye/index'
                  // })
                  wx.navigateBack()
                  // wx.switchTab({
                  //   url:'./../shouye/index'
                  // })
                })
              }else{
                wx.showToast({
                  icon:"error",
                  title:"账号或密码错误,请重试",
                  mask:true
                })
              }
          })
      },
      fail: (res) => {
            console.log("获取用户信息失败",res)
      },
    })
  },
  getData(){
   
  },
  regestry(){
    this.setData({
      flag:true
    })
    
    if(!this.data.userNameVal || !this.data.passwordVal || !this.data.companyName) {
      wx.showToast({
        title: '请输入完整信息',
        mask:true,
        icon:'error'
      })
    } else {
      wx.showLoading({
        title:'正在注册...'
      })
      let paramsData = {
        userName:this.data.userNameVal,
        password:this.data.passwordVal,
        company:this.data.companyName,
        companyNo:this.data.userNameVal
      }
      wx.cloud.callFunction({
        name:'getLoginData',
        data:paramsData
      }).then(res=>{
        if(res.result.data && res.result.data.length) {
          wx.showToast({
            title: '该账号已注册',
            icon:'error',
            mask:true
          })
          this.setData({
            flag:'',
            userNameVal:'',
            passwordVal:''
          })
        }else{
          this.goLogin(paramsData)
        }
      }).catch(()=>{
        wx.showToast({
          title: '网络错误',
          icon:'error',
          mask:true
        })
      }).finally(()=>{
        wx.hideLoading()
      })

    }
  },
  goLogin(data){     
    wx.cloud.callFunction({
      name:'addUser',
      data:data
    }).then(res=>{
      wx.showToast({
        icon:"success",
        title:"注册成功",
        mask:true
      })
      this.setData({
        flag:false,
        userNameVal:'',
        passwordVal:''
      })
    }).catch(()=>{
      wx.showToast({
        icon:"error",
        title:"注册失败，请稍后再试",
        mask:true
      })
    })
  },
  regestyName(e){
    this.setData({
      companyName:e.detail.value
    });
    
  },
  getCompanyNo:function(e){
    this.setData({
      userNameVal:e.detail.value
    })
  },
  getCompanyPassword:function(e){
    this.setData({
      passwordVal:e.detail.value
    });
    
  },
  //登录事件
  login(){
      if(!this.data.userNameVal || !this.data.passwordVal){
        wx.showToast({
          title: '请填写完整信息',
          icon:'error',
          mask:true
        })
        return;
      }
      wx.showLoading({
        title:'正在登录'
      })
      this.setData({
        flag:false
      })
      let params = {
        userNameVal:this.data.userNameVal,
        passwordVal:this.data.passwordVal
      }
      this.getUserProfile(params)
      var user = wx.getStorageSync('user'); //从本地缓存取用户信息
      if (user && user.nickName){  //如果用就显示本地缓存
          this.setData({
            isShowUserName : true,
            userInfo : user
          })
      }
   

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getUserInfo',          
 }).then(res=>{
      //res就将openid返回了
      this.setData({
          openid : res.result.openid
      })  
      console.log(this.data.openid)
      //可以把openid放入缓存
      wx.setStorageSync('openid',res.result.openid)           
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
      /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
 
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