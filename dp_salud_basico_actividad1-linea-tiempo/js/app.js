// This file is part of CDI Tool
//
// CDI is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// CDI is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with CDI.  If not, see <http://www.gnu.org/licenses/>.

'use strict';
var dhbgApp = {};

dhbgApp.DEBUG_MODE = true;
dhbgApp.SHOWNOTSCORMMSG = false;
dhbgApp.MODE = 'standard'; // standard or mobile
dhbgApp.FULL_PAGES = true;
dhbgApp.WINDOWS_MODE = 'top'; // top or modal
dhbgApp.evaluation = { "approve_limit": 100, "activities_percentage": 60 }
dhbgApp.MOBILE_WIDTH = 512;

$(function () {
    var $body = $('body');

    dhbgApp.DEBUG_MODE = $body.attr('data-debug') && $body.attr('data-debug') == 'true';

    // It can be onlypages or subpages
    dhbgApp.FULL_PAGES = $body.attr('data-display-mode') && $body.attr('data-display-mode') == 'onlypages';

    // It can be top or modal
    dhbgApp.WINDOWS_MODE = $body.attr('data-display-window') ? $body.attr('data-display-window') : 'top';

    // If mobile mode is enabled or disabled and the window width to define the mobile mode
    if ($body.attr('data-mobile-mode')) {
        if ($body.attr('data-mobile-mode') == 'false' || isNaN(Number($body.attr('data-mobile-mode')))) {
            dhbgApp.MOBILE_WIDTH = 0;
        }
        else if ($body.attr('data-mobile-mode') == 'true'){
            dhbgApp.MOBILE_WIDTH = 512;
        }
        else {
            dhbgApp.MOBILE_WIDTH = Number($body.attr('data-mobile-mode'));
        }
    }
    else {
        dhbgApp.MOBILE_WIDTH = 512;
    }

    dhbgApp.evaluation.approve_limit = $body.attr('data-approve-limit') ? Number($body.attr('data-approve-limit')) : 100;

    dhbgApp.evaluation.activities_percentage = $body.attr('data-activities-percentaje') ? Number($body.attr('data-activities-percentaje')) : 60;

    dhbgApp.start();
});

// About: http://stackoverflow.com/questions/1359761/sorting-a-javascript-object-by-property-name
dhbgApp.sortObjectByProperty = function (o) {
    var sorted = {}, key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
};

/**
 * To translate strings
 *
 */
dhbgApp.s = function (key, params) {
    if(dhbgApp.strings[key]) {

        if (params) {
            if (Object.prototype.toString.call( params ) === '[object Array]' || Object.prototype.toString.call( params ) === '[object Object]') {
                var str = dhbgApp.strings[key];
                $.each(params, function(key, val){
                    str = str.replace("{" + key + "}", val);
                });
                return str;
            }
            else {
                return dhbgApp.strings[key].replace("{0}", params);
            }
        }
        else {
            return dhbgApp.strings[key];
        }
    }
    else {
        return key;
    }
};

// About: http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
dhbgApp.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

dhbgApp.rangerand = function(min, max, round){
    if (!min) {
        min = 0;
    }
    if (!max) {
        max = 1;
    }

    if (min >= max) {
        max = min + 1;
    }

    var num = (max - min) * Math.random() + min;
    return round ? Math.round(num) : num;
};

dhbgApp.debug = function(msg) {
    if (dhbgApp.DEBUG_MODE) {
        console.log(msg);
    }
};

