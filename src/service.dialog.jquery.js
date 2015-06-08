/****************************************************************************************************** 
 * A jquery plugin implementing a modal dialog.
 * Based almost entirely on Avgrund, created by Hakim El Hattab, http://hakim.se
 * 
 * Usage:
 *  - Instantiation:
 *    1. Simple (dialog opens immediately) 
 *      $('#popup').dialog();
 *       ...
 *      // Close
 *      $('#popup').dialog('close');
 *
 *    2. Open through seperate command 
 *      $('#popup').dialog({ openOnInit: false });
 *       ...
 *      // Open
 *      $('#popup').dialog('open');
 *       ...
 *      // Close
 *      $('#popup').dialog('close');
 *
 *    2. With open/close callbacks 
 *      $('#popup').dialog({ onOpen: function () { ... },
 *                           onClose: function () { ... }
 *       ...
 *      // Close
 *      $('#popup').dialog('close');
 *      });
 *
 * version 1.0.0
 *
 * @requires jQuery 1.8.0 or later
 *
 * Copyright (c) Jos Huybrighs
 * code.cwwonline.be
 *
 * Licensed under the MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 *
 ******************************************************************************************************/

; (function ($, win, document, undefined) {
    var version = '1.0.0';
    var pluginName = 'dialog';

    function Plugin(element, options) {
        // Get the main element
        this.$element = $(element);
        // Initialize plugin
        this._init(options);
        // Show dialog when told so
        if (this.settings.openOnInit) {
            this._activate();
        }
    };

    Plugin.prototype = {

        // Activate dialog
        _activate: function () {
            this.$element.addClass('dialogOpen');
            var body = $('body');
            if (this.settings.modal) {
                body.addClass('dialogModal');
                if (this.settings.modalWithOverlay) {
                    body.addClass('dialogOverlay');
                }
                body.append('<div class="dialogBlockPage"></div>');
            }
            else {
                this.$element.addClass('dialogNonModal');
            }
            if (this.settings.closeByEscape) {
                var self = this;
                body.on('keyup.dialog', function (e) {
                    if (e.keyCode === 27) {
                        self._deactivate();
                    }
                });
            }
            this.state = 'open';
            // Issue callback
            this.settings.onOpen();
        },

        // Deactivatedialog
        _deactivate: function() {
            // Issue callback
            this.settings.onClose();
            var body = $('body');
            if (this.settings.closeByEscape) {
                body.off('.dialog');
            }
            this.$element.removeClass('dialogOpen');
            if (this.settings.modal) {
                $('.dialogBlockPage').remove();
                if (this.settings.modalWithOverlay) {
                    body.removeClass('dialogOverlay');
                }
                body.removeClass('dialogModal');
            }
            else {
                this.$element.removeClass('dialogNonModal');
            }
            this.state = 'closed';
        },

        // Initialize
        _init: function (options) {
            var self = this;
            var defaults =
            {
                openOnInit: true,
                closeByEscape: true,
                modal: true,
                modalWithOverlay: true,
                onOpen: function () { },
                onClose: function () { }
            };
            this.settings = $.extend(defaults, options || {});
            this.state = 'closed';
        },

        // Close dialog
        // Arguments: none
        open: function (argsArray) {
            this._activate();
        },

        // Close dialog
        // Arguments: none
        close: function (argsArray) {
            this._deactivate();
        },

        // isopen: Returns true/false depending on whether the dialog is open or closed
        // Arguments: none
        isopen: function (argsArray) {
            return (this.state == 'open');
        }

    };

    $.fn[pluginName] = function (methodOrOptions) {
        var instance = $(this).data(pluginName);
        if (instance &&
            methodOrOptions &&
            typeof methodOrOptions != 'object' &&
            methodOrOptions.indexOf('_') != 0) {
            // Call method and return possible result value of the method
            return instance[methodOrOptions](Array.prototype.slice.call(arguments, 1));
        }
        if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            instance = new Plugin(this, methodOrOptions);
            $(this).data(pluginName, instance);
            return this;
        }
        $.error('Wrong call to ' + pluginName);
        return this;
    };

})(jQuery);

