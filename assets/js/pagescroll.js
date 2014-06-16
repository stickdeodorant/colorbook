/*! jQuery ScrollSections Plugin (minified)
* @version 0.4.3
* @link https://github.com/guins/jquery-scrollsections
* @author StÃ©phane GuignÃ© <http://stephaneguigne.com/>
* @author Richard Fussenegger <http://richard.fussenegger.info/>
* @license MIT
* @copyright (c) 2011-2013, StÃ©phane GuignÃ©
*/
!function(a,b,c){"use strict";function d(a){this.name="ScrollSectionsException",this.message=a}var e="scrollSections",f={attr:"id",active:"active-scrollsection",keyboard:!0,mousewheel:!0,touch:!0,scrollbar:!0,navigation:!0,scrollMax:1,before:null,after:null,prefix:"scrollsections",alwaysStartWithFirstSection:!1,animateScrollToFirstSection:!1,createNavigation:!0,speed:500,exceptions:!1},g=function(c,d){this.elements=c,this.options=a.extend({},f,d),this._defaults=f,this._name=e,this._$window=a(b),this._$htmlBody=a("html, body"),this._$body=a("body"),this._sections=c.length,this._$sections=[],this._sectionIdentifiers=[],this._delayFirstScroll=null,this._$previousSection=null,this._$currentSection=null,this._currentStep=0,this._isFirstSection=!0,this._isAnimated=!1,this._wheelDelay=null,this._scrollPaused=!1,this._$nav=null,this._ltIE9=!1,this.init()};g.prototype={createNavigation:function(){if(this.options.navigation){this._$nav=a("<nav>",{id:this.options.prefix+"-navigation"});for(var b=0;b<this._sections;b++)this._$nav.append(a("<a>",{id:this.options.prefix+"-menuitem-"+b,"class":this.options.prefix+"-menuitem",href:"#"+this._sectionIdentifiers[b],html: "O"}));this._$body.append(this._$nav)}return this},navigation:function(){var b=this;return null===this._$nav&&(this.options.createNavigation?(this.createNavigation(),this.options.createNavigation=!1,this._$nav._$menuitems=a("a",this._$nav).each(function(c){var d=a(this);c===b._currentStep&&d.addClass(b.options.active),d.data(b.options.prefix,c)})):(this._$nav=a("#"+this.options.prefix+"-navigation"),this._$nav._$menuitems=a("a",this._$nav).each(function(){var c=a(this),d=b._sectionIdentifiers.indexOf(c.attr("href").substr(1));d===b._currentStep&&c.addClass(b.options.active),c.data(b.options.prefix,d)}))),null!=this._$nav&&this._$nav.length>0&&this._$nav._$menuitems.click(function(c){var e=a(this),f=parseInt(e.data(b.options.prefix),10);if(c.preventDefault(),b._$nav._$menuitems.removeClass(b.options.active),e.addClass(b.options.active),f>=0)b.customScrollTo(parseInt(e.data(b.options.prefix),10));else if(b.options.exceptions)throw new d("Section not find for this menu item, make sure the href is the same as the section id");return!1}),this},scrollbar:function(){var b=this;if(!a.event.special.scrollstop){if(this.options.exceptions)throw new d("The jQuery special events scrollstop plugin is missing.");return this}return this._$window.bind("scrollstop",function(){var a,d,e=b._$htmlBody.scrollTop()||b._$window.scrollTop(),f=b._$htmlBody.outerHeight();if(b._scrollPaused=!1,0===e&&0!==b._currentStep)a=0;else if(e===(b._sections-1)*b._$window.height()&&b._currentStep!==b._sections-1)a=b._sections-1;else for(var g=0;g<b._sections;g++)if(d=c.abs(e-b._$sections[g].offset().top),(!f||f>=d)&&(f=d,a=g,0===f))return;a>-1&&b.customScrollTo(a)}),this},touch:function(){var a=this;return this._$body.bind("touchstart",function(b){var d=b;return b.preventDefault(),a._$body.bind("touchmove",function(b){var e,f={x:d.clientX-b.clientX,y:d.clientY-b.clientY};return b.preventDefault(),(f.y<=-100||f.y>=100)&&c.abs(f.y)>c.abs(f.x)&&(e=f.y<0?a._currentStep-1:a._currentStep+1,a.customScrollTo(e)),!1}),!1}),this},keyboard:function(){var a=this;return this._$htmlBody.keydown(function(b){var c;switch(b.which){case 33:case 36:return b.preventDefault(),a.customScrollTo(0),!1;case 34:case 35:return b.preventDefault(),a.customScrollTo(a._sections-1),!1;case 38:return b.preventDefault(),c=a._currentStep-1,c>=0&&a.customScrollTo(c),!1;case 40:return b.preventDefault(),c=a._currentStep+1,c<a._sections&&a.customScrollTo(c),!1}}),this},scrollCallback:function(a){return this._isAnimated=a||!1,a&&this.options.before?this.options.before(this._$previousSection,this._$currentSection):!a&&this.options.after&&this.options.after(this._$currentSection,this._$previousSection),this},customScrollTo:function(b,c){var d,e,f=this;return null!=b&&b>=0&&b<this._sections&&(this._currentStep=b,this._$previousSection=this._$currentSection,this._$currentSection=this._$sections[b],d=this._$currentSection.offset().top,e=c?0:this.options.speed,this._$nav&&(this._$nav._$menuitems.removeClass(this.options.active),a('a[href="#'+this._sectionIdentifiers[b]+'"]',this._$nav).addClass(this.options.active)),this.scrollCallback(!0),a.when(this._$htmlBody.stop(!0,!1).animate({scrollTop:d},e)).done(function(){f.scrollCallback()})),this},mousewheelScrollTo:function(a){return this.customScrollTo(a),this._wheelDelay=null,this._scrollPaused=!0,this},mousewheel:function(){var b=this;if(this._ltIE9){if(this.options.exceptions)throw new d("Cannot bind mousewheel on broken client.");return this}if(!a.fn.mousewheel){if(this.options.exceptions)throw new d("The jQuery mousewheel plugin is missing.");return this}return this._$window.mousewheel(function(a,d,e,f){var g=null,h=-1;return a.preventDefault(),b._isAnimated&&b._scrollPaused||(f>>=0,0>f?(f<-b.options.scrollMax&&(f=-b.options.scrollMax),(!h||!g||g>f)&&b._currentStep-f<b._sections&&(g=f,h=b._currentStep-g)):(f>b.options.scrollMax&&(f=b.options.scrollMax),(!h||!g||f>g)&&b._currentStep-f>-1&&(g=f,h=b._currentStep-g)),g&&h>-1&&(b._wheelDelay&&clearTimeout(b._wheelDelay),c.abs(g)<b.options.scrollMax?b._wheelDelay=setTimeout(function(){b.mousewheelScrollTo(h)},10):b.mousewheelScrollTo(h))),!1}),this},init:function(){var c=this;if(this._sections>0){this.elements.each(function(b){var d,e=a(this),f=c._$window.scrollTop();c._$sections[b]=e,c._sectionIdentifiers[b]=e.attr(c.options.attr),c.options.alwaysStartWithFirstSection===!0&&0===b?(e.addClass(c.options.active),c._$currentSection=e,c.customScrollTo(0,!c.options.animateScrollToFirstSection)):(d=e.offset(),d.bottom=d.top+e.height(),f>=d.top&&f<d.bottom&&(e.addClass(c.options.active),c._currentStep=b,c._$currentSection=e,f!==d.top&&c.customScrollTo(b)))}),new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(b.navigator.userAgent)&&parseFloat(RegExp.$1)<=8&&(this._ltIE9=!0);for(var d in this.options)this.options[d]===!0&&"function"==typeof this[d]&&this[d]();this._$window.resize(function(){c.customScrollTo(c._currentStep)})}return this}},a.fn[e]=function(b){return a.data(this,"plugin_"+e)||a.data(this,"plugin_"+e,new g(this,b)),this}}(jQuery,window,Math);