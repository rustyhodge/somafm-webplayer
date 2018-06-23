"use strict";

angular.module("somafmPlayerApp").directive("sfPlayer", [
  "$rootScope",
  "$timeout",
  "PlayerService",
  "WebAudioPlayerService",
  "SleepTimerService",
  function(
    $rootScope,
    $timeout,
    PlayerService,
    WebAudioPlayerService,
    SleepTimerService
  ) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "common/player.tpl.html",
      link: function(scope, element, attr) {
        scope.playing = false;

        scope.play = function(station) {
          WebAudioPlayerService.play(station);
        };

        scope.stop = function() {
          WebAudioPlayerService.stop();
        };

        scope.maxVolume = function() {
          scope.setVolume(1);
        };

        scope.updateVolume = function(value) {
          scope.setVolume(value);
        };

        scope.setVolume = function(value) {
          scope.volume = WebAudioPlayerService.setVolume(value);
        };

        scope.toggleMute = function() {
          WebAudioPlayerService.toggleMute();
        };

        scope.isMuted = function() {
          return WebAudioPlayerService.getMuted();
        };

        scope.popUpTimer = function() {
          if (
            document.getElementById("timer-content-block").style.display ==
              "none" ||
            document.getElementById("timer-content-block").style.display == ""
          ) {
            document.getElementById("timer-content-block").style.display =
              "block";
          } else {
            document.getElementById("timer-content-block").style.display =
              "none";
          }
        };

        scope.popUpStopTimer = function() {
          if (
            document.getElementById("timer-running-block").style.display ==
              "none" ||
            document.getElementById("timer-running-block").style.display == ""
          ) {
            document.getElementById("timer-running-block").style.display =
              "block";
          } else {
            document.getElementById("timer-running-block").style.display =
              "none";
          }
        };

        scope.setSleepTimer = function(value) {
          document.getElementById("timer-content-block").style.display = "none";

          SleepTimerService.start(
            value,
            function() {
              scope.stop();
              document.getElementById("timer-status-block").style.display =
                "none";
              document.getElementById("timer-button-block").style.display =
                "inline-block";
            },
            function(tick) {
              document.getElementById("timer-status-block").style.display =
                "inline-block";
              document.getElementById("timer_text").innerHTML = tick;
            }
          );
          document.getElementById("timer-button-block").style.display = "none";
        };

        scope.stopSleepTimer = function() {
          SleepTimerService.stop();
          document.getElementById("timer-running-block").style.display = "none";
          document.getElementById("timer-status-block").style.display = "none";
          document.getElementById("timer-button-block").style.display =
            "inline-block";
        };

        scope.init = function() {
          WebAudioPlayerService.init(document.getElementById("audioPlayer"));
          scope.volume = WebAudioPlayerService.getVolume();
        };

        scope.init();

        $rootScope.$watch("playingStation", function(station) {
          scope.playing = station != null ? station.playing : false;
        });
      }
    };
  }
]);
