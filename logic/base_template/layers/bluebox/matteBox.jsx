function createMatteBox(blueBoxComp) {
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
    return matteBox;
}