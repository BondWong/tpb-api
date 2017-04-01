/**
 * Created by bondwong on 3/28/17.
 */

import got from 'got';
import agents from 'fake-user-agent';
import cheerio from 'cheerio';

'use strict';

module.exports = class RBGT {

    constructor({baseUrl = 'https://thepiratebay.org/search', debug = false} = {}) {
        this._baseUrl = baseUrl;
        this._debug = debug;
    }

    _fetchData(name, body, responseTime) {
        const $ = cheerio.load(body);
        const showName = name.replace(/ /g, '\.'); // The.Walking.Dead.S07E15.720p.XXXXXXX

        const result = {
            responseTime,
            name: showName,
            status: false
        }
        $('#searchResult tr').each(function () {
            const entry = $(this);
            const title = entry.find('div.detName a.detLink').text();
            title.replace(/ /g, '\.');
            if (title.match(showName + '.720p')) {
                result.resolution = '720p';
            } else if (title.match(showName + '.1080p')) {
                result.resolution = '1080p';
            }

            if (result.resolution) {
                const tdList = entry.find('td');
                const info = entry.find('font.detDesc').text().split(',');
                const subPubDate = info[0].split(' ')[1].substr(0, 10);
                const pubDate = subPubDate.indexOf(':') !== -1
                    ? subPubDate.substr(0, 5) + '-' + (new Date()).getFullYear()
                    : subPubDate.substr(0, 5) + '-' + subPubDate.substr(6, 4);

                const size = info[1].split(' ')[2];
                const seeders = parseInt($(tdList[2]).text());
                const leechers = parseInt($(tdList[3]).text());
                const torrentLink = $($(tdList[1]).find('a')[1]).attr('href');

                result.pubDate = pubDate;
                result.size = size;
                result.torrentLink = torrentLink;
                result.seeders = seeders;
                result.leechers = leechers;
                result.status = true;

                return false;
            }

        });

        return result;

    }

    // only one page is needed to be checked, as long as the name is specific enough
    _getData({name}, date) {
        const url = this._baseUrl + '/' + encodeURIComponent(name);
        if (this._debug) {
            console.log(`Making requesting to: ${url}`);
        }

        return got(`${url}`, {
            method: 'GET',
            headers: {
                'user-agent': agents.MAC_SAFARI5
            }
        }).then(res => res.body).then(body => this._fetchData(name, body, Date.now() - date));

    }

    search(name) {
        const date = Date.now();

        if (typeof(name) === 'string') {
            return this._getData({name}, date);
        } else if (typeof(name) === 'object') {
            return this._getData(name, date);
        } else {
            throw new Error('invalid parameter');
        }

    }
}