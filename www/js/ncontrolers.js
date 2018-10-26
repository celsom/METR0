angular.module('controllers', ['ui.router'])




  // .controller('mainCtrl', function($scope) {
  //   $scope.user = {
  //     level: 0
  //   }
  // })

  .controller('MapCtrl', function ($scope, $ionicLoading) {
    $scope.mapCreated = function (map) {
      $scope.map = map;
    };

    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function (error) {
        alert('Unable to get location: ' + error.message);
      });
    }

      .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function (modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
          $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
          /*onsole.log('Doing login', $scope.loginData);*/
          $scope.loginData = "";
          $state.go('shop.order');
          // Simulate a login delay. Remove this and replace with your login
          // code if using a login system
          $timeout(function () {
            $scope.closeLogin();
          }, 1000);
        };
      })

      .controller('HomeCtrl', function ($scope) {
        $scope.brands = [
          { title: 'Boots', img: 'img/boots/boot1.jpg' },
          { title: 'Casual', img: 'img/casual/casual1.jpg' },
          { title: 'Jordan', img: 'img/jordan/jordan1.png' },
          { title: 'Formal', img: 'img/formal/formal1.jpg' }
        ];

        $scope.boots = [
          { title: 'Classy Boots', img: 'img/boots/boot1.jpg' },
          { title: 'Chelsea Boots', img: 'img/boots/boot2.jpg' },
          { title: 'Grey Color boots', img: 'img/boots/boot3.jpg' },
          { title: 'Big boy leather', img: 'img/boots/boot4.jpg' }
        ];

        $scope.casuals = [
          { title: 'Classy Boots', img: 'img/casual/casual1.jpg' },
          { title: 'Chelsea Boots', img: 'img/casual/casual2.jpg' },
          { title: 'Grey Color boots', img: 'img/casual/casual3.jpg' },
          { title: 'Big boy leather', img: 'img/casual/casual4.jpg' }
        ];

        $scope.jordans = [
          { title: 'Classy Boots', img: 'img/jordan/jordan1.png' },
          { title: 'Chelsea Boots', img: 'img/jordan/jordan2.png' },
          { title: 'Grey Color boots', img: 'img/jordan/jordan3.png' },
          { title: 'Big boy leather', img: 'img/jordan/jordan4.png' }
        ];

        $scope.formals = [
          { title: 'Classy Boots', img: 'img/formal/formal1.jpg' },
          { title: 'Chelsea Boots', img: 'img/formal/formal2.jpg' },
          { title: 'Grey Color boots', img: 'img/formal/formal3.jpg' },
          { title: 'Big boy leather', img: 'img/formal/formal4.jpg' }
        ]
      })