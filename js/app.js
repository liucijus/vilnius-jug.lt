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

  $scope.events = upcoming.concat(past);

  $scope.icon = function(event) {
    return icons[event.type];
  };
});
