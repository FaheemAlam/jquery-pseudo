/**
 * Created by faheem on 30/11/15.
 */
(function($) {
    $.fn.extend({
        css: function( name, value ) {
            if (this.selector && this.selector.split(':')[1]) {
                var pseudoElement = this.selector.split(':')[1],
                    selector = this.selector.split(':')[0],
                    stylesheets = document.styleSheets,
                    found = false,
                    templateObject = {};
                for (var i = 0, len = stylesheets.length; i < len; i++){
                    for ( var j = 0, cssRules = stylesheets[i].cssRules.length; j < cssRules; j++ ) {
                        var temp = stylesheets[i].cssRules[j];
                        templateObject = temp;
                        if (temp.selectorText === selector + '::' + pseudoElement) {
                            found = true;
                            if (typeof name === 'object') {
                                $.each( name, function( key, value ) {
                                    temp.style[$.camelCase(key)] = value;
                                });
                            } else {
                                temp.style[$.camelCase(name)] = value;
                            }
                        }
                    }
                }
                if (!found) {
                    templateObject.cssText = selector + ':' + pseudoElement;
                    templateObject.selectorText = selector + ':' + pseudoElement;
                    if (typeof name === 'object') {
                        $.each( name, function( key, value ) {
                            templateObject.style[$.camelCase(key)] = value;
                        });
                    } else {
                        templateObject.style[$.camelCase(name)] = value;
                    }
                    stylesheets[0].cssRules[stylesheets[0].cssRules.length] = templateObject;
                    stylesheets[0].rules[stylesheets[0].rules.length] = templateObject;

                }
                return;
            }

            return $.access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;
                if ( jQuery.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        }
    })
})(jQuery);