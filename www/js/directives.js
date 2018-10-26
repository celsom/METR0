angular.module('directives', [])

  .directive('map', function () {
    return {
      restrict: 'E',
      scope: {
        onCreate: '&'
      },
      link: function ($scope, $element, $attr) {
        
      function initialize() {

        var locations = [
        ['Eduardo mondlane', -25.965737,32.580918, 11],
        ['paragem horca', -25.966740,32.579948, 10],
        ['paragem belita', -25.966272,32.580645, 9],
        ['paragem da pressa', -25.967121,32.580784, 8],
        ['paragem rua A', -25.966822,32.581610, 7],
        ['paragem FARMACIA', -25.960756,32.572855, 6],
        ['PARAGEM PONTO FINAL', -25.963555,32.574422, 4],
        ['MOVITEL', -25.963198,32.574047, 5],
        ['Cronulla ', -25.960960, 32.571172, 3],
        ['Paragem test1', -25.961018, 32.569864, 2],
        ['Paragem Esquina', -25.953724,32.588711, 1]
    ];


    // var directionsDisplay;
    // var directionsService = new google.maps.DirectionsService();


       var myLatLng = {lat: -25.96553, lng: 32.58322};
       $scope.latitude = myLatLng.lat;
    $scope.longitude = myLatLng.lng;

    //    $scope.latitude = myLatLng.lat;
    // $scope.longitude = myLatLng.lng;
    // directionsDisplay = new google.maps.DirectionsRenderer();


        var mapOptions = {
          center: {
            lat: $scope.latitude,
            lng: $scope.longitude
          },
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true

        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // start
  // var posOptions = {timeout: 10000, enableHighAccuracy: false};
  // $cordovaGeolocation
  //   .getCurrentPosition(posOptions)
  //   .then(function (position,$scope) {
  //     $scope.latitude  = position.coords.latitude
  //     $scope.longitude = position.coords.longitude
  //   }, function(err) {
  //     // error
  //   });


        // end




        // directionsDisplay.setMap(map);      
        // calcRoute();

    // 


        var count=0;


        for (count = 0; count < locations.length; count++) {  

            var marke = new google.maps.Marker({
                position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                map: map,
                icon: 'img/mapmarker.png',
                animation: google.maps.Animation.DROP
                });

            marke.info = new google.maps.InfoWindow({
                content: locations [count][0]
                });



            google.maps.event.addListener(marke, 'click', function() {  
                // this = marker
                var marker_map = this.getMap();
                this.info.open(marker_map, this);
                // Note: If you call open() without passing a marker, the InfoWindow will use the position specified upon construction through the InfoWindowOptions object literal.
                });
        }


 


        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });


    //         navigator.geolocation.getCurrentPosition(function (pos) {
    //   // $scope.latitude = pos.coords.latitude;
    //   //     $scope.longitude = pos.coords.longitude;
    //   console.log('Got pos', pos);
    //   $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //   $scope.loading.hide();
    // }

    // $scope.map = map;



      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }

//         var infowindow = new google.maps.InfoWindow();

//               for (i = 0; i < locations.length; i++) {
//                 marker = new google.maps.Marker({
//                     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
//                     map: map
//                 });
// }


    }
  }
})


/*.directive('myInput', function(){
     return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: 'myInputTemplate.html',
        replace: true,
        scope: {
            text: '=ngModel',
            title: '=title',
            placeholder : '=placeholder'
        },            
    }
})*/;
