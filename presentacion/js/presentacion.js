var posicion = $('#posicion');
var numero = $('#numero');
var leyenda = $("#leyenda");

// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: false,
    history: true,
    center: false,

    theme: 'simple', // available themes are in /css/theme
    transition: 'fade', // default/cube/page/concave/zoom/linear/fade/none

    // Parallax scrolling
    // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
    // parallaxBackgroundSize: '2100px 900px',

    // Optional libraries used to extend on reveal.js
    dependencies: [
        // { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
        // { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        // { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        // { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        // { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
        // { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
});

Reveal.addEventListener('inicio', function(event) {


    $(".labs").html("");
    var creative = $('#creative-content');
    var tl1 = new TimelineMax();
    tl1.to(creative, 0.4, { opacity: 1 });
    var tl2 = new TimelineMax();
    tl2.to(posicion, 0.4, { opacity: 0 });
}, false);

Reveal.addEventListener('slidechanged', function(event) {
    // todas las diapos

    var tl = new TimelineMax();
    var contentOpenData;

    for (var i = 0; i < event.currentSlide.children.length ; i++){
        var tag = event.currentSlide.children[i].localName;
        if (tag == "h1"){
            var contentOpenData = $(event.currentSlide.children[i]);

            contentSplit = new SplitText(contentOpenData, {
                type: "words"
            });

            TweenLite.set(contentOpenData, {
                perspective: 700
            });
            tl.staggerFrom(contentSplit.words, .75, {
                autoAlpha: 0,
                x: 100,
                rotationY: -100,
                transformOrigin: "50% top -250",
                ease: Power1.easeInOut
            }, 0.2);
        }
        if (tag == "ul"){
            for (var p = 0; p < event.currentSlide.children[i].children.length ; p++){

                var contentOpenData = $(event.currentSlide.children[i].children[p]);

                tl.staggerFrom(contentOpenData, 0.75, {
                    autoAlpha: 0,
                    x: (Math.random() * 200) + 500,
                    rotationZ: 45,
                    rotationX: 180/2,
                    ease: Power1.easeInOut
                }, -1.05);

            }
        }
    }
}, false);