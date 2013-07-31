/*
A sound aggregator.
Loïc Fontaine - http://github.com/lfont - MIT Licensed
directive based on code from: https://raw.github.com/angular-ui/ui-utils/master/modules/keypress/keypress.js
*/

define([
  'angular'
], function (angular) {
  'use strict';

  function shortcutDrtFactory ($document, $parse) {
    var keysByCode = {
      8: 'backspace',
      9: 'tab',
      13: 'enter',
      27: 'esc',
      32: 'space',
      33: 'pageup',
      34: 'pagedown',
      35: 'end',
      36: 'home',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      45: 'insert',
      46: 'delete'
    };

    var combinations = [];

    $document.on('keypress', function (event) {
      if (this.activeElement === this.body) {
        // No need to do that inside the cycle
        var metaPressed = !!(event.metaKey && !event.ctrlKey);
        var altPressed = !!event.altKey;
        var ctrlPressed = !!event.ctrlKey;
        var shiftPressed = !!event.shiftKey;
        var keyCode = event.keyCode;

        // normalize keycodes
        if (!shiftPressed && keyCode >= 97 && keyCode <= 122) {
          keyCode = keyCode - 32;
        }

        // Iterate over prepared combinations
        angular.forEach(combinations, function (combination) {
          var mainKeyPressed = combination.keys[keysByCode[keyCode]] ||
                               combination.keys[String.fromCharCode(keyCode)
                                                      .toLowerCase()];

          var metaRequired = !!combination.keys.meta;
          var altRequired = !!combination.keys.alt;
          var ctrlRequired = !!combination.keys.ctrl;
          var shiftRequired = !!combination.keys.shift;

          if (
            mainKeyPressed &&
            ( metaRequired === metaPressed ) &&
            ( altRequired === altPressed ) &&
            ( ctrlRequired === ctrlPressed ) &&
            ( shiftRequired === shiftPressed )
          ) {
            // Run the function
            combination.scope.$apply(function () {
              combination.expression(combination.scope, { '$event': event });
            });
          }
        });

        event.preventDefault();
      }
    });

    return {
      restrict: 'A',
      replace: false,

      link: function (scope, iElement, iAttrs) {
        var params = scope.$eval(iAttrs.shortcut);

        // Prepare combinations for simple checking
        angular.forEach(params, function (v, k) {
          var expression = $parse(v);

          angular.forEach(k.split(' '), function (variation) {
            var combination = {
              scope: scope,
              expression: expression,
              keys: {}
            };

            angular.forEach(variation.split('-'), function (value) {
              combination.keys[value] = true;
            });

            combinations.push(combination);

            // Remove the combination when the scope is destroyed
            scope.$on('$destroy', function () {
              var combinationIndex = combinations.indexOf(combination);
              combinations.slice(combinationIndex, 1);
              combination = null;
            });
          });
        });
      }
    };
  }

  shortcutDrtFactory.$inject = [ '$document', '$parse' ];

  return shortcutDrtFactory;
});
