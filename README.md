# WebRTC-Polyfill
A tiny library that uses specific implementations of WebRTC on old browsers.

Work in progress and not tested yet.

### Usage
Just instantiate with the name you want:

```Javascript
  var webRTC = new PolyWebRTC({
    media : document.getElementById('my-video'),
    stunServer : '23.21.150.121:3478'
  });
```

And then access it like `webRTC.PeerConnection`. Check this [list](http://emc.cc.st/public-stun.txt) for some public STUN servers.