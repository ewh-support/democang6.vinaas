
////////////////////////////////////////////////////////////////////////////////////////
/* 템플릿 기본 스타일 적용 스크립트 */
////////////////////////////////////////////////////////////////////////////////////////

(function($){
	$.fn.mscrollContent=function(o){

		o = $.extend({wrap:null,vcount:1,vertical:false,mvsize:0,vsize:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this),$a=$("a",$this);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			//$ul.height(o.height*vpage);
			

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				var toPosition = $(this).index() * o.vsize - ((this_pg-1)*(o.vcount * o.vsize));
				var totop = (!o.vertical)? 0 : toPosition;
				var toleft = (o.vertical)? 0: toPosition;

				$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":""});
			});

			goPage(1);
			if(o.isPlay){	play();	 }
			else { 		stop();  	}

			$a.bind("focus",function(){
				o.isPlay = false;stop();
				var this_pg = Math.ceil(($($(this).parents("li").get(0)).index()+1)/o.vcount);

				goPage(this_pg);

			});
			
			$(o.btnNext).click(function(){	goNext();	});
			$(o.btnPrev).click(function(){	goPrev();	});
			$(o.btnStop).click(function(){	 o.isPlay=false; stop();	});
			$(o.btnPlay).click(function(){	o.isPlay=true; play();	});

			function goPage(n){
				clearTimeout(Timer);		
				
				if(pg!=n){
					pg = n;
					
				var s = (n-1 )*o.vcount, e = s+o.vcount -1;
				
				var onCss = (o.vertical)? {"left":0} : {"top":0};
				var offCss = (o.vertical)? {"left":((-1) * o.mvsize) +"px"} : {"top":((-1) * o.mvsize) +"px"};
					
				for(var i=0; i<$li.length;i++){		
					var sel_li = $li.eq(i);


					if(i>=s && i<=e) {	
						sel_li.css($.extend(onCss,{"opacity":0})).animate({"opacity":1},300);
					}
					else{ 						
						sel_li.css(offCss);
					}
				}
				
				}



				if(o.isPlay) Timer = setTimeout(function(){goNext();},o.auto);
				
			}
			function goNext(){
				var goPg = pg+1;
				if(goPg>vpage) goPg = 1;
				goPage(goPg);
			}
			function goPrev(){
				var goPg = pg-1;
				if(goPg<1) goPg = vpage;
				goPage(goPg);
			}
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show(); }	 clearTimeout(Timer);}
			function play(){	 if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show(); }	 goPage(pg);}

		});

	}



	$.fn.scrollContent=function(o){

		o = $.extend({wrap:null,vcount:1,vertical:false,li_w:0,li_h:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			var set_li_size = (o.vertical)? o.li_h : o.li_w;

			$ul.css({
				width:(o.vertical)? o.li_w : set_li_size*$li.length ,
				height:(o.vertical)? set_li_size*$li.length  : o.li_h
			});
			
			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				
				var toPosition = $(this).index() * set_li_size - ((this_pg-1)*(o.vcount * set_li_size));
				var totop = (!o.vertical)? 0 : toPosition;
				var toleft = (o.vertical)? 0: toPosition;
				$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":""});
			});

			goPage(1);
			if(o.isPlay){	play();	 }
			else { 		stop();  	}

			$a.bind("focus",function(){
				o.isPlay = false;stop();
				var n = $($(this).parents("li").get(0)).index();
				var this_pg = Math.ceil((n+1)/o.vcount);
				goPage(this_pg);

			});
			
			$(o.btnNext).click(function(){	goNext();	});
			$(o.btnPrev).click(function(){	goPrev();	});
			$(o.btnStop).click(function(){	 o.isPlay=false; stop();	});
			$(o.btnPlay).click(function(){	o.isPlay=true; play();	});

			function goPage(n){
				clearTimeout(Timer);		
				
				if(pg!=n){
					pg = n;
					
				var s = (n-1 )*o.vcount, e = s+o.vcount -1;

				var set_li_pos = (o.vertical)? o.li_w : o.li_h;
				
				var onCss = (o.vertical)? {"left":0} : {"top":0};
				var offCss = (o.vertical)? {"left":((-1) *set_li_pos) +"px"} : {"top":((-1) * set_li_pos) +"px"};

				for(var i=0; i<$li.length;i++){		
					if(i>=s && i<=e) {	
						$($li[i]).css($.extend(onCss,{"opacity":0})).animate({"opacity":1},300,function(){});
					}
					else{ 						
						$($li[i]).css(offCss);
					}
				}
				
				}

				if(o.isPlay) Timer = setTimeout(function(){goNext();},o.auto);
				
			}
			function goNext(){
				var goPg = pg+1;
				if(goPg>vpage) goPg = 1;
				goPage(goPg);
			}
			function goPrev(){
				var goPg = pg-1;
				if(goPg<1) goPg = vpage;
				goPage(goPg);
			}
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show(); }	 clearTimeout(Timer);}
			function play(){	 if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show(); }	 goPage(pg);}

		});

	}
			$.fn.mscrollContent03=function(o){

		o = $.extend({wrap:null,vcount:1,vertical:false,mvsize:0,vsize:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this),$a=$("a",$this);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			//$ul.height(o.height*vpage);
			

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				var toPosition = $(this).index() * o.vsize - ((this_pg-1)*(o.vcount * o.vsize));
				var totop = (!o.vertical)? 0 : toPosition;
				var toleft = (o.vertical)? 0: toPosition;
				$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":""});
			});

			goPage(1);
			if(o.isPlay){	play();	 }
			else { 		stop();  	}

			$a.bind("focus",function(){
				o.isPlay = false;stop();
				var this_pg = Math.ceil(($(this).parent().index()+1)/o.vcount);
				goPage(this_pg);

			});
			
			$(o.btnNext).click(function(){	goNext();	});
			$(o.btnPrev).click(function(){	goPrev();	});
			$(o.btnStop).click(function(){	 o.isPlay=false; stop();	});
			$(o.btnPlay).click(function(){	o.isPlay=true; play();	});

			function goPage(n){
				clearTimeout(Timer);		
				
				if(pg!=n){
					pg = n;
					
				var s = (n-1 )*o.vcount, e = s+o.vcount -1;
				
				var onCss = (o.vertical)? {"left":0} : {"top":0};
				var offCss = (o.vertical)? {"left":((-1) * o.mvsize) +"px"} : {"top":((-1) * o.mvsize) +"px"};

				for(var i=0; i<$li.length;i++){		
					if(i>=s && i<=e) {	
						$($li[i]).css($.extend(onCss,{"opacity":0})).animate({"opacity":1},300);
					}
					else{ 						
						$($li[i]).css(offCss);
					}
				}
				
				}

				if(o.isPlay) Timer = setTimeout(function(){goNext();},o.auto);
				
			}
			function goNext(){
				var goPg = pg+1;
				if(goPg>vpage) goPg = 1;
				goPage(goPg);
			}
			function goPrev(){
				var goPg = pg-1;
				if(goPg<1) goPg = vpage;
				goPage(goPg);
			}
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show(); }	 clearTimeout(Timer);}
			function play(){	 if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show(); }	 goPage(pg);}

		});

	}




	$.fn.mscrollContent2=function(o){

		o = $.extend({wrap:null,vcount:1,vertical:false,mvsize:0,vsize:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this),$a=$("a",$li);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;
			//$ul.height(o.height*vpage);
			
			/*
			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				var toPosition = $(this).index() * o.vsize - ((this_pg-1)*(o.vcount * o.vsize));
				var totop = (!o.vertical)? 0 : toPosition;
				var toleft = (o.vertical)? 0: toPosition;
				$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":""});
			});
			*/
			$ul.css({"position":"absolute","left":0,"top":0,"width":o.vsize * $li.length});
			

			goPage(1);
			if(o.isPlay){	play();	 }
			else { 		stop();  	}
			
			
			$a.bind("focus",function(){
				o.isPlay = false;stop();
				var this_pg = Math.ceil(($($(this).parents("li").get(0)).index()+1)/o.vcount);
				goPage(this_pg);

			});
			
		
			$(o.btnNext).click(function(){	goNext();	});
			$(o.btnPrev).click(function(){	goPrev();	});
			$(o.btnStop).click(function(){	 o.isPlay=false; stop();	});
			$(o.btnPlay).click(function(){	o.isPlay=true; play();	});

			function goPage(n){
				clearTimeout(Timer);		
				
				if(pg!=n){
					pg = n;
					
					/*
					var s = (n-1 )*o.vcount, e = s+o.vcount -1;
					
					var onCss = (o.vertical)? {"left":0} : {"top":0};
					var offCss = (o.vertical)? {"left":((-1) * o.mvsize) +"px"} : {"top":((-1) * o.mvsize) +"px"};

					for(var i=0; i<$li.length;i++){		
						if(i>=s && i<=e) {	
							$($li[i]).css($.extend(onCss,{"opacity":0})).animate({"opacity":1},300);
						}
						else{ 						
							$($li[i]).css(offCss);
						}
					}
					*/
					$ul.stop().animate({"left": (n-1) * o.vsize * -1},300);
				
				}

				if(o.isPlay) Timer = setTimeout(function(){goNext();},o.auto);
				
			}
			function goNext(){
				var goPg = pg+1;
				if(goPg>vpage) goPg = 1;
				goPage(goPg);
			}
			function goPrev(){
				var goPg = pg-1;
				if(goPg<1) goPg = vpage;
				goPage(goPg);
			}
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show(); }	 clearTimeout(Timer);}
			function play(){	 if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show(); }	 goPage(pg);}

		});

	}


	$.fn.mpopupzone=function(o){

		o = $.extend({wrap:null,numobj:null,vcount:1,w:0,h:0,vertical:false,btnNext:null,btnPrev:null,isPlay:true,auto:3000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;

			if( ($("li",o.wrap).length % o.vcount)>0) {
				var addBlank = o.vcount - ($("li",o.wrap).length % o.vcount);
				for (var j=0;j<addBlank ;j++ )
				{
					$("ul",o.wrap).append("<li class='blank'><img src='http://www.gnu.ac.kr/img/main_new/nodata.gif' alt='이미지없음'/></li>");
				}

			}

			var $this = $(this),$ul=$("ul",o.wrap),$li = $("li",o.wrap),$a=$("a",o.wrap);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;
			var vtotal = $li.not(".blank").length, ndt =0;
			o.vsize = (o.vertical)? o.h:o.w;
			
			//$ul.css({"position":"absolute","left":0,"top":0});

		

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				var this_dt = i;

				//var this_pg = Math.ceil( i/ o.vcount) ;
				var toPosition = $(this).index() * o.vsize - ((this_pg-1)*(o.vcount * o.vsize));
				var totop = (!o.vertical)? 0: toPosition;;// (!o.vertical)? o.vsize : toPosition;
				var toleft = (o.vertical)? 0: toPosition;
				$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":"","opacity":0,"z-index":1});

				
			});

			if(o.numobj!=null){
				o.numobj.each(function(){
					
					$(this).click(function(){
						var this_dt = $(this).parent().index() + 1; 
						goData(this_dt);
						return false;
					});
					
				});
			}

			goData(1);	
			if(o.isPlay){	play();	 }
			else { 		stop();  	}

			$a.bind("focus",function(){
				o.isPlay = false;stop();
				//var this_pg = Math.ceil(($(this).parent().index()+1)/o.vcount);
				var this_dt = $($(this).parents("li").get(0)).index() + 1;
				goData(this_dt);

			});
			
			$(o.btnNext).click(function(){	goNext();	});
			$(o.btnPrev).click(function(){	goPrev();	});
			$(o.btnStop).click(function(){o.isPlay=false; stop();	});
			$(o.btnPlay).click(function(){o.isPlay=true; play();	});

			function goData(n){
				clearTimeout(Timer);		
				if(n<1) n = 1;


				if(ndt!=n){
					ndt = n;
					var this_pg = Math.ceil(n/o.vcount)  ;

					goPage(this_pg);
					
					
					$($li).not($($li[(n-1)])).removeClass("over");
					$($li[(n-1)]).addClass("over");

					//번호 Over
					$(o.numobj).not($(o.numobj[(n-1)])).removeClass("over");
					$(o.numobj[(n-1)]).addClass("over");

				
				}

				if(o.isPlay) Timer = setTimeout(function(){goNextData();},o.auto);
				
			}

			function goPage(n){

				if(n<1) n = 1;
				if(pg!=n){
					
					//var to = (o.vsize * o.vcount * (n-1)) * (-1);
					//var toPos =  (o.vertical)? {"top":to} : {"left":to};
					//$ul.stop().animate(toPos,500);

						//이전페이지의 데이터들 hide처리 
						var os = (pg-1) * o.vcount, oe = os+o.vcount -1;
					
						var s = (n-1 )*o.vcount, e = s+o.vcount -1;
						
						var onCss = (o.vertical)? {"left":0} : {"top":0};
						var onCss_s =  (o.vertical)? {"left":((-1) * o.vsize) +"px"} : {"top":( o.vsize) +"px"};
						var offCss = (o.vertical)? {"left":((-1) * o.vsize) +"px"} : {"top":((-1) * o.vsize) +"px"};

						if(pg==0){ $li.css(offCss);	}else{

						}

						var c =0;
						for (var i=s; i<=e;i++ )		
						{
					
							$($li[i]).stop().css($.extend(onCss_s,{"opacity":0})).animate($.extend(onCss,{"opacity":1}),400+100*c,function(){
								
								var this_n = $(this).index()+1;
								var this_pg = Math.ceil( this_n/ o.vcount) ;
								var seq = os + (this_n - (this_pg-1) * o.vcount -1) ;
								if(seq>=0) $($li[seq]).css(offCss).css({"z-index":3});
								$(this).css({"z-index":1});								
							});
						
							c++;

						}

						pg = n;

				}

				//
			}
			function goNextData(){
				var goDt = ndt+1;
				if(goDt>vtotal) goDt = 1;
				goData(goDt);
			}
			function goPrevData(){
				var goDt = ndt-1;
				if(goDt<1) goDt = vtotal;
				goData(goDt);
			}
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show(); }	 clearTimeout(Timer);}
			function play(){	 if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show(); }	 goData(ndt);}

		});

	}

	//맞춤서비스
	$.fn.mquick=function(){
		return this.each(function(){
			var Timer = null,isOver = false, initSeq=0;
			var $this = $(this), $dl = $("dl",$this) , $btns = $("dt > a",$this);
		
			
			$("a,button,dd",$this).bind("mouseover focus", function(){	 isOver = true;	});
			$("a,button,dd",$this).bind("mouseout blur", function(){	setMenuOut();	});

			$("img",$btns).each(function(){
				var orgSrc = $(this).attr("src");
				var ovSrc = $(this).attr("ovImg");
				$(this).attr("orgSrc",orgSrc);
				if(ovSrc!=undefined) $(this).attr("ovSrc",ovSrc);
			});
			//스타일 초기화
			$("dd",$this).css({"height":0,"border-bottom-width":"0","border-top-width":0,"top":0}).show();

			//대메뉴 설정 
			$btns.each(function(){
				$(this).attr("seq",$(this).parent().parent().index() + 1);
				$(this).bind("mouseover focus",function(){
					setMenuOn($(this).attr("seq"));
				});

				$(this).bind("click",function(){return false;});
			});
			//닫기버튼 설정
			$(".btn-close",$dl).bind("click",function(){	setMenuOn(0);	});
			
		
			function setMenuOn(){
				clearTimeout(Timer );
				var s  = new Array();
				for(var i=0; i<arguments.length;i++){
					s[i] = arguments[i];	
				}

				if(s[0]>0){
					var subMenu = $("dd",$dl[s[0]-1]);
					var otherMenu = $("dd",$dl).not(subMenu);
					var thisMnImg = $("img",$btns[s[0]-1]);
					var otherMnImg = $("img",$btns).not(thisMnImg);
					subMenu.pg = 1;
					
					$(thisMnImg).attr("src",$(thisMnImg).attr("ovSrc"));
					
					if(s[0]==2) cont1Box.mquick2.goPage(1);

					$(subMenu).show().stop().animate({"height":"168px","top":"-169px","border-bottom-width":"1px","border-top-width":"1px"},300);
					$(otherMenu).stop().animate({"height":"0","top":"-0","border-bottom-width":"0px","border-top-width":"0px"},200,function(){$(this).hide();});

					otherMnImg.each(function(){
						$(this).attr("src",$(this).attr("orgSrc"));
					});

				}else{
					var otherMenu = $("dd",$dl);
					var otherMnImg = $("img",$btns).not(thisMnImg);
					$(otherMenu).stop().animate({"height":"0","top":"-0","border-bottom-width":"0px","border-top-width":0},200,function(){$(this).hide();});
					otherMnImg.each(function(){
						$(this).attr("src",$(this).attr("orgSrc"));
					});

				}
	
			}
			function setMenuOut(){
				clearTimeout(Timer );
				isOver = false;	Timer = setTimeout(function(){	if(isOver==false){		setMenuOn(initSeq);		}	},400);
			}
			
		});

	}

	
})(jQuery);


var mScrollBox = function(el,o){ 
	var cfg = $.extend({wrap:null,ul:null,li:null,vcnt:1,vheight:18,wrapw:130,wraph:80,vrow:1,btnNext:null,btnPrev:null}, o||{});

	this.init(el, cfg); 
}
mScrollBox.prototype.init = function(e,o){
	var this_s = this;


	this.obj =  $(e);

	this.$wrap = o.wrap ?  $(o.wrap) : $(".datalist-wrap",$(e));
	this.$ul = o.ul ?  $(o.ul) : $("ul",$(this.$wrap));
	this.$list =  o.li ?  $(o.li) : $("li",this.$ul);


	this.vcnt =  o.vcnt, this.pg = o.pg > 0 ? o.pg : 1;
	this.vheight = o.vheight; this.vrow = o.vrow>0? o.vrow:1;
	this.vpage =  Math.ceil(this.$list.length / this.vcnt);


	this.btn_prv = o.btnPrev ?   $(o.btnPrev ) : $(".btn-prev",$(e));
	this.btn_nxt =  o.btnNext ?   $(o.btnNext ) :$(".btn-next",$(e));
	
	this.$wrap.css({"position":"relative","width":o.wrapw,"height":o.wraph,"overflow":"hidden"});
	this.$ul.css({"position":"absolute","left":"0","top":0});
	this.$ul.height(this.vpage * this.vheight * Math.ceil(this.vcnt/this.vrow));
	//alert(this.$ul.height());
	//this.$ul.height(this.vpage * 18 * Math.ceil(this.vcnt/2));


	if(this.vpage<=1){ this.btn_prv.hide();this.btn_nxt.hide();}
	else {
		this.btn_nxt.click(function(){
			var gopg = this_s.pg + 1;

			if(gopg <= this_s.vpage){
				this_s.goPage(gopg);
			}else{
				//this_s.goPage(1);
				alert("마지막입니다.");
				//return false;
			}

			
		});
		this.btn_prv.click(function(){
			var gopg = this_s.pg - 1;

			if(gopg >= 1){
				this_s.goPage(gopg);
			}else{
				//this_s.goPage(this_s.vpage);
				alert("처음입니다");
				//return false;
			}

		});

	}
	$("a",this.$ul).focus(function(){
		var npg = Math.ceil(($(this).parent().index()+1)/this_s.vcnt);
		this_s.goPage(npg);
	});

}
mScrollBox.prototype.goPage = function(n){
	if(this.pg!=n){
		this.pg = n;
		this.$wrap.scrollTo($("a:eq("+((n-1 )*this.vcnt)+")",this.$ul),100);	
	}

}


var mScrollBox2 = function(el,o){ 
	var cfg =  $.extend({wrap:null,vcount:1,vertical:false,mvsize:0,vsize:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});

	this.init(el, cfg); 
}
mScrollBox2.prototype.init = function(e,o){
	this.Timer = null;

	var this_s = this;
	

	this.obj =  $(e);
	this.o = o;

	this.$wrap = o.wrap ?  $(o.wrap) : $(".datalist-wrap",$(e));
	this.$ul = o.ul ?  $(o.ul) : $("ul",$(this.$wrap));
	this.$list =  o.li ?  $(o.li) : $("li",this.$ul);

	this.vcount =  o.vcount, this.pg = o.pg > 0 ? o.pg : 0;
	this.vpage = Math.ceil(this.$list.length / o.vcount);


	

	this.$list.each(function(){
		var i = $(this).index() +1 ;
		var this_pg = Math.ceil( i/ o.vcount) ;
		var toPosition = $(this).index() * o.vsize - ((this_pg-1)*(o.vcount * o.vsize));
		var totop = (!o.vertical)? 0 : toPosition;
		var toleft = (o.vertical)? 0: toPosition;
		$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":""});
	});
	

	if(this.$list.length<=this.vcount){
	this.o.toggleBtn = false;
		o.btnNext.hide();
		o.btnPrev.hide();
		o.btnStop.hide();
		o.btnPlay.hide();
	}
	else{
		if(o.isPlay){	this_s.play();	 }
		else { 		this_s.stop();  	}
		$("a",this.$list).bind("focus",function(){
			o.isPlay = false;this_s.stop();
			var this_pg = Math.ceil(($(this).parent().index()+1)/o.vcount);
			this_s.goPage(this_pg);

		});

		$(o.btnNext).click(function(){	this_s.goNext();	});
		$(o.btnPrev).click(function(){	this_s.goPrev();	});
		$(o.btnStop).click(function(){	 o.isPlay=false; this_s.stop();	});
		$(o.btnPlay).click(function(){	o.isPlay=true; this_s.play();	});


		if(this.pg<1) this.goPage(1);
		else 	this.goPage(this.pg);

	}

	


}
mScrollBox2.prototype.play = function(){ if(this.o.toggleBtn) { $(this.o.btnPlay).hide();$(this.o.btnStop).show(); }	 this.goPage(this.pg);};
mScrollBox2.prototype.stop = function(){ if(this.o.toggleBtn) { $(this.o.btnStop).hide();$(this.o.btnPlay).show(); }	 clearTimeout(this.Timer);};
mScrollBox2.prototype.goNext = function(){
		var goPg = this.pg+1;
		if(goPg>this.vpage) goPg = 1;
		this.goPage(goPg);

};
mScrollBox2.prototype.goPrev = function(){
	var goPg = this.pg-1;
	if(goPg<1) goPg = this.vpage;
	this.goPage(goPg);
};

mScrollBox2.prototype.goPage = function(n){
	var this_s = this;
	var o = this.o;
	var $li = this.$list;
	clearTimeout(this.Timer);		


	if(this.pg!=n){
		this.pg = n;

		var s = (n-1 )* this.vcount, e = s+this.vcount -1;

	
		var onCss = (o.vertical)? {"left":0} : {"top":0};
		var offCss = (o.vertical)? {"left":((-1) * o.mvsize) +"px"} : {"top":((-1) * o.mvsize) +"px"};

		for(var i=0; i<$li.length;i++){		
			if(i>=s && i<=e) {	
				$($li[i]).css($.extend(onCss,{"opacity":0})).animate({"opacity":1},300);
			}
			else{ 						
				$($li[i]).css(offCss);
			}
		}
	
	}

	if(o.isPlay) this.Timer = setTimeout(function(){this_s.goNext();},this.o.auto);

}


////////////////////////////////////////////////////////////////////////////////////////