var mnTitBoxContent =[
{	"eTitle":"Opening of information",	"sText":"국민의 알권리를 보장하고 <br />더 많은 정보를 전해드립니다."}
,{	"eTitle":"About BPA",	"sText":"부산항만공사에 대한 정보를<br />자세히 전해드립니다."}
,{	"eTitle":"Customer Center",	"sText":"365일 24시간 쉬지 않는 <br />BPA고객센터입니다."}
,{	"eTitle":"Port Operations / <br />Construction",	"sText":"화물, 사람, 자연의 조화를 <br />추구하는 21C 종합항만을 <br />안내합니다."}
,{	"eTitle":"PR Center",	"sText":"함께 나누는 행복 부산항만공사의 <br /> 생생한 이야기"}
,{	"eTitle":"Shared growth ",	"sText":"함께 나누고 다같이 성장하는 <br />글로벌 허브항만을 실현합니다."}
];
var mainNavi = {
	mnObj : null,
	mnItems:new Array(),
	currentSeq:null,
	initSeq:null,
	Timer:null,subTimer:null,
	isOver:false,isSubOver:false,
	init:function(objId,seq,seq2){

		
		var this_s  = this;

		if($("#" + objId).get(0).tagName=="UL"){
				this.mnObj =  $("#" + objId);
		}else{
				this.mnObj =  $($("#" + objId +" ul:first").get(0));
		}


		this.mnItems = $("> li > a ",$(this.mnObj)) ;		
		this.mnLiItems = $("> li",$(this.mnObj)) ;		
		this.mnItemsImg = $("> li > a > img ",$(this.mnObj)) ;

		
//add over bar
		this.ovbar = $('<div class="ovbar"></div>').prependTo(this.mnObj.parent());
		this.ovbar.css({"width":"0"});

		$(">li",$(this.mnObj)).each(function(){
			if($(this).hasClass("over")){
				seq = $(this).index() + 1;
				$(".depth2-wrap > ul > li",$(this)).each(function(){
					if($(this).hasClass("over")){
						seq2 = $(this).index() + 1;
					}
				});
			}
		});
		
		if(seq==undefined) seq = 0;
		if(seq2==undefined) seq2 = 0;

		

		this.initSeq = seq;
		this.initSeq2 = seq2;

		$(".depth2-wrap",$(this.mnObj)).bind("mouseover focus", function(){	clearTimeout(this_s.subTimer ); this_s.isSubOver = true;	});
		$(".depth2-wrap",$(this.mnObj)).bind("mouseout blur", function(){	clearTimeout(this_s.subTimer ); this_s.isSubOver = false;this_s.setSubMenuOutSet(500);	});

		$("a",$(this.mnObj)).bind("mouseover focus", function(){	 clearTimeout(this_s.subTimer ); this_s.isOver = true;	});
		$("> li > .depth2-wrap",$(this.mnObj)).bind("mouseover focus", function(){	clearTimeout(this_s.subTimer );  this_s.isOver = true;	});

		$("a",$(this.mnObj)).bind("mouseout blur", function(){	clearTimeout(this_s.subTimer ); this_s.isSubOver = false;this_s.setSubMenuOutSet(500); this_s.setMenuOut();	});
		$("> li > .depth2-wrap",$(this.mnObj)).bind("mouseout blur", function(){	this_s.setMenuOut();	});

		var tmpWidth = 1000;

		var mnImgs = $(" img ",$(this.mnObj));//.mn_a1

		for (i=0;i<mnImgs.length ;i++ )
		{
			var orgSrc = $(mnImgs[i]).attr("src");
			var ovSrc = $(mnImgs[i]).attr("ovImg");
			$(mnImgs[i]).attr("orgSrc",orgSrc);
			if(ovSrc!=undefined) $(mnImgs[i]).attr("ovSrc",ovSrc);
		}
		
		
		//타이틀 박스 추가
		 $("> li ",$(this.mnObj)).each(function(){
			var n = $(this).index() ;
			 $(".depth2-wrap",this).prepend("<div class='depth1-tit mn-tbox"+(n+1)+"'><strong>"+$(".mn_a1 span",this).text()+"</strong><br/><span class='stit'>"+mnTitBoxContent[n].eTitle+"</span><br/><span class='stxt'>"+mnTitBoxContent[n].sText+"</span></div>");

		 });
		
		var tmpItems = $("> li ",$(this.mnObj)) ;
		
		var tmpArr = new Array();
		for (i=0;i<tmpItems.length ;i++ )
		{

		}


		//대메뉴 설정 
		for (var i=0; i < this.mnItems.length ; i++ ){
			this.mnItems[i].seq = i + 1;
			$($(this.mnItems[i]).parents("li").get(0)).attr("seq",this.mnItems[i].seq);
			$(this.mnItems[i]).bind("mouseover focus",function(){ this_s.setMenuOn(this.seq);});			
			$(".depth2 a",$(this.mnLiItems[i])).each(function(){
				var li2 = $($(this).parents("li").get(0));
				var li1 = $($(li2).parents("li").get(0));

				var n = $(li1).attr("seq");
				$(this).attr("seq",n);
				$(this).attr("seq2",$(li2).index()+1);

				$(this).bind("mouseover focus",function(){
					var n =$(this).attr("seq");
					var n2 = $(this).attr("seq2");
					this_s.setMenuOn(n,n2);					
				});
				
			});
		}
		
	


		var chkMn =  (this.initSeq>0)? $("> li:eq(" +(this.initSeq-1)+")", this.mnObj):null;
		if(chkMn!=null && chkMn.length>0){
			 this.isFirstOpen = true;
		}else{
			this.isFirstOpen = false;
		}


		if(this.initSeq<1) { 

		}else{
			this.setMenuOn(this.initSeq,this.initSeq2);
		}

		
	},
	reset:function(){
		if(this.isOver || this.isSubOver){
		}else{
		this.isFirstOpen = true;
		this.setMenuOn(this.initSeq,this.initSeq2);
		}
		//alert(this.currentSeq);
	},
	setMenuBar:function(n){
		var thisMenu = (n>0)? $("> li:eq(" + ( n-1 ) +")", this.mnObj):null;
		var otherMenu = $("> li", this.mnObj).not(thisMenu);

		$(thisMenu).addClass("over");
		$(otherMenu).removeClass("over");


		this.ovbar.stop().animate({

			width: (thisMenu!=null)? thisMenu.width()  -20 : 0,
			left:(thisMenu!=null)? $(this.mnObj).position().left + thisMenu.position().left + 10 : 0
		},300); 
	},
	setMenuOn:function(){
		clearTimeout(this.Timer );
		var this_s = this;
		var s  = new Array();
		for(var i=0; i<arguments.length;i++){
			s[i] = arguments[i];	
		}

		if(parseInt(s[1])<1 || s[1]==undefined) s[1] = 0;
		
		var thisMenu = (s[0]>0)? $("> li:eq(" + ( s[0]-1 ) +")", this.mnObj):null;
		var subMenu = $("> .depth2-wrap",$(thisMenu));

		var otherMenu = $("> li", this.mnObj).not(thisMenu);
		var otherSubMenu = $("> .depth2-wrap",$(otherMenu));
		var thisMnImg = $(" > a:first-child   img", thisMenu);
		var otherMnImg = $(" > a:first-child   img", otherMenu);

		
	
		if(this.currentSeq !=s[0]  || this.isSubClose){
			this.setSubMenuOut(this.currentSeq);
			$(thisMenu).addClass("over");
			$(thisMnImg).attr("src",$(thisMnImg).attr("ovSrc"));

			this.ovbar.stop().animate({

			width: (thisMenu!=null)? thisMenu.width()  -20 : 0,
			left:(thisMenu!=null)? $(this.mnObj).position().left + thisMenu.position().left + 10 : 0
		},300); //width(thisMenu.width()).css({});

			if(!this.isFirstOpen) this.setSubMenuOn(s[0]);
			
			
		}
		

		//서브메뉴 롤오버 처리

		if(s[1]>0){
			var thisSubMnImg = $(".mn_li2:eq("+(s[1]-1)+") .mn_a2 img",subMenu);
			$(thisSubMnImg).each(function(){ $(this).attr("src",$(this).attr("ovSrc")); });
			var otherSubMnImg = $(".mn_a2 img",this.mnObj).not(thisSubMnImg);
			otherSubMnImg.each(function(){ $(this).attr("src",$(this).attr("orgSrc")); });

		}else if(s[1]==0 && this.initSeq== s[0] && this.initSeq2>0){

			var thisSubMnImg = $(".mn_li2:eq("+(this.initSeq2-1)+") .mn_a2 img",subMenu);
			$(thisSubMnImg).each(function(){ $(this).attr("src",$(this).attr("ovSrc")); });
			var otherSubMnImg = $(".mn_a2 img",this.mnObj).not(thisSubMnImg);
			otherSubMnImg.each(function(){ $(this).attr("src",$(this).attr("orgSrc")); });
		}else{
			var otherSubMnImg = $(".mn_a2 img",this.mnObj);
			otherSubMnImg.each(function(){ $(this).attr("src",$(this).attr("orgSrc")); });
		}

	
		
	
		$(otherMenu).removeClass("over");

		for(i=0; i<otherMnImg.length;i++){
			$(otherMnImg[i]).attr("src",$(otherMnImg[i]).attr("orgSrc"));
		}
	

		if(!this.isFirstOpen) this.currentSeq = s[0];
		this.isFirstOpen = false;


		
	},
	setSubMenuOn:function(seq){
		clearTimeout(this.subTimer );
		var this_s = this;

		this_s.isSubClose = false;

		var subMenu = (seq>0)? $(".mn_li1:eq(" +  (seq -1) +")  .depth2-wrap",this.mnObj) : null;
		//서브메뉴 박스 높이에 맞게 wrap 높이 조절
		
		$(".mn_li1 .depth2-wrap").not(subMenu).hide();

	

		if(subMenu!=null && subMenu.length>0){
			
//			var toH = $(subMenu).height();
			$(subMenu).show().css({"opacity":0});
			var toH = $("#header").height() + $(subMenu).outerHeight();
			$("#header-wrap").stop().addClass('over').animate({"height":toH,"border-bottom":"2px solid #99aec7"},300);
			//$("#menu-wrap").stop().animate({"height":"170px"},300);
			$(subMenu).animate({"opacity":1},300);
		}else{
			$("#header-wrap").stop().animate({"height":$("#header").height(),"border-bottom":"0px"},300);
			//$("#menu-wrap").stop().animate({"height":"100px"},300);
		}



		this.setSubMenuOutSet(3000);
		
	},
	setSubMenuOut:function(seq){
		
		clearTimeout(this.subTimer );
		var this_s = this;
		var subMenu = (seq>0)? $("> li:eq(" +  (seq -1) +") .depth2-wrap",this.mnObj) :null;	 	

		$("#header-wrap").stop().animate({"height":$("#header").height(),"border-bottom":"0px"},300);
//		$("#menu-wrap").stop().animate({"height":"100px"},300);


		//$(subMenu).fadeOut("fast");


	},
	setSubMenuOutSet:function(time){
		var this_s = this;
		this.subTimer = setTimeout(function(){
			if(!this_s.isSubOver){
				//$(".depth3w").animate({left:-140});
				this_s.isSubClose = true;
				
				$("#header-wrap").stop().removeClass('over').animate({"height":$("#header").height(),"border-bottom":"0px"},300);
				//전체 서브메뉴 숨김
				$(".depth2-wrap").stop().animate({opacity:0},300,function(){$(this).hide();});

				//상단 메뉴 이미지 초기화
				var thisMn =  (this_s.initSeq>0)? $("> li:eq(" + ( this_s.initSeq-1 ) +")",this_s.mnObj) : null ;
				var otherMenu = $("> li", this_s.mnObj).not(thisMn);
			
				$("> a:first-child   img", otherMenu).each(function(){		$(this).attr("src",$(this).attr("orgSrc"));	});
				if(thisMn!=null && thisMn.length>0) $("> a:first-child   img", thisMn).each(function(){		$(this).attr("src",$(this).attr("ovSrc"));				});
				

			}

		},time);
	},
	setMenuOut:function(){
		clearTimeout(this.Timer );
		var this_s = this;
		this.isOver = false;	
		this.Timer = setTimeout(function(){
			if(this_s.isOver==false) {
				this_s.setMenuBar(this_s.initSeq);
				//this_s.setMenuOn(this_s.initSeq);
			}
		},400);
	}
}

function initNavigation(s1,s2) {
//	alert(seq);

	if(parseInt(s1)<1) s1 = 0;
	if(parseInt(s2)<1) s2 = 0;
	mainNavi.init("topmenu",s1,s2);

}


