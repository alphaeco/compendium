/* basic ui functions
 * for compendium browser
 */

shortcut.add("shift+a", function (){
    alert("shortcut");
});

$currentTab = "dashboard";

// tabs 
$(".tab").click(function() {
    $( this ).siblings().removeClass("active");
    $( this ).addClass("active");

    $currentTab = $(this).attr("id");
    $targetName = $(this).attr("id") + "_target";

    $(".content").children().addClass("hide");
    $target = $("#" + $targetName);

    $target.removeClass("hide");

});

/* media */

var localMedia = [
    { title: "Star Trek - First Contract",
       path: "/media/local/video/starTrek/firstContact.mp4",
       desc: "desc...",
         id: 1,
       type: "video", 
      cover: "img/video_placeholder.jpg"
    },
    { title: "What is Life - untitled",
       path: "/media/local/youtube/life.mp4",
       desc: "youtube desc...",
         id: 1221,
       type: "video",
      cover: "img/video_placeholder.jpg"
    }
];

$("#browser_projects_search").bind('input', function(){

    $("#browser_projects").html(" ");

    localMedia.forEach(function (entry) {
        if(entry.title) {
            $("#browser_projects").append("<li class='project'><img class='thumbnail' src='" +
             entry.cover + "'/><div class='info'><p class='title'>" + entry.title + "</p></div></li>");

        }
    });
});

$("#browser_projects").sortable();
$("#preview-container").draggable();

$("#preview-container").droppable({
    drop: function (event, ui) {
        ui.draggable.fadeOut("slow");
        $(".controls").append("<li class='playlist-item'>" + ui.draggable.html() + "</li>");
        ui.draggable.fadeIn("slow");
    }
});

// establish video player
vidSrc = "/media/local/video1.mp4"
VideoPlayer = $("#preview").get(0);

function updateProgressBar() {
   var progressBar = $('#playerProgress');
   var percentage = Math.floor((100 / VideoPlayer.duration) * VideoPlayer.currentTime);
   progressBar.css("width", percentage + "%");
}

shortcut.add("shift+k", function () {
    VideoPlayer.paused ? VideoPlayer.play() : VideoPlayer.pause();
});
