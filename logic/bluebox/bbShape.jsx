function createBlueBoxShape(blueBoxComp) {
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

    return blueBoxLayer;
}