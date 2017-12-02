var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.selectedType = $("#select").val();
  $scope.keyword = $('input').val();
  // $scope.getSongs = function() {
  //   $http.get(baseUrl + $scope.track).success(function(response){
  //     data = $scope.tracks = response.tracks.items
      
  //   })
  // }

  //dropdown menu
  $("#select").change(function() {
      $scope.selectedType = $(this).val();
  });

  // Fetch data from Spotify API
  $scope.getData = function() {
    $http.get("https://api.spotify.com/v1/search?type=" + $scope.selectedType + "&query=" + $scope.keyword).success(function(response) {
        if ($scope.selectedType == "album" && response.albums.items.length > 0) {
            $scope.currentType = [];
            var index = 0;
            for (var i = 0; i < response.albums.items.length; i++) {
                $scope.albumObject = {};
                $scope.albumObject.album = response.albums.items[i];
                $scope.currentType.push($scope.albumObject);                  
                $http.get("https://api.spotify.com/v1/albums/" + response.albums.items[i].id + "/tracks").success(function(data) {
                    $scope.currentType[index].tracks = data.items;
                    index++;
                });
            }
        } else if ($scope.selectedType == "artist") {
            $scope.currentType = response.artists.items;
        } else if ($scope.selectedType == "track") {
            $scope.currentType = response.tracks.items;
        } else {
            $scope.currentType = [];
        }
     });
  };



  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});



