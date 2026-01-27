function createAETemplate(parameters) {
    // create comp
    var renderCompOne = app.project.items.addComp("0_RENDER", parameters.compWidth, parameters.compHeight, 1, parameters.compLength, parameters.compFrameRate);
    // renderCompOne.openInViewer();

    // full dark blue background just in case
    var midnightSolid = createMidnightBg(parameters.compWidth, parameters.compHeight, parameters.compLength);

    // wiper over background for two layer animation
    var tintWipe = createMidnightWiper(midnightSolid);

    // flicker remover
    var flickerRemover = createFlickerRemover(midnightSolid);

    // vignette layer
    var vignetteOverlay = createVignette(midnightSolid, parameters.compHeight);

    tintWipe.moveToBeginning();
    flickerRemoval.moveToBeginning();

    // highlight marker shape
    var selectorLayer = createHighlighter(parameters.compWidth, parameters.compHeight);


    updateProgress('Creating Quote Box');
    var bbComp = createBlueBox(fontFamily);
    var bbLayer = renderCompOne.layers.add(bbComp);
    bbLayer.startTime = .8;
    bbLayer.timeRemapEnabled = true;
    bbLayer.property("ADBE Time Remapping").expressionEnabled = true;
    bbLayer.property("ADBE Time Remapping").expression = 'us = thisLayer;\ninP = us.inPoint;\noutP = us.outPoint;\nduration = outP - inP;\nintro = time - inP;\noutro = outP - inP;\nif (intro < 1.4) {\n    linear(intro, 0, 2, 0, 2);\n} else if (intro < outro - 1) {\n    5;\n} else {\n    linear(intro, outro - 1, outro, 6, 7)\n}';

    vignetteOverlay.moveToBeginning();

    var guideLayer = createGuideLayer(parameters.compWidth, parameters.compHeight);
}