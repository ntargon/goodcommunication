'use strict';

module.exports = {
    dateDigits: (str) => {
        let items = str.split('/');
        return {y: items[0], m: items[1], d: items[2]};
    },
    timeDigits: (str) => {
        let items = str.split(':');
        return {h: items[0], m: items[1]};
    },
    dow: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    timeString: (h,m) => {
        return ("00"+h).slice(-2) + ":" + ("00"+m).slice(-2);
    },
    dateString: (y,m,d) => {
        return [("0000"+y).slice(-4), ("00"+m).slice(-2), ("00"+d).slice(-2)].join('/');
    }
}