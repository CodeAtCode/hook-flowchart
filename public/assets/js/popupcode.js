(function ($) {
  "use strict";

  $(function () {
    var i = 0;
    mermaid.initialize({
      flowchart: {
        useMaxWidth: false
      }});
    [].forEach.call(document.querySelectorAll('.mermaid-noise'), function (el) {
      i++;
      var convert = el.innerHTML;
      convert = convert.replace(/\[n\]/g, "\n");
      document.querySelector('body').innerHTML += "<button class='mermaid-download' data-id='" + i + "'>Download as PNG</button>";
      document.querySelector('body').innerHTML += "<div class='mermaid-" + i + "'>" + convert + "</div>";
      mermaid.init(".mermaid-" + i);
    });
    
    document.querySelector('button.mermaid-download').addEventListener('click', function () {
      svgToPng(document.querySelector(".mermaid-" + $(this).data('id') + ' svg'));
    });

    function svgToPng(source) {
      var name = source.querySelector('#a div').innerHTML;
      var svgString = new XMLSerializer().serializeToString(source);
      //Hack for Mermaid to replace div to text object
      svgString = svgString.replace(/div/g, "text");
      svgString = svgString.replace(/\-9.5/g, "3");
      var svg = new Blob([svgString], {
        type: "image/png"
      });
      var url = URL.createObjectURL(svg);
      var a = document.createElement('a');
      a.download = name + '.png';
      a.href = url;
      document.body.appendChild(a);
      a.addEventListener("click", function (e) {
        a.parentNode.removeChild(a);
      });
      a.click();
    }

  });

}(jQuery));