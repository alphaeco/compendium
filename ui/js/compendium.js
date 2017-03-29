/* basic ui functions
 * for compendium browser
 */

$currentTab = "dashboard";

// tabs 
var tabToggle = function (tab) {
	
    $( tab ).siblings().removeClass("active");
    $( tab ).addClass("active");

    $currentTab = $(tab).attr("id");
    $targetName = $(tab).attr("id") + "_target";

    $(".content").children().addClass("hide");
    $target = $("#" + $targetName);

    $target.removeClass("hide");
}

$(".tab").click(function() {
    tabToggle(this);    
});

var runActiveLoad = function () {
                if ($("#header").hasClass("small")){
                    $("#header").removeClass("small");
                } else {
                    $("#header").addClass("small");
                }
        };
               
        var progressUpdate = function  (value) {
                $(".progressbar").width("0%").fadeIn("slow");
                $(".progressbar").animate({
                    "width": value + "%"
                }, 5)};

        shortcut.add("shift+h", function(){
                runActiveLoad();
        });
        
        shortcut.add("ctrl+r", function(){
                var cnt = 1;
                while(cnt < 101) {
                    progressUpdate(cnt);
                    cnt++
                }
        });

shortcut.add("shift+a", function (){
    if ($currentTab == "media") {
        $("#toolbar").slideToggle();
    }
});

/* media */

var localMedia = [
    { title: "Oceans",
       path: "http://vjs.zencdn.net/v/oceans.mp4",
       desc: "desc...",
         id: 1,
       type: "video", 
      cover: "img/video_placeholder.jpg"
    },
    { title: "Big Bucks Bunny",
       path: "http://mirrorblender.top-ix.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_surround.avi",
       desc: "desc...",
         id: 1,
       type: "video", 
      cover: "http://camendesign.com/code/video_for_everybody/poster.jpg"
    },
    { title: "Sintel",
       path: "http://peach.themazzone.com/durian/movies/sintel-2048-stereo.mp4",
       desc: "desc...",
         id: 1,
       type: "video", 
      cover: "https://durian.blender.org/wp-content/uploads/2010/10/sintel-cover-small1.jpg"
    },
    { title: "Local Link",
       path: "file:///home/tarantula/Videos/video.mkv",
       desc: "video desc...",
         id: 1221,
       type: "video",
      cover: "img/video_placeholder.jpg"
    }
];

var options = {
  shouldSort: true,
  threshold: 0.7,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "desc"
  ]
};

var fuse = new Fuse(localMedia, options);

$("#browser_projects_search").bind('input', function(){

    $("#browser_projects").html(" ");

    query = $("#browser_projects_search").val();
    var results = fuse.search(query);

    results.forEach(function (entry) {
        $("#browser_projects").append("<li class='project' data-path='"+ entry.path +"'>"+
             "<img class='thumbnail' src='"+ entry.cover +"'><div class='info'><p class='title'>" + entry.title + "</p></div></li>");
    });
    
});

$("#browser_projects").sortable();
$("#preview-container").draggable();
$("#preview-container").resizable({ aspectRatio: true });

// establish video player
VideoPlayer = $("#mediaPlayer").get(0);

setTitle = function (title) {
    $("#title").html(title);
}

shortcut.add("k", function () {
    VideoPlayer.paused ? VideoPlayer.play() : VideoPlayer.pause();
});

// drag and drop video sources
$("#preview-container").droppable({
    drop: function (event, ui) {
        ui.draggable.hide();

    	  var vidSrc = ui.draggable.attr("data-path");
    	  setTitle(vidSrc);    	      	  
         
        var vidTitle = ui.draggable.find(".title").text();
        setTitle(vidTitle);
        alert(VideoPlayer);
        //$("#fullTime").html(VideoPlayer);

        VideoPlayer.ontimeupdate = function () {
            $("#currentTime").html(VideoPlayer.currentTime);
        };


        VideoPlayer.src = vidSrc;
        alert(videoPlayer.duration);

        VideoPlayer.play();
        
        $(".controls").append("<li class='playlist-item dropped'>" + ui.draggable.html() + "</li>");
        ui.draggable.fadeIn("slow");
    }
});

// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();
