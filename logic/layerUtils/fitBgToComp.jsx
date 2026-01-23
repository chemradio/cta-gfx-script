function fitBackgroundToComp(targetLayerName, audioLayerReference, reverse) {
    var startPercentage = 120;
    var endPercentage = 100;

    var targetLayerFit = app.project.item(1).layer(findLayerIdByName(targetLayerName));
    var layerOrientation = ((targetLayerFit.width / targetLayerFit.height) > (compWidth / compHeight)) ? "horizontal" : "vertical";
    if (layerOrientation == "vertical") {
        var targetStartScale = compWidth * startPercentage / targetLayerFit.width;
        var targetEndScale = compWidth * endPercentage / targetLayerFit.width;
    } else {
        var targetStartScale = compHeight * startPercentage / targetLayerFit.height;
        var targetEndScale = compHeight * endPercentage / targetLayerFit.height;
    }

    var zoomDuration = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail + 5 : defaultCompDuration;

    if (reverse) {
        targetLayerFit.scale.setValueAtTime(0, [targetEndScale, targetEndScale, targetEndScale]);
        targetLayerFit.scale.setValueAtTime(zoomDuration, [targetStartScale, targetStartScale, targetStartScale]);
    } else {
        targetLayerFit.scale.setValueAtTime(0, [targetStartScale, targetStartScale, targetStartScale]);
        targetLayerFit.scale.setValueAtTime(zoomDuration, [targetEndScale, targetEndScale, targetEndScale]);
    }

    targetLayerFit.scale.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
}