
//实现主窗口视图的几个轮播滑动效果
var startX=0;
var startY=0;
var startXP=0;
var startYP=0;
var contentLeft=0;
var page=1;
var lastpage=1;
/**
 * 当页面加载完毕的时候
 */
window.addEventListener('load',onPageLoad,false);
function onPageLoad(){
  var contentNode=document.getElementById('content');
  var chatNode=document.getElementById("chats");
  var contactsNode=document.getElementById("contacts");
  var discoverNode=document.getElementById("discover");
  var meNode=document.getElementById("me");
  var bugly=document.getElementById("bugly");

  bugly.addEventListener('click',chatItem,false);

  // contentNode.addEventListener("touchstart", onStartScroll, true);
  // contentNode.addEventListener("touchend", onMoving, true);
  // contentNode.addEventListener("touchmove", onEndScroll, true);

  contentNode.addEventListener("mousedown", onStartScroll, true);
  contentNode.addEventListener("touchend", onMoving, true);
  contentNode.addEventListener("mouseup", onEndScroll, true);

  //开始
  // contentNode.onmousedown=onStartScroll;
  // //过程
  // //结束
  // contentNode.onmouseup=onEndScroll;

  chatNode.onclick=chatBtnClick;
  contactsNode.onclick=contactsBtnClick;
  discoverNode.onclick=discoverBtnClick;
  meNode.onclick=meBtnClick;

}
function onStartScroll(event) {
  event.preventDefault();
  startX=event.pageX;
  startY=event.pageY;
  startXP=startX;
  startYP=startY;
  contentLeft=this.offsetLeft;
  this.addEventListener('mousemove',onMoving,false);
}
function onMoving(event) {
  event.preventDefault();
  var x=event.pageX;
  var y=event.pageY;
  var dltaX=x-startX;
  var dltaY=y-startY;
  if (Math.abs(dltaX)>Math.abs(dltaY)) {
    this.style.marginLeft=this.offsetLeft+dltaX+"px";
  }
  startX=x;
  startY=y;
}
function onEndScroll(event) {
  event.preventDefault();
  var endX=event.pageX;
  var endY=event.pageY;
  var dltaX=endX-startXP;
  var dltaY=endX-startYP;
  if ((Math.abs(dltaX)>(window.innerWidth/2))&&(dltaX>=0)&&(page>1)) {
    this.style.marginLeft=contentLeft+window.innerWidth+"px";
    page--;
    btnShow();
  }else if((Math.abs(dltaX)>(window.innerWidth/2))&&(page<4)&&(dltaX<=0)){
    this.style.marginLeft=contentLeft-window.innerWidth+"px";
    page++;
    btnShow();
  }else{
    this.style.marginLeft=contentLeft+"px";
  }
  this.removeEventListener('mousemove',onMoving);
}

/**
 * 变换按钮的状态
 * @return {[type]} [description]
 */
function btnShow() {
  if(page!=lastpage){
    var chatNode=document.getElementById("chats");
    var contactsNode=document.getElementById("contacts");
    var discoverNode=document.getElementById("discover");
    var meNode=document.getElementById("me");
    switch (lastpage) {
      case 1:
        chatNode.style.color="#708090";
        chatNode.getElementsByTagName('img')[0].src="../img/home/chat_gray.svg";
        break;
      case 2:
        contactsNode.style.color="#708090";
        contactsNode.getElementsByTagName('img')[0].src="../img/home/contact_gray.svg";
        break;
      case 3:
        discoverNode.style.color="#708090";
        discoverNode.getElementsByTagName('img')[0].src="../img/home/discover_gray.svg";
        break;
      case 4:
        meNode.style.color="#708090";
        meNode.getElementsByTagName('img')[0].src="../img/home/me_gray.svg";
        break;
      default:
    }
     switch (page) {
      case 1:
        chatNode.style.color="#00FF00";
        chatNode.getElementsByTagName('img')[0].src="../img/home/chat_green.svg";
        break;
      case 2:
        contactsNode.style.color="#00FF00";
        contactsNode.getElementsByTagName('img')[0].src="../img/home/contact_green.svg";
        break;
      case 3:
        discoverNode.style.color="#00FF00";
        discoverNode.getElementsByTagName('img')[0].src="../img/home/discover_green.svg";
        break;
      case 4:
        meNode.style.color="#00FF00";
        meNode.getElementsByTagName('img')[0].src="../img/home/me_green.svg";
        break;
      default:
    }
    lastpage=page;
  }
}
/**
 * 改变图片状态
 * @return {[type]} [description]
 */
function changePage() {
  var contentNode=document.getElementById('content');
  var num = Number.parseInt(-(window.innerWidth)*(page-1));
  contentNode.style.marginLeft=num+"px";
  // var com = document.defaultView.getComputedStyle(contentNode,null);
  //alert(com.width);
}

function chatBtnClick() {
  page=1;
  btnShow();
  changePage();
}

function contactsBtnClick() {
  page=2;
  btnShow();
  changePage();
}
function discoverBtnClick() {
  page=3;
  btnShow();
  changePage();
}
function meBtnClick() {
  page=4;
  btnShow();
  changePage();
}

/**
 * 列表项中聊天项点击之跳转页面
 */
function chatItem(event) {
  //检查是否在第一个页面
 if(page===1){
   //点击之后跳转到另外一个页面
   window.location.href="chat.html";
 }
}
