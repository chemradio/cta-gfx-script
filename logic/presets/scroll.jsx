function applyScrollPreset(scrollTargetLayer, compHeight, easeInKeyframe, easeOutKeyframe) {
    scrollTargetLayer.selected = true;
    var scrollSpeedSlider = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Slider Control');
    scrollSpeedSlider.name = 'Scroll Speed';
    scrollSpeedSlider.slider.setValue(20);

    var incomingSlider = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Slider Control');
    incomingSlider.name = 'Incoming';
    incomingSlider.slider.setValueAtTime(0, compHeight);
    incomingSlider.slider.setTemporalEaseAtKey(1, [easeInKeyframe]);
    incomingSlider.slider.setValueAtTime(1.3, 0);
    incomingSlider.slider.setTemporalEaseAtKey(2, [easeOutKeyframe]);

    var slideInScrollCheckbox = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Checkbox Control');
    slideInScrollCheckbox.name = 'SlideIn';
    slideInScrollCheckbox.checkbox.setValue(false);

    var fitToBackgroundScrollCheckbox = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Checkbox Control');
    fitToBackgroundScrollCheckbox.name = 'FitToBackground';
    fitToBackgroundScrollCheckbox.checkbox.setValue(false);

    var fitToSocialPostScrollCheckbox = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Checkbox Control');
    fitToSocialPostScrollCheckbox.name = 'FitToSocialPost';
    fitToSocialPostScrollCheckbox.checkbox.setValue(false);

    var zoomInScrollCheckbox = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Checkbox Control');
    zoomInScrollCheckbox.name = 'ZoomIn';
    zoomInScrollCheckbox.checkbox.setValue(false);

    var zoomInAmountScrollSlider = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Slider Control');
    zoomInAmountScrollSlider.name = 'ZoomIn Amount';
    zoomInAmountScrollSlider.slider.setValue(10);

    scrollTargetLayer.transform.scale.expressionEnabled = true;
    scrollTargetLayer.transform.scale.expression = scaleExprScrollPreset.toString().replace(/^[^{]+{|}$/g, '');

    scrollTargetLayer.position.dimensionsSeparated = true;
    scrollTargetLayer.transform.property("ADBE Position_1").setValue(compHeight / 2);
    scrollTargetLayer.transform.property("ADBE Position_1").expressionEnabled = true;
    scrollTargetLayer.transform.property("ADBE Position_1").expression = transformExprScrollPreset.toString().replace(/^[^{]+{|}$/g, '');
    scrollTargetLayer.transform.property("ADBE Anchor Point").setValue([scrollTargetLayer.width / 2, 0, 0]);
    scrollTargetLayer.transform.property("ADBE Anchor Point").expressionEnabled = true;
    scrollTargetLayer.transform.property("ADBE Anchor Point").expression = '[value[0],0+value[1]]';
    scrollTargetLayer.selected = false;
}

function scaleExprScrollPreset() {
    zoomIn = effect("ZoomIn")("Checkbox").value;
    zoomInAmount = effect("ZoomIn Amount")("Slider").value;
    fitToWidth = effect("FitToBackground")("Checkbox").value;
    incoming = effect("Incoming")("Slider").value;
    fitToPost = effect("FitToSocialPost")("Checkbox").value;
    if (fitToWidth == true) {
        proportion = ' + compWidth + ' * 100 / thisLayer.width;
        x = proportion + value[0] - 100;
        y = proportion + value[1] - 100;
    } else if (fitToPost == true) {
        proportion = ' + compWidth * .52 + ' * 100 / thisLayer.width;
        x = proportion + value[0] - 100;
        y = proportion + value[1] - 100;
    } else {
        x = value[0];
        y = value[1];
    }
    if (zoomIn == true) {
        liner = linear(incoming, 0, thisComp.height, zoomInAmount, 0);
        [x + liner, y + liner]
        //easeOut(time, inPoint, inPoint + 1.5, [x, y], [x + zoomInAmount, y + zoomInAmount])
    } else {
        [x, y]
    };
}

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