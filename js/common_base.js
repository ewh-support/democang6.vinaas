
var browser = (function() {
  var s = navigator.userAgent.toLowerCase();
  var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
              /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
              /(msie) ([\w.]+)/.exec(s) ||
              /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
             [];
  return { name: match[1] || "", version: match[2] || "0" };
}());

var latestFocus = null;

var _userAgent_ = navigator.userAgent;var isIe6 = (/msie 6/i).test(_userAgent_);var isIe7 = (/msie 7/i).test(_userAgent_);var isIe9 = (/msie 9/i).test(_userAgent_); var isComptMode = (/compatible/i).test(_userAgent_);

var docChkTimer = null;
var DOC_COMPLET = null;
function docLoading(loadFunc){
	clearTimeout(docChkTimer);
	if(document.readyState=="loaded" || document.readyState=="complete"){
		DOC_COMPLET = true;
		if(loadFunc!=undefined) loadFunc();
	}
	else{
		docChkTimer = setTimeout(function(){docLoading(loadFunc);},500);
	}
}



//롤오버 이미지

//메뉴 팝업창 winpopup
function menuPopup(url, width, height){

	window.open(url, "zipcode_info", 'Left=100,Top=100,Width='+width+',Height='+height+',menubar=no,directories=no,resizable=no,status=no,scrollbars=no');
	return false;

}

function getBrowsertInfo(){
	var $agent = navigator.userAgent;
	var $s = "";
	var $br = {browser:"",browserType:"",browserVer:[]};


    if ((/msie 5.0[0-9]*/i).test($agent))         { $s = "MSIE 5.0"; }
    else if((/msie 5.5[0-9]*/i).test($agent))     { $s = "MSIE 5.5"; }
    else if((/msie 6.0[0-9]*/i).test($agent))     { $s = "MSIE 6.0"; }
    else if((/msie 7.0[0-9]*/i).test($agent))     { $s = "MSIE 7.0"; }
    else if((/msie 8.0[0-9]*/i).test($agent))     { $s = "MSIE 8.0"; }
    else if((/msie 9.0[0-9]*/i).test($agent))     { $s = "MSIE 9.0"; }
	else if((/msie 10.0[0-9]*/i).test($agent))     { $s = "MSIE 10.0"; }
	else if((/windows*/i).test($agent) && (/rv:11.0[0-9]*/i).test($agent))     { $s = "MSIE 11.0"; }
    else if((/msie 4.[0-9]*/i).test($agent))      { $s = "MSIE 4.x"; }
    else if((/firefox/i).test($agent))            { $s = "FireFox"; }
    else if((/safari/i).test($agent))            { $s = "FireFox"; }
    else if((/x11/i).test($agent))                { $s = "Netscape"; }
    else if((/opera/i).test($agent))              { $s = "Opera"; }
    else if((/gec/i).test($agent))                { $s = "Gecko"; }
    else if((/bot|slurp/i).test($agent))          { $s = "Robot"; }
    else if((/internet explorer/i).test($agent))  { $s = "IE"; }
    else if((/mozilla/i).test($agent))            { $s = "Mozilla"; }
    else { $s = ""; }

	$br.browser = $s;

	if((/msie/i).test($s)){
		$br.browserType = "IE";
		$br.browserVer =  $s.replace("MSIE " ,"").split(".");
	}

	return $br;

}


 function number_format(data)
{

	var tmp = '';
	var number = '';
	var cutlen = 3;
	var comma = ',';
	var i;
   if(parseInt(data)==0) return 0;
	data = String(data);
	len = data.length;
	mod = (len % cutlen);
	k = cutlen - mod;
	for (i=0; i<data.length; i++)
	{
		number = number + data.charAt(i);

		if (i < data.length - 1)
		{
			k++;
			if ((k % cutlen) == 0)
			{
				number = number + comma;
				k = 0;
			}
		}
	}

	return number;
}

function sprintf2(zero,text){

len = zero.length;
r_txt = zero + text;
f_len = r_txt.length;
s_len = f_len - len;
r_txt = r_txt.slice(s_len,f_len);
return r_txt;
}


var $wbr =getBrowsertInfo();
var wsize = null;	//윈도우 사이즈 정보
var psize = null;	//컨텐츠 사이즈 정보
var lowIeChk = {	old_w:0,old_h:0 }
function getWindowSizeObj(){
		var sizeObj = {
		scr : {w:screen.width,h:screen.height},
		availscr : {w:screen.availWidth,h:screen.availHeight},
		win : (_isLowBr_)? {w:$(window).width(),h:$(window).height()}	: {w:window.innerWidth,h:window.innerHeight}	//스크롤사이즈 제외(윈도우 8부터 아래버전에서 확인안됨.ㅠㅠ)

	}
	return sizeObj;
}
function getPageSizeObj(){
	var sizeObj = {
		doc : {w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight},
		scroll : {x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop,top:$(window).scrollTop(),left:$(window).scrollLeft()}	////모바일에서는 안잡힘..
		, header:{h:$("#header-wrap").height()}		, footer:{h:$("#footer-wrap").height() + 1}
	};
	return sizeObj;
}
function getWindowSize(){
	wsize =getWindowSizeObj();
}
function getPageSize(){
	psize = getPageSizeObj();

	printWinSizeInfo();
}

function printWinSizeInfo(){
	var str = "";
//	str +="screen [w : "+wsize.scr.w+", h:"+wsize.scr.h+"]<br/>";
//	str +="availscr [w : "+wsize.availscr.w+", h:"+wsize.availscr.h+"]<br/>";
	str +="window [w : "+wsize.win.w+", h:"+wsize.win.h+"] ";		//스크롤바 포함한 브라우저 윈도우  높이
	str +="doc [w : "+psize.doc.w+", h:"+psize.doc.h+"]<br/>";
//	str +="scrollpos [w : "+psize.scroll.x+", h:"+psize.scroll.y+"]<br/>";
//	str +="scrollpos2 [left : "+psize.scroll.x+", top:"+psize.scroll.y+"]<br/>";
	$("#testBox").html("[" + $wbr.browser +"]" + str +" /" + $(".div-conts").width());
}


function setLowBrowser(){

	$("body").removeClass("isIE7");
	try{
		if($wbr.browserType=="IE" && $wbr.browserVer[0]<=8){
			_isLowBr_ = true;
			$("body").addClass("isIE7");

			$("li").each(function(){
				if($(this).index() ==0) $(this).addClass("is-first");
				if($(this).index() ==($(" > li",$(this).parent()).length -1)) $(this).addClass("is-last");
			});

		}
	}catch(e){
		console.error(e.message);
	}

}

function MobileCheck(){
	var $agent = navigator.userAgent;
    var MobileArray  = ["iphone","lgtelecom","skt","mobile","samsung","nokia","blackberry","android","android","sony","phone"];


    var checkCount = 0;
	for(var i=0; i<MobileArray.length; i++){
		var checkStr = $agent.toLowerCase().match(MobileArray[i]);
		if(checkStr!=null && checkStr==MobileArray[i]) {checkCount++; break; }
		//if(preg_match("/$MobileArray[$i]/", strtolower($_SERVER["HTTP_USER_AGENT"]))){ $checkCount++; break; }
	}
   return (checkCount >= 1) ? true : false;
}



function addBookmark(url,title){

	if(_isMobile_){
		return true;
	}else{
		try{
			window.external.AddFavorite(url,title);
		}catch(e){
			alert('이 브라우저에서는 즐겨찾기 기능을 사용할 수 없습니다.\n크롬에서는 Ctrl 키와 D 키를 동시에 눌러서 즐겨찾기에 추가할 수 있습니다.');
		}
		return false;
	}


}


//이미지 사이즈 정보 초기화
function initImgSizeInfo(){
	$("img").each(function(){

		var attr_w = $(this).width();
		var attr_h = $(this).height();

		if($(this).get(0).getAttribute("org_width")!=null) attr_w = $(this).get(0).getAttribute("org_width") ;
		else if($(this).get(0).org_width!=undefined) attr_w = $(this).get(0).org_width;

		if($(this).get(0).getAttribute("org_height")!=null) attr_h = $(this).get(0).getAttribute("org_height") ;
		else if($(this).get(0).org_height!=undefined) attr_h = $(this).get(0).org_height;

		$(this).attr("org_width",attr_w);
		$(this).attr("org_height",attr_h);


//		if($(this).attr("org_width")!=undefined || $(this).attr("org_width")>0   ) $(this).attr("org_width",$(this).width());
//		if($(this).attr("org_height")==undefined || $(this).attr("org_height")>0)  $(this).attr("org_height",$(this).height());

		$(this).data("org_width",attr_w);
		$(this).data("org_height",attr_h);
		$(this).attr("isInit","true");
	});
}

//지정한 가로폭만큼 리사이징
function contImgResize(imgs,limitSize){

	for (i=0;i<imgs.length ;i++ )
	{
		var im = imgs[i];
		var rSize = getImgReSize(limitSize,{"w":$(im).width(),"h":$(im).height()});

		$(im).width(rSize.w);
		$(im).height(rSize.h);

	}
}
//상위객체 가로 크기 구하기
function boundBoxWidth(obj){
	var w = parseInt($(obj).width());
	if(w<1){
		if($($(obj).parent().get(0)).lennth>0){
		w = boundBoxWidth($($(obj).parent().get(0)));
		}else{
			w = 0;
		}
	}
	return w;
}
//상위 객체를 기준으로 크기값 다시 계산
function AutoImgResize(iobj,maxSize){

	if(maxSize==undefined){
		var pObj = $(iobj).parent().get(0);
		//var maxWidth = parseInt($(pObj).width());
		var maxWidth = boundBoxWidth(pObj);
	}else{
		var maxWidth = maxSize;
	}



	var sizeW = $(iobj).attr("w");
	var sizeH =  $(iobj).attr("h");

	if($(iobj).attr("isInit")=="true"){
		sizeW = $(iobj).data("org_width") ;
		sizeH = $(iobj).data("org_height") ;
		 $(iobj).attr("w",sizeW);
		 $(iobj).attr("h",sizeH);
	}


	if($(iobj).attr("w")==undefined || $(iobj).attr("h")==undefined || $(iobj).attr("w")<1 || $(iobj).attr("h")<1){

		var iw = parseInt($(iobj).width());
		var ih = parseInt($(iobj).height());

		if($(iobj).attr("w")==undefined || $(iobj).attr("w")<1){				$(iobj).attr("w",iw);			}
		if($(iobj).attr("h")==undefined || $(iobj).attr("h")<1){				$(iobj).attr("h",ih);			}
	}else{
		var iw = parseInt($(iobj).attr("w"));
		var ih = parseInt($(iobj).attr("h"));
	}

	//alert(iw);
	if(maxWidth>0){
		//if(maxWidth<iw){
			var rSize = getImgReSize2(maxWidth,{"w":iw,"h":ih});
//			alert(rSize.w +":" + rSize.h)
			//if(rSize.w<=iw || rSize.h<=ih){
			$(iobj).width(rSize.w);
			$(iobj).height(rSize.h);
			//}
		//}
	}
}
//전체 이미지에 대한 이미지 가로폭 제한
function resizeImgsMaxWidth(notObj){

	var imgs = $("img:not(.noResize)");
	for (var i=0;i<imgs.length ;i++ )
	{
		AutoImgResize(imgs[i]);
	}

}
//이미지 사이즈 계산
function getImgReSize2(w,imgSize){
	var rSize = {"w":imgSize.w,"h":imgSize.h};

	if(imgSize.w>w){
		rSize.w = w;
		rSize.h = Math.ceil(imgSize.h * (rSize.w /imgSize.w));

	}

	return rSize;
}



function initRollOverImg(){
$(".isRollOver").mouseover(function(){
	var obj = $("img",this);

	obj.attr("orgSrc",$(obj).attr("src"));
	if(!obj.attr("ovImg")){
		var fileExt = obj.attr("orgSrc").substr(obj.attr("orgSrc").lastIndexOf("."));
		obj.attr("ovImg", obj.attr("orgSrc").replace(fileExt,"_o"+fileExt));
	}
	//$(obj).animate({opacity:0.5},200);

	$(obj).attr("src",obj.attr("ovImg"));
	try{
	var fileExt = $(obj).attr("ovImg").substr($(obj).attr("ovImg").toString().lastIndexOf("."));

	if(fileExt.toLowerCase()!=".png" || isIe9){
		$(obj).stop().animate({opacity:0},20);
		$(obj).animate({opacity:1},500);
	}
	}catch(e){ alert(e);}


	//$(obj).fadeIn(500);
});
$(".isRollOver").mouseout(function(){	var obj = $("img",this);	$(obj).attr("src",obj.attr("orgSrc"));});
}
function getImgReSize(w,imgSize){
	var rSize = {"w":imgSize.w,"h":imgSize.h};

	if(imgSize.w>w){
		rSize.w = w;
		rSize.h = Math.ceil(imgSize.h * (rSize.w /imgSize.w));

	}

	return rSize;
}

//쿠키////////////////////////////////////////////////
function getCookie( name )
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
}

function setCookie( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" +		todayDate.toGMTString() + ";"
}

///////////////////////////////////////////////////////////

//레이어팝업
function popHide(pop_id){
	if (document.getElementById("chk"+pop_id).checked==true)
	{
		setCookie( pop_id, "done" , 24);
	}
	document.getElementById(pop_id).style.display = "none";
}
function popClose(pop_id){
	if (document.getElementById("chk"+pop_id).checked==true)
	{
		setCookie( pop_id, "done" , 1);
	}
	this.close();
}

function checkPop(pop_id) {
	if ( getCookie(pop_id) != "done" ) {
		document.getElementById(pop_id).style.display = "";
	}else{
		document.getElementById(pop_id).style.display = "none";
	}
}

function goUrlClose(u){
	try{
	if(window.opener){
		opener.document.location=u;
	}else{
		window.open(u);
	}
		window.close();
	}catch(e){console.error(e.message);}

}
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
/*레이어팝업 */
var msgPopupWin;
if (msgPopupWin == undefined) {
	msgPopupWin = function (settings) {

		this.init(settings);
	};
}
msgPopupWin.prototype.init = function (settings) {


	var this_s = this;
	var msg_wrap = document.createElement("div");
	msg_wrap.className="pop_windoc";

	var msg_pan = document.createElement("div");
	msg_pan.className = "pop_windoc_bg";
	$(msg_pan).css({"opacity":"0"});
	$(msg_wrap).append(msg_pan);
	$("body").prepend(msg_wrap);
	$(msg_pan).animate({"opacity":0.5},300);

	this.backPannel = msg_pan;
	this.bodyScroll = (settings.bodyScroll!=false)? true:false;
	this.clickClose = (settings.clickClose==false)? false:true;
	if(this.clickClose){
		this.backPannel.onclick=function(){
			try{this_s.close();}catch(e){console.error(e.message);}
		}
	}


	var msg_body = document.createElement("div");
	msg_body.className="pop_windoc_box";

	//$(msg_body).draggable({ handle: 'div.pop_winTop',scroll: true,helper: 'original'});
	//$("div").disableSelection();

	if(settings.w!=undefined) msg_body.style.width =parseInt(settings.w) +"px"  ;
	if(settings.h!=undefined) msg_body.style.height =parseInt(settings.h) + "px" ;


	$(msg_wrap).append(msg_body);

	if(msg_wrap.offsetWidth < msg_body.offsetWidth){
		msg_body.style.width=parseInt(msg_wrap.offsetWidth) +"px";
	}
	if(msg_wrap.offsetHeight < msg_body.offsetHeight){
		msg_body.style.height=parseInt(msg_wrap.offsetHeight) +"px";
	}

	setCenterPos(msg_wrap,msg_body);

	this.title = "";

	if(settings.title)  this.title = settings.title;
	if(settings.setStyle){

		var winDocWrap = document.createElement("div");
		var winDocTop = document.createElement("div");

		$(winDocWrap).addClass("pop_winWrap");
		$(winDocTop).addClass("pop_winTop");
//		$(winDocTop).css("cursor","arrow");
		$(winDocTop).append("<span class='pop_title'>"+this.title+"</span>");

		var winCloseBtn = document.createElement("button");
		$(winCloseBtn).addClass("pop_close");
		$(winCloseBtn).css("cursor","pointer");
		$(winCloseBtn).html("<img src='/img/common/sbtn_close.gif' alt='닫기'/>");
		$(winCloseBtn).click(function(){this_s.close();return false;	});
		$(winDocTop).append(winCloseBtn);

		$(winDocWrap).append(winDocTop);
		$(winDocWrap).append("<div class='pop_winBody'><div class='pop_body'></div></div>");
		//$(winDocWrap).append("<div class='pop_body'></div>");

		$(winDocWrap).append("<div class='pop_winFoot'></div>");

		$(msg_body).append($(winDocWrap));
		this.bodyPannel = $(".pop_winBody ",$(winDocWrap));
		//this.bodyPannel = $(".pop_body ",$(winDocWrap));

		var tmpTopH =$(winDocWrap).height() -  ($(winDocTop).height() + $(".pop_winFoot",winDocWrap).height());
		var tmpTopW =$(winDocWrap).width() -  20;
		$(".pop_winBody ",$(winDocWrap)).height(tmpTopH-5);
		//$(".pop_body ",$(winDocWrap)).height(tmpTopH-10);
		//
		if(isIe7){
			$(".pop_winBody ",$(winDocWrap)).css({"overflow-x":"hidden"});
			//$($(this.bodyPannel)).width($(".pop_winBody").width()-20);
		}
		//this.bodyPannel.height(tmpTopH-10);

	}else{
		this.bodyPannel = $(msg_body);
	}

	//$("body").scroll(function(){
	if(this.bodyScroll==true){
		$("body").css("overflow-y","hidden");
	}
	//});

	$(this.bodyPannel).append(settings.msgWinDoc);

	if(settings.closeBtns){
		for(var i=0; i<settings.closeBtns.length;i++){
			$(settings.closeBtns[i]).click(function(){this_s.close();	});
		}
	}
	this.settings = settings;
	this.obj = msg_wrap;
	this.setShow();
}

msgPopupWin.prototype.setFirstFocus = function(){
	try{
		var toWrap = $($(this.bodyPannel).parents(".pop_winWrap").get(0));
		$("a,button,input",toWrap).not(".hidden,[type='hidden']").eq(0).focus();

	}catch(e){alert(e)}

}
msgPopupWin.prototype.setContents = function(html){	$(this.bodyPannel).html(html); this.setCloseBtns(); this.setContSize();this.setFirstFocus();}

msgPopupWin.prototype.setContSize =  function(){
	//사이즈 보정
	if(isIe7) 	{
		var orgContSize = $(".contents",this.bodyPannel).css("paddingLeft") +$(".contents",this.bodyPannel).css("paddingRight");
		$(".contents",this.bodyPannel).width($(this.bodyPannel).width()-18 - orgContSize);
	}
}
msgPopupWin.prototype.addContents = function(html){	$(this.bodyPannel).append(html); this.setCloseBtns(); this.setContSize();}
msgPopupWin.prototype.setTitle = function(str){	this.title = str; $(".pop_title",$(this.obj)).html(str);}
msgPopupWin.prototype.setShow = function(){	$(this.obj).show();}
msgPopupWin.prototype.setHide = function(){	$(this.obj).hide();}
msgPopupWin.prototype.close = function(){
	$("object,embed",$(this.obj)).hide();try{$(".contObjectTag").css("visibility","visible");if(this.bodyScroll==true){	$("body").css("overflow-y","");	} $(this.obj).remove();}catch(e){console.error(e.message);}

	try{	if(latestFocus!=null && latestFocus!=undefined){		$(latestFocus).focus();	}}catch(e){alert(e);}
}

msgPopupWin.prototype.setCloseBtns = function(){
	var this_s = this;
	this.setContSize();
	if(this.settings.closeBtns){
		for(var i=0; i<this.settings.closeBtns.length;i++){
			$(this.settings.closeBtns[i]).click(function(){this_s.close();	});
		}
	}
	$(".closeBtn",this_s.bodyPannel).click(function(){this_s.close();	});
	//this.setContSize();
}
//아이프레임레이어 열기
function openIframeLayer(url,width,height,page_title){
	frmWin = new msgPopupWin({w:width+"px",h:height+"px",setStyle:true,title:page_title});
	frmWin.bodyPannel.addClass("ifrmBody");
	frmWin.setContents("<iframe width=100% height=99% frameborder='0' scrolling=yes src='"+url+"'></iframe>");
}
//레이어팝업 열기
function openLayerPage(url,width,height,page_title){
	frmWin = new msgPopupWin({w:width+"px",h:height+"px",setStyle:true,title:page_title});
	$(frmWin.bodyPannel).load(url,function (){frmWin.setCloseBtns();});
}


function $alert(msg){
	$(document).ready(function(){
		frmWin = new msgPopupWin({w:"350px",h:"230px",setStyle:true,title:"SITE MESSAGE!",clickClose:false});
		var printMsg = msg.replace(/\b\n\b/i,'<br/>');
		frmWin.addContents("<div class='popErrorMsg'>"+printMsg+"</div><div class='popErrorBtns'></div>");
	});
}
function $alertLoading(msg){
	if(msg==undefined) var msg = "데이터 처리중입니다.";
	$(document).ready(function(){
		frmWin = new msgPopupWin({w:"300px",h:"120px",setStyle:false,title:"SITE MESSAGE!",clickClose:false});
		var printMsg = msg.replace(/\b\n\b/i,'<br/>');
		frmWin.addContents("<div class='popErrorMsg'><div class='c pad50t'><img src='http://web.cs21.com/img/common/loadingimg01.gif' alt=''/> "+printMsg+"</div></div><div class='popErrorBtns'></div>");
	});
}
function $alertLoadingClose(){
	try{frmWin.close();}catch(e){console.error(e.message);}
}


//중앙위치로 정렬
function setCenterPos(doc,obj){
	obj.style.left = ((doc.offsetWidth-obj.offsetWidth)/2)  + "px";

	obj.style.top = ((doc.offsetHeight-obj.offsetHeight)/2)  + "px";
}


//중앙정렬(absolute로 전환후 center 위치조정)
function setAbsoluteCenter(wrapId,objId){

	var wrapObj = $("#"+wrapId);
	var docWidth = document.documentElement.clientWidth;
	if(docWidth<1 || isComptMode) docWidth = document.body.clientWidth;
	wrapObj.width(docWidth);
	if(parseInt(wrapObj.css("min-width"))>0){
		if(wrapObj.width()< 1000) wrapObj.width(1000);
	}
	var Obj = $("#"+objId);
	var orgObjSize = {w:Obj.width(),h:Obj.height()}
	var wrapWidth = wrapObj.width();
	wrapObj.height(Obj.height());
	var posWidth = parseInt((wrapWidth - orgObjSize.w)/2);
	Obj.css({"position":"absolute","width":orgObjSize.w+"px","height": orgObjSize.h + "px","top":"0px","left":posWidth +"px"});

}

//중앙정렬(absolute로 전환후 center 위치조정)
function setAbsoluteCenter2(wrapId,objId){

	var wrapObj = $("#"+wrapId);
	var docWidth = document.documentElement.clientWidth;
	if(docWidth<1 || isComptMode) docWidth = document.body.clientWidth;
	wrapObj.width(docWidth);
	if(parseInt(wrapObj.css("min-width"))>0){
		if(wrapObj.width()< 1000) wrapObj.width(1000);
	}
	var Obj = $("#"+objId);
	var orgObjSize = {w:Obj.width(),h:Obj.height()}
	var wrapWidth = wrapObj.width();
	var posWidth = parseInt((wrapWidth - orgObjSize.w)/2);
	Obj.css({"position":"absolute","width":orgObjSize.w+"px","height": orgObjSize.h + "px","top":"0px","left":posWidth +"px"});

}


//컨텐츠 중앙정렬
function setAbsoluteCenter3(wrapObj,Obj){

	var orgObjSize = {w:Obj.width(),h:Obj.height()}
	var posWidth = parseInt((wrapObj.width() - orgObjSize.w)/2);
	var posHeight = parseInt((wrapObj.height() - orgObjSize.h)/2);

	Obj.css({"position":"absolute","width":orgObjSize.w+"px","height": orgObjSize.h + "px","top":posHeight +"px","left":posWidth +"px"});

}



//창크기로 화면 중앙 좌표 구하기
function getWinCenter(w,h){

	var top = parseInt((screen.availHeight)/2-h/2);
	var left = parseInt((screen.availWidth)/2-w/2);
	var obj = {"top":top,"left":left};
	return obj;
}






//이메일 주소 선택
function email_domain(email_domain,value){
	var f_obj = document.getElementById(email_domain);
	f_obj.value=value;
	if(value=="") f_obj.style.display="";
	else f_obj.style.display="none";
}


function image_window(img)
{
	var _charset = "UTF-8";
	var imgsrc	= ($(img).attr("orgSrc"))? $(img).attr("orgSrc") : img.getAttribute("tmp_src");

	var w = img.getAttribute("tmp_width");
	var h = img.getAttribute("tmp_height");
	var winl = (screen.width-w)/2;
	var wint = (screen.height-h)/3;

	if (w >= screen.width) {
		winl = 0;
		h = (parseInt)(w * (h / w));
	}

	if (h >= screen.height) {
		wint = 0;
		w = (parseInt)(h * (w / h));
	}

	var js_url = "<script language='JavaScript1.2'> \n";
		js_url += "<!-- \n";
		js_url += "var ie=document.all; \n";
		js_url += "var nn6=document.getElementById&&!document.all; \n";
		js_url += "var isdrag=false; \n";
		js_url += "var x,y; \n";
		js_url += "var dobj; \n";
		js_url += "function movemouse(e) \n";
		js_url += "{ \n";
		js_url += "  if (isdrag) \n";
		js_url += "  { \n";
		js_url += "    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x; \n";
		js_url += "    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y; \n";
		js_url += "    return false; \n";
		js_url += "  } \n";
		js_url += "} \n";
		js_url += "function selectmouse(e) \n";
		js_url += "{ \n";
		js_url += "  var fobj      = nn6 ? e.target : event.srcElement; \n";
		js_url += "  var topelement = nn6 ? 'HTML' : 'BODY'; \n";
		js_url += "  while (fobj.tagName != topelement && fobj.className != 'dragme') \n";
		js_url += "  { \n";
		js_url += "    fobj = nn6 ? fobj.parentNode : fobj.parentElement; \n";
		js_url += "  } \n";
		js_url += "  if (fobj.className=='dragme') \n";
		js_url += "  { \n";
		js_url += "    isdrag = true; \n";
		js_url += "    dobj = fobj; \n";
		js_url += "    tx = parseInt(dobj.style.left+0); \n";
		js_url += "    ty = parseInt(dobj.style.top+0); \n";
		js_url += "    x = nn6 ? e.clientX : event.clientX; \n";
		js_url += "    y = nn6 ? e.clientY : event.clientY; \n";
		js_url += "    document.onmousemove=movemouse; \n";
		js_url += "    return false; \n";
		js_url += "  } \n";
		js_url += "} \n";
		js_url += "document.onmousedown=selectmouse; \n";
		js_url += "document.onmouseup=new Function('isdrag=false'); \n";
		js_url += "//--> \n";
		js_url += "</"+"script> \n";

	var settings;

   // if (g4_is_gecko) {
   //     settings  ='width='+(w+10)+',';
  //  } else {
		settings  ='width='+w+',';
		settings +='height='+h+',';
  //  }
	settings +='top='+wint+',';
	settings +='left='+winl+',';
	settings +='scrollbars=no,';
	settings +='resizable=yes,';
	settings +='status=no';


	win=window.open("","image_window",settings);
	win.document.open();
	win.document.write ("<html><head> \n<meta http-equiv='imagetoolbar' CONTENT='no'> \n<meta http-equiv='content-type' content='text/html; charset="+_charset+"'>\n");
	var size = "이미지 사이즈 : "+w+" x "+h;
	win.document.write ("<title>"+size+"</title> \n");
	if(w >= screen.width || h >= screen.height) {
		win.document.write (js_url);
		var click = "ondblclick='window.close();' style='cursor:move' title=' "+size+" \n\n 이미지 사이즈가 화면보다 큽니다. \n 왼쪽 버튼을 클릭한 후 마우스를 움직여서 보세요. \n\n 더블 클릭하면 닫혀요. '";
	}
	else
		var click = "onclick='window.close();' style='cursor:pointer' title=' "+size+" \n\n 클릭하면 닫혀요. '";
	win.document.write ("<style>.dragme{position:relative;}</style> \n");
	win.document.write ("</head> \n\n");
	win.document.write ("<body leftmargin=0 topmargin=0 bgcolor=#dddddd style='cursor:arrow;'> \n");
	win.document.write ("<table width=100% height=100% cellpadding=0 cellspacing=0><tr><td align=center valign=middle><img src='"+imgsrc+"' width='"+w+"' height='"+h+"' border=0 class='dragme' "+click+"></td></tr></table>");
	win.document.write ("</body></html>");
	win.document.close();

	if(parseInt(navigator.appVersion) >= 4){win.window.focus();}

}

function OpenZipSearch(zip_id,addr1_id,addr2_id){
	window.open("/Share/zipsearch.php?zip_id="+ zip_id +"&addr1_id=" + addr1_id + "&addr2_id=" + addr2_id,"winZip", "left=50,top=50,width=400,height=350,scrollbars=1");
}
//글자수 입력길이 미리보기
function viewStrlen(objId1,objId2){
	var obj1 = document.getElementById(objId1);
	var obj2 = document.getElementById(objId2);

	obj2.innerHTML = obj1.value.length;

}
function setDisableLayer(objid,val){
	var obj1 = $("#"+objid+"_box");
	var obj2 = $("#"+objid+"_layer");

	if(val){
		obj2.hide();

	}else{
		obj2.show();

		$(obj2).width(obj1.width());
		$(obj2).height(obj1.height());
	}
}




function toclipboard(str)  {     window.clipboardData.setData('Text',str); }
function copyText(str){
	str.select();
	var clip = str.createTextRange();
	clip.execCommand('copy');
	alert(str.value);
}

function sendTwitter(title,url) {
	var sendTxt = "[" + title +"] " + url;
	var wp = window.open("http://twitter.com/home?status=" + encodeURIComponent(sendTxt) , 'twitter', '');
    if ( wp ) {
        wp.focus();
    }

}
function sendFaceBook(title,url) {
    var wp = window.open("http://www.facebook.com/sharer.php?u=" + url + "&t=" + encodeURIComponent(title), 'facebook', '');
    if ( wp ) {
        wp.focus();
    }
}
function goCyWorld(code) {
    var href = "http://api.cyworld.com/openscrap/post/v1/?xu=http://tizone.co.kr/cyworldApi.php?code=" + code +"&sid=s0300011";
    var a = window.open(href, 'cyworld', 'width=450,height=410');
    if ( a ) {
        a.focus();
    }
}
function goYozmDaum(prefix,link,parameter) {
	var href = "http://yozm.daum.net/api/popup/prePost?link=" + encodeURIComponent(link) + "&prefix=" + encodeURIComponent(prefix) + "&parameter=" + encodeURIComponent(parameter);
	var a = window.open(href, 'yozmSend', 'width=466, height=356');
	if ( a ) {
		a.focus();
	}
}


function setIframeSize(obj,w,h){
		$("#" +obj).width(w).height(h);
}


function file_size(num){
	var n = parseInt(num);
	var n1 = n;
	var u = "KB";

	 if (n < 1048576)	n1 =  n / 1024;
	 else if(n<1073741824) { n1 = n/1048576;  u = "MB"; }
	 else {n1 = n/1073741824 ; u = "GB";}

	n1 = parseInt(n1 * 100)/100;
	return n1 + u;
}


function checkStrlen(v,maxlen){
	if(v.length>=maxlen){
		return false;
	}else{
		return true;
	}
	//alert(v);
//	var obj1 = document.getElementById(objId1);

}


function setPng24(obj) {

//  obj.width=obj.height=1;
  obj.style.visibility="hidden";
  obj.className=obj.className.replace(/\bpng24\b/i,'');
  var imgSrc= obj.getAttribute("src");
  obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ imgSrc +"',sizingMethod='image');"
  obj.src='';

  return '';
}


function set_option(obj,idx,t_name,t_value){
	if (obj.length<1) obj.length=1;
	obj.options[idx].text = t_name;
	obj.options[idx].value= t_value;
}

function add_option(obj,t_name,t_value){
	var idx = obj.length;
	obj.length= idx + 1;

	obj.options[idx].text = t_name;
	obj.options[idx].value= t_value;
}
function set_select(obj_id,t_name){
	var obj = document.getElementById(obj_id);
	obj.length = 1;
	obj.options[0].text = t_name;
	obj.options[0].value="";
}

function editorSet(){
	if (editor_type=="SmartEditor")
	{
		for (i=0; i<oEditors.length;i++){
			//oEditors[i].exec("UPDATE_IR_FIELD", []);
			oEditors[i].exec("UPDATE_CONTENTS_FIELD", []);
		}
	}
}


function in_array(arr,str){
	for ( var i=0;i<arr.length;i++ )
	{
		if(arr[i]==str) return true;
	}
	return false;
}

//전체선택
function check_all(obj1,obj2){
	$(obj2).attr("checked",obj1.checked);
}
function SelectAll(form) {
  var fm = form;
  var fme = fm.elements;

  var chkVal = fm.selectall.checked;

  for(i = 0; i < fme.length; i++) {
    if(fme[i].type == "checkbox" && fme[i].name == "chk[]" && fme[i].disabled == false) {
		fme[i].checked = chkVal;
	}
  }
}


//체크된 체크박스 확인
function chk_select(f,chk_name,num){

		if (typeof f!="object") var obj = document.getElementById(f);
		else var obj = f;

		var cnt=0;

		for(var i=0;i < obj.elements.length;i++) {
			var currEl = obj.elements[i];
			if (currEl.getAttribute("type")  =="checkbox" && currEl.name==chk_name && currEl.checked==true ){
				cnt++;
			}
		}
		if (cnt<num) return false;
		else return true;

}
//선택된 값을 문자열로 연결
function make_select_list(frm_obj,select_name,split){
	var vals = new Array();
	for(var i = 0;i < frm_obj.elements.length;i++) {
			var currEl = frm_obj.elements[i];
			if (currEl.name==select_name && currEl.checked==true){
				vals.push(currEl.value);
			}
	}
	if(vals.length>0){
		return vals.join(",");
	}else{
		return "";
	}


}


function min_height(obj,h){
	if (obj.readyState!="complete") return "auto";
	if (obj.offsetHeight<h)
	{
		obj.style.height=h + "px";
	}
}

function min_width(obj,w){
	if (obj.readyState!="complete") return "auto";
	if (obj.offsetWidth<w)
	{
		obj.style.width=x + "px";
	}
}



///////////////////////////////////////////////////////////
/*메인배너모음 스크립트 */
var mbannerObj;
if (mbannerObj == undefined) {	mbannerObj = function (settings) {		this.init(settings);	}; }
mbannerObj.prototype.init = function (settings) {
	var this_s = this;
	this.objWrap = settings.obj; //$(".mbanner-type03 .mbanner-list ul");
	this.objItems = settings.items;//$("li",mbannerWrap);
	this.itemWidth = settings.width;
	this.itemLength = settings.itemlen;

	this.prevBtn = settings.prevBtn;
	this.nextBtn = settings.nextBtn;

	this.totalPg = Math.floor(	this.objItems.length/this.itemLength) ;
	$(this.objWrap).width(this.itemWidth*this.objItems.length);

	if(this.objItems.length % this.itemLength !=0) this.totalPg +=1;

	this.objWrap.attr("totPg",this.totalPg);
	this.objWrap.attr("nPg",1);


	if(this.objItems.length> this.itemLength ){
		$(this.prevBtn).click(function(){
			var n =  parseInt(this_s.objWrap.attr("nPg"))-1;
			if(n <=0){
				//alert("처음입니다");
				return false;
			}else{
				var toLeft =( (-1) * (this_s.itemWidth *this_s.itemLength) * (n-1) )-1;
				this_s.objWrap.attr("nPg",n);
				$(this_s.objWrap).animate({"left":toLeft});
			}
			return false;
		});
		$(this.nextBtn).click(function(){
				var n =  parseInt(this_s.objWrap.attr("nPg"))+1;
				if(n >parseInt(this_s.objWrap.attr("totPg"))){
					//alert("마지막입니다");
					return false;
				}else{
					var toLeft = ((-1) * (this_s.itemWidth *this_s.itemLength) * (n-1)) -1;
					this_s.objWrap.attr("nPg",n);
					$(this_s.objWrap).animate({"left":toLeft});
				}
				return false;
		});
	}else{
		$(this.prevBtn).hide();
		$(this.nextBtn).hide();
	}

}
var mbannerObj2;
if (mbannerObj2 == undefined) {	mbannerObj2 = function (settings) {		this.init(settings);	}; }
mbannerObj2.prototype.init = function (settings) {
	var this_s = this;
	this.objWrap = settings.obj; //$(".mbanner-type03 .mbanner-list ul");
	this.objItems = settings.items;//$("li",mbannerWrap);
	this.itemHeight = settings.height;
	this.itemLength = settings.itemlen;

	this.prevBtn = settings.prevBtn;
	this.nextBtn = settings.nextBtn;

	this.totalPg = Math.floor(	this.objItems.length/this.itemLength) ;
	$(this.objWrap).height(this.itemHeight*this.objItems.length);

	if(this.objItems.length % this.itemLength !=0) this.totalPg +=1;

	this.objWrap.attr("totPg",this.totalPg);
	this.objWrap.attr("nPg",1);



	if(this.objItems.length> this.itemLength ){
		$(this.prevBtn).click(function(){
			var n =  parseInt(this_s.objWrap.attr("nPg"))-1;
			if(n <=0){
				//alert("처음입니다");
				return false;
			}else{
				var toTop =( (-1) * (this_s.itemHeight *this_s.itemLength) * (n-1) )-1;
				this_s.objWrap.attr("nPg",n);
				$(this_s.objWrap).animate({"top":toTop});
			}
			return false;
		});
		$(this.nextBtn).click(function(){
				var n =  parseInt(this_s.objWrap.attr("nPg"))+1;
				if(n >parseInt(this_s.objWrap.attr("totPg"))){
					//alert("마지막입니다");
					return false;
				}else{
					var toTop = ((-1) * (this_s.itemHeight *this_s.itemLength) * (n-1)) -1;
					this_s.objWrap.attr("nPg",n);
					$(this_s.objWrap).animate({"top":toTop});
				}
				return false;
		});
	}else{
		$(this.prevBtn).hide();
		$(this.nextBtn).hide();
	}

}



function openLoginPopup(url){
	/*
	if(url=="" && site!=""){
		var win = window.open("/" + site + "/index.php?pCode=login","loginPopup","width=520,height=230,srollbars=no");
		win.focus();


	}else if(url!=""){
		var win = window.open(url,"loginPopup","width=520,height=230,srollbars=no");
		win.focus();
	}
	*/
	//loginWin.remove();
	$(".pop_windoc").remove();
	loginWin =  new msgPopupWin({w:452,h:222,msgWinDoc:"",setStyle:false,title:"로그인",closeBtns:$(".closeBtn")});

	$(loginWin.bodyPannel).load("/Share/login.php?prcCode=ajax&url=" + encodeURIComponent(document.location.href),function(){
		$("#login_user_id").focus();
		loginWin.setCloseBtns();
	});



}

function imgPreview(etarget,src){
	if($(".imgPreviewArea").length>0){
		$(".imgPreviewArea").remove();
	}else{
		$("body").append("<div class='imgPreviewArea'><img src='"+src+"' width=200/></div>");
		$(".imgPreviewArea").css({"position":"absolute","border":"1px solid #DDD","z-index":"6000","left":($(etarget).offset().left+50) +"px","top":$(etarget).offset().top+"px"});
	}
}
function imgPreviewClose(){

}


//탭메뉴 설정
function setTabMenu(tab_id,n){
		$("li[id^='" + tab_id + "_tab'] a").click(function(){
			var tabStr = $(this).attr("href");
			var n  = tabStr.replace("#"+tab_id + "_sub","");
			setTabContents(tab_id,n);
			return false;
		});

		if(n>0) setTabContents(tab_id,n);
}

//탭메뉴 컨텐츠 활성
function setTabContents(tab_id,n){
	if(n==undefined || n<1) n = 1;

	//메뉴 활성
	$("[id^='" + tab_id + "_tab']:not(#"+tab_id+"_tab"+n+")").removeClass("over");
	$("#"+tab_id+"_tab"+n).addClass("over");

	//컨텐츠 활성
	$("[id^='" + tab_id + "_sub']:not(#"+tab_id+"_sub"+n+")").hide();
	$("#"+tab_id+"_sub"+n).show();

}


function setBoardTab(obj_id,num,evt){

	var obj = document.getElementById(obj_id);
	var seq = 0;

	var tabs = Array();
	for (i=0; i<obj.childNodes.length; i++){
		if (obj.childNodes[i].tagName=="DL"){
			seq++;
			tabs[seq] = obj.childNodes[i];
		}
	}

	for (i=1; i<tabs.length; i++){
		var titImg = $("dt img",$(tabs[i]));
		if(titImg.length>0){
			var ovImg = $(titImg).attr("ovImg");
			var orgSrc = $(titImg).attr("orgSrc");
		}

		if (i==num){
			if($(tabs[i]).hasClass("isOn")){
				if(evt=="c") {
					if($(".btnmore a",$(tabs[i])).attr("onclick")=="" || $(".btnmore a",$(tabs[i])).attr("onclick")==undefined){
					document.location.href=$(".btnmore a",$(tabs[i])).attr("href");
					}else{
					$(".btnmore a",$(tabs[i])).click();
					}
				}
			}else{
				$(tabs[i]).addClass("isOn");
			}
			//이미지
			if(ovImg!=undefined && orgSrc!=undefined){
				$(titImg).attr("src",ovImg);
			}

		}
		else{
			$(tabs[i]).removeClass("isOn");
			//이미지
			if(ovImg!=undefined && orgSrc!=undefined){
				$(titImg).attr("src",orgSrc);
			}
		}
	}
}

function setSubTab(obj_id,maxNum,num){

	for(var i=1; i<=maxNum;i++){
		var tab = document.getElementById(obj_id+"_tab"+i);
		var cont =document.getElementById(obj_id+"_cont"+i);
		if(num==i){
			$(tab).addClass("isOver");
			$(cont).show();
		}else{
			$(tab).removeClass("isOver");
			$(cont).hide();
		}
	}
}

// select box 국문
var selBox = {

	//objs : 	$(".isSelBox1"),
	init:function(){
		this.objs = $(".isWidget-fquick");
		var objArr = Array();
		for (i=0;i<this.objs.length ;i++ )
		{
			objArr[i] = this.objs[i];
			$(".isSelSub",this.objs[i]).append("<div class='isCloseBtnArea'><button class='isCloseBtn'><span>닫기</span></button></div>")
			if( $(".isSelSub",this.objs[i]).height()>180)  $(".isSelSub > div",this.objs[i]).height(160);
			$(".isSelSub a",this.objs[i]).bind("focus",function(){$(this).addClass("over");});
			$(".isSelSub a",this.objs[i]).bind("blur",function(){$(this).removeClass("over");});
			$("dt a",this.objs[i]).attr("n",i);
			$("dt a",this.objs[i]).click(function(){



				var n = $(this).attr("n");
				var subObj = $(".isSelSub",$(objArr[n]));

				$(".isCloseBtn",subObj).click(function(){
					subObj.hide("fast");
					$(".selBox01 dt a").focus();
				});
				$("a",subObj).click(function(){subObj.hide("fast");});
				subObj.show("fast");
				return false;
			});
		}
		}

	}




var addItemObj = function(func,id){

	this.funcName = func;
	this.rootObj =  $("#" + id);
	this.cloneObj = $("li:first-child",this.rootObj);
	this.subObj= $("li",this.rootObj);
	this.total = this.subObj.length;
	this.last_n = this.total +1;
	var this_s = this;
	this.rootObj.sortable({deactivate:function(event,ui){this_s.setOrder();}});

	this.setOrder = function(){
		this.subObj= $("li",this.rootObj);
		//키보드 및 버튼 액션 초기화
		$(this.subObj).unbind("keydown");
		$(this.subObj).unbind("keyup");
		$(".isDelBtn",this.subObj).unbind("click");
		$(".isAddBtn",this.subObj).unbind("click");

		for (i=0;i<this.subObj.length ;i++ )
		{

			var n = i+1;
			$(this.subObj[i]).attr("n",n);

			//모든 Input 요소 Name, Value 셋팅
			var inputObjs = $("input",$(this.subObj[i]));
			for (j=0;j<inputObjs.length ;j++ )
			{
				if($(inputObjs[j]).attr("fname")!=""){
					$(inputObjs[j]).attr("name",$(inputObjs[j]).attr("fname")+"["+n+"]");
				}
			}

			$(".isDelBtn",this.subObj[i]).attr("href","javascript:"+this.funcName+".Del("+(i+1)+")");
			$(".isAddBtn",this.subObj[i]).attr("href","javascript:"+this.funcName+".Add("+(i+1)+")");

		}



		var this_s = this;
		//$(this.subObj).bind("keydown",function(e){return this_s.setKeyDown(this,e)});
		//$(this.subObj).bind("keyup",function(e){return this_s.setKeyUp(this,e)});


		return null;


	}

	this.Add = function(n){
		var this_s = this;
		var obj = this.cloneObj.clone();


		$("input[type='text']",$(obj)).val("");
		$("input[type='checkbox']",obj).attr("checked",false);
		var targetObj = (n!="")? $("li:nth("+(parseInt(n)-1)+")",this.rootObj): $("li:last",this.rootObj);
		$(targetObj).after(obj);

		$(obj).attr("islock","0");
		$("input[type='text']:nth(0)",$(obj)).focus();
		this.setOrder();

	},

	this.Del = function(n){


		if($("li",this.rootObj).length<2) {alert("더이상 삭제하실 수 없습니다.");return;}
		var obj = $("li:last",this.rootObj);

		if(n=="")	var obj = $("li:last",this.rootObj);
		else			var obj =$("li:nth("+(parseInt(n)-1)+")",this.rootObj);

		if($(obj).attr("islock")=="1") {alert("삭제하실 수 없는 항목입니다");return;}
		else $(obj).remove();


		this.setOrder();
		$("input:nth("+n+")",this.rootObj).focus();
	}

	this.setOrder();
	return this;

}

//탭메뉴 초기화
function initTabMenu(){
	var tabObj = $("[isTab]");
	if(tabObj.length>0){
		for(i=0; i<tabObj.length;i++){
			if($(tabObj[i]).attr("initTab")>0) var initTab = $(tabObj[i]).attr("initTab");
			else var initTab = 1;
			setTabMenu(	$(tabObj[i]).attr("isTab"),initTab);
		}
	}
}

//탭메뉴 클릭 액션 설정
function setTabMenu(tab_id,n){

		$("li[id^='" + tab_id + "_btn'] a").click(function(){
			var tabStr = $(this).attr("href");
			var n  = tabStr.replace("#"+tab_id + "_cont","");
			setTabContents(tab_id,n);
			return false;
		});

		if(n>0) setTabContents(tab_id,n);
}

//탭메뉴 컨텐츠 활성
function setTabContents(tab_id,n){
	if(n==undefined || n<1) n = 1;

	//메뉴 버튼 활성
	var btns = $("#"+tab_id+" li a");

	for (var i=0;i<btns.length ;i++ )
	{
		var thisNum = $($(btns[i]).parent("li").get(0)).attr("id").replace(tab_id + "_btn","");
		var imgObj = $("img",$(btns[i]));

		if(imgObj.length>0){
			var ovImg = $(imgObj).attr("ovImg");

			if(thisNum==n){
				$(imgObj).attr("src",$(imgObj).attr("ovImg"));
				var outImg = ovImg;
			}else{
				$(imgObj).attr("src",$(imgObj).attr("orgSrc"));
				var outImg = $(imgObj).attr("orgSrc");
				}

			$(imgObj).attr("ovImg",ovImg);
			$(imgObj).attr("outImg",outImg);

			$(imgObj).unbind("mouseover");
			$(imgObj).unbind("mouseout");

			if(thisNum!=n){
			$(imgObj).bind("mouseover",function (){
					$(this).attr("src",$(this).attr("ovImg"));
					$(this).stop();
					$(this).animate({opacity:0},20);
					$(this).animate({opacity:1},500);
			});
			$(imgObj).bind("mouseout",function (){
					$(this).attr("src",$(this).attr("outImg"));

			});
			}
		}else{
			//이미지 버튼 없을경우 li에 over 속성
			if(thisNum!=n){
				$(btns[i]).removeClass("over");
			}
			else{
				$(btns[i]).addClass("over");

			}

		}
	}


	//컨텐츠 활성

	var wrapObj = $("[isTabSub='"+tab_id+"']");
	$("[id^='" + tab_id + "_cont']:not(#"+tab_id+"_cont"+n+")",$(wrapObj)).hide();
	$("#"+tab_id+"_cont"+n,$(wrapObj)).show();

}



var selSiteList;
if (selSiteList == undefined) {	selSiteList = function (selObj,optionObj) {		this._init(selObj,optionObj);	}; }
selSiteList.prototype._init = function (selObj,optionObj) {

	this.selBtn = $("h5 a:first-child ",selObj);
	this.optionObj = optionObj;
	this.subTimer =null;

	this.optionItems = $("li a",this.optionObj);


	var this_s = this;

	$(this.selBtn).bind("click",function(){			this_s.optionObj.show("slideDown");	return false;			});
	$(this.selBtn).bind("mouseout",function(){			clearTimeout(this_s.Timer);			this_s.isOnFocus = false;			this_s.Timer = setTimeout(function (){this_s.setOn()},500);			});

	this.optionObj.bind("focus mouseover",function(){		clearTimeout(this_s.Timer);			this_s.isOnFocus = true;			this_s.Timer = setTimeout(function (){this_s.setOn()},500);	});
	this.optionObj.bind("mouseout",function(){			clearTimeout(this_s.Timer);			this_s.isOnFocus = false;			this_s.Timer = setTimeout(function (){this_s.setOn()},500);	});

	this.optionItems.bind("focus mouseover",function(){			clearTimeout(this_s.Timer);			this_s.isOnFocus = true;			this_s.Timer = setTimeout(function (){this_s.setOn()},500);		});
	this.optionItems.bind("blur",function(){	clearTimeout(this_s.Timer);	this_s.isOnFocus = false;	this_s.Timer = setTimeout(function (){this_s.setOn()},500);});

	this.optionItems.bind("click",function(){
		var selObj = $(this).attr("href");
		$(".fsitelink-list").not(selObj).hide();
		$($(this).parents(".fsitelink-cate-box").get(0)).hide();
		$(selObj).show();

		var selTitle = $(this).html();
		$(this_s.selBtn).html(selTitle);
	});



	$(".fsitelink-list h5 a").bind("click",function(){
		clearTimeout(this_s.subTimer);
		var parentObj = $($(this).parents(".fsitelink-list").get(0));
		this.subOn = true;
		$(".fsitelink-list-box",parentObj).show("slideDown");
		return false;
	});
	$(".fsitelink-list a").bind("focus",function(){
		clearTimeout(this_s.subTimer);
		var parentObj = $($(this).parents(".fsitelink-list").get(0));
		this.subOn = true;
		$(".fsitelink-list-box",parentObj).show("slideDown");
	});
	$(".fsitelink-list-box a").bind("blur",function(){
		$("#testtext").append("<p>a-blur</p>");
		clearTimeout(this_s.subTimer);
		var parentObj = $($(this).parents(".fsitelink-list").get(0));
		this_s.subOn = false;
		this_s.subTimer = setTimeout(function(){this_s.setSubOn();},500);
	});

	$(".fsitelink-list").bind("mouseover",function(){		clearTimeout(this_s.subTimer);		this_s.subOn = true;		this_s.subTimer = setTimeout(function(){this_s.setSubOn();},500);	});
	$(".fsitelink-list").bind("mouseout",function(){		clearTimeout(this_s.subTimer);		this_s.subOn = false;		this_s.subTimer = setTimeout(function(){this_s.setSubOn();},500);	});

}
selSiteList.prototype.setSubOn=function(){
	clearTimeout(this.subTimer);
	if(!this.subOn){
		$(".fsitelink-list .fsitelink-list-box").hide("slideUp");
	}
}
selSiteList.prototype.setOn = function(){
	if(this.isOnFocus){
		$(this.optionObj).show("slideDown");

	}else{
		$(this.optionObj).hide("slideUp");

	}

}

/*
$(document).ready(function(){
$("#tit_wrap p").css({"left":-720});
$("#tit_wrap p").animate({"left":0},800);
});*/


////////////////////////////////////////////////////////////////////////////////////////
// 전체메뉴
AllMenuTab = {
	Load: function() {
		var num = $("#Allmenupos").val();

		if($("#Allmenu"+num).is(":hidden")) {
			$("#Allmenuwrap").slideDown();
			$("#Allmenu"+num).fadeIn(600);
			$("#Allmenubtn").html("CLOSE");
			$("#Allmenupos").val(num);

		} else {
			$("#Allmenu"+num).fadeOut(300);
			$("#Allmenuwrap").slideUp();
			$("#Allmenubtn").html("MENU");
		}
	},

	ShowHide: function(show, hide) {
			$("#Allmenu"+hide).hide();
			$("#Allmenu"+show).fadeIn(600);
			$("#Allmenupos").val(show);
	},

	SlideDown: function(slide) {
			$("#Allmenu"+slide).slideDown();
			$("#Allmenu_open").hide();

	},

	SlideUp: function(slide) {
			$("#Allmenu"+slide).slideUp();
			$("#Allmenu_open").show();
	}
}

// 애니메이션 실행
function goAnimation(arrName,n){


	try{

	var arr = (typeof arrName=="string")? eval(arrName) :arrName;
	//alert(arr);
	var totalLen = arr.length;

	if (n<totalLen)
	{

		if( arr[n].type!="function"){

			$(arr[n].target).animate(arr[n].aniObj,arr[n].time,function(){
				goAnimation(arrName,n+1);
			});
		}else{
			if(arr[n].func) eval(arr[n].func);
			setTimeout(function(){goAnimation(arrName,(n+1));},arr[n].time);
			//setTimeout( "goAnimation('"+arrName+"',"+(n+1)+")",arr[n].time);
		}

	}else{
		//메인 애니메이션 종료 후


	}
	}catch(e){ alert(e);}
}

// 전체메뉴보기 //
function siteMenuAllShow(){
	$("#siteMenuAll").stop().css({height:0}).show().animate({height:"100%"},250);
	$(".allmenu-contain").attr("tabindex","0").focus();
//	$("#siteMenuAll .btn-all").focus();

	$("body").css("overflow-y","hidden");
}

//전체메뉴보기 //
function siteMenuAllShowEng(){
	$("#siteMenuAll").stop().css({height:0}).show().animate({height:"100%"},250);
	$("body").css("overflow-y","hidden");
}

function siteMenuAllHide(){
	$("#siteMenuAll").animate({"height":1},250,function(){$(this).hide();});
	$(".allmenu-contain").removeAttr("tabindex","0");
	$("#all-menu .btn-open").focus();
	$("body").css("overflow-y","");
}

// 팝업 띄우기 :: 공통
function popupOpen( option, form ){

	var name = option.name;
	var url = "";
	if ( option.url != null && option.url != "" ) url = option.url;
	var option_str = "";

	//default 셋팅
	if( isNullOrBlank( option.width ) ) 						option.width 	= "400";
	if( isNullOrBlank( option.height ) ) 						option.height 	= "400";
	if( isNullOrBlank( option.toolbar ) ) 						option.toolbar 	= "no";
	if( isNullOrBlank( option.menubar ) ) 						option.menubar 	= "no";
	if( isNullOrBlank( option.location ) ) 						option.location = "no";
	if( isNullOrBlank( option.scrollbars ) ) 					option.scrollbars = "no";
	if( isNullOrBlank( option.status ) ) 						option.status 	= "no";
	if( isNullOrBlank( option.resizable ) ) 					option.resizable= "no";

	// 옵션 적용
	if( !isNullOrBlank( option.width ) ) 						option_str += "width=" + option.width
	if( !isNullOrBlank( option.height ) ) 						option_str += ", height=" + option.height
	if( !isNullOrBlank( option.toolbar ) ) 						option_str += ", toolbar=" + option.toolbar
	if( !isNullOrBlank( option.menubar ) ) 						option_str += ", menubar=" + option.menubar
	if( !isNullOrBlank( option.location ) )						option_str += ", location=" + option.location
	if( !isNullOrBlank( option.scrollbars ) ) 					option_str += ", scrollbars=" + option.scrollbars
	if( !isNullOrBlank( option.status ) ) 						option_str += ", status=" + option.status
	if( !isNullOrBlank( option.resizable ) ) 					option_str += ", resizable=" + option.resizable
	if( !isNullOrBlank( option.fullscreen ) ) 					option_str += ", fullscreen=" + option.fullscreen
	if( !isNullOrBlank( option.channelmode ) )					option_str += ", channelmode=" + option.channelmode
	if( !isNullOrBlank( option.left ) ) 						option_str += ", left=" + option.left
	if( !isNullOrBlank( option.top ) ) 							option_str += ", top=" + option.top

	var win_pop = window.open( url, name, option_str);

	if( form != null && form !="" ){
		form.target = name;
		form.submit();
	}

	return win_pop;
}

function isNullOrBlank( obj ){
	if( obj == null || obj == "" ) return true;
	else return false;
}

function isNull( obj ){
	if( obj == null ) return true;
	else return false;
}

function isBlank( obj ){
	if( obj == "" ) return true;
	else return false;
}

// 사업자 번호 체크
function checkBizID(bizID)  {
	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var tmpBizID, i, chkSum=0, c2, remander;
	bizID = bizID.replace(/-/gi,'');

	for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	remander = (10 - (chkSum % 10)) % 10 ;

	if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
	return false;
}

//숫자만 입력
function OnlyNum(){
	var code = event.keyCode;
	if ((code > 95 && code < 106) || (code > 47 && code < 58) ||  code == 8 || code == 9 || code == 13 || code == 46 ){
		event.returnValue = true;
		return true;
	}else	{
		//event.preventDefault();
		event.returnValue = false;
		return false;
	}
}

// 데이터 합하기
function setDataSum(data1, data2, data3, data4, result, hip){
	var v_data1 = $("#" + data1).val();
	var v_data2 = $("#" + data2).val();
	var v_data3 = $("#" + data3).val();
	var v_data4 = $("#" + data4).val();

	var result_value = "";

	if ( hip == "-" && ( v_data1 != null && v_data1 != "" ) && ( v_data2 != null && v_data2 != "" ) && ( v_data3 != null && v_data3 != "" ) ){
		result_value = v_data1+ hip + v_data2 + hip + v_data3 ;
		$("#"+result).val( result_value );
	}else if ( hip == "@" && ( v_data1 != null && v_data1 != "" ) && ( v_data2 != null && v_data2 != "" ) ){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val( result_value );
	}else if ( hip == " " && ( v_data1 != null && v_data1 != "" ) && ( v_data2 != null && v_data2 != "" ) ){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val( result_value );
	}else if ( hip == ":" && ( v_data1 != null && v_data1 != "" ) && ( v_data2 != null && v_data2 != "" ) ){
		result_value = v_data1+ hip + v_data2;
		$("#"+result).val( result_value );
	}
	else	$("#"+result).val("");
}

// 이미지 팝업 창으로 보기
function openImg_PopupView( head_title, popup_title, img_src, img_alt, img_width, img_height, popup_width, popup_height, print ){
	var option ={
		name : "img_popup_view",
		width : popup_width,
		height : popup_height,
		scrollbars : "yes",
		resizable : "no"
	};

	var obj_frm = document.createElement( "form");
	obj_frm.setAttribute("method","post");
	obj_frm.action = "/kor/PopupView/image.do";
	document.body.appendChild(obj_frm);

	_createElement_formAdd( obj_frm, 'hidden', 'head_title', head_title );
	_createElement_formAdd( obj_frm, 'hidden', 'popup_title', popup_title );
	_createElement_formAdd( obj_frm, 'hidden', 'img_src', img_src );
	_createElement_formAdd( obj_frm, 'hidden', 'img_width', img_width );
	_createElement_formAdd( obj_frm, 'hidden', 'img_height', img_height );
	_createElement_formAdd( obj_frm, 'hidden', 'img_alt', img_alt );
	_createElement_formAdd( obj_frm, 'hidden', 'print', print );

	popupOpen( option, obj_frm );
}

// 컨탠츠 팝업 창으로 보기
function openContent_PopupView( head_title, popup_title, content_src, popup_width, popup_height, popup_open_yn ){
	var option ={
		name : "img_popup_view",
		width : popup_width,
		height : popup_height,
		scrollbars : "yes",
		resizable : "no"
	};

	var obj_frm = document.createElement( "form");
	obj_frm.setAttribute("method","post");
	obj_frm.action = "/kor/PopupView/content.do";
	document.body.appendChild(obj_frm);

	_createElement_formAdd( obj_frm, 'hidden', 'head_title', head_title );
	_createElement_formAdd( obj_frm, 'hidden', 'popup_title', popup_title );
	_createElement_formAdd( obj_frm, 'hidden', 'content_src', content_src );

	if( popup_open_yn ){
		popupOpen( option, obj_frm );
	}else{
		obj_frm.submit();
	}

}
// 속성 만들기
function _createElement_formAdd( form, type, name, value ){
	var buyIdObject = document.createElement("input");
	buyIdObject.setAttribute("type", type );
	buyIdObject.setAttribute("name", name );
	buyIdObject.setAttribute("value",value );
	form.appendChild(buyIdObject);
}

// 입력 글자수 제한하기
function setLimite_InputData( obj, limit_length, textobj_nm ){
	var old_str_length = $( obj ).val().length;

	if( limit_length < old_str_length ){
		alert( "최대 " + limit_length + "자 까지만 입력 가능 합니다." );
		$( obj ).val( $( obj ).val().substring( 0, limit_length ) )
		$( obj ).focus();
	}

	// 글자수 보여주기
	if( textobj_nm != "" ){
		var cnt_text = "(" + $( obj ).val().length + "/" + limit_length + ")";
		$( "#" + textobj_nm ).text( cnt_text );
	}
}





//다음 주소 찾기
function openDaumPostcode(zip, addr1, addr2) {
	//zip			우편번호
	//addr1		도로명주소 앞부분
	//addr2		지번주소 앞부분


    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.

            $( "#"+zip ).val( data.postcode );
            $( "#"+addr1 ).val( data.relatedAddress );
            $( "#"+addr2 ).val( data.address );


            document.getElementById('user_new_addr2').focus();
        }
    }).open();
}

function openDaumPostcode2( zip1_id, zip2_id, jibun_addr_id, doro_addr_id, detail_addr_id, endfocus_id) {
	var kind = "2";
    if(kind == 2){
    	// 주소검색을 수행할 팝업 페이지를 호출합니다.
    	// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
    	var pop = window.open("/WEB-BIZ/JusoAPI/jusoPopup.jsp?zip1_id="+zip1_id+"&zip2_id="+zip2_id+"&jibun_addr_id="+jibun_addr_id+"&doro_addr_id="+doro_addr_id+"&detail_addr_id="+detail_addr_id+"&endfocus_id="+endfocus_id,"pop","width=570,height=420, scrollbars=yes, resizable=yes");
    }else{
    	new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                if( zip1_id != null  && zip1_id != "" && zip2_id !=null && zip2_id != "" ){
                	$( "#"+zip1_id ).val( data.zonecode );
                }else{
                	$( "#"+zip1_id ).val( data.zonecode  );
                }

                if( jibun_addr_id != null && jibun_addr_id != "" )
    	            $( "#"+jibun_addr_id ).val( data.jibunAddress );

                if( doro_addr_id != null && doro_addr_id != "" )
                	$( "#"+doro_addr_id ).val( data.address );

                // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
              $( "#"+endfocus_id ).focus();
            }
        }).open();
    }

}

// 기존에 sample꺼
//function jusoCallBack(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn){
// 필요사항에 따라 수정한거
function jusoCallBack(roadAddrPart1,roadAddrPart2,jibunAddr,zipNo,addrDetail, zip1_id, zip2_id, jibun_addr_id, doro_addr_id, detail_addr_id, endfocus_id){
	// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
	// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
    if( zip1_id != null  && zip1_id != "" && zip2_id !=null && zip2_id != "" ){
    	$( "#"+zip1_id ).prop("value",zipNo);
    }else{
    	$( "#"+zip1_id ).prop("value",zipNo);
    }

    if( jibun_addr_id != null && jibun_addr_id != "" ){
    	$( "#"+jibun_addr_id ).prop("value",jibunAddr.replace("&#40;","(").replace("&#41;",")"));
    }

    if( doro_addr_id != null && doro_addr_id != "" ){
    	$( "#"+doro_addr_id ).prop("value",roadAddrPart1.replace("&#40;","(").replace("&#41;",")") + roadAddrPart2.replace("&#40;","(").replace("&#41;",")"));
    	$( "#"+detail_addr_id ).prop("value",addrDetail.replace("&#40;","(").replace("&#41;",")"));
    }
    // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
    $( "#"+endfocus_id ).focus();

    // 기존에 값넘어오는 애들. 필요사항에 따라 사용가능
	//document.form.roadFullAddr.value = roadFullAddr;
	//document.form.addrDetail.value = addrDetail;
	//document.form.zipNo.value = zipNo;
	//document.form.roadAddrPart1.value = roadAddrPart1;
	//document.form.roadAddrPart2.value = roadAddrPart2;
	//document.form.engAddr.value = engAddr;
	//document.form.jibunAddr.value = jibunAddr;
	//document.form.admCd.value = admCd;
	//document.form.rnMgtSn.value = rnMgtSn;
	//document.form.bdMgtSn.value = bdMgtSn;
}

// select box  국문이외
var selBox2 = {

	//objs : 	$(".isSelBox1"),
	init:function(){
		this.objs = $(".isWidget-fquick");
		var objArr = Array();
		for (i=0;i<this.objs.length ;i++ )
		{
			objArr[i] = this.objs[i];
			$(".isSelSub",this.objs[i]).append("<div class='isCloseBtnArea'><button class='isCloseBtn'><img src='/img/common/ico_btn_close.gif' alt='닫기'/></button></div>")
			if( $(".isSelSub",this.objs[i]).height()>180)  $(".isSelSub ul",this.objs[i]).height(50);
			$(".isSelSub a",this.objs[i]).bind("focus",function(){$(this).addClass("over");});
			$(".isSelSub a",this.objs[i]).bind("blur",function(){$(this).removeClass("over");});
			$("dt a",this.objs[i]).attr("n",i);
			$("dt a",this.objs[i]).click(function(){



				var n = $(this).attr("n");
				var subObj = $(".isSelSub",$(objArr[n]));

				$(".isCloseBtn",subObj).click(function(){subObj.hide("fast");});
				$("a",subObj).click(function(){subObj.hide("fast");});
				subObj.show("fast");
				return false;
			});
		}
		}

	}







