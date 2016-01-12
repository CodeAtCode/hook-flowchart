(function ($) {
  "use strict";

  $(function () {
    var i = 0;
    mermaid.initialize({
      flowchart: {
        useMaxWidth: false,
      }});
    $('.mermaid-noise').each(function (index) {
      i++;
      var convert = $(this).text();
      $(this).remove();
      convert = convert.replace(/\[n\]/g, "\n");
      jQuery("body").append("<button class='mermaid-download' data-id='" + i + "'>Download as PNG</button>");
      jQuery("body").append("<div class='mermaid-" + i + "'>" + convert + "</div>");
      mermaid.init(".mermaid-" + i);
    });
    $("body").on("click", "button.mermaid-download", function () {
      svgToPng(document.querySelector(".mermaid-" + $(this).data('id') + ' svg'))
    });

    function svgToPng(source) {
      var name = source.querySelector('#a div').innerHTML;
      var svgString = new XMLSerializer().serializeToString(source);
      //Hack for Mermaid to replace div to text object
      svgString = svgString.replace(/div/g, "text");
      svgString = svgString.replace(/\-9.5/g, "3");
      var DOMURL = self.URL || self.webkitURL || self;
      var svg = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8"
      });
      var url = DOMURL.createObjectURL(svg);
      var a = document.createElement('a');
      a.download = name + '.png';
      a.href = url;
      document.body.appendChild(a);
      a.addEventListener("click", function(e) {
        a.parentNode.removeChild(a);
      });
      a.click();
    }
  });

}(jQuery));