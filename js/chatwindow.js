
//创建语音消息图标节点
function createVoiceMsg() {
  document.createElement("div");

}

//创建文字消息节点（如果有表情，也需要有表情）

//创建图片消息结点节点

//创建链接消息结点

//创建消息结点
function createMsgElement(msg) {
  var msgBlock=document.createElement("div");
  //设置样式
  //msgBlock.style.color=
  msgBlock.appendChild(msg);
  return msgBlock;
}


// 实现发送消息
function sendMsg(msg) {
  var message=createMsgElement（msg);
  //通过ajax发送到服务器 TODO
  var chatContent=document.getElementById("chatContent");
  chatContent.appendChild(message);
  //如果返回成功就可以
  if(true){}
}
//接收消息
function receiveMsg() {

}
