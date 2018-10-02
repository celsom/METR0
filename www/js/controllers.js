angular.module('controllers', [])
  // controller to populate start
  .controller('AjaxCtrl', function ($scope) {
    $scope.master = {firstName:"John", lastName:"Doe"};
    // item.busstop = "kkkkkkkkkk";

    $scope.item = {
      route: '',
      busstop: '',
      model: ''
    };

    // Our hierarchical object of manufacturers, car sizes and model names
    $scope.routes = {
      "Estacao Central - Costa do Sol": {
        "Ministerio da Justica": ["1"],
        "Polana Shopping": ["2"],
        "Barclays": ["3"],
        "Cinema Xenon": ["4"],
        "Bombas Total": ["5"],
        "Destacamento Femenino": ["6"],
        "Centro de Conferencias": ["7"],
        "Maritimo": ["8"],
        "Baia Mall": ["9"],
        "Mercado do Peixe": ["10"],
        "Baia Mall": ["11"],
        "Triunfo": ["12"]
      },
      "Estacao Central - Expresso C do Sol": {
        "Naval": ["1"],
        "Southern Su": ["2"],
        "Maritimo": ["3"],
        "Baia Mall": ["4"],
        "Mercado do Peixe": ["5"],
        "Triunfo": ["6"]
      },
      "Estacao central - Museu": {
        "Pandora": ["1"],
        "HCM": ["2"],
        "Oftalmologia": ["3"],
        "Milano": ["4"],
        "Cemiterio": ["5"]
      },
      "Estacao central - OMM": {
        "Muncipio": ["1"],
        "Ministerio do Trabalho": ["2"],
        "Ronil": ["3"],
        "Banco Unico": ["4"],
        "Marien Ngouabi": ["5"],
        "Capuchinho": ["6"],
        "PH7 Coop": ["7"],
        "OMM": ["8"],
        "Icor": ["9"],
        "TDM": ["10"]
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
  })
  // controller to populate end.

  .controller('PlaceCtrl', function ($scope, place) {
    $scope.place = place;
  })

  .controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, GooglePlacesService, $document,  $cordovaGeolocation){
  // Central Park location

    $scope.teste = "Ministério da Justiça, Assuntos Constitucionais e Religiosos, Maputo, Moçambique";
      var maputo = {
        lat: -5.953724,
        lng: 2.588711
      };

      $scope.mbclient = {} ; 

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
      $scope.init = function(map) {
        $scope.mymap = map;
        $scope.$apply();
      };

      var showPlaceInfo = function(place){
            $state.go('place', {placeId: place.place_id});
          },
          cleanMap = function(){
            // Remove the markers from the map and from the array
            while($scope.markers_collection.length){
              $scope.markers_collection.pop().setMap(null);
            }

            // Remove clusters from the map
            if($scope.markers_cluster !== null){
              $scope.markers_cluster.clearMarkers();
            }
          },
          createMarker = function(place){
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
            if(place.geometry){
              marker_options.position = place.geometry.location;
            }
            else {
              marker_options.position = place;
            }

            var marker = new google.maps.Marker(marker_options);

            // For the places markers we are going to add a click event to display place details
            if(place.place_id){
              marker.addListener('click', function() {
                showPlaceInfo(place);
              });
            }

            $scope.markers_collection.push(marker);

            return marker;
          },
          createCluster = function(markers){
            // var markerClusterer = new MarkerClusterer($scope.mymap, markers, {
            $scope.markers_cluster = new MarkerClusterer($scope.mymap, markers, {
              styles: [
                {
                  url: '../img/i1.png',
                  height: 53,
                  width: 52,
                  textColor: '#FFF',
                  textSize: 12
                },
                {
                  url: '../img/i2.png',
                  height: 56,
                  width: 55,
                  textColor: '#FFF',
                  textSize: 12
                },
                {
                  url: '../img/i3.png',
                  height: 66,
                  width: 65,
                  textColor: '#FFF',
                  textSize: 12
                },
                {
                  url: '../img/i4.png',
                  height: 78,
                  width: 77,
                  textColor: '#FFF',
                  textSize: 12
                },
                {
                  url: '../img/i5.png',
                  height: 90,
                  width: 89,
                  textColor: '#FFF',
                  textSize: 12
                }
              ],
              imagePath: '../img/i'
            });
          };

      // $scope.tryGeoLocation = function(){
      //   $ionicLoading.show({
      //     template: 'Getting current position ...'
      //   });

      // }
      
        // Clean map
        cleanMap();
        $scope.search.input = "";

        $cordovaGeolocation.getCurrentPosition({
          timeout: 10000,
          enableHighAccuracy: true
        }).then(function(position){
          $ionicLoading.hide().then(function(){
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;

            createMarker({lat: position.coords.latitude, lng: position.coords.longitude});
          });
        });
      

      $scope.getPlacePredictions = function(query){
              if(query !== "")
              {
                GooglePlacesService.getPlacePredictions(query)
                .then(function(predictions){
                  $scope.predictions = predictions;
                });
              }else{
                $scope.predictions = [];
              }
      };

      $scope.selectSearchResult = function(result){
        $scope.search.input = result.description;
        $scope.predictions = [];

        // $ionicLoading.show({
        //   template: 'Searching restaurants near '+result.description+' ...'
        // });

        // With this result we should find restaurants arround this place and then show them in the map
        // First we need to get LatLng from the place ID
        GooglePlacesService.getLatLng(result.place_id)
        .then(function(result_location){
          // Now we are able to search restaurants near this location
          GooglePlacesService.getPlacesNearby(result_location)
          .then(function(nearby_places){
            // Clean map
            cleanMap();

            $ionicLoading.hide().then(function(){
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

      console.log(this);
        console.info("LOADED");
           
          // instantiate google map objects for directions
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();
          var geocoder = new google.maps.Geocoder();
          

          $cordovaGeolocation.getCurrentPosition({
           timeout: 10000,
           enableHighAccuracy: true
           })
          .then(function(position){
              $scope.position1 = position;
               $ionicLoading.hide().then(function(){
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


          // directions object -- with defaults
          $scope.directions = {
            // origin:  $scope.position1,
            origin: "Matola, Mozambique",
            destination: "Maputo , Mozambique",
            showList: false
          }
          
          // get directions using google maps api
          $scope.getDirections = function () {
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


});