function documentScroll(targetLayerName, audioLayerReference) {
    var matteWidth = documentMatteWidth;
    var targetLayerScroll = app.project.item(1).layer(findLayerIdByName(targetLayerName));
    var xTargetPixels = compWidth;
    var targetScale = xTargetPixels * 100 / targetLayerScroll.width;
    var xRealPixels = targetLayer.width * targetLayer.scale.value[0] / 100;
    targetLayerScroll.scale.setValue([targetScale, targetScale, targetScale]);
    targetLayer.trackMatteType = TrackMatteType.ALPHA;
    targetLayer.anchorPoint.setValue([0, 0]);

    if (audioLayerReference != undefined) {
        var scrollDurationReference = app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail;
        var scrollDuration = (scrollDurationReference < 14) ? 14 : scrollDurationReference;
    } else {
        var scrollDuration = defaultCompDuration;
    }

    var startXPosition = [(compWidth - matteWidth) / 2];
    var endXPosition = [(compWidth - matteWidth) / 2 * -1];

    targetLayer.position.dimensionsSeparated = true;
    targetLayer.transform.property("ADBE Position_1").setValue(0);

    var expressionX = "easeOut(time, inPoint, outPoint, (thisComp.width - " + documentMatteWidth + ") / 2, (thisComp.width - " + documentMatteWidth + ") / 2 * -1);"

    targetLayer.transform.property("ADBE Position_0").expressionEnabled = true;
    targetLayer.transform.property("ADBE Position_0").expression = expressionX;
    targetLayer.outPoint = scrollDuration;
}