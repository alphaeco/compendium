// define some refrences
var currentTab = document.location.hash;
if(currentTab == "") {
    currentTab = "#dashboard";
}
var tabs = $('.tabs > li');

$(".preview").draggable();

// define our video player
$( "#preview-container" ).droppable({
    accept: ".videoSrc",
    classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
    },
    drop: function( event, ui ) {
        $droppedEl = ui.draggable;
        $droppedEl.appendTo(".controls");
        $vidSrc = $droppedEl.attr("data-link");
        if($vidSrc == undefined) {
            $droppedEl.css("background", "red");
            return false;
        }

        $vidtitle = $droppedEl.find("p").html();
    
        // highlight widget on select element drag
        $( this ).addClass( "ui-state-highlight");
        $( this ).find(".cover").fadeOut();

        // show controls and start video player
        $preview = $( this ).find("#preview");
        $preview.attr("controls", "controls");
        
        // update title and playlist
        $( this ).find(".player-heading").html($vidtitle);
        
    }
});

// on click of tabs switch to tab content
tabs.on("click", function(){
  tabs.removeClass('active');
  $(this).addClass('active');

  tabName = $(this).attr("tab");
  currentTab = tabName;
  $("#tabs-content > ul").children().each(function () {
      $(this).hide();
      if ($(this).attr("tab") == tabName) {
          $(this).show();
      } 
  });
});

// hide tabs content to start
$("#tabs-content > ul").children().hide();
$("#tabs-content > ul > li.current").show();

// add media player
appendPlayer = function () {
    tempate = '<div id="preview-container" class="preview"><h3 class="player-heading">Video Player' +
              '<i style="float:right" onclick="$(this).parent().parent().fadeOut()" class="fa fa-close"></i></h3>'+
              '<div class="cover">Drop Media Here</div><video id="preview" width="360" height="220"'+ 'src="../media/local/video2.mp4"></video> <div class="progressbg"> <div class="progress"></div> </div>'+
	          '<ul class="controls"></ul></div>';
}
    
// some basic shortcuts
shortcut.add("shift+a", function() {
    appendPlayer();
});