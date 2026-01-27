function populateBlueBox(nameInput, quoteInput, audioName, blueBoxComp, blueBoxLayer) {
    if (audioName) {
        quoteOutPoint = app.project.item(1).layer(findLayerIdByName(audioName)).outPoint;
    } else {
        quoteOutPoint = app.project.item(1).duration;
    }

    // bbLayer = app.project.item(1).layer(findLayerIdByName("Quote-Box"));
    // bbLayer.outPoint = quoteOutPoint;
    blueBoxLayer.outPoint = quoteOutPoint;

    nameLayerText = blueBoxComp.nameTextBox.text.sourceText;
    nameLayerText.setValue(nameInput.toUpperCase());
    quoteLayerText = blueBoxComp.commentTextBox.text.sourceText;
    quoteLayerText.setValue(quoteInput);
}