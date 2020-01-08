var topSelItems;
if (topSelItems == undefined) {	topSelItems = function (obj,settings) {		this._init(obj,$.extend({box_mg_top:0,box_mg_bottom:0,item_height:20},settings));	}; }
topSelItems.prototype._init = function (obj,settings) {
		
	
		this.obj = obj;//$(".top-sel-list .sub-list li a")
		this.settings = settings;
		this.selBtns = $(" dt a ",this.obj);
		this.subObj = $(".sub-list",this.obj);
		this.subItems = $("li a",this.subObj);



		this.hideHeight = this.subObj.height()+this.settings.box_mg_top+this.settings.box_mg_bottom;

		var this_s = this;
		//$(this.selBtns).bind("click",function(){	$(this_s.subObj).stop().animate({"top":30});return false;		});
		$(this.selBtns).unbind("click");
		$(this.selBtns).bind("click",function(){	

			if($(this_s.obj).attr("isOpen")=="1"){

				this_s.hideSublist();
			}else{

				this_s.viewSublist();
			}

			return false;

			//$(this_s.obj).stop().animate({"height":120},200);return false;		
			});

		this.subItems.unbind("focus mouseover blur mouseout");
		this.subItems.bind("focus mouseover",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = true;
			this_s.Timer = setTimeout(function (){this_s.setOn()},500);
		});
	
		
		this.subItems.bind("blur",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},500);
		});

		
		
		//$(this.obj).bind("mouseout",function(){
		$(this.selBtns).bind("mouseout",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},500);
		});

		$(this.subObj).bind("mouseout",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},500);
		});
		
}
					
topSelItems.prototype.setOn = function(){


	if(this.isOnFocus){
		this.viewSublist();
	
	}else{
		this.hideSublist();

	}
	
}

topSelItems.prototype.viewSublist = function(){

		//if ($("#global-bar").width()<=480)	 var setType = "H";
		//else var setType = "D";

		var setType = "D";

		if(setType=="D") {
			var toH = ($("li",this.obj).length +1)* this.settings.item_height +this.settings.box_mg_top+this.settings.box_mg_bottom;
			
			$(this.obj).stop().animate({"height":toH},200);
			$(this.subObj).show();
		}else{
			$(this.subObj).show();
		}
		$(this.obj).attr("isOpen","1");
}

topSelItems.prototype.hideSublist = function(){
//	if ($("#global-bar").width()<=480)	 var setType = "H";
//	else var setType = "D";

	var setType = "D";

	if(setType=="D") {
		$(this.subObj).show();
		//$(this.subObj).stop().animate({"top":-1 * this.hideHeight });
		$(this.obj).stop().animate({"height":this.settings.item_height  },200);
	}else{
		$(this.subObj).hide();
	}
	$(this.obj).attr("isOpen","0");
}

/////////////////////////////////////////////////////////////////////////////

var topLangSel;
if (topLangSel == undefined) {	topLangSel = function (obj,settings) {		this._init(obj,$.extend({box_mg_top:0,box_mg_bottom:0,item_height:20},settings));	}; }
topLangSel.prototype._init = function (obj,settings) {
		
	
		this.obj = obj;//$(".top-sel-list .sub-list li a")
		this.settings = settings;
		this.selBtns = $(" dt a ",this.obj);
		this.subObj = $(".sub-list",this.obj);
		this.subItems = $("li a",this.subObj);



		this.hideHeight = this.subObj.height()+this.settings.box_mg_top+this.settings.box_mg_bottom;

		var this_s = this;
		//$(this.selBtns).bind("click",function(){	$(this_s.subObj).stop().animate({"top":30});return false;		});
		$(this.selBtns).unbind("click");
		$(this.selBtns).bind("click",function(){	

			if($(this_s.obj).attr("isOpen")=="1"){

				this_s.hideSublist();
			}else{

				this_s.viewSublist();
			}

			return false;

			//$(this_s.obj).stop().animate({"height":120},200);return false;		
			});

		this.subItems.unbind("focus mouseover blur mouseout");
		this.subItems.bind("focus mouseover",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = true;
			this_s.Timer = setTimeout(function (){this_s.setOn()},4000);
		});
	
		
		this.subItems.bind("blur",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},4000);
		});

		
		
		//$(this.obj).bind("mouseout",function(){
		$(this.selBtns).bind("mouseout",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},4000);
		});

		$(this.subObj).bind("mouseout",function(){
			clearTimeout(this_s.Timer);
			this_s.isOnFocus = false;
			this_s.Timer = setTimeout(function (){this_s.setOn()},500);
		});
		
}
					
topLangSel.prototype.setOn = function(){


	if(this.isOnFocus){
		this.viewSublist();
	
	}else{
		this.hideSublist();

	}
	
}

topLangSel.prototype.viewSublist = function(){

		//if ($("#global-bar").width()<=480)	 var setType = "H";
		//else var setType = "D";

		var setType = "D";

		if(setType=="D") {
			//var toH = ($("li",this.obj).length +1)* this.settings.item_height +this.settings.box_mg_top+this.settings.box_mg_bottom;
			var toH = 70+this.settings.box_mg_top+this.settings.box_mg_bottom;
			
			$(this.obj).stop().animate({"height":toH},200);
			$(this.subObj).show();
		}else{
			$(this.subObj).show();
		}
		$(this.obj).attr("isOpen","1");
}

topLangSel.prototype.hideSublist = function(){
//	if ($("#global-bar").width()<=480)	 var setType = "H";
//	else var setType = "D";

	var setType = "D";

	if(setType=="D") {
		$(this.subObj).show();
		//$(this.subObj).stop().animate({"top":-1 * this.hideHeight });
		$(this.obj).stop().animate({"height":this.settings.item_height  },200);
	}else{
		$(this.subObj).hide();
	}
	$(this.obj).attr("isOpen","0");
}


/////////////////////////////////////////////////////////////////////////////
function defaultTabSetting(){
	$("#multi-tab01").multiTab_fwidth({line_limit:4,height:39});
	$("#board-tab").multiTab_auto({line_limit:4,height:37,showCtrlBtns:true,ctrlBtnWidth:38});
}

/////////////////////////////////////////////////////////////////////////////
function viewData(id,h){

		if($('#'+id).hasClass("isOpen")){
			$('#'+id).stop().animate({"height":0},400);
			$('#'+id).removeClass("isOpen");
			$("#"+id+"-tit a").removeClass("over");

		}else{

			$('#'+id).stop().animate({"height":h},400);
			$('#'+id).addClass("isOpen");
			$("#"+id+"-tit a").addClass("over");
		}
	}

//댓글 모달팝업
$(function($){
	$('a[href^="#cmt-modal"]').click(function(){
		var $self = $(this);
		var $target = $($(this).attr('href'));
		$("#cmt-modal").stop().css({height:0}).show().animate({height:"100%"},250);
		$("body").css("overflow-y","hidden");
		$target.attr('tabindex', '0').show().focus();


		$target.find(".btn-close").click(function(){
			$("#cmt-modal").animate({"height":0},250,function(){
				$(this).hide();
				$("body").css("overflow-y","");
				$self.focus();
				$(this).off('click');
			});
		});
	});
});