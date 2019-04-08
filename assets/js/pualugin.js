/*
** PluginName: Pualugin
** Auth: Pual
*/

;
(function ($, win, doc, undefined) {
	'use strict';

	/*
	** Local Variables
	*/
	var COMMON = {};

	/*
	** COMMON
	*/
	;
	(function () {

		COMMON.uuid = (function () {
			var _uuid = 0;
			return function (prefix) {
				var id = ++_uuid;
				prefix = prefix ? prefix : '';
				return prefix + id;
			}
		})();

		COMMON.findFocusElement = function (element) {
			var _basket = [];

			$(element).find('*').each(function (i, val) {
				if (val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
					_basket.push(val);
				}
				if ((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
					_basket.push(val);
				}
			});

			return [_basket[0], _basket[_basket.length - 1]];
		};
	})()

	/*
	** Plugin - Toggle
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = 'toggle';

		var defaults = {
			mode: 'static', // static, slide, fade
			event: 'click', // 'focusin'
			speed: 300,
			easing: 'swing',
			anchorEl: '[data-element="toggle__anchor"]',
			panelEl: '[data-element="toggle__panel"]',
			onChangeBeforeText: null,
			onChangeAfterText: null,
			activeClassName: 'is-active',
			isOpened: false
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.flag = false;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function () {
				var plugin = this;
				plugin.buildCache();
				plugin.bindEvents();
			},
			reInit: function() {
				var plugin = this;
				plugin.flag = false;
				plugin.init();
			},
			buildCache: function () {
				var plugin = this;

				plugin.$element = $(plugin.element);
				plugin.$anchor = plugin.$element.find(plugin.options.anchorEl);
				plugin.$panel = plugin.$element.find(plugin.options.panelEl);

				var _id = plugin.$panel.attr('id') ? plugin.$panel.attr('id') : COMMON.uuid(plugin._name + '-');

				plugin.$anchor.attr('aria-controls', _id);
				plugin.$panel.attr('id', _id);

				if ( !plugin.options.isOpened ) {
					plugin.options.onChangeBeforeText !== null && plugin.$anchor.text(plugin.options.onChangeBeforeText)
					plugin.$anchor.attr('aria-expended', false);
					plugin.$panel.hide();
				} else {
					plugin.flag = true;
					plugin.options.onChangeAfterText !== null && plugin.$anchor.text(plugin.options.onChangeAfterText)
					plugin.$anchor.attr('aria-expended', true);
					plugin.$panel.show()
				}
			},
			bindEvents: function () {
				var plugin = this;

				var eventName = (function () {
					var events = plugin.options.event;

					if (events === 'focusin') {
						return 'focusin.' + plugin._name + ' mouseenter.' + plugin._name;
					} else if (events === 'click') {
						return 'click.' + plugin._name + ' keydown.' + plugin._name;
					}
					return events + '.' + plugin._name;
				})();

				plugin.$anchor
					.off(eventName)
					.on(eventName, function (e) {
						e.stopPropagation();

						var key = e.which || e.keyCode;

						if (e.type === 'click' || e.type === 'focusin' || key === 13 || key === 32) {
							plugin.idx = $(this).data('index');
							plugin.toggle();
							e.preventDefault();
						}
					});

				plugin.$element
					.off('show.' + plugin._name)
					.on('show.' + plugin._name, function (e) {
						plugin.show();
					});

				plugin.$element
					.off('hide.' + plugin._name)
					.on('hide.' + plugin._name, function (e) {
						plugin.hide();
					})
			},
			unbindEvents: function () {
				var plugin = this;

				plugin.$anchor.off('.' + plugin._name)
				plugin.$element.off('.' + plugin._name)
			},
			beforeChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$element.trigger('beforeChange', [plugin, $anchor, $panel])
			},
			afterChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$element.trigger('afterChange', [plugin, $anchor, $panel])

				$panel.find('.slick-initialized').length && $panel.find('.slick-initialized').slick('setPosition');
			},
			toggle: function () {
				var plugin = this;

				plugin.flag === false ? plugin.show() : plugin.hide()
			},
			show: function () {
				var plugin = this;

				plugin.flag = true;

				plugin.beforeChange(plugin.$anchor, plugin.$panel);

				if (plugin.options.onChangeAfterText !== null) {
					plugin.$anchor.text(plugin.options.onChangeAfterText)
				}

				plugin.$anchor.addClass(plugin.options.activeClassName)

				if (plugin.options.mode === 'fade') {
					plugin.$panel.stop().fadeIn(plugin.options.speed, plugin.options.easing, function () {
						plugin.afterChange(plugin.$anchor, plugin.$panel);
					});
				} else if (plugin.options.mode === 'slide') {
					plugin.$panel.stop().slideDown(plugin.options.speed, plugin.options.easing, function () {
						plugin.afterChange(plugin.$anchor, plugin.$panel);
					});
				} else {
					plugin.$panel.stop().show();
					plugin.afterChange(plugin.$anchor, plugin.$panel);
				}
				plugin.$anchor.attr('aria-expended', true);
			},
			hide: function () {
				var plugin = this;

				plugin.flag = false;

				if (plugin.options.onChangeBeforeText !== null) {
					plugin.$anchor.text(plugin.options.onChangeBeforeText)
				}

				plugin.$anchor.removeClass(plugin.options.activeClassName)

				if (plugin.options.mode === 'fade') {
					plugin.$panel.stop().fadeOut(plugin.options.speed, plugin.options.easing);
				} else if (plugin.options.mode === 'slide') {
					plugin.$panel.stop().slideUp(plugin.options.speed, plugin.options.easing);
				} else {
					plugin.$panel.stop().hide();
				}
				plugin.$anchor.attr('aria-expended', false);
			},
			destroy: function () {
				var plugin = this;

				plugin.unbindEvents();
				plugin.flag = false;
				plugin.$panel.removeAttr('aria-expended style');
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=toggle]').toggle();
		});

	})(jQuery, window, document, undefined);

	/*
	** Plugin - Tooltip
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = "tooltip";

		var defaults = {
			position: 'right', //left, top, bottom
			mode: 'tooltip', // popover
			indent: 10,
			button: '[data-element=tooltip__button]',
			panel: '[data-element=tooltip__panel]',
			tooltipContainerClassName: 'pualugin-tooltip-container',
			activeClassName: 'is-active',
			zindex: 100
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.flag = false;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function() {
				var plugin = this;

				plugin.buildCache();
				plugin.bindEvents();
			},
			destroy: function() {
				var plugin = this;

				plugin.$element.removeAttr('style');
				plugin.$panel.appendTo( plugin.$element ).removeAttr('style');
				plugin.$container.find( plugin.options.panel ).length === 0 && plugin.$container.remove();
				plugin.$button.removeAttr('aria-expended');
				plugin.flag = false;
				plugin.unbindEvents();
			},
			buildCache: function() {
				var plugin = this;
				var container = '.' + plugin.options.tooltipContainerClassName;

				plugin.$element = $(plugin.element);
				plugin.$button = plugin.$element.find(plugin.options.button);
				plugin.$panel = plugin.$element.find(plugin.options.panel);
				plugin.$container = $(container).length ? $(container) : $('body').append('<div class=' + plugin.options.tooltipContainerClassName + '></div>')
				plugin.$win = $(win);
				plugin.$button.attr('aria-expended', false);
				plugin.$panel.css('z-index', plugin.options.zindex).hide().appendTo($(container));
				plugin.$element.css({
					'display': 'inline-block'
				});
			},
			unbindEvents: function() {
				var plugin = this;

				plugin.$button.off('.' + plugin._name);
				plugin.$win.off('.' + plugin._name);
			},
			bindEvents: function() {
				var plugin = this;
				var eventName = (function () {
					var events = plugin.options.mode;

					if ( events === 'tooltip' ) {
						return [ 'focusin.' + plugin._name + ' mouseenter.' + plugin._name, 'focusout.' + plugin._name + ' mouseleave.' + plugin._name ]
					} else {
						return [ 'click.' + plugin._name ]
					}
				})();

				if ( eventName.length == 1 ) {
					plugin.$button.on(eventName[0], function(e) {
						e.preventDefault();
						plugin.toggle();
					})

					plugin.$win.on(eventName[0], function(e) {
						if ( plugin.flag ) {
							if (!plugin.$element.is(e.target) && plugin.$element.has(e.target).length === 0){
								plugin.close()
							}
						}
					})
				} else if (eventName.length == 2) {
					plugin.$button
						.on(eventName[0], function(e) {
							e.preventDefault();

							plugin.open();
						})
						.on(eventName[1], function(e) {
							e.preventDefault();

							plugin.close();
						});
				}
			},
			toggle: function() {
				var plugin = this;

				if ( plugin.flag === false ) {
					plugin.open();
				} else {
					plugin.close();
				}
			},
			open: function() {
				var plugin = this;

				plugin.flag = true;
				plugin.$button.attr('aria-expended', true);
				plugin.$panel
					.css('position', 'absolute')
					.addClass(plugin.options.activeClassName)
					.show();
				plugin.setPosition();
			},
			close: function() {
				var plugin = this;

				plugin.flag = false;
				plugin.$button.attr('aria-expended', true);
				plugin.$panel
					.css('position', '')
					.removeClass(plugin.options.activeClassName)
					.hide();
			},
			setPosition: function() {
				var plugin = this;

				var buttonWidth = plugin.$button.outerWidth(),
					buttonHeight = plugin.$button.outerHeight(),
					panelWidth = plugin.$panel.outerWidth(),
					panelHeight = plugin.$panel.outerHeight();

				var buttonOffset = plugin.$button.offset(),
					buttonTop = buttonOffset.top,
					buttonLeft = buttonOffset.left;

				switch ( plugin.options.position ) {
					case 'left':
						plugin.$panel.css({
							'top': buttonTop + ( (buttonHeight - panelHeight) / 2 ),
							'left': ( buttonLeft - panelWidth ) - plugin.options.indent
						})
						break;
					case 'top':
						plugin.$panel.css({
							'top': ( buttonTop - panelHeight ) - plugin.options.indent,
							'left': (Math.abs( buttonLeft + ( buttonWidth / 2 ) )) - ( Math.abs( panelWidth / 2 ) )
						})
						break;
					case 'bottom':
						plugin.$panel.css({
							'top': ( buttonTop + buttonHeight ) + plugin.options.indent,
							'left': (Math.abs( buttonLeft + ( buttonWidth / 2 ) )) - ( Math.abs( panelWidth / 2 ) )
						})
						break;
					default:
						plugin.$panel.css({
							'top': buttonTop + ( (buttonHeight - panelHeight) / 2 ),
							'left': ( buttonLeft + buttonWidth ) + plugin.options.indent
						})
				}
			},
			reInit: function() {
				var plugin = this;

				plugin.destroy();
				plugin.buildCache();
				plugin.bindEvents();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=tooltip]').tooltip();
		});
	})(jQuery, window, document, undefined);

	/*
	** Plugin - Tab
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = 'tab';

		var defaults = {
			mode: 'static', // static, slide, fade
			event: 'click', // 'focusin'
			speed: 300,
			easing: 'swing',
			listEl: '[data-element="tab__list"]',
			anchorEl: '[data-element="tab__anchor"]',
			panelEl: '[data-element="tab__panel"]',
			activeClassName: 'is-active',
			disabledClassName: 'is-disabled',
			withScroll: false,
			isInitActive: true,
			initIndex: 0,
			selectedText: 'Selected'
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.flag = false;
			this.initialized = false;
			this.idx = 0;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function () {
				var plugin = this;
				plugin.buildCache();
				plugin.bindEvents();
				if (plugin.options.isInitActive) {
					plugin.$anchor.eq(plugin.options.initIndex).trigger(plugin.options.event);
				}
				plugin.initialized = true;
			},
			destroy: function () {
				var plugin = this;
				plugin.unbindEvents();
				plugin.$list.removeAttr('role');
				plugin.$anchor.removeAttr('style role').removeClass(plugin.options.activeClassName);
				plugin.$panel.removeAttr('style role aria-labelledby').removeClass(plugin.options.activeClassName);
				plugin.idx = 0;
				plugin.flag = false;
				plugin.initialized = false;
			},
			buildCache: function () {
				var plugin = this;
				var tabsId = [];

				plugin.$element = $(plugin.element);
				plugin.$anchor = plugin.$element.find(plugin.options.anchorEl);
				plugin.$panel = plugin.$element.find(plugin.options.panelEl);
				plugin.$list = plugin.$element.find(plugin.options.listEl);

				plugin.$anchor.each(function (index) {
					var $this = $(this);
					var _id = $this.attr('id') ? $this.attr('id') : COMMON.uuid('pualugin-' + plugin._name + '-');
					var tagName = $this.get(0).tagName.toLowerCase();

					$this
						.data(plugin._name + '_target', plugin.$panel.eq(index))
						.data('index', index)
						.attr({
							'id': _id,
							'role': 'tab',
						});

					tabsId.push(_id);
				});

				plugin.$panel.each(function (index) {
					$(this).attr({
						'aria-labelledby': tabsId[index],
						'role': 'tabpanel',
						'tabindex': 0
					});
				});

				plugin.$list.attr('role', 'tablist');
			},
			bindEvents: function () {
				var plugin = this;

				var eventName = (function () {
					var events = plugin.options.event;

					if (events === 'focusin') {
						return 'focusin.' + plugin._name + ' mouseenter.' + plugin._name;
					} else if (events === 'click') {
						return 'click.' + plugin._name + ' keydown.' + plugin._name;
					}
					return events + '.' + plugin._name;
				})();

				plugin.$anchor
					.off(eventName)
					.on(eventName, function (e) {
						e.stopPropagation();
						var $this = $(this);

						if ($this.hasClass(plugin.options.activeClassName) || $this.hasClass(plugin.options.disabledClassName) || plugin.flag) return false;

						var key = e.which;

						if (e.type === 'click' || e.type === 'focusin' || key === 13 || key === 32) {
							plugin.idx = $(this).data('index');
							plugin.hide(this);
							plugin.show(this);
							e.preventDefault();
						}
					});
			},
			unbindEvents: function () {
				var plugin = this;
				plugin.$anchor.off('.' + plugin._name).removeData(plugin._name + '_target');
				plugin.$element.off('.' + plugin._name);
			},
			beforeChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$element.trigger('beforeChange', [plugin, $anchor, $panel]);
			},
			afterChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$element.trigger('afterChange', [plugin, $anchor, $panel]);

				$panel.find('.slick-initialized').length && $panel.find('.slick-initialized').slick('setPosition');
			},
			show: function (_target) {
				var plugin = this,
					$anchor = $(_target);

				var $panel = $anchor
					.addClass(plugin.options.activeClassName)
					.attr({
						'aria-selected': true,
						'title': plugin.options.selectedText
					})
					.data(plugin._name + '_target')
					.addClass(plugin.options.activeClassName);

				plugin.flag = true;
				plugin.beforeChange($anchor, $panel);

				if (plugin.options.mode === 'fade') {
					$panel.stop().fadeIn(plugin.options.speed, plugin.options.easing, function () {
						plugin.flag = false;
						plugin.afterChange($anchor, $panel);
					});
				} else if (plugin.options.mode === 'slide') {
					$panel.stop().slideDown(plugin.options.speed, plugin.options.easing, function () {
						plugin.flag = false;
						plugin.afterChange($anchor, $panel);
					});
				} else {
					$panel.stop().show();
					plugin.flag = false;
					plugin.afterChange($anchor, $panel);
				}
				if (plugin.options.withScroll && plugin.initialized) {
					$('html, body').stop().animate({
						scrollTop: plugin.$element.offset().top
					}, plugin.options.speed);
				}
			},
			hide: function (_except) {
				var plugin = this;

				plugin.$anchor.not(_except).each(function () {
					var $panel = $(this)
						.removeClass(plugin.options.activeClassName)
						.attr({
							'aria-selected': false,
							'title': ''
						})
						.data(plugin._name + '_target')
						.removeClass(plugin.options.activeClassName);

					if (plugin.options.mode === 'fade') {
						$panel.stop().fadeOut(plugin.options.speed, plugin.options.easing);
					} else if (plugin.options.mode === 'slide') {
						$panel.stop().slideUp(plugin.options.speed, plugin.options.easing);
					} else {
						$panel.stop().hide();
					}
				});
			},
			go: function(index, withScroll) {
				var plugin = this;

				plugin.$anchor.eq(index).trigger(plugin.options.event);

				if (withScroll) {
					$('html, body').stop().animate({
						scrollTop: plugin.$element.offset().top
					}, plugin.options.speed);
				}
			},
			reInit: function() {
				var plugin = this;

				plugin.idx = 0;
				plugin.flag = false;
				plugin.destroy();
				plugin.init();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=tab]').tab();
		});

	})(jQuery, window, document, undefined);

	/*
	** Plugin - Accordion
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = 'accordion';

		var defaults = {
			mode: 'slide', // static, slide
			speed: 200,
			easing: 'linear',
			itemEl: '[data-element="accordion__item"]',
			anchorEl: '[data-element="accordion__anchor"]',
			panelEl: '[data-element="accordion__panel"]',
			activeClassName: 'is-active',
			initIndex: 0,
			autoFold: true,
			expandedText: 'collapse',
			collapsedText: 'expand',
			autoScroll: false
		};

		function Plugin(element, options) {
			var plugin = this;

			plugin.element = element;
			plugin._name = pluginName;
			plugin._defaults = defaults;
			plugin.options = $.extend({}, plugin._defaults, options);
			plugin.flag = false;
			plugin.initialized = false;
			plugin.init();
		}

		$.extend(Plugin.prototype, {
			init: function () {
				var plugin = this;

				plugin.buildCache();
				plugin.bindEvents();
				plugin.$panel.hide();
				plugin.open(plugin.$anchor.eq(plugin.options.initIndex));
				plugin.initialized = true;
			},
			destroy: function () {
				var plugin = this;

				plugin.unbindEvents();
				plugin.$header.removeAttr('style').removeClass(plugin.options.activeClassName);
				plugin.$panel.removeAttr('style').removeClass(plugin.options.activeClassName);
				plugin.flag = false;
				plugin.removeProperty();
			},
			buildCache: function () {
				var plugin = this;

				plugin.$wrap = $(plugin.element).attr('role', 'presentation');
				plugin.$header = plugin.$wrap.find(plugin.options.itemEl);
				plugin.$anchor = plugin.$wrap.find(plugin.options.anchorEl);
				plugin.$panel = plugin.$wrap.find(plugin.options.panelEl);

				plugin.setProperty();
			},
			bindEvents: function () {
				var plugin = this;

				plugin.$wrap
					.off('click' + '.' + plugin._name)
					.on('click' + '.' + plugin._name, plugin.options.anchorEl, function (e) {
						e.stopPropagation();
						e.preventDefault();
						if (plugin.flag) {
							return false;
						}
						plugin.toggle($(this));
					});

				plugin.$anchor
					.off('open.' + plugin._name)
					.on('open.' + plugin._name, function () {
						plugin.open($(this));
					});

				plugin.$anchor
					.off('close.' + plugin._name)
					.on('close.' + plugin._name, function () {
						plugin.close($(this));
					});
			},
			unbindEvents: function () {
				var plugin = this;
				plugin.$wrap.off('.' + plugin._name);
				plugin.$header.off('.' + plugin._name);
			},
			beforeChange: function ($activeItemEl) {
				var plugin = this;
				plugin.$wrap.trigger('beforeChange', [plugin, $activeItemEl]);
			},
			afterChange: function ($activeItemEl) {
				var plugin = this;
				plugin.$wrap.trigger('afterChange', [plugin, $activeItemEl]);
			},
			toggle: function ($targetAnchor) {
				var plugin = this;

				plugin.flag = true;

				if ($targetAnchor.hasClass(plugin.options.activeClassName)) {
					plugin.close($targetAnchor);
				} else {
					plugin.open($targetAnchor);
				}
			},
			open: function ($targetAnchor) {
				var plugin = this;

				plugin.beforeChange($targetAnchor);

				var $panel = $targetAnchor
					.data(plugin._name + '_isOpen', true)
					.addClass(plugin.options.activeClassName)
					.data(plugin._name + '_target')
					.addClass(plugin.options.activeClassName);

				if (plugin.initialized && plugin.options.mode === 'slide') {
					$panel.stop().slideDown(plugin.options.speed, plugin.options.easing, function () {
						plugin.flag = false;
						if (plugin.options.autoScroll) {
							$('html, body').stop().animate({
								scrollTop: $targetAnchor.offset().top
							}, 100)
						}
					});
				} else {
					$panel.stop().show();
					plugin.flag = false;
				}

				plugin._changeStatus($targetAnchor, true);

				if (plugin.options.autoFold) {
					plugin.$anchor.not($targetAnchor).each(function () {
						plugin.close($(this));
					})
				}

				plugin.afterChange($targetAnchor);
			},
			close: function ($targetAnchor) {
				var plugin = this;

				plugin.beforeChange($targetAnchor);

				var $panel = $targetAnchor
					.data(plugin._name + '_isOpen', false)
					.removeClass(plugin.options.activeClassName)
					.data(plugin._name + '_target')
					.removeClass(plugin.options.activeClassName);

				if (plugin.options.mode === 'slide') {
					$panel.stop().slideUp(plugin.options.speed, plugin.options.easing, function () {
						plugin.flag = false;
					});
				} else {
					$panel.stop().hide();
					plugin.flag = false;
				}

				plugin._changeStatus($targetAnchor, false);

				plugin.afterChange($targetAnchor);
			},
			go: function( index, withScroll ) {
				var plugin = this;

				plugin.$anchor.eq(index).trigger('click');
				if (withScroll) {
					$('html, body').stop().animate({
						scrollTop: plugin.$wrap.offset().top
					}, plugin.options.speed);
				}
			},
			_changeStatus: function ($anchor, isOpen) {
				var plugin = this;
				$anchor.attr({
					'aria-expanded': isOpen,
					'title': isOpen ? plugin.options.expandedText : plugin.options.collapsedText,
				});
			},
			setProperty: function() {
				var plugin = this;
				var tabsId = [];

				plugin.$anchor.each(function (index) {
					var $this = $(this);
					var _id = $this.attr('id') ? $this.attr('id') : COMMON.uuid('pualugin-' + plugin._name + '-');

					$this
						.data(plugin._name + '_target', plugin.$panel.eq(index))
						.data('index', index)
						.data('title', $.trim($this.text()))
						.attr({
							'id': _id,
							'aria-expanded': false,
							'aria-controls': _id + '-panel',
							'title': plugin.options.collapsedText
						});

					tabsId.push(_id);
				});

				plugin.$panel.each(function (index) {
					$(this).attr({
						'id': tabsId[index] + '-panel',
						'aria-labelledby': tabsId[index],
						'role': 'region'
					}).hide();
				});
			},
			removeProperty: function() {
				var plugin = this;

				plugin.$anchor.each(function (index) {
					var $this = $(this);

					$this
						.data(plugin._name + '_target', '')
						.data('index', '')
						.data('title', '')
						.removeAttr('id aria-expanded aria-controls title');
				});

				plugin.$panel.each(function (index) {
					$(this).removeAttr('id aria-labelledby role').hide();
				});
			},
			reInit: function() {
				var plugin = this;

				plugin.init();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=accordion]').accordion();
		});

	})(jQuery, window, document, undefined);

	/*
	** Plugin - Sticky
	*/
	;
	(function ( $, win, doc, undefined ){
		var pluginName = 'sticky'

		var defaults = {
			position: "top", //bottom, middle
			top: 0,
			sectionEl: '[data-element=sticky__section]',
			headerEl: '[data-element=sticky__target-parent]',
			targetEl: '[data-element=sticky__target]',
			activeClassName: 'is-sticky'
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend( {}, this._defaults, options );
			this.flag = false;
			this.headerHeight = 0;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function() {
				var plugin = this;

				plugin.buildCache();
				plugin.bindEvents();
			},
			destroy: function() {
				var plugin = this;

				plugin.unbindEvents();
				plugin.$header.removeAttr('style');
				plugin.$target.removeAttr('style');
			},
			reInit: function() {
				var plugin = this;

				plugin.destroy();
				plugin.unbindEvents();
				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function() {
				var plugin = this;

				plugin.$element = $( plugin.element );
				plugin.$header = plugin.$element.find( plugin.options.headerEl );
				plugin.$target = plugin.$element.find( plugin.options.targetEl );
				plugin.$win = $( win );
				plugin.headerHeight = plugin.$header.outerHeight();
			},
			bindEvents: function() {
				var plugin = this;

				plugin.$win
					.on('scroll.' + plugin._name, function() {
						var scrTop = $(this).scrollTop();

						plugin.toggle( scrTop );
					})
					.on('resize.' + plugin._name, function() {
						$(this).trigger('scroll');
					})
			},
			unbindEvents: function() {
				plugin.$win.off( '.' + plugin._name);
			},
			toggle: function( scrTop ) {
				var plugin = this;

				plugin.getPosition();

				if ( scrTop > plugin.bottom ) {
					plugin.unFixed();
					plugin.bottomRelative();
				} else if ( scrTop >= plugin.top ) {
					plugin.bottomFixed();
					plugin.setFixed();
				} else if ( scrTop <= plugin.top ) {
					plugin.unFixed();
				}
			},
			setFixed: function() {
				var plugin = this;

				plugin.beforeChange();
				plugin.$header.css('height', plugin.headerHeight);
				plugin.$target.css({
					'position': 'fixed',
					'top': plugin.options.top,
					'left': plugin.$header.offset().left,
					'width': plugin.$header.outerWidth()
				})
				plugin.afterChange();
			},
			unFixed: function() {
				var plugin = this;

				plugin.$header.css('height', plugin.headerHeight);
				plugin.$target.css({
					'position': '',
					'top': '',
					'left': '',
					'width': ''
				})
			},
			bottomFixed: function() {
				var plugin = this;

				plugin.$element.css({
					position: ''
				})

				plugin.$target.css({
					position: '',
					bottom: '',
					width: ''
				})
			},
			bottomRelative: function() {
				var plugin = this;

				plugin.$element.css('position', 'relative');
				plugin.$target.css({
					position: 'absolute',
					bottom: '0',
					top: 'auto',
					width: '100%'
				})
			},
			getOffsetTop: function( target ) {
				var plugin = this;
				var wrapTop = plugin.$element.offset().top;
				var headerHeight = plugin.$header.height();
				var position = plugin.options.position;
				var topValue = plugin.options.top;

				if ( target ) {
					return ($(target).offset().top - topValue);
				} else if ( position === 'bottom' ) {
					return ( wrapTop + headerHeight ) - topValue;
				} else if (  position === 'middle' ) {
					return ( wrapTop + ( headerHeight / 2 ) ) - topValue;
				} else {
					return wrapTop - topValue;
				}
			},
			getPosition: function() {
				var plugin = this;
				plugin.top = plugin.getOffsetTop( plugin.$element );
				plugin.bottom = plugin.top + ( plugin.$element.outerHeight() - plugin.headerHeight );
			},
			beforeChange: function () {
				var plugin = this;

				plugin.$element.trigger('beforeChange', [plugin, plugin.$target]);
			},
			afterChange: function () {
				var plugin = this;

				plugin.$element.trigger('afterChange', [plugin, plugin.$target]);
			}
		})

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, $.extend( {}, options, $(this).data('options')) ));
				}
			});
		}

		$(function () {
			$('[data-element=sticky]').sticky();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Form Control
	*/
	;
	(function ($, win, doc, undefined) {
		var pluginName = "formCtrl"

		var defaults = {
			input: '[data-element=form-ctrl__input]',
			textarea: '[data-element=form-ctrl__textarea]',
			delete: '[data-element=form-ctrl__delete]',
			count: '[data-element=form-ctrl__count]',
			countCurrent: '[data-element=form-ctrl__count-current]',
			countTotal: '[data-element=form-ctrl__count-total]',
			activeClassName: 'is-active',
			autoHeight: false, //true
		}

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function() {
				var plugin = this;
				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function() {
				var plugin = this;
				plugin.$element = $(plugin.element);
				plugin.$input = plugin.$element.find( plugin.options.input );
				plugin.$textarea = plugin.$element.find( plugin.options.textarea );
				plugin.$delete = plugin.$element.find( plugin.options.delete );
				plugin.$count = plugin.$element.find( plugin.options.count );
				plugin.$countCurrunt = plugin.$element.find( plugin.options.countCurrent );
				plugin.$countTotal = plugin.$element.find( plugin.options.countTotal );
			},
			bindEvents: function() {
				var plugin = this;

				plugin.$input.on('keyup.' + plugin._name, function(e) {
					plugin.toggle( this );
				}).keyup();

				plugin.$delete.on('click.' + plugin._name, function(e) {
					e.preventDefault();
					plugin.delete();
				});

				plugin.$textarea.on('keyup.' + plugin._name + ' input.' + plugin._name, function(e) {
					plugin.count( e );
					if (plugin.options.autoHeight) {
						plugin.resize();
					}
				}).keyup();

			},
			toggle: function( self ) {
				var plugin = this;
				var $self = $(self);

				$self.val().length > 0 ? plugin.show() : plugin.hide();
			},
			show: function() {
				var plugin = this;

				if ( plugin.$input.attr('class').indexOf('search') != -1 ) {
					$('.search__COMMON-button-box').hide()
				}
				plugin.$delete.addClass(plugin.options.activeClassName);
			},
			hide: function() {
				var plugin = this;

				plugin.$delete.removeClass(plugin.options.activeClassName);
				if ( plugin.$input.attr('class').indexOf('search') != -1 ) {
					$('.search__COMMON-button-box').show()
				}
			},
			delete: function() {
				var plugin = this;
				plugin.$input.val('').focus();
				plugin.hide();
			},
			count: function( e ) {
				var plugin = this;
				var maxLength = plugin.$countTotal.text() || 500;
				var curruntLength = plugin.$textarea.val().length;

				if ( curruntLength <= maxLength ) {
					plugin.$countCurrunt.text( curruntLength );
				} else {
					plugin.$countCurrunt.text( plugin.$countTotal.text() );
				}
			},
			resize: function(){
				var plugin = this;
				var paddingTop = plugin.$textarea.css("padding-top").replace("px", "");
				var paddingBtm = plugin.$textarea.css("padding-bottom").replace("px", "");
				plugin.$textarea.css({
					'height' : 'auto',
					'overflow' : 'hidden',
				}).height(
					plugin.$textarea[0].scrollHeight - paddingTop - paddingBtm
				);
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=form-ctrl]').formCtrl();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Modal
	*/
	;
	(function ($, win, doc, undefined) {
		var pluginName = "modal";

		var defaults = {
			container: '[data-element=modal]',
			modal: '[data-element=modal__element]',
			innerContainer: '[data-element=modal__element-container]',
			mask: '[data-element=modal__mask]',
			close: '[data-element=modal__close]',
			open: '[data-element=modal__open]',
			modalWidth: 500,
			modalHeight: 500,
			activeClassName: 'is-open'
		}

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.stackLevel = 0;
			this.initialSetting = false;
			this.flag = false;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function() {
				var plugin = this;
				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function() {
				var plugin = this;

				// InitialSettings ( modal-container + modal-mask )
				plugin.$element = $(plugin.element);
				plugin.$container = $(plugin.options.container).length ? $(plugin.options.container) : $('<div class="pualugin-modal" data-element="modal"></div>').appendTo('body');
				plugin.$mask = $( plugin.options.mask ).length ? $( plugin.options.mask ) : $('<div class="pualugin-modal__mask" data-element="modal__mask"></div>').appendTo('body');

				plugin.appendModal();

				plugin.$innerContainer = plugin.$element.find(plugin.options.innerContainer);
				plugin.$close = plugin.$element.find( plugin.options.close );
				plugin.$open = $('[data-target=#' + plugin.$element.attr('id') + ']') || null;
				plugin.$win = $(win);
				plugin.$doc = $(doc);
				plugin.$body = $('body');
				plugin.$html = $('html');

				plugin.$element.attr({
					'role': 'dialog',
					'aria-modal': true
				})
				plugin.$innerContainer.css({
					'width': plugin.options.modalWidth,
					'height': plugin.options.modalHeight
				})
			},
			bindEvents: function() {
				var plugin = this;
				var focusEl = COMMON.findFocusElement( plugin.$element );
				var focusElFirst = $(focusEl[0]);
				var focusElLast = $(focusEl[1]);

				plugin.$element.on('open.' + plugin._name, function(e, target) {
					plugin.open( target );
				})

				plugin.$element.on('close.' + plugin._name, function(e, target) {
					plugin.close( target );
				})

				plugin.$close.on('click.' + plugin._name, function(e) {
					e.preventDefault();
					e.stopPropagation();

					plugin.close( plugin.$element );
				})

				plugin.$open !== null && plugin.$open.on('click.' + plugin._name, function(e) {
					e.preventDefault();
					e.stopPropagation();

					plugin.open( plugin.$element );
				})

				plugin.$doc.on('click.' + plugin._name, function(e) {
					var target = e.target;

					if ( plugin.flag && plugin.$open[0] !== target ) {
						if (!plugin.$innerContainer.is(target) && plugin.$innerContainer.has(target).length === 0 ){
							plugin.close( plugin.$element );
						}
					}
				})

				focusElFirst.on('keydown.' + plugin._name, function(e) {
					var keyCode = e.keyCode || e.which;
					if ( e.shiftKey && keyCode === 9 ) {
						e.preventDefault();
						focusElLast.focus();
					}
				})

				focusElLast.on('keydown.' + plugin._name, function(e) {
					var keyCode = e.keyCode || e.which;
					if ( keyCode == 9 && !e.shiftKey ) {
						e.preventDefault();
						focusElFirst.focus();
					}
				})
			},
			appendModal: function() {
				var plugin = this;
				plugin.$container.append( plugin.$element );
			},
			open: function() {
				var plugin = this;

				if ( plugin.flag ) return;
				plugin.flag = true;

				plugin.beforeChange( plugin.$element );

				plugin.setStyle();
				plugin.touchBindEvent();
				plugin.$element
					.attr('tabindex', 0)
					.addClass(plugin.options.activeClassName)
					.focus();

				plugin.afterChange( plugin.$element );

			},
			close: function() {
				var plugin = this;

				if (!plugin.flag) return;
				plugin.flag = false;

				plugin.beforeChange( plugin.$element );

				plugin.$element.attr('tabindex', -1).removeClass(plugin.options.activeClassName);
				plugin.removeStyle();
				plugin.$open.focus();

				plugin.afterChange( plugin.$element );
			},
			setStyle: function() {
				var plugin = this;
0
				plugin.$mask.addClass(plugin.options.activeClassName);
				plugin.$html.addClass('pualugin-modal__is-locked');
				$('[data-element=modal]').css({
					'z-index': 1001 + plugin.stackLevel
				})
			},
			removeStyle: function() {
				var plugin = this;

				plugin.$mask.removeClass(plugin.options.activeClassName);
				plugin.$html.removeClass('pualugin-modal__is-locked');
				$('.pualugin').removeClass('pualugin-modal__is-locked');
				$('[data-element=modal]').css({
					'z-index': ''
				})
			},
			touchBindEvent: function() {
				var plugin = this;

				plugin.$container.on('touchmove.' + plugin._name, function(e) {
					e.preventDefault();
				})
			},
			touchUnbindEvent: function() {
				var plugin = this;

				plugin.$container.off( '.' + plugin._name);
			},
			destroy: function() {
				var plugin = this;

				plugin.unbindEvents();
				plugin.removeStyle();
				plugin.$innerContainer.removeAttr('style');
				plugin.$element.removeAttr('role aria-modal');
			},
			unbindEvents: function () {
				var plugin = this;

				plugin.$element.off('.' + plugin._name);
				plugin.$open !== null && plugin.$open.off('.' + plugin._name);
				plugin.$doc.off('.' + plugin._name);
				plugin.$container.off('.' + plugin._name);
			},
			beforeChange: function ($modal) {
				var plugin = this;
				plugin.$element.trigger('beforeChange', [plugin, $modal]);
			},
			afterChange: function ($modal) {
				var plugin = this;
				plugin.$element.trigger('afterChange', [plugin, $modal]);
			},
			reInit: function() {
				var plugin = this;

				plugin.destroy();
				plugin.buildCache();
				plugin.bindEvents();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-element=modal__element]').modal();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Override Slick
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = 'overrideSlick';

		var defaults = {

		}

		function Plugin(element, options) {
			this.element = element;
			this._defaults = defaults;
			this.options = $.extend( {}, this._defaults, options );
			this.init();
		}

		$.extend( Plugin.prototype, {
			init: function() {
				var plugin = this;
				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function() {
				var plugin = this;

				plugin.$element = $( plugin.element );
			},
			bindEvents: function() {
				var plugin = this;

                var initEvent = 'init.'+plugin._name,
                    refreshEvent = 'refresh.'+plugin._name,
                    beforeEvent = 'beforeChange.'+plugin._name,
                    breakpointEvent = 'breakpoint.'+plugin._name,
                    afterEvent = 'afterChange.'+plugin._name,
					destroyEvent = 'destroy.'+plugin._name;

				plugin.$element.on(initEvent, function(e, slick) {
					//initEvent
				});
				plugin.$element.on(beforeEvent, function(e, slick) {
					//beforeEvent
				})
				plugin.$element.on(afterEvent, function(e, slick) {
					//afterEvent
				})
				plugin.$element.on( destroyEvent, function(e, slick) {
					//destroyEvent
				})
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function() {
			$('body').overrideSlick();
		})
	})(jQuery, window, document, undefined)

})(jQuery, window, document, undefined);
