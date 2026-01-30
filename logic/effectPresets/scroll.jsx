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