# PolyWebRTC
Uses specific implementations of WebRTC for old browsers that support it.

Work in progress and not tested yet.

### Usage
Just instantiate with the name you want:

```Javascript
  var webRTC = new PolyWebRTC({
    mediaEl : document.getElementById('my-video'),
    stunServer : '23.21.150.121:3478'
  });
```

And then access it like `new webRTC.RTCPeerConnection()` to instantiate `webkitRTCPeerConnection` if the browsers use webkit implementation.

### Options Required

* **mediaEl** - For now only supports `video`.
* **stunServer** - To identify how can be contacted from the public Internet.

### API

* [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)
* [RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)
* [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia)
* isSupported

Check this [urls list](http://emc.cc.st/public-stun.txt) for **public STUN servers**.