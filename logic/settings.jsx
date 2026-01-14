var compAspect = [16, 9];
var compWidth = 1920;
var compHeight = Math.floor(compWidth / compAspect[0] * compAspect[1]);
var compFrameRate = 25;
var defaultCompDuration = 30;
var defaultCompTail = 2;
var bumpScale = 10;
var documentMatteWidth = compWidth * .7;
var postAspect = 1.51
var defaultRegularFont = "Helvetica";
var defaultBoldFont = "Helvetica-Bold";
var imageExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
var audioExtensions = ['.mp3', '.wav'];
var bgKeywords = ['back', 'background', 'бэк', 'page', 'scroll', 'bg', "010"];
var fgKeywords = ['foreground', "front", 'post', 'tweet', "011"];
var defaultButtonSize = [100, 50];
var defaultPathSize = [300, 20];
var defaultPathCharacters = 70;
var defaultDummyCharacters = 15;
var easeInCT = new KeyframeEase(0, 33);
var easeOutCT = new KeyframeEase(0, 90);
var easeIn = new KeyframeEase(0, 90);
var easeInLessDramatic = new KeyframeEase(0, 50);
var easeOut = new KeyframeEase(0.75, 85);
var fbPostWidth1 = 722;
var defaultPostScrollSpeed;
var defaultBGScrollSpeed;
var defaultPreviewBoxSize = [700, 700];
var defaultExPreviewWidth = 315;
var defaultExPreviewHeight = defaultExPreviewWidth / 16 * 9;
var previewAssetsDimensions = {
    fbPostWidthPercent: .52,
    fbPostOffsetPercent: .125,
    photoWidthPercent: .7,
    photoHeightPercent: .7,
    docMatteWidth: .7
}
var globalMotionBlur = true;
var compLength = 60;