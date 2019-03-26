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
	var UTIL = {};

	/*
	** UTIL
	*/
	;
	(function () {
		/*
		** GET Unique String
		** @param String 'js'
		** @return 'js1'
		** @param null
		** @return '1'
		*/
		UTIL.uuid = (function () {
			var _uuid = 0;
			return function (prefix) {
				var id = ++_uuid;
				prefix = prefix ? prefix : '';
				return prefix + id;
			}
		})();

		/*
		** 전달된 부모엘리먼트 하위에 focus가능한 엘리먼트 반환
		** @param parentElement
		** @returns {[*,*]}
		*/
		UTIL.findFocusEl = function (parentElement) {
			var _basket = [];

			$(parentElement).find('*').each(function (i, val) {
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
			anchorEl: '[data-js="toggle__anchor"]',
			panelEl: '[data-js="toggle__panel"]',
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

				plugin.$wrap = $(plugin.element);
				plugin.$anchor = plugin.$wrap.find(plugin.options.anchorEl);
				plugin.$panel = plugin.$wrap.find(plugin.options.panelEl);

				var _id = plugin.$panel.attr('id') ? plugin.$panel.attr('id') : UTIL.uuid(pluginName + '-');

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

						var $this = $(this);

						var key = e.which || e.keyCode;

						if (e.type === 'click' || e.type === 'focusin' || key === 13 || key === 32) {
							plugin.idx = $(this).data('index');
							plugin.toggle();
							e.preventDefault();
						}
					});

				plugin.$wrap
					.off('show.' + pluginName)
					.on('show.' + pluginName, function (e) {
						plugin.show();
					});

				plugin.$wrap
					.off('hide.' + pluginName)
					.on('hide.' + pluginName, function (e) {
						plugin.hide();
					})
			},
			unbindEvents: function () {
				var plugin = this;

				plugin.$anchor.off('.' + plugin._name)
				plugin.$wrap.off('.' + plugin._name)
			},
			beforeChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$wrap.trigger('beforeChange', [plugin, $anchor, $panel])
			},
			afterChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$wrap.trigger('afterChange', [plugin, $anchor, $panel])

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
			$('[data-js=toggle]').toggle();
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
			listEl: '[data-js="tab__list"]',
			anchorEl: '[data-js="tab__anchor"]',
			panelEl: '[data-js="tab__panel"]',
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

				plugin.$wrap = $(plugin.element);
				plugin.$anchor = plugin.$wrap.find(plugin.options.anchorEl);
				plugin.$panel = plugin.$wrap.find(plugin.options.panelEl);

				plugin.$list = (function () {
					var byOption = plugin.$wrap.find(plugin.options.listEl);
					var replace = plugin.$wrap.children('ul, ol');

					return byOption.length ? byOption : replace;
				}());

				plugin.$list.attr('role', 'tablist');

				plugin.$anchor.each(function (index) {
					var $this = $(this);
					var _id = $this.attr('id') ? $this.attr('id') : UTIL.uuid('js-' + pluginName + '-');
					var tagName = $this.get(0).tagName.toLowerCase();
					var isFocusable = false;

					if (tagName === 'a' || tagName === 'button') {
						isFocusable = true;
					}

					$this
						.data(plugin._name + '_target', plugin.$panel.eq(index))
						.data('index', index)
						.attr({
							'id': _id,
							'role': 'tab',
							'tabindex': isFocusable ? '' : 0
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

						if ($this.hasClass(plugin.options.activeClassName) || $this.hasClass(plugin.options.disabledClassName) || plugin.flag) return;

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
				plugin.$wrap.off('.' + plugin._name);
			},
			beforeChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$wrap.trigger('beforeChange', [plugin, $anchor, $panel]);
			},
			afterChange: function ($anchor, $panel) {
				var plugin = this;

				plugin.$wrap.trigger('afterChange', [plugin, $anchor, $panel]);

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
						scrollTop: plugin.$wrap.offset().top
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
						scrollTop: plugin.$wrap.offset().top
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
			$('[data-js=tab]').tab();
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
			itemEl: '[data-js="accordion__item"]',
			anchorEl: '[data-js="accordion__anchor"]',
			panelEl: '[data-js="accordion__panel"]',
			activeClassName: 'is-active',
			isInitActive: true,
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
				if (plugin.options.isInitActive) {
					plugin.open(plugin.$anchor.eq(plugin.options.initIndex));
				}
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
				plugin.beforeChange($targetAnchor);

				if ($targetAnchor.hasClass(plugin.options.activeClassName)) {
					plugin.close($targetAnchor);
				} else {
					plugin.open($targetAnchor);
				}
			},
			open: function ($targetAnchor) {
				var plugin = this;

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
			},
			close: function ($targetAnchor) {
				var plugin = this;

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
					var _id = $this.attr('id') ? $this.attr('id') : UTIL.uuid('js-' + pluginName + '-');

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
			$('[data-js=accordion]').accordion();
		});

	})(jQuery, window, document, undefined);

	/*
	** Plugin - Checkbox
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = "checkBox";

		var defaults = {
			allCheckCtrl: false, //true
			firstCheck: false, //true
			defaultChecked: false,
			checkboxEl: '[data-js="checkbox__input"]',
			hiddenEl: '[data-js="checkbox__hidden"]',
			allEl: '[data-js="checkbox__all"]'
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.uuid = UTIL.uuid(pluginName);
			this.allChecked = false;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function () {
				var plugin = this;

				plugin.buildCache();
				plugin.bindEvents();
			},
			bindEvents: function () {
				var plugin = this;

				plugin.$checkbox.on('click.' + plugin._name + ' keydown.' + plugin._name, function (e) {
					var keyCode = e.keyCode || e.which;
					if (e.type === 'click' || keyCode === 32) {
						e.stopPropagation();
						e.preventDefault();

						if ($(this).attr('aria-disabled')) return false;
						plugin.toggle($(this));
					}
				})

				plugin.$allCheckbox.on('click.' + plugin._name + ' keydown.' + plugin._name, function (e) {
					var keyCode = e.keyCode || e.which;
					if (e.type === 'click' || keyCode === 32) {
						e.stopPropagation();
						e.preventDefault();

						if ($(this).attr('aria-disabled')) return false;
						plugin.allCheck($(this))
					}
				})

				plugin.$allCtrl.on('click.' + plugin._name + 'keydown.' + plugin._name, function(e) {
					var $this = $(this);
					var keyCode = e.keyCode || e.which;

					if (e.type === 'click' || keyCode === 32) {
						e.stopPropagation();
						e.preventDefault();

						if ( $this.attr('aria-checked') === 'false' ) {
							plugin.checked( $this )
							$(plugin.options.allEl).each(function() {
								if ( $(this).attr('aria-checked') === 'false' ) {
									$(this).trigger('click');
								}
							})
						} else if ( $this.attr('aria-checked') === 'true' ) {
							plugin.unchecked( $this )
							$(plugin.options.allEl).each(function() {
								if ( $(this).attr('aria-checked') === 'true' ) {
									$(this).trigger('click');
								}
							})
						}
					}
				})

				plugin.$checkbox.on('checked.' + plugin._name, function (e) {
					plugin.checked($(this));
				})

				plugin.$checkbox.on('unchecked.' + plugin._name, function (e) {
					plugin.unchecked($(this));
				})
			},
			unbindEvents: function() {
				var plugin = this;

				plugin.$checkbox.off('.' + plugin._name);

				if ( plugin.$allCheckbox ) plugin.$allCheckbox.off('.' + plugin._name);
				if ( plugin.$allCtrl ) plugin.$allCtrl.off('.' + plugin._name);
			},
			buildCache: function () {
				var plugin = this;

				plugin.$element = $(plugin.element);
				plugin.$checkbox = plugin.$element.find(plugin.options.checkboxEl);
				plugin.$checkboxDisabeld = plugin.$element.find(plugin.options.checkboxEl).not('[aria-disabled=true]');
				plugin.$hidden = plugin.$element.find(plugin.options.hiddenEl);
				plugin.$allCheckbox = plugin.$element.find(plugin.options.allEl);
				plugin.$allCtrl = plugin.$element.find('[data-js=checkbox__all-ctrl]');

				if (plugin.options.firstCheck) {
					plugin.$hidden.attr({
						'checked': 'checked',
						'tabindex': -1
					});
				} else {
					plugin.$hidden.attr('tabindex', -1);
				}

				plugin.$allCheckbox.attr({
					'aria-checked': plugin.options.firstCheck,
					'aria-controls': '',
					'tabindex': 0
				})

				var checkboxId = '';

				plugin.$allCheckbox.each(function () {
					plugin.initialSetting($(this));
				})

				plugin.$checkbox.each(function (idx) {
					var $this = $(this);

					if (plugin.options.allCheckCtrl) {
						var _id = $this.attr('id') ? $this.attr('id') : UTIL.uuid('js-' + pluginName + '-');
						$this.attr('id', _id);
						idx > 0 ? checkboxId += ' ' + _id : checkboxId += _id
					}

					plugin.initialSetting($this);

				})

				plugin.initialSetting( plugin.$allCtrl )


				if (plugin.options.allCheckCtrl && plugin.options.defaultChecked) {
					plugin.checked(plugin.$allCheckbox.not('[aria-disabled=true]'))
					plugin.checked(plugin.$checkboxDisabeld)
				}

				plugin.$allCheckbox.attr('aria-controls', checkboxId)
			},
			toggle: function ($this) {
				var plugin = this;

				if ($this.find(plugin.options.hiddenEl).prop('checked')) {
					plugin.unchecked($this)
				} else {
					plugin.checked($this)
				}

				plugin.stateChecking()
			},
			checked: function ($this) {
				var plugin = this;
				$this.find(plugin.options.hiddenEl).prop('checked', true).change();
				$this.attr('aria-checked', true);
			},
			unchecked: function ($this) {
				var plugin = this;
				$this.find(plugin.options.hiddenEl).prop('checked', false).change();
				$this.attr('aria-checked', false);
			},
			allCheck: function ($this) {
				var plugin = this;
				if ($this.find(plugin.options.hiddenEl).prop('checked')) {
					plugin.unchecked(plugin.$allCheckbox)
					plugin.unchecked(plugin.$checkboxDisabeld)

					if ( $('[data-js=checkbox__all-ctrl]').attr('aria-checked') === 'true' ) {
						plugin.unchecked( $('[data-js=checkbox__all-ctrl]') )
					}
				} else {
					plugin.checked(plugin.$allCheckbox)
					plugin.checked(plugin.$checkboxDisabeld)

					if ( $('[data-js=checkbox__all-ctrl]').attr('aria-checked') === 'false' ) {
						plugin.checked( $('[data-js=checkbox__all-ctrl]') )
					}
				}
			},
			stateChecking: function () {
				var plugin = this;

				var checkBoxLeng = plugin.$checkboxDisabeld.length,
					checkLeng = plugin.$checkbox.find(plugin.options.hiddenEl + ':checked').not(':disabled').length

				if (checkBoxLeng === checkLeng) {
					plugin.allChecked = true
					plugin.checked(plugin.$allCheckbox)
					plugin.checked( $('[data-js=checkbox__all-ctrl]') )
				} else {
					plugin.allChecked = false
					plugin.unchecked(plugin.$allCheckbox)
					plugin.unchecked( $('[data-js=checkbox__all-ctrl]') )
				}

			},
			initialSetting: function($target) {
				var plugin = this;

				if ($target.attr('aria-disabled') === "true") {
					$target.attr({
						'tabindex': '',
					}).removeAttr('aria-checked').find(plugin.options.hiddenEl).attr('disabled', true);
				} else {
					$target.attr({
						'aria-checked': plugin.options.firstCheck,
						'tabindex': 0
					})
				}
			},
			removeSetting: function() {
				var plugin = this;

				plugin.$allCheckbox.removeAttr('tabindex aria-checked data-index');
				plugin.$checkbox.removeAttr('tabindex aria-checked data-index');
			},
			destroy: function() {
				var plugin = this;

				plugin.unbindEvents();
				plugin.removeSetting();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if ($.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName).destroy()
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				} else {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}
		$(function () {
			$('[data-js=checkbox]').checkBox();
		});

	})(jQuery, window, document, undefined);

	/*
	** Plugin - Radio
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = "radio";

		var defaults = {
			radioTitle: '[data-js="radio__title"]',
			radioEl: '[data-js="radio__input"]',
			hiddenEl: '[data-js="radio__hidden"]',
			labelEl: '[data-js="radio__label"]',
			initIndex: null,
			activeClassName: 'is-active'
		};

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function () {
				var plugin = this;

				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function () {
				var plugin = this;
				var $focusItem;

				plugin.$element = $(plugin.element);
				plugin.$radioTitle = plugin.$element.find(plugin.options.radioTitle);
				plugin.$radio = plugin.$element.find(plugin.options.radioEl);
				plugin.$hidden = plugin.$element.find(plugin.options.hiddenEl);
				plugin.$label = plugin.$element.find(plugin.options.labelEl);

				plugin.initialSetting();
			},
			bindEvents: function () {
				var plugin = this;

				plugin.$radio.on('click.' + plugin._name + ' keydown.' + plugin._name, function (e) {
					var $this = $(this);
					var keyCode = e.keyCode || e.which;
					var idx = parseInt($this.data('index'));

					if ($(this).attr('aria-disabled')) return false;

					if (e.type === 'click' || keyCode === 32) {
						plugin.checked($this);
						plugin.defaultEventKill(e)
					} else if (keyCode === 37 || keyCode === 38) {
						if (idx === 0 && $this.attr('aria-checked') === 'true') {
							plugin.checked(plugin.$element.find('[data-index=' + (plugin.$radio.length - 1) + ']'));
						} else {
							plugin.checked(plugin.$element.find('[data-index=' + (idx - 1) + ']'));
						}

						plugin.defaultEventKill(e)
					} else if (keyCode === 39 || keyCode === 40) {
						if (idx === (plugin.$radio.length - 1) && $this.attr('aria-checked') === 'true') {
							plugin.checked(plugin.$radio.eq(0));
						} else {
							plugin.checked(plugin.$radio.eq(idx + 1))
						}
						plugin.defaultEventKill(e)
					}
				})

				plugin.$radio.on('checked.' + plugin._name, function (e) {
					var $this = $(this);
					plugin.checked($this);
				})
			},
			unbindEvents: function() {
				var plugin = this;

				plugin.$radio.off('.' + plugin._name);
			},
			checked: function ($self) {
				var plugin = this;

				if ( $self.data('target') ) {
					$( $self.data('target') ).addClass( plugin.options.activeClassName );

					$( plugin.$radio ).each(function() {
						$( $(this).not($self).data('target') ).removeClass( plugin.options.activeClassName );
					})
				}

				$self.attr({
					'tabindex': 0,
					'aria-checked': true
				})
				.focus()
				.find( plugin.options.hiddenEl )
				.prop('checked', true)
				.change();

				plugin.$radio.not($self).each(function () {
					$(this).attr({
						'tabindex': -1,
						'aria-checked': false
					})
					$(this).find( plugin.options.hiddenEl ).prop('checked', false).change();
				})
			},
			initialSetting: function() {
				var plugin = this;

				var uuid = UTIL.uuid(plugin._name);

				plugin.$radio.each(function (idx) {
					var $this = $(this);

					$this.not('[aria-disabled=true]').attr({
						'aria-checked': false,
						'tabindex': $this.index() === 0 ? 0 : -1,
						'data-index': idx
					})
					$this.not('[aria-disabled=true]').find(plugin.options.hiddenEl).attr({
						'checked': false,
						'tabindex': -1
					});

					if ( $this.attr('aria-disabled') === 'true' ) {
						$(this).attr({
							'tabindex': -1
						})
						.find(plugin.options.hiddenEl)
						.attr({
							'tabindex': -1,
							'disabled': 'disabled'
						})
					}

					if ( idx == plugin.options.initIndex ) {
						plugin.checked( $this );
					}
				});
				plugin.$element.attr('aria-labelledby', uuid);
				plugin.$radioTitle.attr('id', uuid);
			},
			removeSetting: function() {
				var plugin = this;

				plugin.$radio.each(function (idx) {
					var $this = $(this);

					$this.removeAttr('aria-checked tabindex data-index')
					$this.find(plugin.options.hiddenEl).removeAttr('aria-checked tabindex');
				});
				plugin.$element.removeAttr('aria-labelledby');
				plugin.$radioTitle.removeAttr('id');
			},
			defaultEventKill: function (e) {
				e.stopPropagation();
				e.preventDefault();
			},
			destroy: function() {
				var plugin = this;
				plugin.removeSetting();
				plugin.unbindEvents();
			}
		});

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if ($.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName).destroy()
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				} else {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-js=radio]').radio();
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
			sectionEl: '[data-js=sticky__section]',
			headerEl: '[data-js=sticky__target-parent]',
			targetEl: '[data-js=sticky__target]',
			activeClassName: 'is-floating',
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

				plugin.$wrap = $( plugin.element );
				plugin.$header = plugin.$wrap.find( plugin.options.headerEl );
				plugin.$target = plugin.$wrap.find( plugin.options.targetEl );
				plugin.$win = $( win );

				plugin.headerHeight = plugin.$header.outerHeight();

				plugin.top = plugin.$wrap.offset().top;
				plugin.bottom = plugin.top + ( plugin.$wrap.outerHeight() - plugin.headerHeight );
			},
			bindEvents: function() {
				var plugin = this;

				plugin.$win.on('scroll.' + plugin._name, function() {
					var scrTop = $(this).scrollTop();

					plugin.toggle( scrTop );
				})
			},
			unbindEvents: function() {
				plugin.$win.off(plugin._name);
			},
			toggle: function( scrTop ) {
				var plugin = this;

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
					'top': 0,
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

				plugin.$wrap.css({
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

				plugin.$wrap.css('position', 'relative');
				plugin.$target.css({
					position: 'absolute',
					bottom: '0',
					top: 'auto',
					width: '100%'
				})
			},
			getOffsetTop: function( target ) {
				var plugin = this;
				var wrapTop = plugin.$wrap.offset().top;
				var headerHeight = plugin.$header.height();
				var position = plugin.options.position;
				var topValue = plugin.options.top;

				if ( target ) {
					return ($(target).offset().top);
				} else if ( position === 'bottom' ) {
					return ( wrapTop + headerHeight ) - topValue;
				} else if (  position === 'middle' ) {
					return ( wrapTop + ( headerHeight / 2 ) ) - topValue;
				} else {
					return wrapTop - topValue;
				}
			},
			beforeChange: function () {
				var plugin = this;

				plugin.$wrap.trigger('beforeChange', [plugin, plugin.$target]);
			},
			afterChange: function () {
				var plugin = this;

				plugin.$wrap.trigger('afterChange', [plugin, plugin.$target]);
			},
		})

		$.fn[pluginName] = function ( options ) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
				}
			});
		}

		$(function () {
			$('[data-js=sticky]').sticky();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Tooltip
	*/
	;
	(function ($, win, doc, undefined) {

		var pluginName = "tooltip";

		var defaults = {
			position: 'right', //left, top, bottom
			event: 'focusin', //click
			indent: 10,
			button: '[data-js=tooltip__button]',
			panel: '[data-js=tooltip__panel]',
			activeClassName: 'is-active'
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
			buildCache: function() {
				var plugin = this;

				plugin.$element = $(plugin.element);
				plugin.$button = plugin.$element.find(plugin.options.button);
				plugin.$panel = plugin.$element.find(plugin.options.panel);
				plugin.$win = $(win);

				plugin.$button.attr('aria-expended', false);
				plugin.$panel.hide();
				plugin.$element.css('display', 'inline-block');
			},
			bindEvents: function() {
				var plugin = this;
				var eventName = (function () {
					var events = plugin.options.event;
					if ( events === 'focusin' ) {
						return [ 'focusin.' + plugin._name + ' mouseenter.' + plugin._name, 'focusout.' + plugin._name + ' mouseleave.' + plugin._name ]
					}

					return [events + '.' + plugin._name];
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
							'left': buttonLeft - ( Math.abs( buttonWidth - panelWidth ) / 2 )
						})
						break;
					case 'bottom':
						plugin.$panel.css({
							'top': ( buttonTop + buttonHeight ) + plugin.options.indent,
							'left': buttonLeft - ( Math.abs( buttonWidth - panelWidth ) / 2 )
						})
						break;
					default:
						plugin.$panel.css({
							'top': buttonTop + ( (buttonHeight - panelHeight) / 2 ),
							'left': ( buttonLeft + buttonWidth ) + plugin.options.indent
						})
				}
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
			$('[data-js=tooltip]').tooltip();
		});
	})(jQuery, window, document, undefined);

	/*
	** Plugin - Swiper
	*/
	;
	(function ($, win, doc, undefined) {
		var pluginName = "swiper"

		var defaults = {
			wrap: '[data-js=swiper__wrapper]',
			item: '[data-js=swiper__item]'
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
				plugin.initSwiper();
			},
			buildCache: function() {
				var plugin = this;

				plugin.$element = $(plugin.element);
				plugin.$wrap = plugin.$element.find( plugin.options.wrap );
				plugin.$item = plugin.$element.find( plugin.options.item );
			},
			initSwiper: function() {
				var plugin = this;
				plugin.swiper = new Swiper( plugin.$element , {
					slidesPerView: 'auto',
					centeredSlides: true,
					spaceBetween: 0,
					loop: true,
				});
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
			$('[data-js=swiper]').swiper();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Form Control
	*/
	;
	(function ($, win, doc, undefined) {
		var pluginName = "formCtrl"

		var defaults = {
			input: '[data-js=form-ctrl__input]',
			textarea: '[data-js=form-ctrl__textarea]',
			delete: '[data-js=form-ctrl__delete]',
			count: '[data-js=form-ctrl__count]',
			countCurrent: '[data-js=form-ctrl__count-current]',
			countTotal: '[data-js=form-ctrl__count-total]',
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

				plugin.$input.on('keyup.' + pluginName, function(e) {
					plugin.toggle( this );
				}).keyup();

				plugin.$delete.on('click.' + pluginName, function(e) {
					e.preventDefault();
					plugin.delete();
				});

				plugin.$textarea.on('keyup.' + pluginName + ' input.' + pluginName, function(e) {
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
					$('.search__util-button-box').hide()
				}
				plugin.$delete.addClass(plugin.options.activeClassName);
			},
			hide: function() {
				var plugin = this;

				plugin.$delete.removeClass(plugin.options.activeClassName);
				if ( plugin.$input.attr('class').indexOf('search') != -1 ) {
					$('.search__util-button-box').show()
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
			$('[data-js=form-ctrl]').formCtrl();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Modal
	*/
	;
	(function ($, win, doc, undefined) {
		var pluginName = "modal";

		var defaults = {
			modal: '[data-js=modal__element]',
			close: '[data-js=modal__close]',
			open: '[data-js=modal__open]',
			activeClassName: 'is-open'
		}

		function Plugin(element, options) {
			this.element = element;
			this._name = pluginName;
			this._defaults = defaults;
			this.options = $.extend({}, this._defaults, options);
			this.stackLevel = 0;
			this.initialSetting = false;
			this.init();
		}

		$.extend(Plugin.prototype, {
			init: function() {
				var plugin = this;
				plugin.appendModal();
				plugin.buildCache();
				plugin.bindEvents();
			},
			buildCache: function() {
				var plugin = this;

				plugin.$element = $(plugin.element);
				plugin.$modal = plugin.$element.find(plugin.options.modal)
				plugin.$open = $( plugin.options.open )
				plugin.$close = $( plugin.options.close )
				plugin.$win = $(win);
				plugin.$html = $('html');
				plugin.$body = $('html, body');
				plugin.$wrap = $('#wrap');
			},
			bindEvents: function() {
				var plugin = this;

				plugin.$element.on('open.' + pluginName, function(e, target) {
					plugin.open( target );
				})

				plugin.$element.on('close.' + pluginName, function(e, target) {
					plugin.close( target );
				})

				plugin.$close.on('click.' + pluginName, function(e) {
					plugin.close( $(this).closest( plugin.options.modal ) )
				})

				$(doc).on('click.' + pluginName, plugin.options.open, function(e) {
					e.preventDefault();

					plugin.open( $($(this).data('target')) );
				})
			},
			appendModal: function() {
				var plugin = this;

				if ( !plugin.initialSetting ) {
					plugin.initialSetting = true;

					$('body')
						.append('<div class="pualugin-modal" data-js="modal"></div>')
						.append('<div class="pualugin-modal__mask" data-js="modal__mask"></div>');
				}

				$('body').find( plugin.options.modal ).each(function() {
					$('[data-js=modal]').append( $(this) );
				})
			},
			afterBindEvents: function( focusElementFirst, focusElementLast ) {
				focusElementFirst.on('keydown.' + pluginName, function(e) {
					var keyCode = e.keyCode || e.which;
					if ( e.shiftKey && keyCode === 9 ) {
						e.preventDefault();
						focusElementLast.focus();
					}
				})

				focusElementLast.on('keydown.' + pluginName, function(e) {
					var keyCode = e.keyCode || e.which;
					if ( keyCode == 9 && !e.shiftKey ) {
						e.preventDefault();
						focusElementFirst.focus();
					}
				})
			},
			open: function( target ) {
				var plugin = this;
				console.log( target )
				var $target = $(target);
				var targetId = $target.attr('id');
				var _focusElements = UTIL.findFocusEl( $target );

				// plugin.afterBindEvents( $(_focusElements[0]), $(_focusElements[1]) )

				plugin.makeDimd();

				$target
					.addClass(plugin.options.activeClassName)
					.css('z-index',  300 + plugin.stackLevel )
					.attr({
						'role': 'dialog',
						'aria-modal': true
					})
					.focus();
			},
			close: function( target ) {
				var plugin = this;
				var $target = $(target);
				var targetId = $target.attr('id');

				$target.removeClass(plugin.options.activeClassName);

				/* if ( $target.attr('id').indexOf('Date') == -1 ) {
					$('[data-modal-target="#' + $target.attr('id') + '"]').focus();
				} */
			},
			removeStyles: function( $target ) {
				$target.css({
					'position': '',
					'overflow': '',
					'top': '',
					'left': '',
					'right': '',
					'bottom': '',
					'z-index': ''
				})
			},
			setStyles: function( $target ) {
				$target.css({
					'position': 'fixed',
					'overflow': 'hidden',
					'top': 0,
					'left': 0,
					'right': 0,
					'bottom': 0
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

		$(function () {
			$('body').modal();
		});

	})(jQuery, window, document, undefined)

	/*
	** Plugin - Resize Select
	*/
	;(function($, win, doc, undefined){
		var pluginName = "resizeselect"
		var arrowWidth = 0;

		$.fn[pluginName] = function(settings) {
			return this.each(function() {

				$(this).change(function(){
					var $this = $(this);

					var text = $this.find("option:selected").text();
					console.log( $this.css("font-size") )
					var $test = $("<span>").html(text).css({
						"font-size": $this.css("font-size"),
						"visibility": "hidden"
					});
					$test.appendTo('body');
					$this.width( $test.width() );
					$test.remove();

					}).change();

			});
		};

		// run by default
		$(function() {
			$("[data-js=resize-select]").resizeselect();
		})

	})(jQuery, window, document, undefined);

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
