function configureBGAnimation(targetLayer, backgroundAnimationType, postScrollSpeed, audioLayerReference) {
    var postZoom = (postScrollSpeed > 0 || postScrollSpeed == false) ? true : false;
    switch (backgroundAnimationType) {
        case "bgScroll":
            applyScrollPreset(targetLayer);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(true);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(false);
            targetLayer.effect("ZoomIn").checkbox.setValue(false);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.effect("Scroll Speed").slider.setValue(getOptimalBGScrollSpeed(layerName, backgroundAnimationType));
            targetLayer.motionBlur = false;
            break;
        case "bgZoom":
            fitBackgroundToComp(layerName, audioLayerReference);
            break;
        case "bgOnly":
            app.project.item(1).layer(findLayerIdByName("Tint Wipe")).enabled = false;
            applyScrollPreset(targetLayer);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(true);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(false);
            targetLayer.effect("ZoomIn").checkbox.setValue(true);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.effect("Scroll Speed").slider.setValue(getOptimalBGScrollSpeed(layerName, backgroundAnimationType));
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            break;
        case "onlyBackgroundZoom":
            app.project.item(1).layer(findLayerIdByName("Tint Wipe")).enabled = false;
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            fitBackgroundToComp(layerName, audioLayerReference, true);
            break;
        case "compSlideIn":

        default:
            break;
    }
}