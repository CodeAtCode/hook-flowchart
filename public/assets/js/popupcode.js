document.addEventListener('DOMContentLoaded', function () {
  var i = 0;
  var isWebkit = 'WebkitAppearance' in document.documentElement.style
  mermaid.initialize({
    flowchart: {
      useMaxWidth: false
    }});
  [].forEach.call(document.querySelectorAll('.mermaid-noise'), function (el) {
    i++;
    var convert = el.innerHTML;
    convert = convert.replace(/\[n\]/g, "\n");
    var hook = convert.slice(15).split(']');
    hook = hook[0];
    document.querySelector('.body').innerHTML += "<h3 id='" + hook + "'>Hook " + hook + "</h3>";
    document.querySelector('.buttons').innerHTML += "<a href='#" + hook + "' class='button'>" + hook + "</a><input type='checkbox' data-hook='" + hook + "' data-id='" + i + "' alt='Hide' title='Hide' class='hide-hook' style='margin-top:3px'/>";
    if (!isWebkit) {
      document.querySelector('.body').innerHTML += "<button class='button button-primary mermaid-download' data-id='" + i + "'>Download</button>";
    }
    document.querySelector('.body').innerHTML += "<div class='mermaid-" + i + "'>" + convert + "</div><hr data-id='" + i + "'>";
    mermaid.init(".mermaid-" + i);
  });
  document.querySelector('button.gotop').addEventListener('click', function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  [].forEach.call(document.querySelectorAll('.hide-hook'), function (e) {
    e.addEventListener('click', function () {
      if (e.checked) {
        document.querySelector(".mermaid-" + e.dataset.id).style.display = 'none';
        document.querySelector("#" + e.dataset.hook).style.display = 'none';
        document.querySelector(".mermaid-download[data-id='" + e.dataset.id + "']").style.display = 'none';
        document.querySelector("hr[data-id='" + e.dataset.id + "']").style.display = 'none';
      } else {
        document.querySelector(".mermaid-" + e.dataset.id).style.display = 'block';
        document.querySelector("#" + e.dataset.hook).style.display = 'block';
        document.querySelector("hr[data-id='" + e.dataset.id + "']").style.display = 'block';
      }
    });
  });
  if (!isWebkit) {
    [].forEach.call(document.querySelectorAll('button.mermaid-download'), function (e) {
      e.addEventListener('click', function () {
        svgToPng(document.querySelector(".mermaid-" + e.dataset.id + ' svg'));
      });
    });

    function svgToPng(source) {
      var name = source.querySelector('#a div').innerHTML;
      var svgString = new XMLSerializer().serializeToString(source);
      //Hack for Mermaid to replace div to text object
      svgString = svgString.replace(/div/g, "text");
      //Hack for mermaid for text alignment
      svgString = svgString.replace(/translate\(0\,0\)/g, 'translate(0,12)');
      var svg = new Blob([svgString], {
        type: "image/png"
      });
      var url = window.URL.createObjectURL(svg);
      var a = document.createElement('a');
      a.download = name + '.png';
      a.href = url;
      document.body.appendChild(a);
      a.addEventListener("click", function (e) {
        a.parentNode.removeChild(a);
      });
      a.click();
    }
  }

});
