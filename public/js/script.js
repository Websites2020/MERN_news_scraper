$(window).on('load', function() {
  
    $("#demo").empty();
    $.get("/scrape", function(response) {
        var info = response;
        var loaded = $("#demo").load("/scrape .news-block h3, .news-block .wp-post-image, .news-block .news-excerpt");
        setTimeout(function(){
          var y = document.getElementById("info");
          y.style.display = "none";
          var x = document.getElementById("loader");
          x.style.display = "none";
          var node = document.createElement("div");       // Create a text node
          node.setAttribute("class", "save_button_container");
          $(loaded[0]).children('h3').append(node)
        }, 1500)
    });

  });
  