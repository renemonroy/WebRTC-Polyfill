# WebRTC-Polyfill
A tiny library that uses specific implementations of WebRTC on old browsers.

Work in progress and not tested yet.

### Usage
Just instantiate with the name you want:

```Javascript
  var webRTC = new PolyWebRTC({
    mediaEl : document.getElementById('my-video'),
    stunServer : '23.21.150.121:3478'
  });
```

And then access it like `webRTC.RTCPeerConnection()` to execute the method `webkitRTCPeerConnection` if the browsers use webkit implementation.

### Options Required

* **mediaEl** - For now only supports `video`.
* **stunServer** - To identify how can be contacted from the public Internet.

### API

* **RTCPeerConnection**
* **RTCSessionDescription**
* **getUserMedia**
* **isSupported** 

Check this [urls list](http://emc.cc.st/public-stun.txt) for **public STUN servers**.