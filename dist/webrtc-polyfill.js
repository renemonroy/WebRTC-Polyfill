(function(win, doc) {
  'use strict';

  var polyWebRTC = function(config) {
    this.init.apply(this, config);
  };

  polyWebRTC.prototype = {

    constructor : polyWebRTC,
    stunServer : null,
    mediaEl : null,

    init : function(config) {
      for ( var prop in config ) {
        this[prop] = config[prop];
      }
      this._setRTC(navigator || null);
      if ( !this.stunServer ) console.log('STUN missed, Mozilla requires ip.');
    },

    _setRTC : function(nav) {
      if ( nav.getUserMedia ) {
        _configStd(nav);
      } else if (nav.webkitGetUserMedia) {
        _configWebkit(nav);
      } else if (nav.mozGetUserMedia) {
        _configMozilla(nav);
      } else {
        console.log('WebRTC is not supported.');
        this.webRTCSupported = false;
      }
      return this;
    },

    _configStd : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.srcObject = mediaStream;
        poly.mediaEl.play();
      };
      this.RTCPeerConnection = RTCPeerConnection;
      this.RTCSessionDescription = RTCSessionDescription;
      this.getUserMedia = nav.getUserMedia.bind(nav);
      this.webRTCSupported = true;
      this.webRTCClient = 'standard';
      return this;
    },

    _configWebkit : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.src = webkitURL.createObjectURL(mediaStream);
      };
      this.RTCPeerConnection = webkitRTCPeerConnection;
      this.RTCSessionDescription = RTCSessionDescription;
      this.getUserMedia = nav.webkitGetUserMedia.bind(nav);
      this.webRTCSupported = true;
      this.webRTCClient = 'webkit';
      return this;
    },

    _configMozilla : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.mozSrcObject = mediaStream;
        poly.mediaEl.play();
      };
      this.RTCPeerConnection = mozRTCPeerConnection;
      this.RTCSessionDescription = mozRTCSessionDescription;
      this.getUserMedia = nav.mozGetUserMedia.bind(nav);
      this.webRTCSupported = true;
      this.webRTCClient = 'mozilla';
      return this;
    }

  };

  win.PolyWebRTC = polyWebRTC;

})(window, document);