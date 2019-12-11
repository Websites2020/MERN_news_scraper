$(window).on('load', function() {
  
    $("#demo").empty();
      console.log('scraping')
    $.get("/scrape", function(response) {
      
        var info = response;
        // console.log(info)

        var loaded = $("#demo").load("/scrape .news-block h3, .news-block .wp-post-image, .news-block .news-excerpt");
        console.log(loaded)
        setTimeout(function(){

          var node = document.createElement("div");       // Create a text node
          node.setAttribute("class", "like_button_container");
          console.log(node)
          $(loaded[0]).children('h3').append(node)

        }, 2000)
        var y = document.getElementById("info");
        y.style.display = "none";
        var x = document.getElementById("loader");
        x.style.display = "none";
    });

    // $("#demo").on("mouseover", function() {
    //   $('a').miniPreview({ prefetch: 'pageload' });
    // })

  });
  