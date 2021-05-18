/**
 * Created by Ihor on 31.10.2019.
 */
 'use strict';

 function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
 
 function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
 
 function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
 
 var NITimer = /*#__PURE__*/function () {
   function NITimer(selctor, secondsCounter, functionTimerEnd) {
     _classCallCheck(this, NITimer);
 
     this.interval = null;
     this.selector = selctor;
     this.secondCounter = secondsCounter;
     this.functionTimerEnd = functionTimerEnd;
     this.start();
   }
 
   _createClass(NITimer, [{
     key: "start",
     value: function start() {
       this.interval = setInterval(this.startTimer.bind(this), 1000);
     }
   }, {
     key: "startTimer",
     value: function startTimer() {
       this.secondCounter--;
 
       if (this.secondCounter > 0) {
         this.writeNewValToTimer();
       } else {
         $('body').addClass('submit');
         window.removeEventListener('beforeunload', beforeLoad);
         document.querySelector(this.selector).innerText = 'Время Вышло!';
         this.functionTimerEnd();
         window.clearInterval(this.interval);
       }
     }
   }, {
     key: "writeNewValToTimer",
     value: function writeNewValToTimer() {
       document.querySelector(this.selector).innerText = 'Осталось времени: ' + this.toRightFormat();
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
 
   return NITimer;
 }();