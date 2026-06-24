'use strict';

// ─── DOMException ────────────────────────────────────────────────────────────
if (typeof global.DOMException === 'undefined') {
  var LEGACY_CODES = {
    IndexSizeError: 1, HierarchyRequestError: 3, WrongDocumentError: 4,
    InvalidCharacterError: 5, NoModificationAllowedError: 7, NotFoundError: 8,
    NotSupportedError: 9, InUseAttributeError: 10, InvalidStateError: 11,
    SyntaxError: 12, InvalidModificationError: 13, NamespaceError: 14,
    InvalidAccessError: 15, TypeMismatchError: 17, SecurityError: 18,
    NetworkError: 19, AbortError: 20, URLMismatchError: 21,
    QuotaExceededError: 22, TimeoutError: 23, InvalidNodeTypeError: 24,
    DataCloneError: 25,
  };
  function DOMException(message, name) {
    this.message = message || '';
    this.name = name || 'Error';
    this.code = LEGACY_CODES[this.name] || 0;
  }
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
  DOMException.prototype.name = 'DOMException';
  for (var k in LEGACY_CODES) {
    if (Object.prototype.hasOwnProperty.call(LEGACY_CODES, k)) {
      DOMException[k] = LEGACY_CODES[k];
    }
  }
  global.DOMException = DOMException;
}

// ─── Performance API ─────────────────────────────────────────────────────────
if (typeof global.PerformanceEntry === 'undefined') {
  function PerformanceEntry(name, entryType, startTime, duration) {
    this.name = name || '';
    this.entryType = entryType || '';
    this.startTime = startTime || 0;
    this.duration = duration || 0;
  }
  PerformanceEntry.prototype.toJSON = function () {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
    };
  };
  global.PerformanceEntry = PerformanceEntry;
}

if (typeof global.PerformanceMark === 'undefined') {
  function PerformanceMark(name) {
    this.name = name || '';
    this.entryType = 'mark';
    this.startTime = global.performance ? global.performance.now() : 0;
    this.duration = 0;
  }
  PerformanceMark.prototype = Object.create(global.PerformanceEntry.prototype);
  PerformanceMark.prototype.constructor = PerformanceMark;
  global.PerformanceMark = PerformanceMark;
}

if (typeof global.PerformanceMeasure === 'undefined') {
  function PerformanceMeasure(name, startTime, duration) {
    this.name = name || '';
    this.entryType = 'measure';
    this.startTime = startTime || 0;
    this.duration = duration || 0;
  }
  PerformanceMeasure.prototype = Object.create(global.PerformanceEntry.prototype);
  PerformanceMeasure.prototype.constructor = PerformanceMeasure;
  global.PerformanceMeasure = PerformanceMeasure;
}

if (typeof global.PerformanceObserver === 'undefined') {
  function PerformanceObserver(callback) {
    this._callback = callback;
  }
  PerformanceObserver.prototype.observe = function () {};
  PerformanceObserver.prototype.disconnect = function () {};
  PerformanceObserver.prototype.takeRecords = function () { return []; };
  PerformanceObserver.supportedEntryTypes = [];
  global.PerformanceObserver = PerformanceObserver;
}

if (typeof global.PerformanceObserverEntryList === 'undefined') {
  function PerformanceObserverEntryList(entries) {
    this._entries = entries || [];
  }
  PerformanceObserverEntryList.prototype.getEntries = function () { return this._entries; };
  PerformanceObserverEntryList.prototype.getEntriesByName = function (name) {
    return this._entries.filter(function (e) { return e.name === name; });
  };
  PerformanceObserverEntryList.prototype.getEntriesByType = function (type) {
    return this._entries.filter(function (e) { return e.entryType === type; });
  };
  global.PerformanceObserverEntryList = PerformanceObserverEntryList;
}

// Ensure global.performance exists and has the mark/measure helpers React uses
if (typeof global.performance === 'undefined') {
  var _startTime = Date.now();
  global.performance = {
    now: function () { return Date.now() - _startTime; },
    mark: function () {},
    measure: function () {},
    clearMarks: function () {},
    clearMeasures: function () {},
    getEntries: function () { return []; },
    getEntriesByName: function () { return []; },
    getEntriesByType: function () { return []; },
  };
} else {
  // Patch missing methods onto an existing (partial) performance object
  if (!global.performance.mark) { global.performance.mark = function () {}; }
  if (!global.performance.measure) { global.performance.measure = function () {}; }
  if (!global.performance.clearMarks) { global.performance.clearMarks = function () {}; }
  if (!global.performance.clearMeasures) { global.performance.clearMeasures = function () {}; }
  if (!global.performance.getEntries) { global.performance.getEntries = function () { return []; }; }
  if (!global.performance.getEntriesByName) { global.performance.getEntriesByName = function () { return []; }; }
  if (!global.performance.getEntriesByType) { global.performance.getEntriesByType = function () { return []; }; }
}

// ─── structuredClone ─────────────────────────────────────────────────────────
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };
}

// ─── queueMicrotask ──────────────────────────────────────────────────────────
if (typeof global.queueMicrotask === 'undefined') {
  global.queueMicrotask = function (fn) {
    Promise.resolve().then(fn);
  };
}

// ─── MessageChannel / MessagePort ────────────────────────────────────────────
if (typeof global.MessageChannel === 'undefined') {
  function MessagePort() {
    this.onmessage = null;
    this._other = null;
  }
  MessagePort.prototype.postMessage = function (data) {
    var other = this._other;
    if (other && other.onmessage) {
      var self = other;
      setTimeout(function () { self.onmessage({ data: data }); }, 0);
    }
  };
  MessagePort.prototype.start = function () {};
  MessagePort.prototype.close = function () {};
  function MessageChannel() {
    this.port1 = new MessagePort();
    this.port2 = new MessagePort();
    this.port1._other = this.port2;
    this.port2._other = this.port1;
  }
  global.MessageChannel = MessageChannel;
  global.MessagePort = MessagePort;
}

