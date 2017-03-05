/*
 *  jQuery { AP } Hidden Bootstrap Item 
 *
 *  Copyright (c) 2017 Artem Pitov
 *  E-mail: info@bigsam.com.ru
 *
 *  Licensed under MIT
 *
 */

(function( $, window, document ) {
      
  var HiddenItem = {
    init: function (el, options) {
      var base = this;

      base.elem        = $(el);
      base.options     = $.extend({}, $.fn.apHiddenItem.options, options);
      base.itemHTML    = $(base.elem).find(base.options.search);
      base.maxItems    = base.itemHTML.length;
      base.options.btn = base.options.btn.replace(/{BTN-TEXT}/, base.options.btnText);

      $(base.elem).find(base.options.search).remove();

      base.options.items.sort(function (a, b) { return ( a[0] < b[0] ) ? 1 : -1; });
      
      base.create();

      if (base.options.resize) base.resize();
    },

    create: function () { 
      var base        = this,
          elWidth     = base.options.response.innerWidth,
          resizeItems = base.maxItems;

      $.each(base.options.items, function (index, value) {
        if (elWidth >= value[0]) { resizeItems = value[1]; return false; }
      });

      $(base.elem).find(base.options.search).remove();

      if ((base.maxItems - resizeItems) == 0) { $(base.elem).append( base.itemHTML.slice(0, resizeItems) ); } 
      else {
        $(base.elem).append( base.itemHTML.slice(0, -1 * (base.maxItems - resizeItems)) );
        
        var itemHTML = base.itemHTML.slice(resizeItems, base.maxItems);
        
        var html  = base.options.wrap[0];
            html += base.options.btn;
            html += base.options.wrapMenu[0];
                
            for (var i = 0; itemHTML.length > i; i++) html += $(itemHTML[i]).html(); 
            
            html += base.options.wrapMenu[1];                  
            html += base.options.wrap[1];

        $(base.elem).append( html );
      }
    },

    resize: function () { 
      var base = this, smallDelay, elWidth;
      
      elWidth = base.options.response.innerWidth;

      base.resizer = function () {
          if (window.innerWidth !== elWidth) {
            window.clearTimeout(smallDelay);
            smallDelay = window.setTimeout( function () { elWidth = window.innerWidth; base.create(); }, base.options.refreshRate);
          } 
      };

      $(window).resize(base.resizer); 
    }

  };

  $.fn.apHiddenItem = function (options) {
    return this.each(function () {
      var apHiddenItem =  Object.create(HiddenItem);
      apHiddenItem.init(this, options);
    });
  };

  $.fn.apHiddenItem.options = {
    search      : '> li',
    btnText     : (navigator.language || navigator.userLanguage == 'ru-Ru') ? 'Больше' : 'More',
    response    : window,
    refreshRate : 200,
    resize      : true,
    items       : [ [1900, 7], [1200, 5], [992, 4], [768, 2], [320, 1] ],
    wrap        : ['<li class="dropdown">', '</li>'],
    wrapMenu    : ['<ul class="dropdown-menu" aria-labelledby="apDropdown-'+ new Date().getTime() +'">', '</ul>'],
    btn         : '<a id="apDropdown-'+ new Date().getTime() +'" data-target="#" href="javascript:void(0);" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {BTN-TEXT} <span class="caret"></span> </a>',
  };

})(jQuery, window, document);