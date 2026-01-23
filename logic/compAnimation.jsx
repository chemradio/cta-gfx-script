function compSlideIn(compLayer) {
    applyScrollPreset(compLayer);
    compLayer.effect("Scroll Speed").slider.setValue(0);
    compLayer.effect("SlideIn").checkbox.setValue(true);
    compLayer.effect("FitToBackground").checkbox.setValue(true);
    compLayer.effect("FitToSocialPost").checkbox.setValue(false);
    compLayer.effect("ZoomIn").checkbox.setValue(false);
    compLayer.effect("ZoomIn Amount").slider.setValue(0);
    compLayer.motionBlur = (globalMotionBlur) ? true : false;
}