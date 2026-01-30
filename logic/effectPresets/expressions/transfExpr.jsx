function transformExprScrollPreset() {
    yEase = effect("Incoming")("Slider").value;
    scrollSlider = effect("Scroll Speed")("Slider").value;
    offsetTime = time - thisLayer.startTime;
    offsetTimeAfterZoom = time - thisLayer.effect("Incoming")("Slider").key(2).time;
    zoomIn = effect("ZoomIn")("Checkbox").value;
    fitToSocial = effect("FitToSocialPost")("Checkbox").value;
    if (fitToSocial == true) {
        socialOffset = ' + compHeight * 0.125 + '
    } else {
        socialOffset = 0
    }
    if (effect("SlideIn")("Checkbox") == true) {
        var resultY = yEase - offsetTimeAfterZoom * scrollSlider + transform.yPosition - thisComp.height / 2;
    } else {
        if (zoomIn == true) {
            if (time < thisLayer.effect("Incoming")("Slider").key(2).time) {
                var resultY = transform.yPosition - thisComp.height / 2 + socialOffset;
            } else {
                var resultY = -offsetTimeAfterZoom * scrollSlider + transform.yPosition - thisComp.height / 2 + socialOffset;
            }
        } else {
            var resultY = -offsetTime * scrollSlider + transform.yPosition - thisComp.height / 2 + socialOffset;
        }
    }
    if (fitToSocial || effect("SlideIn")("Checkbox") == true) {
        resultY;
    } else {
        clampY = thisLayer.height * thisLayer.scale[1] / 100 - thisComp.height;
        clamp(resultY, 0, -clampY);
    };
}