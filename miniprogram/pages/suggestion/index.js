// index.js
const app = getApp();
Page({
    data: {
        // 组件参数设置，传递到组件
        flag:true,
        userInfoArr:[],
        loginFlag:false,
        userInfo:[],
        userName:'',
        suggestArr:[],
        tel:'',
        description:'',
        currentType:'功能建议',
        currentTab: 0,
        typeArr:['功能建议','内容建议','BUG反馈','界面建议','交互建议','其他',]
    },
    onShow() {
        
        let _userInfo = wx.getStorageSync('companyInfo');
        console.log(_userInfo)
        if(!_userInfo){
          this.setData({
            loginFlag:false
          })
          return false;
        }else{
          this.setData({
            userName:_userInfo.userNameVal,
            loginFlag:true
          })
        }
        
        wx.cloud.callFunction({
          name:'getSuggestionList'
        }).then(res=>{
          this.setData({
            suggestArr:res.result.data
          })
          console.log(res.result.data)
        })
    },
    goToLogin(){
      wx.navigateTo({
        url: './../index/index',
      })
    },
    getType(e){
      this.setData({
        currentType:e.target.dataset.name,
        currentTab:e.target.dataset.idx
      })
      console.log(this.data.currentType)
    },
    submit(){
      console.log(this.data.tel,this.data.decription)
      let _userInfo = wx.getStorageSync('companyInfo');
      if(!this.data.decription) {
        wx.showToast({
          title: '请填写意见信息',
          mask:true,
          icon:'error'
        })
        return;
      }
      if(!this.data.tel) {
        wx.showToast({
          title: '请填写联系方式',
          mask:true,
          icon:'error'
        })
        return;
      }
      wx.cloud.callFunction({
        name:'addSuggestion',
        data:{
          companyName:_userInfo.userNameVal,
          type:this.data.currentType,
          decription:this.data.decription,
          tel:this.data.tel
        }
      }).then(res=>{
        wx.showToast({
          title: '反馈成功',
          icon:'success',
          mask:true
        })
      }).catch(e=>{
        wx.showToast({
          title: '网络错误',
          icon:'error',
          mask:true
        })
      })
    },
    onLoad(){
    }
    
})