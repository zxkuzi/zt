// index.js
const app = getApp();
Page({
    data: {
        // 组件参数设置，传递到组件
        defaultData: {
            title: "我的主页", // 导航栏标题
        },
        flag:true,
        userInfoArr:[],
        loginFlag:false,
        buttonText:'去登录',
        userInfo:[],
        userName:''
    },
    goToaddInfo(e){
      console.log(e.currentTarget.dataset.buttontxt)
      // return 
      // let btnText = e.currentTarget.dataset.buttonText;
      console.log(e.currentTarget.dataset.buttontxt)
      if(e.currentTarget.dataset.buttontxt == "去登录") {
        
        wx.navigateTo({
          url: './../index/index',
        })
        
      }else {
        wx.navigateTo({
          url: './../addInfo/index',
        })
      }
    },
    goToLogin(){
      console.log(88)
      
    },
    onLoad() {
      // var companyInfo = wx.getStorageSync('companyInfo');
      // if(companyInfo.userNameVal.userName == 'admin') {
      //   this.setData({
      //     flag:false
      //   })
      // }
      // console.log(this.data.userName)
      // var userInfo = wx.getStorageSync('user');
      // this.getPicInfo(userInfo,companyInfo);
    },
    previewImage:function(event){
      console.log(event)
      wx.previewImage({
        urls: [event.currentTarget.dataset.url] // 需要预览的图片http链接列表
      })    
    },
    getPicInfo(userInfo,companyInfo){
      // console.log(companyInfo.userNameVal)
      wx.showLoading({
        title: '正在加载中...',
        mask:true
      })
      wx.cloud.callFunction({
        name:'getPicInfo',
        data:{
          companyNo:companyInfo.userNameVal
        }
      }).then(res=>{
        if(res.result && res.result.data && res.result.data.length >0) {
          this.setData({
            flag:true
          })
          res.result.data.map(item=>{
            console.log(item.picList)
            item.picList.map(v=>{
              console.log(v) 
            })
          })
          this.setData({
            userInfoArr:res.result.data,
            userInfo:userInfo
          })
          // console.log(this.data.userInfoArr) 
        }else {
          this.setData({
            flag:true
          })
        }
        wx.hideLoading()
      }).catch((e)=>{
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon:'error',
          mask:true
        })
      })
    },
    uploadFilePromise(fileName, chooseResult) {
      return wx.cloud.uploadFile({
        cloudPath: fileName,
        filePath: chooseResult
      });
    },
    onReady(){
      // var companyInfo = wx.getStorageSync('companyInfo');
      // if(!companyInfo){
      //   this.setData({
      //     loginFlag:true,
      //     flag:false
      //   })
      //   return;
      // }
    },
    onShow(){
      var companyInfo = wx.getStorageSync('companyInfo');
     
      if(!companyInfo){
        this.setData({
          loginFlag:true,
          flag:false,
          buttonText:'去登录'
        })
      }else if(companyInfo.userNameVal=='admin') {
        console.log(9999)
        this.setData({
          flag:true,
          // buttonText:'去填写'
        })
        console.log(this.data.userName)
        var userInfo = wx.getStorageSync('user');
        this.getPicInfo(userInfo,companyInfo);
      }else{
        console.log(888)
      
        this.setData({
          flag:false,
          buttonText:'去填写'
        })
      }
    
    }
})