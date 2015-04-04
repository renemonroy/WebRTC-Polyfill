(function(win, doc) {
  'use strict';

  var polyWebRTC = function(config) {
    this.init.apply(this, config);
  };

  polyWebRTC.prototype = {

    constructor : polyWebRTC,
    stunServer : null,

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
        this.isSupported = false;
      }
      return this;
    },

    _configStd : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.srcObject = mediaStream;
        poly.mediaEl.play();
      };
      this.rtcPeerConnection = RTCPeerConnection;
      this.rtcSessionDescription = RTCSessionDescription;
      this.getUserMedia = nav.getUserMedia.bind(nav);
      this.isSupported = true;
      return this;
    },

    _configWebkit : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.src = webkitURL.createObjectURL(mediaStream);
      };
      this.rtcPeerConnection = webkitRTCPeerConnection;
      this.rtcSessionDescription = RTCSessionDescription;
      this.getUserMedia = nav.webkitGetUserMedia.bind(nav);
      this.isSupported = true;
      return this;
    },

    _configMozilla : function(nav) {
      var poly = this;
      this.connectStreamToSrc = function(mediaStream) {
        poly.mediaEl.mozSrcObject = mediaStream;
        poly.mediaEl.play();
      };
      this.rtcPeerConnection = mozRTCPeerConnection;
      this.rtcSessionDescription = mozRTCSessionDescription;
      this.getUserMedia = nav.mozGetUserMedia.bind(nav);
      this.isSupported = true;
      return this;
    }

  };

  win.PolyWebRTC = polyWebRTC;

})(window, document);