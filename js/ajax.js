var xmlHttpRequest;
function initXMLHttpRequest() {
	if (xmlHttpRequest) {
		return;
	}

	if (window.ActiveXObject) {
		xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttpRequest = new XMLHttpRequest();
	}
}

//发送
function fSend(method, url, data, callback) {
	if (method == "GET") {
		xmlHttpRequest.open(method, url + "?" + data, true);
		xmlHttpRequest.onreadystatechange = callback;
		xmlHttpRequest.send();
	} else if (method == "POST") {
		xmlHttpRequest.open(method, url, true);
		xmlHttpRequest.onreadystatechange = callback;
		xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttpRequest.send(data);
	}
}

//点击投票页面后的投票行为
function vote(participartorId) {
	initXMLHttpRequest();
	var activityId=document.getElementById("activityId").value;
    var datas="participartorId="+participartorId+"&activityId="+activityId;
    fSend("GET","/GYJ_mall/activity/vote",datas,voteCallback(participartorId));
}

//投票成功
function voteCallback(participartorId) {
    if (xmlHttpRequest.readyState==4&&xmlHttpRequest.status==200){
        var data=xmlHttpRequest.responseText;
        //做一些显示工作
        document.getElementById("p"+participartorId).innerHTML=data;
    }
};
