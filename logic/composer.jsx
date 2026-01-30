function composer(parameters, uberWindow) {
    // app.beginUndoGroup("composer");

    // create progress window
    progressWindow = createProgressWindow(250, localDict.magic, localDict.initProgress);
    // progressWindow.show();

    app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
    // check if project is open and CLOSE it without changes
    if (app.project != undefined) {
        app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
    }

    // create template project
    createAETemplate(parameters.fontFamily, parameters);


    app.beginSuppressDialogs();

    // import files from PATH folder
    var files = [];
    var assetsFolder = app.project.items.addFolder("Assets");

    //import AUDIO
    if (parameters.hasAudio == true) {
        importAsset(parameters.audioFile);
        files.push(parameters.audioFile);
        $.write(parameters.audioFile);
        $.write(typeof parameters.audioFile);
        var splitPath = String(parameters.audioFile).split("/");
        var audioTrack = File.decode(splitPath[splitPath.length - 1]);
        var audioAsset = app.project.item(findAsset(audioTrack));
        if (audioAsset.duration > 40) {
            alert(localDict.audioFileTooLong);
            progressWindow.close();
            app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
            uberWindow.show();
            return false;
        }
        audioAsset.parentFolder = assetsFolder;
    }
    var audioTrackReference = (parameters.hasAudio == true) ? audioTrack : undefined;

    //import BG
    importAsset(parameters.backGroundImage);
    files.push(parameters.backGroundImage);
    var splitPath = String(parameters.backGroundImage).split("/");
    var backScreen = File.decode(splitPath[splitPath.length - 1]);
    var backgroundAsset = app.project.item(findAsset(backScreen));
    backgroundAsset.parentFolder = assetsFolder;

    //import POST
    if (parameters.isTwoLayer == true) {
        importAsset(parameters.foregroundImage);
        files.push(parameters.foregroundImage);
        var splitPath = String(parameters.foregroundImage).split("/");
        var frontScreen = File.decode(splitPath[splitPath.length - 1]);
        var foregroundAsset = app.project.item(findAsset(frontScreen));
        foregroundAsset.parentFolder = assetsFolder;
    }

    //add audiotrack
    if (parameters.hasAudio == true) {
        addToTimeline(audioTrack);
        app.project.item(1).layer(findLayerIdByName(audioTrack)).startTime = 0.1;
    }

    // add background
    updateProgress(localDict.backgroundToTimeline);
    var backgroundFile = app.project.item(findAsset(backScreen));
    var backPreCompName = "pc" + backScreen;
    var backPreComp = app.project.items.addComp(backPreCompName, backgroundFile.width, backgroundFile.height, 1, 100, compFrameRate);
    app.project.item(findAsset(backPreCompName)).parentFolder = app.project.item(findAsset("Assets"));
    backPreComp.layers.addSolid([1, 1, 1], "z_white_solid_bg", backgroundFile.width, backgroundFile.height, 1, 100);
    backPreComp.layers.add(backgroundFile);

    var bgLayer = addToTimeline(backPreCompName);
    rearrangeLayers(backPreCompName, "background");
    configureBGAnimation(bgLayer, parameters.backgroundAnimationType, undefined, audioTrackReference);


    //add foreground
    updateProgress(localDict.foregroundToTimeline);
    if (parameters.isTwoLayer) {
        //create precomp for foreground post and add it to Assets folder in project
        foregroundPost = app.project.item(findAsset(frontScreen));
        postPreCompName = "pc" + frontScreen;
        postPreComp = app.project.items.addComp(postPreCompName, foregroundPost.width, foregroundPost.height, 1, 100, compFrameRate);
        app.project.item(findAsset(postPreCompName)).parentFolder = app.project.item(findAsset("Assets"));
        var whiteBG = postPreComp.layers.addSolid([1, 1, 1], "z_white_solid_fg", foregroundPost.width, foregroundPost.height, 1, 100);
        whiteBG.collapseTransformation = true;
        var fgPost = postPreComp.layers.add(foregroundPost);
        if (fgPost.canSetCollapseTransformation == true) {
            fgPost.collapseTransformation = true;
        }

        // add it to timeline
        addToTimeline(postPreCompName);
        rearrangeLayers(postPreCompName, "foreground");
        switch (parameters.animationType) {
            // in case of ig twi or photo do not add collapse transformations for linear open wipe to work properly
            case "instagram":
            case "twitter":
            case "photo":
                // pass
                break;
            default:
                app.project.item(1).layer(findLayerIdByName(postPreCompName)).collapseTransformation = true;
        }

        // configure foreground effects
        var postAnimationSpeed = (parameters.staticPost == true) ? 0 : 5;
        switch (parameters.animationType) {
            case "facebook":
                configureFGAnimation("socialPost", postPreCompName, postAnimationSpeed, undefined, parameters.biggerPost);
                break;
            case "instagram":
                configureFGAnimation("instagram", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
                break;
            case "twitter":
                configureFGAnimation("twitter", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
                break;
            case "document":
                configureFGAnimation("document", postPreCompName, 0, audioTrackReference, parameters.biggerPost);
                break;
            case "photo":
                configureFGAnimation("instagram", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
                break;
            default:
                break;
        }

        //add round corners mask
        if (parameters.roundCorners == true) {
            addRoundMask(postPreCompName);
        }
    }

    //set Quote
    updateProgress(localDict.setQuote);
    if (parameters.quoteEnabled) {
        app.project.item(1).layer(findLayerIdByName("Quote-Box")).enabled = true;
        populateBlueBox(
            editText(insertUnbreakableSpaces(parameters.quoteAuthor)),
            editText(insertUnbreakableSpaces(parameters.quoteText)),
            audioTrack
        );
    } else {
        app.project.item(1).layer(findLayerIdByName("Quote-Box")).enabled = false;
        app.project.item(1).layer(findLayerIdByName("Quote-Box")).shy = true;
    }

    //set work area
    updateProgress(localDict.setWorkArea);
    setWorkArea(parameters.hasAudio, audioTrack);

    // hide shy layers
    app.project.item(1).hideShyLayers = true;
    app.project.item(findAsset("0_RENDER")).motionBlur = (globalMotionBlur) ? true : false;

    // if full comp should slide in
    if (parameters.compSlideIn == true) {
        oldRenderComp = app.project.item(findAsset("0_RENDER"));
        oldRenderComp.parentFolder = app.project.item(findAsset("Assets"));
        newRenderComp = app.project.items.addComp("00_RENDER", compWidth, compHeight, 1, 100, compFrameRate);
        newRenderComp.layers.add(oldRenderComp);
        configureEffectParameters("compSlideIn", "0_RENDER");
        newRenderComp.motionBlur = (globalMotionBlur) ? true : false;
        newRenderComp.layer(1).timeRemapEnabled = true;
        newRenderComp.layer(1).property("ADBE Time Remapping").expressionEnabled = true;
        slideOffsetExpression = "thisLayer.effect('Incoming').slider.key(2).time";
        slideOffset = newRenderComp.layer(1).effect("Incoming").slider.keyTime(2);
        newRenderComp.layer(1).property("ADBE Time Remapping").expression = "if (time < " + slideOffsetExpression + ") {0} else {time - " + slideOffsetExpression + "}";
        newRenderComp.workAreaDuration = slideOffset + oldRenderComp.workAreaDuration;
        newRenderComp.openInViewer();
        var outputComp = newRenderComp;
    } else {
        app.project.item(findAsset("0_RENDER")).openInViewer();
        var outputComp = app.project.item(findAsset("0_RENDER"));
    }

    //save project
    updateProgress(localDict.saveProjectIfNeeded);
    if (parameters.saveProject == true) {
        app.project.save(File(parameters.outputPath + "/" + parameters.descriptor + '.aep'));
    }

    // clearAERenderQueue();
    progressWindow.close();
    app.purge(PurgeTarget.ALL_CACHES);
    app.purge(PurgeTarget.UNDO_CACHES);
    app.endSuppressDialogs(true);
    // uberWindow.show();
    return false;
}