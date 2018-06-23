"use strict";

angular
  .module("somafmPlayerApp", [
    //'ngAnimate',
    "ngCookies",
    "ngResource",
    "ngSanitize",
    "config",
    "LocalStorageModule",
    "ui.router",
    "somafm.tpls",
    "jtt_aping"
  ])
  .constant(
    "USE_HTML_AUDIO",
    (function() {
      var elem = document.createElement("audio");

      if (typeof elem.canPlayType == "function") {
        var playable = elem.canPlayType("audio/mpeg");
        if (
          playable.toLowerCase() == "maybe" ||
          playable.toLowerCase() == "probably"
        ) {
          return true;
        }
      }
      return false;
    })()
  )
  .constant("POLL_INT", 30000)
  .constant(
    "SHOP_URI",
    "http://somafm.com/buy/appbuy.cgi?mode=amazon&title={SONG}&artist={ARTIST}"
  )
  .constant("X2JS", window.X2JS)
  .constant("Audio", window.Audio)
  .constant("AudioContext", window.AudioContext)
  .config([
    "localStorageServiceProvider",
    function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix("somafm");
    }
  ])
  .config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("all-stations", {
          url: "/all-stations",
          data: {
            largeHeader: false,
            title: "SomaFM Player: All Stations"
          },
          views: {
            header: {
              template: "<sf-all-stations-header></sf-all-stations-header>"
            },
            body: {
              template: "<sf-all-stations-body></sf-all-stations-body>"
            }
          },
          title: "All Stations"
        })
        .state("fav-stations", {
          url: "/fav-stations",
          data: {
            largeHeader: false,
            title: "SomaFM Player: Favorite Stations"
          },
          views: {
            header: {
              template: "<sf-fav-stations-header></sf-fav-stations-header>"
            },
            body: {
              template: "<sf-fav-stations-body></sf-fav-stations-body>"
            }
          }
        })
        .state("fav-songs", {
          url: "/fav-songs",
          data: {
            largeHeader: false,
            title: "SomaFM Player: Favorite Songs"
          },
          views: {
            header: {
              template: "<sf-fav-songs-header></sf-fav-songs-header>"
            },
            body: {
              template: "<sf-fav-songs-body></sf-fav-songs-body>"
            }
          }
        })
        .state("community", {
          url: "/community",
          data: {
            largeHeader: false,
            title: "SomaFM Player: Community"
          },
          views: {
            header: {
              template: "<sf-community-header></sf-community-header>"
            },
            body: {
              template: "<sf-community-body></sf-community-body>"
            }
          }
        })
        .state("support", {
          url: "/support",
          data: {
            largeHeader: false
          },
          views: {
            header: {
              template: "<sf-support-header></sf-support-header>"
            },
            body: {
              template: "<sf-support-body></sf-support-body>"
            }
          }
        })
        .state("now-playing", {
          url: "/now-playing/:stationID",
          data: {
            largeHeader: false,
            title:
              "SomaFM Player: Groove Salad (or whatever channel is playing)"
          },
          views: {
            header: {
              template: "<sf-now-playing-header></sf-now-playing-header>"
            },
            body: {
              template: "<sf-now-playing-body></sf-now-playing-body>"
            }
          }
        });

      $urlRouterProvider.otherwise("/all-stations");
    }
  ])
  .run(function($rootScope) {
    $rootScope.$on("$stateChangeStart", function(
      event,
      toState,
      toParams,
      fromState
    ) {
      document.title = toState.data.title;
    });
  });
