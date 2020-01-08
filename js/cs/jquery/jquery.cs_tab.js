;(function($) {

	$.fn.multiTab_fwidth=function(o){

		o = $.extend({wrap:null,height:30,line_limit:6}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$wrap = $(".this-wrap",$this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			
			var vcount = 0 , vpage = 0, pg = 0;	

			var btnNext = $(".btn-next",$this);var btnPrev = $(".btn-prev",$this);
		

			//wrap 사이즈, 전체 가로폭 (양 사이드 버튼 2개 크기 제외 : 30px로 초기화)
			//가로폭에따라 한페이지에 li 갯수, width 결정
			var wrap_width = $this.width();
			getPageCount();
			
			
			
			
			if($wrap.length<1){
				$ul.wrap("<div class='this-wrap'/>");
				$wrap = $(".this-wrap",$this);
			}
			$wrap.css({"position":"relative","top":0,"margin":"0 auto","overflow":"hidden","height":wrap_height});
			$wrap.width(wrap_width);

			$ul.css({"position":"absolute","left":0,"top":0,"overflow":"hidden","height":wrap_height});
			$ul.width(wrap_width);

			

			//페이지 수다시 계산
			getPages();
			if(vpage ==1 && $li.length < vcount) vcount = $li.length;

			var wrap_height =vpage *  o.height;
			$wrap.height(wrap_height);
			$ul.height(wrap_height);



			$ul.width(vpage * wrap_width);
			var li_w = Math.floor(wrap_width / vcount);
			

			if($this.attr("o_vpage")!=vpage || $this.attr("o_vcount")!=vcount || $this.attr("liw")!=li_w ){

			
	

				$li.each(function(){
					var i = $(this).index() +1 ;
					var this_pg = Math.ceil( i/ vcount) ;

					var totop = (this_pg-1) * o.height;			var toleft = $(this).index() * li_w - ((this_pg-1)*(vcount * li_w));
					$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":"","height":o.height,"overflow":"hidden","width":li_w});

					//페이지별 첫번째 li 에는 배경 없애기
					if(i%vcount==1) {
						$(this).addClass("first");
					}else{
						$(this).removeClass("first");
					}

					if(this_pg==1) {
						$(this).addClass("first-row");
					}else{
						$(this).removeClass("first-row");
					}

					if(this_pg==vpage) {
						$(this).addClass("last-row");
					}else{
						$(this).removeClass("last-row");
					}
				});

				$this.attr("o_vpage",vpage);
				$this.attr("o_vcount",vcount);
				$this.attr("liw",li_w);
				
				var initOver =  ($("li.over",$this).length>0)? Math.ceil(($("li.over",$this).index() + 1)/vcount) : 1;
				goPage(initOver);

			}
		
			$a.unbind("focus");
			$a.bind("focus",function(){
				var n = $($(this).parents("li").get(0)).index();
				var this_pg = Math.ceil((n+1)/vcount);
				goPageFix(this_pg);

			});
			$(btnNext).unbind("click");
			$(btnPrev).unbind("click");
			$(btnNext).click(function(){	goNext();	});
			$(btnPrev).click(function(){	goPrev();	});
			
			function getPages(){
				vpage = Math.ceil($li.length / vcount);
			}
			function getPageCount(){
				//vcount = o.line_limit;
					if($this.width() > 640){
						vcount = o.line_limit;
					}else if($this.width() > 480){
						vcount = 3;
					}else{
						vcount = 2;
					}


			}

			function goPage(n){

				//if(pg!=n){

				pg = n;
				return;
				
			}
			function goPageFix(n){

				//if(pg!=n){
				pg = n;
				return;
			

				
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


		});

	}
	$.fn.multiTab_auto=function(o){

		o = $.extend({wrap:null,height:30,line_limit:6,showCtrlBtns:false,btnNext:null,btnPrev:null,ctrlBtnWidth:30}, o||{});
		

		return this.each(function(){
			var Timer = null;
			var $this = $(this),$wrap = $(".this-wrap",$this),$ul=$("ul",$this),$li = $("li",$this);
			var $a=$("a",$li);
			
			var vcount = 0 , vpage = 0, pg = 0;	

			var btnNext = $(".btn-next",$this);var btnPrev = $(".btn-prev",$this);
			
			if(o.showCtrlBtns){
				if(btnPrev.length<1){
					$this.append("<button class='btn-prev'><span>이전</span></button>");
					 btnPrev = $(".btn-prev",$this);
				}

				if(btnNext.length<1){
					$this.append("<button class='btn-next'><span>다음</span></button>");
					 btnNext = $(".btn-next",$this);
				}
			
				btnPrev.css({"position":"absolute","left":0,"top":0});
				btnNext.css({"position":"absolute","right":0,"top":0});
			}

			//wrap 사이즈, 전체 가로폭 (양 사이드 버튼 2개 크기 제외 : 30px로 초기화)
			//가로폭에따라 한페이지에 li 갯수, width 결정
			var wrap_width = $this.width();
			getPageCount();
			
			var wrap_height = o.height;
			
			if($wrap.length<1){
				$ul.wrap("<div class='this-wrap'/>");
				$wrap = $(".this-wrap",$this);
			}
			$wrap.css({"position":"relative","top":0,"margin":"0 auto","overflow":"hidden","height":wrap_height});
			$wrap.width(wrap_width);

			$ul.css({"position":"absolute","left":0,"top":0,"overflow":"hidden","height":wrap_height});
			$ul.width(wrap_width);

			

			//페이지 수다시 계산
			getPages();
			if(vpage ==1 && $li.length < vcount) vcount = $li.length;


			$ul.width(vpage * wrap_width);
			var li_w = Math.floor(wrap_width / vcount);
				

			if($this.attr("o_vpage")!=vpage || $this.attr("o_vcount")!=vcount || $this.attr("liw")!=li_w ){

				if (o.showCtrlBtns)
				{
					if(vpage==1){
						btnNext.hide();	btnPrev.hide();
					}else{
						btnNext.show();	btnPrev.show();
					}				
				}
	

				$li.each(function(){
					var i = $(this).index() +1 ;
					var this_pg = Math.ceil( i/ vcount) ;
					

					var totop = 0;			var toleft = $(this).index() * li_w - ((this_pg-1)*(vcount * li_w));
					$(this).css({"position":"absolute",left:toleft,top:totop,"overflow":"hidden","float":"","height":o.height,"overflow":"hidden","width":li_w});

					//페이지별 첫번째 li 에는 배경 없애기
					if(i%vcount==1) {
						$(this).addClass("first");
					}else{
						$(this).removeClass("first");
					}
				});

				$this.attr("o_vpage",vpage);
				$this.attr("o_vcount",vcount);
				$this.attr("liw",li_w);
				
				var initOver =  ($("li.over",$this).length>0)? Math.ceil(($("li.over",$this).index() + 1)/vcount) : 1;
				goPage(initOver);

			}
		
			$a.unbind("focus");
			$a.bind("focus",function(){
				var n = $($(this).parents("li").get(0)).index();
				var this_pg = Math.ceil((n+1)/vcount);
				goPageFix(this_pg);

			});
			$(btnNext).unbind("click");
			$(btnPrev).unbind("click");
			$(btnNext).click(function(){	goNext();	});
			$(btnPrev).click(function(){	goPrev();	});
			
			function getPages(){
				vpage = Math.ceil($li.length / vcount);
			}
			function getPageCount(){
			//	vcount = o.line_limit;

				if($this.width() > 640){
					vcount = o.line_limit;
				}else if($this.width() > 480){
					vcount = 3;
				}else{
					vcount = 2;
				}

				if($li.length > vcount  && o.showCtrlBtns ) wrap_width = $this.width() - (o.ctrlBtnWidth * 2);
			}

			function goPage(n){

				//if(pg!=n){
				pg = n;
			
				var s = (n-1 )*vcount, e = s+vcount -1;
			
				$li.each(function(){
					var this_n = $(this).index() ;

					var i = $(this).index() +1 ;
					var this_pg = Math.ceil( i/ vcount) ;
					var toleft = $(this).index() * li_w - ((this_pg-1)*(vcount * li_w));
					var toleft_off = toleft + wrap_width;


					//var toOffTop = wrap_height;
					var toOffTop = 0;
					if(this_n >=s && this_n <=e){
						//$(this).stop().css({"opacity":0}).animate({"opacity":1,"top":0,"left":toleft},300,function(){});
						$(this).stop().css({"opacity":0,"top":wrap_height,"width":li_w,"height":wrap_height}).animate({"opacity":1,"top":0},300,function(){});
					}else{
						//$(this).stop().animate({"opacity":0,"top":toOffTop,"left":toleft_off},300,function(){});
						$(this).stop().animate({"opacity":0,"top":wrap_height,"width":li_w,"height":wrap_height},300,function(){});
					}
				});
				
				//}


				
			}
			function goPageFix(n){

				//if(pg!=n){
				pg = n;
			
				var s = (n-1 )*vcount, e = s+vcount -1;
			
				$li.each(function(){
					var this_n = $(this).index() ;

					var i = $(this).index() +1 ;
					var this_pg = Math.ceil( i/ vcount) ;
					var toleft = $(this).index() * li_w - ((this_pg-1)*(vcount * li_w));
					var toleft_off = toleft + wrap_width;


					//var toOffTop = wrap_height;
					var toOffTop = 0;
					if(this_n >=s && this_n <=e){
						//$(this).stop().css({"opacity":0}).animate({"opacity":1,"top":0,"left":toleft},300,function(){});
						$(this).stop().css({"opacity":1,"top":0,left:toleft,"width":li_w,"height":wrap_height});
					}else{
						//$(this).stop().animate({"opacity":0,"top":toOffTop,"left":toleft_off},300,function(){});
						$(this).stop().css({"opacity":0,"top":0,left:toleft,"width":0,"height":0});
					}
				});

				
				//}


				
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


		});

	}

})(jQuery);


