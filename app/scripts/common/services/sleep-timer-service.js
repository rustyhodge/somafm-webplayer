"use strict";

angular.module("somafmPlayerApp").factory("SleepTimerService", [
  "$q",
  "$rootScope",
  "$interval",
  function($q, $rootScope, $interval) {
    var states = (states = {
        PENDING: 0,
        STARTED: 1
      }),
      intervalTimeout = 0,
      interval;

    var self = this;
    self.state = states.PENDING;
    self.timeElapsed = 0;

    var start = function(value, callback, uiUpdate) {
      if (self.state !== states.PENDING) {
        return;
      }
      self.timeElapsed = 0;
      intervalTimeout = value * 1000 * 60;

      var diff = intervalTimeout - self.timeElapsed;
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((diff % (1000 * 60)) / 1000);

      var hoursString = hours;
      if (hours < 10) {
        hoursString = hoursString;
      }
      var minString = mins;
      if (mins < 10) {
        minString = "0" + minString;
      }
      var secString = secs;
      if (secs < 10) {
        secString = "0" + secString;
      }
      var data = hoursString + ":" + minString + ":" + secString;
      uiUpdate(data);

      interval = $interval(function() {
        if (self.timeElapsed >= intervalTimeout) {
          if (callback != null) {
            stop();
            callback();
          }
        } else {
          self.timeElapsed += 1000;
          var diff = intervalTimeout - self.timeElapsed;
          var hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          var secs = Math.floor((diff % (1000 * 60)) / 1000);

          var hoursString = hours;
          if (hours < 10) {
            hoursString = hoursString;
          }
          var minString = mins;
          if (mins < 10) {
            minString = "0" + minString;
          }
          var secString = secs;
          if (secs < 10) {
            secString = "0" + secString;
          }
          var data = hoursString + ":" + minString + ":" + secString;
          uiUpdate(data);
        }
      }, 1000);
      self.state = states.STARTED;
    };

    var stop = function() {
      if (self.state !== states.STARTED) {
        return;
      }
      $interval.cancel(interval);
      self.state = states.PENDING;
    };

    var reset = function(callback) {
      stop();
      start(intervalTimeout, callback);
    };

    return {
      start: start,
      stop: stop,
      reset: reset
    };
  }
]);
