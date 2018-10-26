angular.module('controllers', ['ui.router'])
  // controller to populate start
  .controller('AjaxCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
    $scope.master = { firstName: "John", lastName: "Doe" };
    
    // item.busstop = "kkkkkkkkkk";
    $scope.item = {
      route: '',
      busstop: '',
      model: ''
    };

    // second Array Start
    $scope.routes = {
      "Estacao Central - Costa do Sol": {
        "Ministério da Justiça, Assuntos Constitucionais e Religiosos, Maputo, Moçambique": ["1"],
        "Polana Shopping Center, Avenida Julius Nyerere, Maputo, Moçambique": ["2"],
        "Barclays Premier Banking, Avenida Julius Nyerere, Maputo, Moçambique": ["3"],
        "Cinema Xenon": ["4"],
        "Bombas Total": ["5"],
        "Praça do Destacamento Feminino, Avenida Kenneth Kaunda, Maputo, Moçambique": ["6"],
        "Centro de Conferencias": ["7"],
        "Maritimo": ["8"],
        "Baia Mall": ["9"],
        "Mercado de Peixe, Maputo, Moçambique": ["10"],
        "BAÍA MALL, Avenida da Marginal, Maputo, Moçambique": ["11"],
        "Triunfo": ["12"]
      },
      "Estacao Central - Expresso C do Sol": {
        "Naval": ["1"],
        "Southern Su": ["2"],
        "Maritimo": ["3"],
        "BAÍA MALL, Avenida da Marginal, Maputo, Moçambique": ["4"],
        "Mercado de Peixe, Maputo": ["5"],
        "Triunfo": ["6"]
      },
      "Estacao central - Museu": {
        "Pandora": ["1"],
        "Maputo Central Hospital, 1653 Avenida Eduardo Mondlane, Maputo": ["2"],
        "Maputo Central Hospital, 1653 Avenida Eduardo Mondlane, Maputo": ["3"],
        "Milano": ["4"],
        "cemitério Ronil, e Av de Maguiguana, Avenida Karl Marx, Maputo": ["5"]
      },
      "Estacao central - OMM": {
        "Muncipio": ["1"],
        "Ministerio do Trabalho": ["2"],
        "Roinil, 2205 Avenida Eduardo Mondlane, Maputo 1100": ["3"],
        "Banco Único, Maputo": ["4"],
        "Av. Marien Ngouabi, Maputo": ["5"],
        "Mercado Janet, Av. Mao Tse Tung, Maputo": ["6"],
        "PH7 Coop": ["7"],
        "Praça da OMM, Maputo": ["8"],
        "Instituto Do Coração - ICOR, Maputo": ["9"],
        "TDM Conference Center": ["10"]
      },
    };

    $scope.routeNames = [];
    for (route in $scope.routes)
      $scope.routeNames.push(route);

    $scope.busstopNames = [];
    // get busstop names by route
    $scope.getBusstopNames = function (route) {
      $scope.item.busstop = '';
      $scope.item.model = '';
      $scope.modelNames = [];
      var result = [];
      if ($scope.routes.hasOwnProperty(route)) {
        for (busstop in $scope.routes[route])
          result.push(busstop);
      }
      $scope.busstopNames = result;
    };

    $scope.modelNames = [];
    // get model names by route and busstop
    $scope.getModelNames = function (route, busstop) {
      var result = [];
      if ($scope.routes[route].hasOwnProperty(busstop)) {
        for (model in $scope.routes[route][busstop])
          result.push($scope.routes[route][busstop][model]);
      }
      $scope.modelNames = result;
    };

    $scope.count = 0;
    $scope.myFunc = function () {
      $scope.count++;
    };


    $scope.dashboardMap = function () {
      console.log($scope.item.busstop);
      $state.go('dashboard.map', {
        destination: $scope.item.busstop
      });
    }

  }])
  // controller to populate end.

  .controller('PlaceCtrl', function ($scope, place) {
    $scope.place = place;
  })

  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, GooglePlacesService, $document, $cordovaGeolocation, $stateParams) {
    // Central Park location
    console.log(this);

    $scope.user1 = {
      level: 0
    }

    $scope.teste = $stateParams.destination;
    var maputo = {
      lat: -5.953724,
      lng: 2.588711
    };

    $scope.mbclient = {};

    $scope.customMarkers = [
      {
        lat: maputo.lat,
        lng: maputo.lng,
        class: "custom-marker",
        text: "Maputo"
      }
    ];

    // Init the center position for the map
    $scope.latitude = maputo.lat;
    $scope.longitude = maputo.lng;

    // Google Places search
    $scope.search = { input: '' };
    $scope.predictions = [];

    // Keep track of every marker we create. That way we can remove them when needed
    $scope.markers_collection = [];
    $scope.markers_cluster = null;


    // To properly init the google map with angular js
    $scope.init = function (map) {
      $scope.mymap = map;
      $scope.$apply();
    };


    // start button color
    $scope.activeButton = function () {
      $scope.isActive = !$scope.isActive;
    };

    // end button color

    var showPlaceInfo = function (place) {
      $state.go('place', { placeId: place.place_id });
    },
      cleanMap = function () {
        // Remove the markers from the map and from the array
        while ($scope.markers_collection.length) {
          $scope.markers_collection.pop().setMap(null);
        }

        // Remove clusters from the map
        if ($scope.markers_cluster !== null) {
          $scope.markers_cluster.clearMarkers();
        }
      },
      createMarker = function (place) {
        // Custom image for marker
        var custom_marker_image = {
          url: '../img/ionic_marker.png',
          size: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 30)
        },
          marker_options = {
            map: $scope.mymap,
            icon: custom_marker_image,
            animation: google.maps.Animation.DROP
          };

        // Handle both types of markers, places markers and location (lat, lng) markers
        if (place.geometry) {
          marker_options.position = place.geometry.location;
        }
        else {
          marker_options.position = place;
        }

        var marker = new google.maps.Marker(marker_options);

        // For the places markers we are going to add a click event to display place details
        if (place.place_id) {
          marker.addListener('click', function () {
            showPlaceInfo(place);
          });
        }

        $scope.markers_collection.push(marker);

        return marker;
      },
      createCluster = function (markers) {
      };

    // Clean map
    cleanMap();
    $scope.search.input = "";

    $cordovaGeolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then(function (position) {
      $ionicLoading.hide().then(function () {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;

        createMarker({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    });


    $scope.getPlacePredictions = function (query) {
      if (query !== "") {
        GooglePlacesService.getPlacePredictions(query)
          .then(function (predictions) {
            $scope.predictions = predictions;
          });
      } else {
        $scope.predictions = [];
      }
    };

    $scope.selectSearchResult = function (result) {
      $scope.search.input = result.description;
      $scope.predictions = [];

      // $ionicLoading.show({
      //   template: 'Searching restaurants near '+result.description+' ...'
      // });

      // With this result we should find restaurants arround this place and then show them in the map
      // First we need to get LatLng from the place ID
      GooglePlacesService.getLatLng(result.place_id)
        .then(function (result_location) {
          // Now we are able to search restaurants near this location
          GooglePlacesService.getPlacesNearby(result_location)
            .then(function (nearby_places) {
              // Clean map
              cleanMap();

              $ionicLoading.hide().then(function () {
                // Create a location bound to center the map based on the results
                var bound = new google.maps.LatLngBounds(),
                  places_markers = [];

                for (var i = 0; i < nearby_places.length; i++) {
                  bound.extend(nearby_places[i].geometry.location);
                  var place_marker = createMarker(nearby_places[i]);
                  places_markers.push(place_marker);
                }

                // Create cluster with places
                createCluster(places_markers);

                var neraby_places_bound_center = bound.getCenter();

                // Center map based on the bound arround nearby places
                $scope.latitude = neraby_places_bound_center.lat();
                $scope.longitude = neraby_places_bound_center.lng();

                // To fit map with places
                $scope.mymap.fitBounds(bound);
              });
            });
        });// GooglePlacesService
    }

    /*
    ********
      WARID CODE
    */



    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = new google.maps.Geocoder();


    $cordovaGeolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    })
      .then(function (position) {
        $scope.position1 = position;
        $ionicLoading.hide().then(function () {
          console.log(position);
          $scope.latitude = position.coords.latitude;
          $scope.longitude = position.coords.longitude;

        });
      });

    // marker object
    $scope.marker = {
      center: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
      }
    }

    $scope.map = {
      control: {},
      center: {
        latitude: $scope.latitude,
        longitude: $scope.longitude
      },
      zoom: 14
    }

    console.log("STATEPARAMS")
    console.info()
    // directions object -- with defaults
    $scope.directions = {
      // origin:  $scope.position1,
      origin: "Maputo, mozambique",
      destination: $stateParams.destination,
      showList: false
    }

    // get directions using google maps api
    $scope.getDirections = function ($stateParams, $state) {

      // $scope.item.busstop = '';


      var request = {
        origin: $scope.directions.origin,
        destination: $scope.directions.destination,
        travelMode: google.maps.DirectionsTravelMode.WALKING

      };
      directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          // directionsDisplay.setMap($scope.map.control.getGMap());
          directionsDisplay.setPanel(document.getElementById('directionsList'));
          $scope.directions.showList = true;
        } else {
          alert('Google route unsuccesfull!');
        }
      });
    }
  })

  // START OF DIRECTIVE
  .directive('userInfoCard', function () {
    return {
      templateUrl: "views/userInfoCard.html",
      restrict: "EA",
      scope: {
        user: '='
      },
      link: function (scope, el, attrs) {
        scope.nextState = function () {
          scope.user.level++;
          scope.user.level = scope.user.level % 3;
          setState();
        }

        function setState() {

          switch (scope.user.level) {
            case 0:
              console.log(0);
              el.find('.reserva').addClass('btn-success');
              el.find('.reserva').removeClass('btn-primary');
              el.find('.reserva').removeClass('btn-danger');
              break;
            case 1:
              console.log(1);
              el.find('.reserva').addClass('btn-primary');
              el.find('.reserva').removeClass('btn-success');
              el.find('.reserva').removeClass('btn-danger');
              break;
            case 2:
              console.log(2);
              el.find('.reserva').addClass('btn-danger');
              el.find('.reserva').removeClass('btn-primary');
              el.find('.reserva').removeClass('btn-success');
              break;
          }
        }

        setState();
      }
    }
  })
  // END OF DIRECTIVE

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
    $ionicModal.fromTemplateUrl('views/login.html', {
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
    ];

    $scope.items = [
      { title: 'Pepperoni Pizza', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 },
      { title: 'Item 1', img: "../img/pizza.jpg", price: 300 }
    ];
  })

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('views/rlogin.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .value('cartStorage', {
    items: [],
    grandTotal: 0
})


.controller('mainController', function(cartStorage) {
    var _this = this;
    _this.cartStorage = cartStorage;

    _this.items = [{
        name: 'Pepperoni Pizza',
        price: 500,
        img: "../img/pizza.jpg",
        select: {i1 : "small", i2 : "medium", i3: "Large"},
        quantity: 0,
        total: 0,
        showAddToCart: false,
        addedToCart: false
    }, {
        name: 'Margharita Pizza',
        price: 400,
        img: "../img/pizza1.jpg",
        select: {i1 : "small", i2 : "medium", i3: "Large"},
        quantity: 0,
        total: 0,
        showAddToCart: false,
        addedToCart: false
    }, {
        name: 'BBQ Chicken',
        price: 450,
        img: "../img/pizza2.jpg",
        select: {i1 : "small", i2 : "medium", i3: "Large"},
        quantity: 0,
        total: 0,
        showAddToCart: false,
        addedToCart: false
    }];
    

    _this.addToCart = function(item) {
        _this.cartStorage.items.push(item);
        item.addedToCart = true;
    }

    _this.increaseItemAmount = function(item) {
        item.quantity++;
        item.total = item.quantity * item.price;
        _this.cartStorage.grandTotal += item.price;
        console.log(_this.cartStorage.grandTotal );
        item.showAddToCart = true;
    }
    // $scope.grandTotal;
    _this.decreaseItemAmount = function(item) {
        item.quantity--;
        item.total = item.total - item.price;
        _this.cartStorage.grandTotal -= item.price;
        console.log(_this.cartStorage.grandTotal);
        if (item.quantity <= 0) {
            item.quantity = 0;
            item.addedToCart = false;
            item.showAddToCart = false;
            var itemIndex = _this.cartStorage.items.indexOf(item);
            if (itemIndex > -1) {
                _this.cartStorage.items.splice(itemIndex, 1);

            }
        } else {
            item.showAddToCart = true;
        }
    }
})



.controller('cartController', function(cartStorage, $scope) {
    var _this = this;
    _this.cartStorage = cartStorage;
    $scope.grandTotal = _this.cartStorage.grandTotal;
    console.log($scope.grandTotal);

    _this.increaseItemAmount = function(item, total) {
        item.quantity++;

        item.total = item.quantity * item.price;
         $scope.grandTotal+=item.price;
         console.log($scope.grandTotal);
    }

    _this.decreaseItemAmount = function(item) {
        item.quantity--;
        item.total = item.total - item.price;
        console.log($scope.grandTotal);
        $scope.grandTotal-=item.price;
        if (item.quantity <= 0) {
            item.quantity = 0;
            item.addedToCart = false;
            item.showAddToCart = false;
            var itemIndex = _this.cartStorage.items.indexOf(item);
            if (itemIndex > -1) {
                _this.cartStorage.items.splice(itemIndex, 1);
                 
            }
        }


    }

    _this.removeFromCart = function(item) {
        item.quantity = 0;
        item.addedToCart = false;
        item.showAddToCart = false;
        var itemIndex = _this.cartStorage.items.indexOf(item);
        if (itemIndex > -1) {
            _this.cartStorage.items.splice(itemIndex, 1);
        }
    }

    // _this.grandTotale = function() {

    //     var sum = 0;

    //     for(var i = 0; i < 3; i++){
    //       sum = sum + _this.total[i];
    //     }
    //     return sum;

    // }
    

    
})