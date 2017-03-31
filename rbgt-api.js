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

    _fetchData(body, responseTime) {
        const $ = cheerio.load(body);

        
    }

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
        }).then(res => res.body).then(body => this._fetchData(body, Date.now() - date));

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