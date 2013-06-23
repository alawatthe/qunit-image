this["JST"] = this["JST"] || {};

this["JST"]["src/qunit-image.hbs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="qunit-image-wrapper">\n\t<div>\n\t\tTesting a ' +
((__t = (width)) == null ? '' : __t) +
'px by ' +
((__t = (height)) == null ? '' : __t) +
'px image (' +
((__t = (height * width)) == null ? '' : __t) +
' total pixels, ' +
((__t = (width * height * 4)) == null ? '' : __t) +
' channels).\n\t</div>\n\t<div>\n\t\tThere were errors on ' +
((__t = (channelErrors)) == null ? '' : __t) +
' channels (' +
((__t = ((25 * channelErrors / (width * height)).toFixed(3))) == null ? '' : __t) +
'%).\n\t</div>\n\t<div>\n\t\tThe very primitive accumulated rgba-distance of the images is ' +
((__t = (imageDistance)) == null ? '' : __t) +
'.\n\t</div>\n\t<div class="qunit-image-clearfix">\n\t\t<div style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px;" class="qunit-image-figure">\n\t\t\t<div class="qunit-image-figcaption">The actual image</div>\n\t\t\t<img class="qunit-image-img" src="' +
((__t = (actCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t</div>\n\n\t\t<div style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px;" class="qunit-image-figure">\n\t\t\t<div class="qunit-image-figcaption">The reference image</div>\n\t\t\t<img class="qunit-image-img" src="' +
((__t = (expCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t</div>\n\n\t\t<div style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px;" class="qunit-image-figure">\n\t\t\t<div class="qunit-image-figcaption">\n\t\t\t\t<select class="qunit-image-select">\n\t\t\t\t\t<option value="0">difference heatmap</option>\n\t\t\t\t\t<option value="1">clip slider</option>\n\t\t\t\t\t<option value="2">opacity slider</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div>\n\t\t\t\t<img src="' +
((__t = (diffCanvas)) == null ? '' : __t) +
'" class="qunit-image-img qunit-image-comparisonImage qunit-image-isVisible" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\n\t\t\t\t<div class="qunit-image-comparisonImage">\n\t\t\t\t\t<input type="range" min="0" max="' +
((__t = (width)) == null ? '' : __t) +
'" class="qunit-image-range-clip" style="width:' +
((__t = (width)) == null ? '' : __t) +
'px;">\n\t\t\t\t\t<div class="qunit-image-absoluteContainer" style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px">\n\t\t\t\t\t\t<img class="qunit-image-img" src="' +
((__t = (actCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px"\n\t\t\t\t\t\t\t\t\tstyle="clip: rect(0px, ' +
((__t = (width)) == null ? '' : __t) +
'px, ' +
((__t = (height)) == null ? '' : __t) +
'px, ' +
((__t = (width / 2)) == null ? '' : __t) +
'px)" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t\t\t\t\t<img class="qunit-image-img" src="' +
((__t = (expCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px"\n\t\t\t\t\t\t\t\t\tstyle="clip: rect(0px, ' +
((__t = (width / 2)) == null ? '' : __t) +
'px, ' +
((__t = (height)) == null ? '' : __t) +
'px, 0px)" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="qunit-image-comparisonImage">\n\t\t\t\t\t<input type="range" min="0" max="1" step="0.01" class="qunit-image-range-opacity" style="width:' +
((__t = (width)) == null ? '' : __t) +
'px;">\n\t\t\t\t\t<div class="qunit-image-absoluteContainer" style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px">\n\t\t\t\t\t\t<img class="qunit-image-img" src="' +
((__t = (actCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px" style="opacity: 0.5" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t\t\t\t\t<img class="qunit-image-img" src="' +
((__t = (expCanvas)) == null ? '' : __t) +
'" width="' +
((__t = (width)) == null ? '' : __t) +
'px" height="' +
((__t = (height)) == null ? '' : __t) +
'px" style="opacity: 0.5" data-id="' +
((__t = (id)) == null ? '' : __t) +
'"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\n\t\t<div id="qunit-image-pixelComparison-' +
((__t = (id)) == null ? '' : __t) +
'" style="width:' +
((__t = (width)) == null ? '' : __t) +
'px; height:' +
((__t = (height)) == null ? '' : __t) +
'px;" class="qunit-image-figure">\n\t\t\t<div>\n\t\t\t\tHover one of the images to get a pixel comparison.\n\t\t\t</div>\n\t\t\t<div style="display: none">\n\t\t\t\tAt the currently selected Coordinate (<span class="qunit-image-xCoordinate"></span>,<span class="qunit-image-yCoordinate"></span>) the following colors are found:\n\t\t\t\t<table>\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t\t<th>actual</th>\n\t\t\t\t\t\t\t<th>expected</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>R</td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-rAct"></td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-rExp"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>G</td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-gAct"></td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-gExp"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>B</td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-bAct"></td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-bExp"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>A</td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-aAct"></td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-aExp"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>=</td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-act"></td>\n\t\t\t\t\t\t\t<td class="qunit-image-table-exp"></td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t</div>\n</div>';

}
return __p
};