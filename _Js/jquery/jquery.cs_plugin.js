/*//////////////////////////////////////////*/
var csBannerRoll;
if (csBannerRoll == undefined) {
	csBannerRoll = function (o) {
		
		var this_s = this;
		this.o =  $.extend({obj:null,contents:".datalist li",numctrs:".ctrl-nums a",toggleBtn:true,prevBtn:null,nextBtn:null,stopBtn:null,playBtn:null,isPlay:false,speed:4000,initNum:1,flickEvt:false}, o||{});

		this.Timer = null;
		this.isPlay =  (this.o.isPlay)? true:false;;
	

		var $this = $(o.obj);
		this.$cont = $(this.o.contents,$this);
		this.$numBtns = $(this.o.numctrs,$this);
		this.seq = 0;
		this.$this = $this;
	


		if(this.o.prevBtn==null) this.o.prevBtn = $(".btn-prev",$this);
		if(this.o.nextBtn==null) this.o.nextBtn = $(".btn-next",$this);
		if(this.o.stopBtn==null) this.o.stopBtn = $(".btn-stop",$this);
		if(this.o.playBtn==null) this.o.playBtn = $(".btn-play",$this);


		this.init();

		this.setOn(this.o.initNum);

	};
}
csBannerRoll.prototype.init = function () {


	var this_s = this;
	this.setCtrlBtns();
	this.setToggleBtns();	

	this.$numBtns.each(function(){
		$(this).attr("seq",($(this).index()+1));
		$(this).bind("click",function(){
			this_s.setOn($(this).attr("seq"));
			return false;
		});
	});



	this.$cont.each(function(){
		var n = $(this).index() + 1; 
		$(this).css({"position":"absolute","display":"block","opacity":0});
		$("a,button",$(this)).unbind("focus").bind("focus",function(){
			this_s.setOn(n);
		});

		if(this_s.o.flickEvt ){
			
			$(this_s.o.flickContents,$(this)).unbind("flick").bind("flick",function(e){

				
				switch(e.orientation){
				case "horizontal":
					e.preventDefault();
					if(e.direction >0){
						this_s.goPrev();

					}else if(e.direction <0){
						this_s.goNext();

					}
					break;
				case "vertical":
					break;
				default :break;
			}


			});

		}
	});
	
}

csBannerRoll.prototype.setCtrlBtns = function () {
	var this_s = this;
	$(this.o.playBtn).bind("click",function(){  this_s.play(); return false; });
	$(this.o.stopBtn).bind("click",function(){  this_s.stop(); return false; });

	$(this.o.nextBtn).bind("click",function(){ this_s.goNext();return false;});
	$(this.o.prevBtn).bind("click",function(){ this_s.goPrev();return false;});
}
csBannerRoll.prototype.setToggleBtns = function () {
	var this_s = this;
	if(this.o.toggleBtn){
		if(this.isPlay) { $(this.o.playBtn).hide();$(this.o.stopBtn).show();} 
		else { $(this.o.playBtn).show();$(this.o.stopBtn).hide();} 
	}else{
		$(this.o.playBtn).show();$(this.o.stopBtn).show();
	}

}
csBannerRoll.prototype.setOn = function (n) {
	var this_s = this;
	clearTimeout(this.Timer);		
	if (n==undefined)	n = 1 ;
	
	if(this.seq!=n){

		for (var i=0; i<this.$cont.length; i++){
			if ( (i+1)==n ){
				$(this.$numBtns[i]).stop().addClass("over");
				$(this.$cont[i]).css({"z-index":100,"opaicty":0}).stop().show().animate({opacity:1});
			}else{
				$(this.$numBtns[i]).stop().removeClass("over");
				$(this.$cont[i]).css({"z-index":1}).stop().animate({opacity:0},function(){
					$(this).hide();
				});
			}
		}
		this.seq = n;
	}

	var nextNum = parseInt(n) + 1;
	if(nextNum> this.$cont.length){
		nextNum = 1;
	}

	if(this.isPlay) this.setNextOn();

}
csBannerRoll.prototype.setNextOn = function () {
	var this_s = this;
	clearTimeout(this.Timer);		

	var nextNum = parseInt(this.seq) + 1;
	if(nextNum>  $(this.$cont).length){
		nextNum = 1;
	}

	this.Timer = setTimeout(function(){this_s.setOn(nextNum);},this_s.o.speed);

}
csBannerRoll.prototype.play = function(){ 	this.isPlay = true;  this.setToggleBtns();  this.setOn(this.seq);}
csBannerRoll.prototype.stop = function(){ clearTimeout(this.Timer); 	this.isPlay = false;  this.setToggleBtns();  }
csBannerRoll.prototype.goPrev = function(){
	clearTimeout(this.Timer); 
	var nextNum = parseInt(this.seq) - 1;
	if(nextNum<1)	nextNum = this.$cont.length;
	this.setOn(nextNum);
}
csBannerRoll.prototype.goNext = function(){
	clearTimeout(this.Timer); 
	var nextNum = parseInt(this.seq) + 1;

	if(nextNum > $(this.$cont).length)	nextNum = 1;

	this.setOn(nextNum);
}




function resetGalleryListSize_default(settings){
	var cfg = $.extend({wrap:null,listwrap:null,limit_img_size:{w:160,h:120},default_limit:4,wsize_limits:[[480,2]],li_height_more:50,sel_thumb:"img"},settings);
	var $wrap = cfg.wrap;
	var $listWrap = cfg.listwrap ;
	var items = $("li",$listWrap);
	
	var f_width = $wrap.width();
	var orgImgSize = cfg.limit_img_size;//{w:175,h:122};


	var toSize = {w:orgImgSize.w,h:orgImgSize.h};
	var line_limit = cfg.default_limit;
	

	if(cfg.wsize_limits.length>0){
		for(var i=0;i<cfg.wsize_limits.length; i++){
			if(wsize.win.w <= cfg.wsize_limits[i][0]) {
				line_limit = cfg.wsize_limits[i][1];
				break;
			}
		}
	}

	var lines =Math.ceil( items.length / line_limit) ;

	if(f_width > wsize.win.w){ f_width = wsize.win.w;}
	
	var li_re_width = Math.floor(f_width / line_limit ) - 10;
	if(toSize.w > li_re_width){
		toSize.w = li_re_width;
		toSize.h = Math.floor(( orgImgSize.h * li_re_width ) / orgImgSize.w);
	}

	var li_height = (parseInt(toSize.h) + cfg.li_height_more);
	var mg = Math.floor((f_width - (toSize.w * line_limit))/ (line_limit-1) );

	
	items.each(function(){
		var $this = $(this);
		$this.width(toSize.w);
		$this.height(parseInt(toSize.h) + cfg.li_height_more);
		
		if(cfg.sel_thumb!=""){
			$(cfg.sel_thumb,this).css({"width":toSize.w,"height":toSize.h});
		}


		var $line_index = $(this).index() % line_limit;
		var mgLeft = mg;
		if($line_index==0)	mgLeft = 0;

		if(_isLowBr_ ) {

			var toAbs_Left = ($line_index * toSize.w ) +( mg * $line_index)  ;
			var toAbs_Top = (Math.ceil(($(this).index() + 1) / line_limit) -1) * (li_height);
			$this.css({"position":"absolute","left":toAbs_Left, "top":toAbs_Top,"width":toSize.w,"height":(li_height)+"px","margin-left":0,"margin-right":0,"padding-left":0,"padding-right":0});
			
			$listWrap.height(li_height * lines);

		}else{
			$this.css({"width":toSize.w,"height":(li_height)+"px","margin-left":mgLeft,"margin-right":0,"padding-left":0,"padding-right":0});
		}



		

		
	});

	
	
	//ie7에서 초기 사이즈 계산 오류있음, 최대 사이즈로 계산 후 다시 재계산하는 오류 확인되어 2번 로드하는식으로 
	if(_isLowBr_ && $wrap.prop("isIE7Load")!="1"){
		$wrap.prop("isIE7Load","1");
		resetGalleryListSize_default(cfg);
	}


}


// select 박스를 이용한 display 제어
	function viewContentGroup(groupClsName,viewId){

		var sel_obj = $("[is-rel-cgroup='"+groupClsName+"'] option:selected");
		if(viewId==undefined){
			var viewId = sel_obj.val();
		}
		var rel_conts = $("." + groupClsName);
		var sel_cont = $("#" + groupClsName + viewId);
		rel_conts.not(sel_cont).hide();
		sel_cont.show();
	}

	function initContentGroupViews(){
		var sel_obj = $("select[is-rel-cgroup]");

		sel_obj.each(function(){
			var rel_cls = $(this).attr("is-rel-cgroup");
			viewContentGroup(rel_cls);
		});
		
	}
	$(document).ready(function(){
		initContentGroupViews();
	});