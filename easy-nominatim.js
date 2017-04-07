(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// nominatim string
var nominatim = 'http://nominatim.openstreetmap.org/search/';

// make geojson
// this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
// normalize places the geometry into a featurecollection, similar to
// https://github.com/mapbox/geojson-normalize
var normalizeGeojson = function normalizeGeojson(obj) {
  return {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: obj,
      properties: {}
    }]
  };
};

// make a couple buttons and an input in the 'enom' div

var appendToDiv = function appendToDiv(text, div) {
  // append text to text node
  var t = document.createTextNode(text);

  // append child to div
  div.appendChild(t);
};

var makeButtonsAndInput = function makeButtonsAndInput(divId) {
  // get div to put things in
  var div = document.getElementById(divId);
  var i = document.createElement('input');
  i.type = 'text';
  div.appendChild(i);
};

// this export thing breaks the browser support (which is what i want)
exports.normalizeGeojson = normalizeGeojson;
exports.nominatim = nominatim;
exports.makeButtonsAndInput = makeButtonsAndInput;
},{}]},{},[1]);
