//INIT
var strictConsistency = true;
#script CTA - GFX - Automator;
scriptFileName = $.fileName;
app.purge(PurgeTarget.ALL_CACHES)
var scriptVersion = "0.04" + " Beta";


if ($.os.indexOf('Macintosh') != -1) {
    var osType = 'mac';
} else {
    var osType = 'win'
}

var testingScript = false;
animationParams = {};

