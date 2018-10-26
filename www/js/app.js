// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'controllers',
  'services',
  'ngCordova',
  'directives',
  'ngMap',
  'google-maps',
  'ngRoute'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // start transport states 
      .state('map', {
        url: '/map',
        templateUrl: "views/trans_map.html",
        controller: 'MapCtrl'
      })

      .state('booking', {
        url: '/booking',
        templateUrl: "views/trans_book.html"
      })

      .state('result', {
        url: '/result',
        templateUrl: "views/trans_result.html"
      })
      // end transport states 

      // start states for dashbord
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dash/dash-home.html'
      })

      .state('dashboard.destination', {
        url: '/destination',
        views: {
          'tab-dest': {
            templateUrl: 'views/dash/dash-destination.html',
            controller: 'AjaxCtrl'
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'views/dash/dash-home.html',
            controller: 'AjaxCtrl'
          }
        }
      })
      .state('dashboard.map', {
        url: '/map/:destination',
        views: {
          'tab-map': {
            templateUrl: 'views/trans_map_.html',
            controller: 'MapCtrl'
          }
        }
      })
      // end states for dashboard

      // start shop states
      .state('shop', {
        url: '/shop',
        abstract: true,
        templateUrl: 'views/shop_menu.html',
        controller: 'AppCtrl'
      })

      .state('shop.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_search.html'
          }
        }
      })

      .state('shop.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_browse.html'
          }
        }
      })

      .state('shop.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('shop.boots', {
        url: '/boots',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_boots.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('shop.casual', {
        url: '/casual',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_casual.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('shop.jordan', {
        url: '/jordan',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_jordan.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('shop.formal', {
        url: '/formal',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_formal.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('shop.order', {
        url: '/order',
        views: {
          'menuContent': {
            templateUrl: 'views/shop_sorder.html'
          }
        }
      })
      // end shop states

      // start restaurantes states
      .state('rest', {
        url: '/rest',
        abstract: true,
        templateUrl: 'views/rest_menu.html',
        controller: 'AppCtrl'
      })

      .state('rest.mimmos', {
        url: '/mimmos',
        views: {
          'menuContent': {
            templateUrl: 'views/rest_mimmos.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('rest.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'views/rest_cart.html'
          }
        }
      })

      .state('rest.restaurants', {
        url: '/restaurants',
        views: {
          'menuContent': {
            templateUrl: 'views/rest_home.html',
            controller: 'HomeCtrl'
          }
        }
      });
      // end restaurantes states

    $urlRouterProvider.otherwise('/dashboard/home');
  })
