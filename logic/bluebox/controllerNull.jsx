function createControllerNull(blueBoxComp) {
    // controller Null
    var controllerNull = blueBoxComp.layers.addNull();
    controllerNull.name = "Controller";

    // the speed of the opening and closing wipe transitions
    var sliderWipeSpeedEG = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderWipeSpeedEG.name = "Wipe Speed EG";
    sliderWipeSpeedEG.slider.setValue(70);

    var sliderWipeSpeed = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderWipeSpeed.name = "WipeSpeed";
    sliderWipeSpeed.slider.expressionEnabled = true;
    sliderWipeSpeed.slider.expression = 'effect("Wipe Speed EG")("Slider")/100';

    var sliderOpenTransition = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderOpenTransition.name = "OpenTransition";
    sliderOpenTransition.slider.expressionEnabled = true;
    sliderOpenTransition.slider.expression = 'd= effect("WipeSpeed")("Slider");\nease(time,0,0 + d,100,0);';

    var sliderCloseTransition = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderCloseTransition.name = "CloseTransition";
    sliderCloseTransition.slider.expressionEnabled = true;
    sliderCloseTransition.slider.expression = 'd= effect("WipeSpeed")("Slider");\ncompDuration = thisComp.duration;\nease(time,compDuration - d, compDuration-.05 ,0,100);';

    // padding of the blue box shape layer
    var sliderPadding = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderPadding.name = "Padding";
    sliderPadding.slider.setValue(compHeight * 0.037037);

    // spacing and style controls
    var sliderYOffset = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderYOffset.name = "Y Offset";
    sliderYOffset.slider.setValue(0);

    var sliderXSpacing = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderXSpacing.name = "xSpacing";
    sliderXSpacing.slider.setValue(0);

    var sliderYSpacing = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderYSpacing.name = "ySpacing";
    sliderYSpacing.slider.setValue(15);

    // box opacity
    var sliderBoxOpacity = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderBoxOpacity.name = "BoxOpacity";
    sliderBoxOpacity.slider.setValue(100);

    // box style
    var sliderColorStyler = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderColorStyler.name = "Color Styler";
    sliderColorStyler.slider.setValue(1);
    sliderColorStyler.slider.expressionEnabled = true;
    sliderColorStyler.slider.expression = 'Math.round(effect("Color Styler")(1).value)';

    // round corners checkbox
    var checkboxRoundCorners = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Checkbox Control');
    checkboxRoundCorners.name = "Round Corners";
    checkboxRoundCorners.checkbox.setValue(false);

    // text transparency animation checkbox
    var checkboxTextTransparencyAnimation = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Checkbox Control');
    checkboxTextTransparencyAnimation.name = "TextTransparencyAnimation";
    checkboxTextTransparencyAnimation.checkbox.setValue(false);

    return controllerNull
}