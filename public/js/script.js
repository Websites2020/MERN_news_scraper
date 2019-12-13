$(window).on('load', function() {
  
    $("#demo").empty();
      console.log('scraping')
    $.get("/scrape", function(response) {
      
        var info = response;
        console.log(info)

        var loaded = $("#demo").load("/scrape .news-block h3, .news-block .wp-post-image, .news-block .news-excerpt");
        console.log(loaded)
        setTimeout(function(){

          var y = document.getElementById("info");
          y.style.display = "none";
          var x = document.getElementById("loader");
          x.style.display = "none";

          var node = document.createElement("div");       // Create a text node
          node.setAttribute("class", "like_button_container");
          console.log(node)
          $(loaded[0]).children('h3').append(node)
          console.log("button added?")
        }, 1500)
    });

    // $("#demo").on("mouseover", function() {
    //   $('a').miniPreview({ prefetch: 'pageload' });
    // })

  });
  