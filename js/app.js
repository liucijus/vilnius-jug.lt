var app = angular.module('vilniusJugApp', []);

var icons = {
  'Vilnius JUG': 'icons/event_types/java.png',
  'Vilnius JUG Conf': 'icons/event_types/java.png',
  'Vilnius Scala': 'icons/event_types/scala.png',
  'Vilnius Clojure': 'icons/event_types/clojure.png'
};

app.controller('EventsController', function ($scope) {
  var now = new Date();
  var currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  var upcoming = events.filter(function(event) {
    return Date.parse(event.date) >= currentDate;
  });

  var past = events.filter(function(event) {
    return Date.parse(event.date) < currentDate;
  });

  // Group events by year, newest year first: [{year: '2026', events: [...]}, ...]
  $scope.years = [];
  upcoming.concat(past).forEach(function(event) {
    var year = event.date.substring(0, 4);
    var last = $scope.years[$scope.years.length - 1];
    if (!last || last.year !== year) {
      last = {year: year, events: []};
      $scope.years.push(last);
    }
    last.events.push(event);
  });

  // Show the newest year by default
  $scope.selected = $scope.years[0];

  $scope.select = function(group) {
    $scope.selected = group;
  };

  $scope.icon = function(event) {
    return icons[event.type];
  };
});
