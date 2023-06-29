// pages/storage/storage.js
var urlArr = [];
var filePath = [];
var filePath1 = [];
var filePath2 = [];
var filePath3 = [];
var totalArr = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaCode:'请选择企业类型',
    prodCode:wx.getStorageSync('companyInfo').userNameVal,
    supplier:'',
    indexstatus:-1,//默认显示
    // dialogid:'',
      hideModal:true, //模态框的状态  true-隐藏  false-显示
      animationData:{},//
      areaList:[
        '电子商务类', '科技类', '智能制造类','其它'
      ],
      picArr:[],
      zsArr:[],
      qyryArr:[],
      otherArr:[],
      fileList:[], //存放有图片地址的图片数组
      fileList1:[], //存放有图片地址的图片数组
      fileList2:[], //存放有图片地址的图片数组
      fileList3:[], //存放有图片地址的图片数组
      linshi:[],   //存放选择的图片的临时数组
  },

getTempPath(pathFileList){
  let that = this;
  let lujin = pathFileList.pname + '/' + new Date().getTime() +"-"+ Math.floor(Math.random() * 1000);
  //这里调用了图片上传函数wx.cloud.uploadFile()
  //传给wx.cloud.uploadFile的cloudPath属性的值不能重复！！！巨坑，加个index就可以避免重复了;
  const uploadTasks = pathFileList.srcData.map((item, index)  =>  that.uploadFilePromise(index+lujin, item.path));
  //promise.all方法会等待map方法都执行完全后再继续执行then方法里面的代码 
  return new Promise((resolve,reject)=>{
    Promise.all(uploadTasks)
    .then(data => {
      const newFileList = data.map(item => ({ url: item.fileID,isImage: true,pname:pathFileList.pname,zhname:pathFileList.zhname}));
 
      if(newFileList.length>0) {
        totalArr.push(newFileList)
      }

      
      //每次上传成功后，都要清空一次临时数组，避免第二次重复上传，浪费存储资源，
      that.setData({ 
        fileList: that.data.fileList.concat(newFileList),
        picArr:[],
        zsArr:[],
        qyryArr:[],
        otherArr:[]
      });
      resolve();  
    })
    .catch(e => {
      wx.showToast({ title: '上传失败', icon: 'none' });
      // console.log(e);
      reject()
    });
  })
  
},
 //删除图片
 delete:function(event){
  let that = this;
  console.log(event)
  let inde = event.currentTarget.dataset.id
  //删除数组里面的值
  that.data.picArr.splice(inde,1);
  filePath.splice(inde,1);
  that.setData({
    picArr:that.data.picArr,
    linshi:that.data.picArr
  });
},
delete1:function(event){
  let that = this;
  console.log(event)
  let inde = event.currentTarget.dataset.id
  //删除数组里面的值
  that.data.zsArr.splice(inde,1);
  filePath1.splice(inde,1);
  that.setData({
    zsArr:that.data.zsArr,
    linshi:that.data.picArr
  });
},
delete2:function(event){
  let that = this;
  console.log(event)
  let inde = event.currentTarget.dataset.id
  //删除数组里面的值
  that.data.qyryArr.splice(inde,1);
  filePath2.splice(inde,1);
  that.setData({
    qyryArr:that.data.qyryArr,
    linshi:that.data.picArr
  });
},
delete3:function(event){
  let that = this;
  let inde = event.currentTarget.dataset.id
  //删除数组里面的值
  that.data.otherArr.splice(inde,1);
  filePath3.splice(inde,1);
  that.setData({
    otherArr:that.data.otherArr,
    linshi:that.data.picArr
  });
},
   //预览图片
   previewImage:function(event){
    console.log(event)
    wx.previewImage({
      urls: [event.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })    
  },
  //上传到云存储，并且获得图片地址
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult
    });
  },
  StorageDetailsTap:function() {
    if(this.data.areaCode=='请选择企业类型'
      || this.data.prodCode=='' 
      || this.data.supplier=='' ) 
    {
      wx.showToast({
        title: '请填写完整信息',
        icon:'error',
        mask:true
      })
      return;
    }
    wx.showLoading({
      title: '数据提交中',
    })
  // let tempData = [].concat(this.data.picArr).concat(this.data.zsArr).concat(this.data.qyryArr).concat(this.data.otherArr)
    // this.getTempPath(tempData);
    let tempDataArr = [
      {pname:'img',srcData:this.data.picArr,zhname:'营业执照',num:1},
      {pname:'zsArr',srcData:this.data.zsArr,zhname:'资质证书',num:2},
      {pname:'qyryArr',srcData:this.data.qyryArr,zhname:'企业荣誉',num:3},
      {pname:'otherArr',srcData:this.data.otherArr,zhname:'其它',num:4},
  ]
    let tempData = tempDataArr.map(item=>this.getTempPath(item))
    this.submitAgo(tempData)
  },
  submitAgo(promiseList){
    Promise.all(promiseList).then(()=>{
      this.addPicInfo();
    })
  },
  addPicInfo(){
    console.log(totalArr)
    let _openId = wx.getStorageSync('openid');
    let _userInfo = wx.getStorageSync('user');
    wx.cloud.callFunction({
      name:"addInfo",
      data:{
        openId:_openId,
        picList:totalArr,
        companyNo:this.data.prodCode,
        companyName:this.data.supplier,
        type:this.data.areaCode,
        user_Info:_userInfo
      }
    }).then(res=>{
      wx.hideLoading();
      this.setData({
        areaCode:'',
        areaCode:'请选择企业类型',
        prodCode:'',
        supplier:'',
        fileList:'',
        linshi:''
      });
      totalArr = [];
      wx.switchTab({
        url: './../infoCollection/index',
      })
    })
  },
     // 选择库区
     getValueTap(e){
      // console.log(e)
      // console.log(e.currentTarget.dataset.dialogid)
      let dialogid=e.currentTarget.dataset.dialogid;
      // console.log(this.data.areaList[dialogid])//得到衣服
      this.setData({
        areaCode:this.data.areaList[dialogid],//赋值给输入框
        indexstatus: dialogid, //更新
      })
    },
   // 显示遮罩层
   showModal: function () {
      var that=this;
      that.setData({
        hideModal:false
      })
      var animation = wx.createAnimation({
        duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation 
      setTimeout(function(){
        that.fadeIn();//调用显示动画
      },100)   
    },
  
    // 隐藏遮罩层
    hideModal: function () {
      var that=this; 
      var animation = wx.createAnimation({
        duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      that.fadeDown();//调用隐藏动画   
      setTimeout(function(){
        that.setData({
          hideModal:true
        })      
      },100)//先执行下滑动画，再隐藏模块
      
    },
  
    //动画集
    fadeIn:function(){
      this.animation.translateY(0).step()
      this.setData({
        animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
      })    
    },
    fadeDown:function(){
      this.animation.translateY(600).step()
      this.setData({
        animationData: this.animation.export(),  
      })
    }, 
    upPhoto(){
      wx.chooseImage({
        success:res=>{
          filePath = filePath.concat(res.tempFiles);
          console.log(filePath)
          this.setData({
            picArr:[...new Set(filePath)]
          })
        }
      })
    },
    upPhoto1(){
      wx.chooseImage({
        success:res=>{
          filePath1 = filePath1.concat(res.tempFiles);
          console.log(filePath1)
          this.setData({
            zsArr:[...new Set(filePath1)]
          })
        }
      })
    },
    upPhoto2(){
      wx.chooseImage({
        success:res=>{
          filePath2 = filePath2.concat(res.tempFiles);
          console.log(filePath2)
          this.setData({
            qyryArr:[...new Set(filePath2)]
          })
        }
      })
    },
    upPhoto3(){
      wx.chooseImage({
        success:res=>{
          filePath3 = filePath3.concat(res.tempFiles);
          console.log(filePath3)
          this.setData({
            otherArr:[...new Set(filePath3)]
          })
        }
      })
    }
})
