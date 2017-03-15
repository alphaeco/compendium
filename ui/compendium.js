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
       path: "/media/local/starTrek/movies/firstContact.mp4",
       desc: "desc...",
         id: 1,
       type: "video", 
      cover: "/thumbnail/starTrek/movies/firstContact.png"
    },
    { title: "What is Life - untitled",
       path: "/media/local/youtube/life.mp4",
       desc: "youtube desc...",
         id: 1221,
       type: "video",
      cover: "/thumbnail/youtube/life.png"
    }
];

shortcut.add("shift+r", function(){
    localMedia.forEach(function (entry) {
        $("#browser_projects").append("<li class='project'><img class='thumbnail' src='" + entry.cover + "'/>" +
            "<div class='info'> <p class='title'>" + entry.title + "</p></li>");
    });
    $(".project").click(function() {
        $("#browser_main").hide().removeClass("hide").fadeIn("slow");
    });
});

//<ul id="browser_projects">
//            <li class='project'>
//                
//                <img src="#" class="thumbnail"/>
//                <div class="info">
//                        <p class="title">title</p>
//                        <p>desc</p>
//                </div>
//                
//            </li>

$("#browser_projects").sortable();
$("#preview-container").draggable();

// establish video player
vidSrc = "/media/local/video1.mp4"
VideoPlayer = $("#preview").get(0);

function updateProgressBar() {
   var progressBar = $('#playerProgress');
   var percentage = Math.floor((100 / VideoPlayer.duration) * VideoPlayer.currentTime);
   progressBar.css("width", percentage + "%");
}

shortcut.add("s", function () {
    VideoPlayer.src = vidSrc;
    VideoPlayer.addEventListener('timeupdate', updateProgressBar, false);
});

shortcut.add("k", function () {
    VideoPlayer.paused ? VideoPlayer.play() : VideoPlayer.pause();
});
