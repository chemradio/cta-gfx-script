function createBlueBox(fontFamily, compLength) {
    // this creates a comp with a blue quote box and text layers
    // after placing the comp to the timeline it needs to be retimed via expression
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

    // add the comp
    var blueBoxComp = app.project.items.addComp("Quote-Box", compWidth, compHeight, 1, 7, compFrameRate);
    var bbFolder = app.project.items.addFolder("Quote-Box-1");
    blueBoxComp.parentFolder = bbFolder;

    // null
    blueBoxComp.controllerNull = createControllerNull(blueBoxComp);

    // blue box shape
    blueBoxComp.blueBoxShape = createBlueBoxShape(blueBoxComp);

    blueBoxComp.commentTextBox = createCommentText(blueBoxComp);

    //name text box
    blueBoxComp.nameTextBox = createNameTextBox(blueBoxComp);

    // matte box 1
    blueBoxComp.matteBox = createMatteBox(blueBoxComp);

    blueBoxComp.openInViewer();

    try {
        app.executeCommand(app.findMenuCommandId("Close"));
    } catch (e) {
        alert("some error happened. don't pay attention");
        return blueBoxComp;
    }
    return blueBoxComp;
}