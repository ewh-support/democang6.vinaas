////////////////////////////////////////////////////////////////////////////////////////
/* 템플릿 기본 스타일 적용 스크립트 */
////////////////////////////////////////////////////////////////////////////////////////

(function($){


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

	
	$.fn.hscrollContent=function(o){

		o = $.extend({wrap:null,vcount:1,li_w:0,li_h:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){

			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			var set_li_size = o.li_w;
			var reTotalWidth = o.li_w * o.vcount * vpage ;


			o.wrap.css({width:o.li_w * Math.ceil(o.vcount), height: o.li_h});			
			$ul.css({width:Math.ceil($li.length * o.li_w) , height: o.li_h});

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;
				$(this).css({width:o.li_w,height:o.li_h}).attr("pg",this_pg);
				
				$(this).addClass("li-mod-"+(i-1)%o.vcount);

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
					
					var mvLeft = -1 * o.li_w * o.vcount * (n-1);
					$ul.stop().animate({ "left":mvLeft},300);
				
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


	$.fn.vscrollContent=function(o){

		o = $.extend({wrap:null,vcount:1,li_w:0,li_h:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			var set_li_size = o.li_h;
			var reTotalSize= o.li_h * o.vcount * vpage ;

			o.wrap.css({width:o.li_w, height: o.li_h  * o.vcount});			
			$ul.css({width: o.li_w , height: reTotalSize});

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;

				$(this).css({width:o.li_w,height:o.li_h}).attr("pg",this_pg);

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
					
					var mvTop = -1 * o.li_h * o.vcount * (n-1);
					$ul.stop().animate({ "top":mvTop},300);
				
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

	
	$.fn.vscrollContent2=function(o){

		o = $.extend({wrap:null,vcount:1,li_w:0,li_h:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			var set_li_size = o.li_h;
			var reTotalSize= o.li_h * vpage ;

			o.wrap.css({width:o.li_w * o.vcount, height: o.li_h  * vpage});			
			$ul.css({width: o.li_w * o.vcount , height: reTotalSize});

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;

				$(this).css({width:o.li_w,height:o.li_h}).attr("pg",this_pg);

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
			$(o.btnStop).click(function(){	 
				o.isPlay=false; 
				stop();	
				$(o.btnPlay).focus();
			});
			$(o.btnPlay).click(function(){	
				o.isPlay=true; 
				play();	
				$(o.btnStop).focus();
			});

			function goPage(n){
				clearTimeout(Timer);		
				
				if(pg!=n){
					pg = n;			
					
					var mvTop = (-1 )*( o.li_h * (n-1));
					$ul.stop().animate({ "top":mvTop},300);
				
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
			function stop(){ if(o.toggleBtn) { $(o.btnStop).hide();$(o.btnPlay).show() }	 clearTimeout(Timer);}
			function play(){ if(o.toggleBtn) { $(o.btnPlay).hide();$(o.btnStop).show()}	 goPage(pg);}

		});

	}

	$.fn.vscrollContent3=function(o){

		o = $.extend({wrap:null,vcount:1,li_w:0,li_h:0,btnNext:null,btnPrev:null,isPlay:true,auto:4000,toggleBtn:true}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			
			var vpage = Math.ceil($li.length / o.vcount),pg = 0;

			var set_li_size = o.li_h;
			var reTotalSize= o.li_h * vpage ;

			o.wrap.css({width:o.li_w * o.vcount, height: o.li_h  * vpage});			
			$ul.css({width: o.li_w * o.vcount , height: reTotalSize});

			$li.each(function(){
				var i = $(this).index() +1 ;
				var this_pg = Math.ceil( i/ o.vcount) ;

				$(this).css({width:o.li_w,height:o.li_h}).attr("pg",this_pg);

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
					
					var mvTop = (-1 )*( o.li_h * (n-1));
					$ul.stop().animate({ "top":mvTop},300);
				
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

	
})(jQuery);
