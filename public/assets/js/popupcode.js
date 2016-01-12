(function ($) {
  "use strict";

  $(function () {
    var i = 0;
    mermaid.initialize({
      htmlLabels: true,
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
      //$(this).data('id')
    });
  });

}(jQuery));