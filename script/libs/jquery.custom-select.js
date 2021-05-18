"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import $ from 'jquery';

/*!
 * Custom Select jQuery Plugin
 */
var CustomSelect = function ($) {
  var defaults = {
    block: 'custom-select',
    hideCallback: false,
    includeValue: false,
    keyboard: true,
    modifier: false,
    placeholder: false,
    search: false,
    showCallback: false,
    transition: 0
  };

  var CustomSelect = /*#__PURE__*/function () {
    /**
     * Custom Select
     *
     * @param {Element} select Original `<select>` DOM element to customize.
     * @param {(Object|string)=} options Settings object or method name.
     * @param {string=} options.block Custom select BEM block name.
     * @param {Function=} options.hideCallback Fires after dropdown closes.
     * @param {boolean=} options.includeValue Adds chosen value option to
     *     dropdown. If enabled also cancels dropdown options rerender.
     * @param {boolean=} options.keyboard Enables keyboard control.
     * @param {string=} options.modifier Custom select block BEM modifier.
     * @param {string=} options.placeholder Placeholder hint, can be an HTML
     *     string (appears only if there is no explicitly selected options).
     * @param {boolean=} options.search Adds input to filter options.
     * @param {Function=} options.showCallback Fires after dropdown opens.
     * @param {(number|string)=} options.transition jQuery slideUp/Down param.
     */
    function CustomSelect(select, options) {
      _classCallCheck(this, CustomSelect);

      this._$select = $(select);
      this._options = _objectSpread(_objectSpread({}, defaults), _typeof(options) === 'object' ? options : {}); // Modifiers

      this._activeModifier = "".concat(this._options.block, "--active");
      this._dropupModifier = "".concat(this._options.block, "--dropup");
      this._optionSelectedModifier = "".concat(this._options.block, "__option--selected"); // Event handlers that can be removed

      this._keydown = this._keydown.bind(this);
      this._dropup = this._dropup.bind(this);
      this._outside = this._outside.bind(this);

      this._init();
    }
    /**
     * Resets custom select options.
     *
     * @public
     */


    _createClass(CustomSelect, [{
      key: "reset",
      value: function reset() {
        this._$dropdown.hide().empty();

        this._$value.off('click');

        this._fill();
      }
      /**
       * Renders initial state of custom select & sets
       * options click event listeners.
       *
       * @private
       */

    }, {
      key: "_init",
      value: function _init() {
        this._$element = $("<div class=\"".concat(this._options.block, "\">\n           <button class=\"").concat(this._options.block, "__option ").concat(this._options.block, "__option--value\" type=\"button\"></button>\n           <div class=\"").concat(this._options.block, "__dropdown\" style=\"display: none;\"></div>\n         </div>"));

        this._$select.hide().after(this._$element);

        if (this._options.modifier) {
          this._$element.addClass(this._options.modifier);
        }

        this._$value = this._$element.find(".".concat(this._options.block, "__option--value"));
        this._$dropdown = this._$element.find(".".concat(this._options.block, "__dropdown"));

        this._fill();
      }
      /**
       * Renders custom select options by original
       * select element options.
       *
       * @private
       */

    }, {
      key: "_fill",
      value: function _fill() {
        var _this = this;

        this._$values = this._$select.find('option');
        this._values = [];
        var placeholder = this._options.placeholder;
        $.each(this._$values, function (i, option) {
          var el = $(option).text().trim();

          _this._values.push(el);
        });

        if (placeholder) {
          // Check explicitly selected option
          if (this._$select.find('[selected]').length) {
            placeholder = false;
          } else {
            this._$value.html(placeholder); // Set select value to null


            this._$select.prop('selectedIndex', -1);
          }
        }

        $.each(this._values, function (i, el) {
          var cssClass = _this._$values.eq(i).attr('class');

          var $option = $("<button class=\"".concat(_this._options.block, "__option\" type=\"button\">").concat(el, "</button>"));

          var $selected = _this._$select.find(':selected');

          if (_this._$values.eq(i).attr('disabled')) {
            $option.prop('disabled', true);
          }

          if (!$selected.length && i === 0 || el === $selected.text().trim()) {
            if (!placeholder) {
              _this._$value.text(el).removeClass(_this._$value.data('class')).removeData('class').addClass(cssClass).data('class', cssClass);
            }

            if (_this._options.includeValue || placeholder) {
              $option.addClass(cssClass);
              $option.toggleClass(_this._optionSelectedModifier, _this._$values.eq(i).is('[selected]'));

              _this._$dropdown.append($option);
            }
          } else {
            $option.addClass(cssClass);

            _this._$dropdown.append($option);
          }
        });
        this._$options = this._$dropdown.find(".".concat(this._options.block, "__option"));

        if (this._options.search) {
          this._search();
        }

        this._$value.one('click', function (event) {
          _this._show(event);
        });

        this._$value.prop('disabled', !this._$options.length);

        this._$options.on('click', function (event) {
          _this._select(event);
        });
      }
      /**
       * Shows custom select dropdown & sets outside
       * click listener to hide.
       *
       * @param {Object} event Value click jQuery event.
       * @private
       */

    }, {
      key: "_show",
      value: function _show(event) {
        var _this2 = this;

        event.preventDefault();

        this._dropup();

        $(window).on('resize scroll', this._dropup);

        this._$element.addClass(this._activeModifier);

        this._$dropdown.slideDown(this._options.transition, function () {
          if (_this2._options.search) {
            _this2._$input.focus();

            if (_this2._options.includeValue) {
              _this2._scroll();
            }
          } // Open callback


          if (typeof _this2._options.showCallback === 'function') {
            _this2._options.showCallback.call(_this2._$element[0]);
          }
        });

        setTimeout(function () {
          $(document).on('touchstart click', _this2._outside);
        }, 0);

        this._$value.one('click', function (event) {
          event.preventDefault();

          _this2._hide();
        });

        if (this._options.keyboard) {
          this._options.index = -1;
          $(window).on('keydown', this._keydown);
        }
      }
      /**
       * Hides custom select dropdown & resets events
       * listeners to initial.
       *
       * @private
       */

    }, {
      key: "_hide",
      value: function _hide() {
        var _this3 = this;

        if (this._options.search) {
          this._$input.val('').blur();

          this._$options.show();

          this._$wrap.scrollTop(0);
        }

        this._$dropdown.slideUp(this._options.transition, function () {
          _this3._$element.removeClass(_this3._activeModifier).removeClass(_this3._dropupModifier); // Close callback


          if (typeof _this3._options.hideCallback === 'function') {
            _this3._options.hideCallback.call(_this3._$element[0]);
          }

          _this3._$value.off('click').one('click', function (event) {
            _this3._show(event);
          });

          $(document).off('touchstart click', _this3._outside);
          $(window).off('resize scroll', _this3._dropup);
        });

        if (this._options.keyboard) {
          this._$options.blur();

          $(window).off('keydown', this._keydown);
        }
      }
      /**
       * Centers chosen option in scrollable element
       * of dropdown.
       *
       * @private
       */

    }, {
      key: "_scroll",
      value: function _scroll() {
        var _this4 = this;

        $.each(this._$options, function (i, option) {
          var $option = $(option);

          if ($option.text() === _this4._$value.text()) {
            var top = $option.position().top;

            var height = _this4._$wrap.outerHeight();

            var center = height / 2 - $option.outerHeight() / 2;

            if (top > center) {
              _this4._$wrap.scrollTop(top - center);
            }

            return false;
          }
        });
      }
      /**
       * Changes value of custom select & `<select>`
       * by chosen option.
       *
       * @param {Object} event Option click jQuery event.
       * @private
       */

    }, {
      key: "_select",
      value: function _select(event) {
        var _this5 = this;

        event.preventDefault();
        var choice = $(event.currentTarget).text().trim();

        var values = _toConsumableArray(this._values);

        this._$value.text(choice).removeClass(this._$value.data('class'));

        this._$values.prop('selected', false);

        $.each(values, function (i, el) {
          if (!_this5._options.includeValue && el === choice) {
            values.splice(i, 1);
          }

          $.each(_this5._$values, function (i, option) {
            var $option = $(option);

            if ($option.text().trim() === choice) {
              var cssClass = $option.attr('class');
              $option.prop('selected', true);

              _this5._$value.addClass(cssClass).data('class', cssClass);
            }
          });
        });

        this._hide();

        if (!this._options.includeValue) {
          // Update dropdown options content
          if (this._$options.length > values.length) {
            var last = this._$options.eq(values.length);

            last.remove();
            this._$options = this._$options.not(last);

            if (!this._$options.length) {
              this._$value.prop('disabled', true);
            }
          }

          $.each(this._$options, function (i, option) {
            var $option = $(option);
            $option.text(values[i]); // Reset option class

            $option.attr('class', "".concat(_this5._options.block, "__option"));
            $.each(_this5._$values, function () {
              var $this = $(this);

              if ($this.text().trim() === values[i]) {
                $option.addClass($this.attr('class'));
                $option.prop('disabled', $this.prop('disabled'));
              }
            });
          });
        } else {
          // Select chosen option
          this._$options.removeClass(this._optionSelectedModifier);

          $.each(this._$options, function (i, option) {
            var $option = $(option);

            if ($option.text().trim() === choice) {
              $option.addClass(_this5._optionSelectedModifier);
              return false;
            }
          });
        }

        if (typeof event.originalEvent !== 'undefined') {
          this._$select.trigger('change');
        }
      }
      /**
       * Wraps options by wrap element, adds search
       * input to dropdown.
       *
       * @private
       */

    }, {
      key: "_search",
      value: function _search() {
        var _this6 = this;

        this._$input = $("<input class=\"".concat(this._options.block, "__input\" autocomplete=\"off\">"));

        this._$dropdown.prepend(this._$input); // Add scrollable wrap


        this._$options.wrapAll("<div class=\"".concat(this._options.block, "__option-wrap\"></div>"));

        this._$wrap = this._$element.find(".".concat(this._options.block, "__option-wrap"));

        this._$input.on('focus', function () {
          _this6._options.index = -1;
        });

        this._$input.on('keyup', function () {
          var query = _this6._$input.val().trim();

          if (query.length) {
            _this6._$wrap.scrollTop(0);

            setTimeout(function () {
              if (query === _this6._$input.val().trim()) {
                $.each(_this6._$options, function (i, option) {
                  var $option = $(option);
                  var text = $option.text().trim().toLowerCase();
                  var match = text.indexOf(query.toLowerCase()) !== -1;
                  $option.toggle(match);
                });
              }
            }, 300);
          } else {
            _this6._$options.show();
          }
        });
      }
      /**
       * Toggles custom select dropup modifier based
       * on space for dropdown below.
       *
       * @private
       */

    }, {
      key: "_dropup",
      value: function _dropup() {
        var bottom = this._$element[0].getBoundingClientRect().bottom;

        var up = $(window).height() - bottom < this._$dropdown.height();

        this._$element.toggleClass(this._dropupModifier, up);
      }
      /**
       * Hides dropdown if target of event (e.g. click
       * on `$window`) is not custom select.
       *
       * @param {Object} event Outside "click" jQuery event.
       * @private
       */

    }, {
      key: "_outside",
      value: function _outside(event) {
        var $target = $(event.target);

        if (!$target.parents().is(this._$element) && !$target.is(this._$element)) {
          this._hide();
        }
      }
      /**
       * Controls navigation from keyboard by custom
       * select options.
       *
       * @param {Object} event Keydown jQuery event.
       * @private
       */

    }, {
      key: "_keydown",
      value: function _keydown(event) {
        var $visible = this._$options.filter(':visible').not('[disabled]');

        switch (event.which) {
          // Down
          case 40:
            event.preventDefault();
            var next = $visible.eq(this._options.index + 1).length;

            if (next) {
              this._options.index += 1;
            } else {
              this._options.index = 0;
            }

            $visible.eq(this._options.index).focus();
            break;
          // Up

          case 38:
            event.preventDefault();
            var prev = $visible.eq(this._options.index - 1).length;

            if (prev && this._options.index - 1 >= 0) {
              this._options.index -= 1;
            } else {
              this._options.index = $visible.length - 1;
            }

            $visible.eq(this._options.index).focus();
            break;
          // Enter

          case 13: // Space

          case 32:
            if (!this._$input || !this._$input.is(':focus')) {
              event.preventDefault();

              var $option = this._$options.add(this._$value).filter(':focus');

              $option.trigger('click');

              if (!$option.is(this._$value)) {
                this._$select.trigger('change');
              }

              this._$value.focus();
            }

            break;
          // Esc

          case 27:
            event.preventDefault();

            this._hide();

            this._$value.focus();

            break;

          default:
            break;
        }
      }
      /**
       * Creates jQuery plugin function.
       *
       * @param {(Object|string)=} config Options or method.
       * @returns {Function} jQuery plugin.
       */

    }], [{
      key: "_jQueryPlugin",
      value: function _jQueryPlugin(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data('custom-select');

          if (!data) {
            if (typeof config !== 'string') {
              data = new CustomSelect(this, config);
              $this.data('custom-select', data);
            }
          } else {
            if (config === 'reset') {
              data.reset();
            }
          }
        });
      }
    }]);

    return CustomSelect;
  }();

  $.fn['customSelect'] = CustomSelect._jQueryPlugin;

  $.fn['customSelect'].noConflict = function () {
    return $.fn['customSelect'];
  };

  return CustomSelect;
}($); //export default CustomSelect;