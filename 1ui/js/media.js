$(".clip").draggable({ snap: "#sequence", mode: "inner"});


    $( "#sequence" ).droppable({
      accept: ".clip",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .append(ui.draggable);
          
        }
    });