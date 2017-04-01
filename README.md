# tpb-api
A NodeJS torrents API wrapper for ThePirateBay.

[![Build Status](https://travis-ci.org/JunbangHuang/tpb-api.svg?branch=master)](https://travis-ci.org/JunbangHuang/tpb-api)
[![Dependency Status](https://david-dm.org/JunbangHuang/tpb-api.svg)](https://david-dm.org/JunbangHuang/tpb-api)
[![devDependency Status](https://david-dm.org/JunbangHuang/tpb-api/dev-status.svg)](https://david-dm.org/JunbangHuang/tpb-api#info=devDependencies)

A NodeJs torrents API wrapper for ThePirateBay.

## Usage

#### Setup
```
npm install --save tpb-api
```

#### Initialize
```js
const TPB = require('tpb-api');

const tpb = new TPB({[baseUrl, debug]});
```

### Example usage

The current version only work with tv series. I will add more feature in the next version.

#### Simple search
```js
tpb.search('The Walking Dead S07E15')
  .then(res => console.log(res))
  .catch(err => console.err(err));
```

## Response

Example of a response:

```js
{ 
	responseTime: 1121,
	name: 'The.Walking.Dead.S07E15',
	status: true,
	resolution: '720p',
	pubDate: '03-27-2017',
	size: '1.36 GiB',
	torrentLink: 'magnet:?xt=urn:btih:d5a8f45f92364ddeeb26357c1299054b2e22e144&dn=The.Walking.Dead.S07E15.720p.WEB-DL.H264-FUM%5Bettv%5D&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969',
	seeders: 1327,
	leechers: 116
}
```

## Parameters

The only parameter is the name of the show. It should contains the episode number with a pattern of S06E12 (season six, episode 12).

# License

MIT License

Copyright (c) 2017 - tpb-api - Released under the MIT license.
