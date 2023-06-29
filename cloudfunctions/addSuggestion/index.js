// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()

  // const wxContext = cloud.getWXContext()
  let { companyNo, companyName,openId,picList ,type} = event;
  return await db.collection("suggestionList").add({
    data:event
  })
}