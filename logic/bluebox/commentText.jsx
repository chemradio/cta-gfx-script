function createCommentText(blueBoxComp) {
    var commentTextBox = blueBoxComp.layers.addBoxText([compWidth * 0.8489, compHeight]);
    commentTextBox.name = "CommentText";
    var commentTextDocument = commentTextBox.property("ADBE Text Properties").property("ADBE Text Document").value;
    commentTextDocument.resetCharStyle();
    commentTextDocument.font = fontRegular;
    commentTextDocument.fontSize = compHeight * 0.04166;
    commentTextDocument.leading = range(720, 2160, 24.7, 104.8, compHeight);
    commentTextDocument.tracking = 0;
    commentTextDocument.fillColor = [16 / 255, 44 / 255, 68 / 255];
    commentTextDocument.applyFill = true;
    commentTextDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
    commentTextBox.property("ADBE Text Properties").property("ADBE Text Document").setValue(commentTextDocument);
    commentTextBox.text.sourceText.setValue(localDict.defaultCommentText);

    var commentTextProperty = commentTextBox.property("ADBE Text Properties");
    var commentTextAnimator1 = commentTextProperty.property("ADBE Text Animators").addProperty("ADBE Text Animator");
    var animator1selector = commentTextAnimator1.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    var animator1effect = commentTextAnimator1.property("ADBE Text Animator Properties").addProperty("ADBE Text Line Spacing");
    animator1effect.expressionEnabled = true;
    animator1effect.expression = 'xSpacer = thisComp.layer("Controller").effect("xSpacing")("Slider");\nySpacer = thisComp.layer("Controller").effect("ySpacing")("Slider");\n[xSpacer, ySpacer]';
    var commentTextAnimator2 = commentTextProperty.property("ADBE Text Animators").addProperty("ADBE Text Animator");
    var animator2selector = commentTextAnimator2.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    animator2selector.offset.expressionEnabled = true;
    animator2selector.offset.expression = 'd= thisComp.layer("Controller").effect("WipeSpeed")("Slider");\nease(time,0+ d/8,0 + d*2,-100,100);';
    var animator2effect = commentTextAnimator2.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");
    animator2effect.expressionEnabled = true;
    animator2effect.expression = 'if (thisComp.layer("Controller").effect("TextTransparencyAnimation")("Checkbox").value == true) {0} else {100}';
    animator2selector.property("ADBE Text Range Advanced").property("ADBE Text Range Shape").setValue(2);

    var commentFillEffect = commentTextBox.property('ADBE Effect Parade').addProperty("ADBE Fill");
    commentFillEffect.color.expressionEnabled = true;
    commentFillEffect.color.expression = 'thisComp.layer("NameText").effect("Fill")("Color")';

    commentTextBox.position.dimensionsSeparated = true;
    commentTextBox.transform.property("ADBE Position_0").expressionEnabled = true;
    commentTextBox.transform.property("ADBE Position_0").expression = 'comparator = (thisComp.layer("CommentText").sourceRectAtTime().width > thisComp.layer("NameText").sourceRectAtTime().width) ? thisComp.layer("CommentText").sourceRectAtTime().width : thisComp.layer("NameText").sourceRectAtTime().width;\n(' + compWidth + '-comparator)/2;';
    commentTextBox.transform.property("ADBE Position_1").expressionEnabled = true;
    commentTextBox.transform.property("ADBE Position_1").expression = 'h = thisLayer.sourceRectAtTime().height + thisComp.layer("NameText").sourceRectAtTime().height + ' + compHeight * 0.0388 + ';\nd = thisComp.height-h;\noffset = thisComp.layer("Controller").effect("Y Offset")("Slider");\nd/2+offset';
    commentTextBox.transform.property("ADBE Anchor Point").setValue([-compWidth * 0.8489 / 2, -compHeight / 2]);

    return commentTextBox;
}