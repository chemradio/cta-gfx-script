
function createBlueBox(fontFamily, compLength) {
    switch (fontFamily) {
        case 'Arial':
            var fontRegular = 'ArialMT';
            var fontBold = 'Arial-BoldMT';
            break;
        case 'Times New Roman':
            var fontRegular = 'TimesNewRomanPSMT';
            var fontBold = 'TimesNewRomanPS-BoldMT';
            break;
        case 'Segoe UI':
            var fontRegular = 'SegoeUI';
            var fontBold = 'SegoeUI-Bold';
            break;
        case 'Roboto Condensed':
        default:
            var fontRegular = 'RobotoCondensed-Regular';
            var fontBold = 'RobotoCondensed-Bold';
            break;
    }

    function lerp(x, y, a) {
        return x * (1 - a) + y * a;
    }

    function clamp(a, min, max) {
        if (min) {
            var min = min;
        } else {
            var min = 0
        }
        if (max) {
            var max = max;
        } else {
            var max = 1;
        }
        return Math.min(max, Math.max(min, a));
    }

    function invlerp(x, y, a) {
        return clamp((a - x) / (y - x));
    }

    function range(x1, y1, x2, y2, a) {
        return lerp(x2, y2, invlerp(x1, y1, a));
    }

    var blueBoxComp = app.project.items.addComp("Quote-Box", compWidth, compHeight, 1, 7, compFrameRate);
    var bbFolder = app.project.items.addFolder("Quote-Box-1");
    blueBoxComp.parentFolder = bbFolder;

    updateProgress('Adding Controller Null');
    // controller Null
    var controllerNull = blueBoxComp.layers.addNull();
    controllerNull.name = "Controller";

    var sliderWipeSpeedEG = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderWipeSpeedEG.name = "Wipe Speed EG";
    sliderWipeSpeedEG.slider.setValue(70);

    var sliderWipeSpeed = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderWipeSpeed.name = "WipeSpeed";
    sliderWipeSpeed.slider.expressionEnabled = true;
    sliderWipeSpeed.slider.expression = 'effect("Wipe Speed EG")("Slider")/100';

    var sliderOpenTransition = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderOpenTransition.name = "OpenTransition";
    sliderOpenTransition.slider.expressionEnabled = true;
    sliderOpenTransition.slider.expression = 'd= effect("WipeSpeed")("Slider");\nease(time,0,0 + d,100,0);';

    var sliderCloseTransition = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderCloseTransition.name = "CloseTransition";
    sliderCloseTransition.slider.expressionEnabled = true;
    sliderCloseTransition.slider.expression = 'd= effect("WipeSpeed")("Slider");\ncompDuration = thisComp.duration;\nease(time,compDuration - d, compDuration-.05 ,0,100);';

    var sliderPadding = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderPadding.name = "Padding";
    sliderPadding.slider.setValue(compHeight * 0.037037);

    var sliderYOffset = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderYOffset.name = "Y Offset";
    sliderYOffset.slider.setValue(0);

    var sliderXSpacing = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderXSpacing.name = "xSpacing";
    sliderXSpacing.slider.setValue(0);

    var sliderYSpacing = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderYSpacing.name = "ySpacing";
    sliderYSpacing.slider.setValue(15);

    var sliderBoxOpacity = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderBoxOpacity.name = "BoxOpacity";
    sliderBoxOpacity.slider.setValue(100);

    var sliderColorStyler = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Slider Control');
    sliderColorStyler.name = "Color Styler";
    sliderColorStyler.slider.setValue(1);
    sliderColorStyler.slider.expressionEnabled = true;
    sliderColorStyler.slider.expression = 'Math.round(effect("Color Styler")(1).value)';

    var checkboxRoundCorners = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Checkbox Control');
    checkboxRoundCorners.name = "Round Corners";
    checkboxRoundCorners.checkbox.setValue(false);

    var checkboxTextTransparencyAnimation = controllerNull.property('ADBE Effect Parade').addProperty('ADBE Checkbox Control');
    checkboxTextTransparencyAnimation.name = "TextTransparencyAnimation";
    checkboxTextTransparencyAnimation.checkbox.setValue(false);

    updateProgress('Adding Blue Box Layer');
    // blue box layer
    var blueBoxLayer = blueBoxComp.layers.addShape();
    blueBoxLayer.name = "Blue Box";
    blueBoxLayer.transform.property("ADBE Anchor Point").setValue([0, 0]); // continue
    blueBoxLayer.transform.property("ADBE Position").setValue([0, 0]);
    blueBoxLayer.transform.property("ADBE Opacity").expressionEnabled = true;
    blueBoxLayer.transform.property("ADBE Opacity").expression = 'thisComp.layer("Controller").effect("BoxOpacity")("Slider")';

    var rectangleGroup = blueBoxLayer.property('ADBE Root Vectors Group').addProperty("ADBE Vector Group");
    rectangleGroup.name = "Rectangle 1";
    var rectanglePathGroup = blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
    rectanglePathGroup.property("ADBE Vector Rect Size").expressionEnabled = true;
    rectanglePathGroup.property("ADBE Vector Rect Size").expression = 't = thisComp.layer("CommentText");\nnameText = thisComp.layer("NameText");\nw = (t.sourceRectAtTime().width > nameText.sourceRectAtTime().width) ? t.sourceRectAtTime().width : nameText.sourceRectAtTime().width;\nif (thisComp.layer("NameText").text.sourceText.length < 1) {\ndivider = 0;\nspacing = 0;\n} else { \ndivider = ' + compHeight * 0.0462 + ';\nspacing = thisComp.layer("Controller").effect("ySpacing")("Slider");\n}\nh = t.sourceRectAtTime().height + nameText.sourceRectAtTime().height + spacing + divider;\n[w,h]';

    var rectangleFillGroup = blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
    rectangleFillGroup.property("ADBE Vector Fill Color").expressionEnabled = true;
    rectangleFillGroup.property("ADBE Vector Fill Color").expression = 'pool = [14, 202, 227, 0] / 255;\nmidnight = [16, 44, 68, 0] / 255;\nraspberry = [255, 0, 85, 0] / 255;\nheather = [222, 229, 236, 0] / 255;\nplum = [45, 25, 150, 0] / 255;\nwhite = [255, 255, 255, 0] / 255;\ncolor = [pool, midnight, raspberry, heather, plum, white];\ncolorStyler = thisComp.layer("Controller").effect("Color Styler")("Slider").value;\ncolor[colorStyler-1];';
    var offsetPathsGroup = blueBoxLayer.property('ADBE Root Vectors Group').addProperty("ADBE Vector Filter - Offset");
    offsetPathsGroup.property("ADBE Vector Offset Amount").expressionEnabled = true;
    offsetPathsGroup.property("ADBE Vector Offset Amount").expression = 'thisComp.layer("Controller").effect("Padding")("Slider")';
    var roundCornersGroup = blueBoxLayer.property('ADBE Root Vectors Group').addProperty("ADBE Vector Filter - RC");
    roundCornersGroup.property("ADBE Vector RoundCorner Radius").expressionEnabled = true;
    roundCornersGroup.property("ADBE Vector RoundCorner Radius").expression = 'if ( thisComp.layer("Controller").effect("Round Corners")("Checkbox") == true) {100} else {0}';

    blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vector Transform Group").property("ADBE Vector Anchor").expressionEnabled = true;
    blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vector Transform Group").property("ADBE Vector Anchor").expression = 'xSize = content("Rectangle 1").content("Rectangle Path 1").size[0];\nySize = content("Rectangle 1").content("Rectangle Path 1").size[1];\nxDivNeg = xSize/2*-1;\nyDivNeg = ySize/2*-1;\n[xDivNeg, yDivNeg]';
    blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vector Transform Group").property("ADBE Vector Position").expressionEnabled = true;
    blueBoxLayer.property('ADBE Root Vectors Group').property("Rectangle 1").property("ADBE Vector Transform Group").property("ADBE Vector Position").expression = '[ thisComp.layer("CommentText").transform.xPosition,  thisComp.layer("CommentText").transform.yPosition]';
    blueBoxLayer.selected = false;

    updateProgress('Adding Comment Text Box');
    // add comment text box
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

    updateProgress('Adding Name Text Box');
    //name text box
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

    updateProgress('Adding Matte Box');
    // matte box 1
    var matteBox = blueBoxComp.layers.addSolid([0, 0, 0], "Matte Box", compWidth, compHeight, 1, compLength);
    matteBox.enabled = true;
    matteBox.blendingMode = BlendingMode.STENCIL_ALPHA;
    matteBox.selected = true;
    var openWipe = matteBox.property('ADBE Effect Parade').addProperty("ADBE Linear Wipe");
    openWipe.name = "Open Wipe";
    openWipe.property("ADBE Linear Wipe-0002").setValue(0);
    openWipe.property("ADBE Linear Wipe-0001").expressionEnabled = true;
    openWipe.property("ADBE Linear Wipe-0001").expression = 'thisComp.layer("Controller").effect("OpenTransition")("Slider")';
    var closeWipe = matteBox.property('ADBE Effect Parade').addProperty("ADBE Linear Wipe");
    closeWipe.name = "Close Wipe";
    closeWipe.property("ADBE Linear Wipe-0002").setValue(180);
    closeWipe.property("ADBE Linear Wipe-0001").expressionEnabled = true;
    closeWipe.property("ADBE Linear Wipe-0001").expression = 'thisComp.layer("Controller").effect("CloseTransition")("Slider")';
    matteBox.transform.property("ADBE Anchor Point").setValue([0, 0]);
    matteBox.transform.property("ADBE Position").expressionEnabled = true;
    matteBox.transform.property("ADBE Position").expression = 'x = thisComp.layer("Blue Box").content("Rectangle 1").transform.position[0]-thisComp.layer("Blue Box").content("Offset Paths 1").amount;\ny = thisComp.layer("Blue Box").content("Rectangle 1").transform.position[1]-thisComp.layer("Blue Box").content("Offset Paths 1").amount;\n[0, y]';
    matteBox.transform.property("ADBE Scale").expressionEnabled = true;
    matteBox.transform.property("ADBE Scale").expression = 't = thisComp.layer("CommentText");\nw = t.sourceRectAtTime().width;\nh = t.sourceRectAtTime().height;\ntopPoint = thisComp.layer("Blue Box").content("Rectangle 1").transform.position[0]-thisComp.layer("Blue Box").content("Offset Paths 1").amount;\nbottomPoint = topPoint+thisComp.layer("Blue Box").content("Offset Paths 1").amount*2+ thisComp.layer("Blue Box").content("Rectangle 1").content("Rectangle Path 1").size[1];\nl = bottomPoint-topPoint;\nxale = l*100/thisComp.height;\n[100, xale]';
    matteBox.selected = false;
    blueBoxComp.openInViewer();
    try {
        app.executeCommand(app.findMenuCommandId("Close"));
    } catch (e) {
        alert("some error happened. don't pay attention");
        return blueBoxComp;
    }
    return blueBoxComp;
}



function setBB(nameInput, quoteInput, audioName) {
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
