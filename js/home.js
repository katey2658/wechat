
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
  //获取添加按钮
  var addpanelButton=document.getElementById('btnPanel');
  //中间内容大面板
  var contentNode=document.getElementById('content');
  //几个导航条按钮
  var chatNode=document.getElementById("chats");
  var contactsNode=document.getElementById("contacts");
  var discoverNode=document.getElementById("discover");
  var meNode=document.getElementById("me");

  //给添加面板注册点击监听事件
  addpanelButton.addEventListener('click',addpanelShow,false);
  //案例：给里面的内容添加事件，并且添加手势
  var bugly=document.getElementById("bugly");
  bugly.addEventListener('touchstart',chatItem,true);
  bugly.addEventListener('click',chatItem,false);

  //给中间内容添加事件：支持滑动事件
  contentNode.addEventListener("mousedown", onStartScroll, true);
  //contentNode.addEventListener("touchend", onMoving, true);
  contentNode.addEventListener("mouseup", onEndScroll, true);
  //给中间内容移动端手势支持
  contentNode.addEventListener("touchstart", touchstart, true);
  contentNode.addEventListener("touchmove", touchmove, false);
  contentNode.addEventListener("touchend", touchend, true);

  //开始
  // contentNode.onmousedown=onStartScroll;
  // //过程
  // //结束
  // contentNode.onmouseup=onEndScroll;
  //底下几个按钮的点击事件
  chatNode.onclick=chatBtnClick;
  contactsNode.onclick=contactsBtnClick;
  discoverNode.onclick=discoverBtnClick;
  meNode.onclick=meBtnClick;

}
/**
 * 显示和消失添加面板
 * @return {[type]} [description]
 */
function addpanelShow() {
  var addpanel=document.getElementById('addpanel');
  if (addpanel.style.display=='none') {
    addpanel.style.display='block';
  }else {
    addpanel.style.display='none';
  }
}
/**
 * 手势事件的开始
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function touchstart(event) {
  startX=event.touches[0].screenX;
  startY=event.touches[0].screenY;
  startXP=startX;
  startYP=startY;
  contentLeft=this.offsetLeft;
  event.preventDefault();
  event.stopPropagation();
}
/**
 * 手势事件的移动
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function touchmove(event) {
  event.preventDefault();
  var x=event.touches[0].screenX;
  var y=event.touches[0].screenY;
  var dltaX=x-startX;
  var dltaY=y-startY;
  if (Math.abs(dltaX)>Math.abs(dltaY)) {
    this.style.marginLeft=this.offsetLeft+dltaX+"px";
  }
  startX=x;
  startY=y;
}

/**
 * 手势事件的结束
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function touchend(event) {
  event.preventDefault();
  var dltaX=startX-startXP;
  var dltaY=startY-startYP;
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
}

/**
 * 鼠标点击事件的开始
 * @param  {[type]} event
 * @return {[type]}
 */
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
/**
 * 鼠标点击后移动
 * @param  {[type]} event
 * @return {[type]}
 */
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
  //判断是否为当前页面
  if(page!=lastpage){
    var chatNode=document.getElementById("chats");
    var contactsNode=document.getElementById("contacts");
    var discoverNode=document.getElementById("discover");
    var meNode=document.getElementById("me");
    //将图标颜色变暗
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
    //转换变化的图标按钮
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

/**
 * 导航栏第一个图标点击事件
 * @return {[type]} [description]
 */
function chatBtnClick() {
  page=1;
  btnShow();
  changePage();
}

/**
 * 联系人点击事件
 * @return {[type]} [description]
 */
function contactsBtnClick() {
  page=2;
  btnShow();
  changePage();
}

/**
 * 发现按钮点胶机事件
 * @return {[type]} [description]
 */
function discoverBtnClick() {
  page=3;
  btnShow();
  changePage();
}
/**
 * 我的事件点击
 * @return {[type]}
 */
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
  // var style =document.defaultView.getComputedStyle(this,null);
 if(page===1){
   //点击之后跳转到另外一个页面
   window.location.href="chat.html";
 }
}
