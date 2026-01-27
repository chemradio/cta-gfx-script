function configureFGAnimation(animationType, layerName, postScrollSpeed, audioLayerReference, scaleBumper) {
    var targetLayer = app.project.item(1).layer(findLayerIdByName(layerName));
    var postZoom = (postScrollSpeed > 0 || postScrollSpeed == false) ? true : false;

    switch (animationType) {
        case "fgScroll":
            applyScrollPreset(targetLayer);
            applyWipePreset(targetLayer, "open");
            if (scaleBumper == true) {
                targetLayer.scale.setValue([110, 110, 110]);
            }
            targetLayer.effect("Scroll Speed").slider.setValue(postScrollSpeed);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(false);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(true);
            targetLayer.effect("ZoomIn").checkbox.setValue(false);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            break;
        case "fgZoom":
            applyWipePreset(targetLayer, "open");
            fitPostToComp(layerName, postZoom, audioLayerReference, scaleBumper);
            break;
        case "fgDoc":
            applyWipePreset(targetLayer, "open");
            var solidMatte = app.project.item(1).layers.addSolid([1, 1, 1], "z_doc_matte_solid", documentMatteWidth, compHeight, 1, 100);
            solidMatte.enabled = false;
            solidMatte.shy = true;
            rearrangeLayers("z_doc_matte_solid", 'docMatte');
            documentScroll(layerName, audioLayerReference);
            break;
        case "photoOrDocumentBackground":
            fitBackgroundToComp(layerName, audioLayerReference);
            break;
        default:
            break;
    }
}