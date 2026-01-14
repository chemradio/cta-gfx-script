    function fitPostToComp(targetLayerName, zoom, audioLayerReference, scaleBumper) {
        var targetLayerFit = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        var layerOrientation = ((targetLayerFit.width / targetLayerFit.height) > postAspect) ? "horizontal" : "vertical";
        if (layerOrientation == "horizontal") {
            var startPercentage = (scaleBumper == true) ? 65 : 55;
            var endPercentage = (scaleBumper == true) ? 70 : 60;
            var targetStartScale = compWidth * startPercentage / targetLayerFit.width;
            var targetEndScale = compWidth * endPercentage / targetLayerFit.width;
        } else {
            var startPercentage = (scaleBumper == true) ? 80 : 70;
            var endPercentage = (scaleBumper == true) ? 90 : 80;
            var targetStartScale = compHeight * startPercentage / targetLayerFit.height;
            var targetEndScale = compHeight * endPercentage / targetLayerFit.height;
        }

        // slow zoom in
        var zoomDuration = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail : defaultCompDuration;
        if (zoom == true) {
            targetLayerFit.scale.setValueAtTime(0, [targetStartScale, targetStartScale, targetStartScale]);
            targetLayerFit.scale.setValueAtTime(zoomDuration, [targetEndScale, targetEndScale, targetEndScale]);
            targetLayerFit.scale.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
        } else {
            targetLayerFit.scale.setValue([targetStartScale, targetStartScale, targetStartScale]);
        }
    }