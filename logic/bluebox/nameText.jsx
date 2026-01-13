function createNameTextBox(blueBoxComp) {
    var nameTextBox = commentTextBox.duplicate();
    nameTextBox.name = "NameText";
    nameTextBox.moveToBeginning();
    var nameTextDocument = nameTextBox.property("ADBE Text Properties").property("ADBE Text Document").value;
    nameTextDocument.resetCharStyle();
    nameTextDocument.font = fontBold;
    nameTextDocument.fontSize = compHeight * 0.04166;
    nameTextDocument.leading = range(720, 2160, 24.7, 104.8, compHeight);
    nameTextDocument.tracking = 0;
    nameTextDocument.fillColor = [16 / 255, 44 / 255, 68 / 255];
    nameTextDocument.applyFill = true;
    nameTextDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
    nameTextBox.property("ADBE Text Properties").property("ADBE Text Document").setValue(nameTextDocument);
    nameTextBox.text.sourceText.setValue(localDict.defaultNameText.toUpperCase());

    nameTextBox.property('ADBE Effect Parade').property("ADBE Fill").color.expression = 'pool = [14, 202, 227, 0] / 255;\nmidnight = [16, 44, 68, 0] / 255;\nraspberry = [255, 0, 85, 0] / 255;\nheather = [222, 229, 236, 0] / 255;\nplum = [45, 25, 150, 0] / 255;\nwhite = [255, 255, 255, 0] / 255;\ncolor = [midnight, heather, white, midnight, white, plum];\ncolorStyler = thisComp.layer("Controller").effect("Color Styler")("Slider").value;\ncolor[colorStyler-1];';
    nameTextBox.transform.property("ADBE Position_0").expression = 'thisComp.layer("CommentText").transform.xPosition';
    nameTextBox.transform.property("ADBE Position_1").expression = 'commentHeight = thisComp.layer("CommentText").sourceRectAtTime().height;\nthisComp.layer("CommentText").transform.yPosition + commentHeight + ' + compHeight * 0.04629 + ' + thisComp.layer("Controller").effect("ySpacing")("Slider")';
    return nameTextBox;
}