'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NITimerLesson = /*#__PURE__*/function () {
  function NITimerLesson(elementTimer, secondsCounter, functionTimerEnd) {
    _classCallCheck(this, NITimerLesson);

    this.interval = null;
    this.elementTimer = elementTimer;
    this.secondCounter = secondsCounter;
    this.functionTimerEnd = functionTimerEnd;
    this.start();
  }

  _createClass(NITimerLesson, [{
    key: "start",
    value: function start() {
      this.interval = setInterval(this.startTimer.bind(this), 1000);
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      this.secondCounter--;

      if ($(this.elementTimer).hasClass('stop-timer')) {
        $(this.elementTimer).removeClass('stop-timer');
        this.elementTimer.html(' ');
        this.functionTimerEnd();
        window.clearInterval(this.interval);
      } else {
        if (this.secondCounter > 0) {
          this.writeNewValToTimer();
        } else {
          $('body').addClass('submit');
          window.removeEventListener('beforeunload', beforeLoad);
          this.elementTimer.parents('.lesson-test').find('form').submit();
          this.elementTimer.html('Время Вышло!');
          this.functionTimerEnd();
          window.clearInterval(this.interval);
        }
      }
    }
  }, {
    key: "writeNewValToTimer",
    value: function writeNewValToTimer() {
      this.elementTimer.html('Осталось времени: ' + this.toRightFormat());

      if (this.secondCounter < 10) {
        this.elementTimer.css('color', 'red');
      }
    }
  }, {
    key: "toRightFormat",
    value: function toRightFormat() {
      var h, m, s;
      h = Math.floor(this.secondCounter / 3600);
      m = Math.floor(this.secondCounter / 60) % 60;
      s = this.secondCounter % 60;
      return h + ':' + m + ':' + s;
    }
  }]);

  return NITimerLesson;
}();