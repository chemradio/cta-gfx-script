

function applyScrollPreset(scrollTargetLayer) {
    scrollTargetLayer.selected = true;
    var scrollSpeedSlider = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Slider Control');
    scrollSpeedSlider.name = 'Scroll Speed';
    scrollSpeedSlider.slider.setValue(20);

    var incomingSlider = scrollTargetLayer.property("ADBE Effect Parade").addProperty('ADBE Slider Control');
    incomingSlider.name = 'Incoming';
    incomingSlider.slider.setValueAtTime(0, compHeight);
    incomingSlider.slider.setTemporalEaseAtKey(1, [easeInCT]);
    incomingSlider.slider.setValueAtTime(1.3, 0);
    incomingSlider.slider.setTemporalEaseAtKey(2, [easeOutCT]);

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
    scrollTargetLayer.transform.scale.expression = 'zoomIn = effect("ZoomIn")("Checkbox").value;\nzoomInAmount = effect("ZoomIn Amount")("Slider").value;\nfitToWidth = effect("FitToBackground")("Checkbox").value;\nincoming = effect("Incoming")("Slider").value;\nfitToPost = effect("FitToSocialPost")("Checkbox").value;\nif ( fitToWidth == true ) {\n	proportion =' + compWidth + '*100/thisLayer.width;\n	x = proportion + value[0] - 100;\n	y = proportion + value[1] - 100;\n} else if (fitToPost == true) {\n	proportion = ' + compWidth * .52 + '*100/thisLayer.width;\n	x = proportion + value[0] - 100;\n	y = proportion + value[1] - 100;\n} else {\n	x = value[0];\n	y = value[1];\n}\nif (zoomIn == true) { \n	liner = linear( incoming, 0, thisComp.height, zoomInAmount, 0 );\n	[ x + liner, y + liner]\n	//easeOut(time,inPoint,inPoint + 1.5,[ x, y ],[ x+ zoomInAmount, y+ zoomInAmount ]) \n} else {\n	[ x, y ] \n}';

    scrollTargetLayer.position.dimensionsSeparated = true;
    scrollTargetLayer.transform.property("ADBE Position_1").setValue(compHeight / 2);
    scrollTargetLayer.transform.property("ADBE Position_1").expressionEnabled = true;
    scrollTargetLayer.transform.property("ADBE Position_1").expression = 'yEase = effect("Incoming")("Slider").value;\nscrollSlider = effect("Scroll Speed")("Slider").value;\noffsetTime = time - thisLayer.startTime;\noffsetTimeAfterZoom = time - thisLayer.effect("Incoming")("Slider").key(2).time;\nzoomIn = effect("ZoomIn")("Checkbox").value;\nfitToSocial = effect("FitToSocialPost")("Checkbox").value;\nif (fitToSocial == true){socialOffset = ' + compHeight * 0.125 + '} else {socialOffset = 0}\nif (effect("SlideIn")("Checkbox") == true) {\nvar resultY = yEase - offsetTimeAfterZoom*scrollSlider + transform.yPosition-thisComp.height/2;\n} else {\nif ( zoomIn == true ) { \nif (time < thisLayer.effect("Incoming")("Slider").key(2).time) {\nvar resultY = transform.yPosition - thisComp.height/2 + socialOffset;\n} else {\nvar resultY = -offsetTimeAfterZoom*scrollSlider + transform.yPosition - thisComp.height/2 + socialOffset;\n}\n} else {\nvar resultY = -offsetTime*scrollSlider + transform.yPosition - thisComp.height/2 + socialOffset;\n}\n}\nif (fitToSocial || effect("SlideIn")("Checkbox") == true) {resultY;} else {\nclampY = thisLayer.height*thisLayer.scale[1]/100 - thisComp.height;\nclamp(resultY,0,-clampY);\n}';
    scrollTargetLayer.transform.property("ADBE Anchor Point").setValue([scrollTargetLayer.width / 2, 0, 0]);
    scrollTargetLayer.transform.property("ADBE Anchor Point").expressionEnabled = true;
    scrollTargetLayer.transform.property("ADBE Anchor Point").expression = '[value[0],0+value[1]]';
    scrollTargetLayer.selected = false;
}