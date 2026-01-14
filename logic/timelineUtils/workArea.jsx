function setWorkArea(isSOT, audioTrack) {
    if (isSOT == true) {
        audioLayer = app.project.item(1).layer(findLayerIdByName(audioTrack));
        app.project.item(1).workAreaDuration = 0.1 + audioLayer.outPoint - audioLayer.inPoint + defaultCompTail;
    } else {
        app.project.item(1).workAreaDuration = defaultCompDuration;
    }
}