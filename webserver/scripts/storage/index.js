/*
It stores the data in the browser sessionStorage. The  sessionStorage
object stores data for only one session (the data is deleted when the
browser tab is closed).
 */

;(function () {
  'use strict';
  // Storage
  Storage.prototype.setList = function (key, obj) {
    this.setItem(key, JSON.stringify(obj))
  };

  Storage.prototype.getList = function (key) {
    return JSON.parse(this.getItem(key)) || [];
  };

  Storage.prototype.cleanList = function (key) {
    this.setList(key, []);
  };

  Storage.prototype.addItemList = function (key, item) {
    let list = this.getList(key);
    if (!this.containsItemList(key, item)) {
      list.push(item);
      this.setList(key, list);
    }
  };

  Storage.prototype.removeItemList = function (key, item) {
    let list = this.getList(key);
    _.remove(list, item);
    this.setList(key, list);
  };

  Storage.prototype.containsItemList = function (key, item) {
    return _.findIndex(this.getList(key), item) >= 0;
  };
})();