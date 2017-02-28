
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
		//需要做一些 和服务器交互的ajax事情
		var msg=new Message('katey2658',text,'../img/photo.jpg');
	    addMsgNode(msg);
	    getStart();
	    inputNode.value="";
	}
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
