//--------------------------关于全局的一些设置

/**
 * 创建观念到对象
 * @type {GoEasy}
 */
 var goEasy = new GoEasy({
 		appkey: 'dfc8b6e2-5cf5-41a5-9af0-25331e17a4fa'
 });
/**
 * 当页面加载完毕的时候，注册相关组件
 */
window.addEventListener('load',registeTools,false);


//---------------------------局部方法和变量

/*
 * 点击更多工具，下面工具栏的出现和消失
 */
function moreTools(){
	var moretools=document.getElementById("moretools");
	var bottom=document.getElementById("bottom");
	if(moretools.style.display=="none"){
		moretools.style.display="block";
		bottom.style.height="50%";
	}else{
		moretools.style.display="none";
		bottom.style.height="auto";
	}
}

/**
 * 正在输入，需要出现提交按钮，消失moretools
 */
function inputingMeg(){
	//首先应该将页面端中工具面板进行隐藏，避免缩放
	document.getElementById("moretools").style.display="none";
	var moreIcon=document.getElementById("moreicon");
	if(!(moreIcon.style.display=="none")){
		moreIcon.style.display="none";
	  var btnSend=document.getElementById("btnsend");
	  btnSend.style.display="block";
	}
}

/*
 * 聊天发送信息
 *
 */
function sendMsg(){
	var inputNode=document.getElementById("inputtext");
	var text=inputNode.value;
	if(!text==""){
		//发布消息
		goEasy.publish({
	 	 channel: 'demo_channe2',
	 	 message: text
	  });
		//需要做一些 和服务器交互的ajax事情
		var msg=new Message('katey2658',text,'../img/photo.jpg');
    addMsgNode(msg);
    getStart();
    inputNode.value="";
	}
}


//收到消息
 goEasy.subscribe({
	 channel: 'demo_channel',
	 onMessage: receiveMessage
});
//收到消息后的反应
function receiveMessage(message){
	//将消息添加到节点上
	var msg=new Message('other',message.content,'../img/photo2.jpg');
	addMsgNode(msg);
}


/**
 * 关于从新开始，让状态规整个i他
 * @return {[type]} [description]
 */
function getStart(){
	var inputNode=document.getElementById("inputtext");
	if(inputNode.value==""){
		var btnSend=document.getElementById("btnsend");
	    btnSend.style.display="none";
	    var moreIcon=document.getElementById("moreicon");
	    moreIcon.style.display="block";
	}
}

/**
 * 添加消息节点
 */
function addMsgNode(msg){
	var msgNode=document.createElement("div");
	var photoNode=document.createElement("div");
	var photoImg=document.createElement("img");
	var textNode=document.createElement("div");
	var textSpan=document.createElement("span");
	textSpan.innerText=msg.text;
	textNode.appendChild(textSpan);
	photoImg.src=msg.photo;
	photoNode.appendChild(photoImg);
	if(msg.userName=='katey2658'){
		//是自己 ，先加文字，剧右边
		msgNode.appendChild(photoNode);
		msgNode.appendChild(textNode);
		msgNode.className="msg-right";
	}else{
		//不是自己,先加图片,再加文字
		msgNode.appendChild(photoNode);
		msgNode.appendChild(textNode);
		msgNode.className="msg-left";
	}
	photoNode.className="photo";
	textNode.className="text";
	//最后添加到面板上
	var chatPanel=document.getElementById("chatpanel");
	chatPanel.appendChild(msgNode);
}

/**
 * 一个信息类
 * @param {Object} username
 * @param {Object} text
 * @param {Object} photo
 */
function Message(username,text,photo){
	this.userName=username;
	this.text=text;
	this.time=new Date();
	this.photo=photo;
}

/**
 * 注册相关组件工具
 * @return {[type]} [description]
 */
function registeTools() {
	var albumTool=document.getElementById('album');
	var useCameraTool=document.getElementById('useCamera');
	var videoCallTool=document.getElementById('videoCall');
	var locationTool=document.getElementById('location');
	var redPocketTool=document.getElementById('redPocket');
	var transferTool=document.getElementById('transfer');
	var contactCardTool=document.getElementById('contactCard');
	var favoritesTool=document.getElementById('favorites');
  //主要工具按钮的设置
	albumTool.onclick=album;
	useCameraTool.onclick=useCamera;
	videoCallTool.onclick=videoCall;
	locationTool.onclick=myLocation;
	redPocketTool.onclick=redPocket;
	redPocketTool.onclick=transfer;
	contactCardTool.onclick=contactCard;
	favoritesTool.onclick=favorites;
}



function album() {

}

function useCamera() {

}

function videoCall() {

}
//-----------------------------------------
/**
 * 获取地理位置将地理位置发送给对方
 * @return {[type]} [description]
 */
function myLocation() {
	if ("geolocation" in navigator) {
		  /* 地理位置服务可用 */
			var dialog=document.getElementById("select-dialog");
			var bgModel=document.getElementById("bg-model")
			dialog.style.display="block";
			bgModel.style.display="block";

      //对弹出的两个按钮进行监听
			var sendCurrentPosition=document.getElementById("sendPosition");
			var sendRtPocation=document.getElementById("sendRtPocation");
			sendCurrentPosition.onclick=sendLocation;
			sendRtPocation.onclick=sendRtLocation;

			bgModel.onclick=dialogNone;
		//弹出一个选项框，用户可以选择是发送自己的地理位置和实时位置
	} else {
  /* 地理位置服务不可用 */
		alert("地理位置服务不可用");
	}
}
/**
 * 让弹出的对话框和背景消失
 * @return {[type]} [description]
 */
function dialogNone() {
	var dialog=document.getElementById("select-dialog");
	var bgModel=document.getElementById("bg-model")
	dialog.style.display="none";
	bgModel.style.display="none";
}

/**
 * 进入地图选择发送 发送用户的地理信息
 * @return {[type]} [description]
 */
function sendLocation() {
	dialogNone();
	//这里不用选择，直接进行发送
	navigator.geolocation.getCurrentPosition(function(position) {
		//获取经度
		var myLatitude=position.coords.latitude;
		//获取纬度
		var myLongitude=position.coords.longitude;
		alert("myLatitude:"+myLatitude+":"+myLongitude);
	});
}
/**
 * 发送自己实事地理位置
 * @return {[type]} [description]
 */
function sendRtLocation() {
	dialogNone();
	//定时发送自己的地理信息
	var options = {frequency:6000};
	navigator.geolocation.watchPosition(locationSuccess, locationError, options);
}
/**
 * 地理位置定位成功
 * @return {[type]} [description]
 */
function locationSuccess(position){
	//获取经度
	var myLatitude=position.coords.latitude;
	//获取纬度
	var myLongitude=position.coords.longitude;

	//TODO 将地理信息发送出去
	alert("myLatitude:"+myLatitude+":"+myLongitude);
}
/**
 * 地理位置失败
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
function locationError(error) {
	alert("发生了一些错误");
}
/**
 * 发送实时位置
 * 我回进入地图信息，然后标注自己
 * @return {[type]}
 */
function sendRealTimeLocation() {
	//弹出另外一个界面
	navigator.geolocation.getCurrentPosition(function(position) {
		//获取经度
		var myLatitude=position.coords.latitude;
		//获取纬度
		var myLongitude=position.coords.longitude;
	});
}
//-----------------------------------------

/**
 * 红包服务
 * @return {[type]} [description]
 */
function redPocket() {

}

/**
 * 转账交易
 * @return {[type]} [description]
 */
function transfer() {

}

/**
 * 名片
 * @return {[type]} [description]
 */
function contactCard() {

}
/**
 * 收藏
 * @return {[type]} [description]
 */
function favorites() {

}


/**
 * 数据发送服务
 */
function send(method,myurl,mydata,mysuccess,myerror) {
	// $.ajax{
	// 	type:method,
	// 	url:myurl,
	// 	data:mydata,
	// 	success:mysuccess,
	// 	error:myerror
	// }
}

function returnToHome() {
	window.location.href="home.html";
}

/**
 * note:
   在百度地图中设置位置 cityName是城市名
	 var map=new BMap.Map('bmapInfo');
	 map.centerAndZoom(cityName,15);

	 获取当地城市
	 var cityObj=new BMap.LocalCity();
	 cityObj.get(getCurrentCity());

	 getCurrentCity(cs){
	  var cityName=cs.name;
 }
 */
/**
 * 定时任务
 * 任务类继承：TimerTask然后重写方法run方法
 * 定时任务：Timer timer=new Timer();
 * t.shedule(任务对象，延迟，间隔)；
 * 第二个参数是可以编程定时时间的额
 * 使用SimpleDateFormat
 */
