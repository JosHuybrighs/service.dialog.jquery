##service.dialog.jquery - Dialog popup

###Description

`service.dialog.jquery` is yet another jquery component to bring up a dialog window. I know there are lots of those dialog plugins and so you probably wonder why this one. Well, for me a couple of things are important for such plugins (and too some extend for almost every other type of plugin):

- They have to be small (this one is 1.6 kB minified).
- They must help me with providing the (software) logic for the problem at hand and not too much the UI side of things; there is often better technology, i.e. HTML and CSS, to solve that than Javascript.
- The component should therefore not do any html markup inside the dialog at all and neither any styling (yes I want to specify the 'close' button myself).
- It must be possible to setup the dialog in either modal or non-modal mode.

By now (and also when you look to the other jquery components I developped) you will probably realize that I am not a particular fan of jQuery UI. I find all of this too big, too much for what I typically need, and not particularly friendly with respect to styling.

So, that's why there is this plugin.

###Tutorial and Documentation

You can find the tutorial and API description at [code.cwwonline.be](http://code.cwwonline.be/servicedialogjquery).
