$(document).ready(function(){
	defaultTabSetting();
});



// 상단으로 이동 버튼 효과
$(function(){     
	 jQuery(".topBt").animate({opacity:0}, 0);

	 jQuery(window).scroll(function(){
	  if(jQuery(window).scrollTop() > 200){
		   jQuery(".topBt").stop().animate({opacity:1}, 150);
	  }else if(jQuery(window).scrollTop() < 200){
		   jQuery(".topBt").stop().animate({opacity:0}, 150);
	  }
	 });
	 jQuery(".topBt").click(function(){
	  jQuery("html, body").animate({scrollTop:0}, 300);
	  jQuery(this).stop().animate({opacity:0}, 150);
	 }); 
});

