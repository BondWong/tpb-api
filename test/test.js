/**
 * Created by bondwong on 3/30/17.
 */

'use strict';

import RBGT from '../rbgt-api';

var rbgt = new RBGT({debug: true});
describe("The search method", function() {
    it("throws error with invalid parameter", function() {
        var validParameter = function() {
            rbgt.search({name: 'The Walking Dead'});
        };

        expect(validParameter).not.toThrow();
    });
});