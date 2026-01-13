function populateBlueBox(nameInput, quoteInput, audioName) {
    if (audioName) {
        quoteOutPoint = app.project.item(1).layer(findLayerIdByName(audioName)).outPoint;
    } else {
        quoteOutPoint = app.project.item(1).duration;
    }

    bbLayer = app.project.item(1).layer(findLayerIdByName("Quote-Box"));
    bbLayer.outPoint = quoteOutPoint;

    nameLayerText = app.project.item(findAsset("Quote-Box")).layer(2).text.sourceText;
    nameLayerText.setValue(nameInput.toUpperCase());
    quoteLayerText = app.project.item(findAsset("Quote-Box")).layer(3).text.sourceText;
    quoteLayerText.setValue(quoteInput);
}