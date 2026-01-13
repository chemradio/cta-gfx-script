function composer(parameters, uberWindow) {
    // app.beginUndoGroup("composer");

    // create progress window
    progressWindow = new Window("palette", "Progress", undefined);
    progressWindow.orientation = "column";
    progressWindow.alignChildren = "fill";
    var makingMagicText = progressWindow.add('statictext', undefined, localDict.magic);
    makingMagicText.bounds = [0, 0, 300, 20];
    progressBar = progressWindow.add('progressbar', undefined, 0, 250);
    progressBar.value = 0;
    progressStage = progressWindow.add('statictext', undefined, localDict.initProgress);
    progressWindow.show();

    // create template project
    updateProgress(localDict.initAETemplate);
    createAETemplate(parameters.fontFamily, parameters);

    app.beginSuppressDialogs();
    updateProgress(localDict.importFiles);

    // import files from PATH folder
    var files = [];
    var assetsFolder = app.project.items.addFolder("Assets");

    //import AUDIO
    updateProgress(localDict.importAudio);
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
    updateProgress(localDict.importBackground);
    importAsset(parameters.backGroundImage);
    files.push(parameters.backGroundImage);
    var splitPath = String(parameters.backGroundImage).split("/");
    var backScreen = File.decode(splitPath[splitPath.length - 1]);
    var backgroundAsset = app.project.item(findAsset(backScreen));
    backgroundAsset.parentFolder = assetsFolder;

    //import POST
    updateProgress(localDict.importForeground);
    if (parameters.isTwoLayer == true) {
        importAsset(parameters.foregroundImage);
        files.push(parameters.foregroundImage);
        var splitPath = String(parameters.foregroundImage).split("/");
        var frontScreen = File.decode(splitPath[splitPath.length - 1]);
        var foregroundAsset = app.project.item(findAsset(frontScreen));
        foregroundAsset.parentFolder = assetsFolder;
    }

    //add audiotrack
    updateProgress(localDict.audioToTimeline);
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

    addToTimeline(backPreCompName);
    rearrangeLayers(backPreCompName, "background");

    if (parameters.isTwoLayer == true) {
        switch (parameters.animationType) {
            case "instagram":
            case "twitter":
                configureEffectParameters("socialBackground", backPreCompName, undefined, audioTrackReference);
                break;
            case "facebook":
            case "photo":
            case "document":
                switch (parameters.backgroundAnimationType) {
                    case "scroll":
                        configureEffectParameters("socialBackground", backPreCompName, undefined, audioTrackReference);
                        break;
                    case "zoom":
                        configureEffectParameters("photoOrDocumentBackground", backPreCompName, undefined, audioTrackReference);
                        break;
                }
                break;
            default:
                configureEffectParameters("onlyBackground", backPreCompName, undefined, audioTrackReference);
                break;
        }
    } else {
        switch (parameters.animationType) {
            case 'zoom':
                configureEffectParameters("onlyBackgroundZoom", backPreCompName, undefined, audioTrackReference);
                break;
            case "scroll":
                configureEffectParameters("onlyBackgroundScroll", backPreCompName, undefined, audioTrackReference);
                break;
        }
    }

    //add foreground
    updateProgress(localDict.foregroundToTimeline);
    if (parameters.isTwoLayer == true && parameters.animationType != "scroll") {
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
                configureEffectParameters("socialPost", postPreCompName, postAnimationSpeed, undefined, parameters.biggerPost);
                break;
            case "instagram":
                configureEffectParameters("instagram", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
                break;
            case "twitter":
                configureEffectParameters("twitter", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
                break;
            case "document":
                configureEffectParameters("document", postPreCompName, 0, audioTrackReference, parameters.biggerPost);
                break;
            case "photo":
                configureEffectParameters("instagram", postPreCompName, postAnimationSpeed, audioTrackReference, parameters.biggerPost);
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
    updateProgress(localDict.setSlideIn);
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



function updateProgress(stage, percent) {
    progressStage.text = stage;
    if (percent != undefined) {
        var percentage = percent;
    } else {
        var percentage = 10;
    }
    progressBar.value += percentage;
    progressWindow.update();
}





function setWorkArea(isSOT, audioTrack) {
    if (isSOT == true) {
        audioLayer = app.project.item(1).layer(findLayerIdByName(audioTrack));
        app.project.item(1).workAreaDuration = 0.1 + audioLayer.outPoint - audioLayer.inPoint + defaultCompTail;
    } else {
        app.project.item(1).workAreaDuration = defaultCompDuration;
    }
}


function addRoundMask(postLayer) {
    targetLayer = app.project.item(1).layer(findLayerIdByName(postLayer));
    roundCorners = new Shape();
    ratio = 2.6
    roundness = targetLayer.width * ratio / 100;
    roundCorners.vertices = [
        [roundness, 0],
        [targetLayer.width - roundness, 0],
        [targetLayer.width, roundness],
        [targetLayer.width, targetLayer.height - roundness],
        [targetLayer.width - roundness, targetLayer.height],
        [roundness, targetLayer.height],
        [0, targetLayer.height - roundness],
        [0, roundness]
    ];
    roundCorners.inTangents = [
        [-roundness, 0],
        [0, 0],
        [0, -roundness],
        [0, 0],
        [roundness, 0],
        [0, 0],
        [0, roundness]
    ];
    roundCorners.closed = true;
    app.project.item(1).layer(findLayerIdByName(postLayer)).property('ADBE Mask Parade').addProperty("ADBE Mask Atom");
    app.project.item(1).layer(findLayerIdByName(postLayer)).property('ADBE Mask Parade').property("ADBE Mask Atom").property("ADBE Mask Shape").setValue(roundCorners);
};


function configureEffectParameters(animationType, layerName, postScrollSpeed, audioLayerReference, scaleBumper) {
    var targetLayer = app.project.item(1).layer(findLayerIdByName(layerName));
    var postZoom = (postScrollSpeed > 0 || postScrollSpeed == false) ? true : false;

    function fitImageToComp(targetLayerName, zoom, audioLayerReference, scaleBumper) {
        var targetLayerFit = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        var layerOrientation = ((targetLayerFit.width / targetLayerFit.height) > (compWidth / compHeight)) ? "horizontal" : "vertical";
        if (layerOrientation == "horizontal") {
            var startPercentage = (scaleBumper == true) ? 60 : 50;
            var endPercentage = (scaleBumper == true) ? 70 : 60;
            var targetStartScale = compWidth * startPercentage / targetLayerFit.width;
            var targetEndScale = compWidth * endPercentage / targetLayerFit.width;
        } else {
            var startPercentage = (scaleBumper == true) ? 60 : 50;
            var endPercentage = (scaleBumper == true) ? 70 : 60;
            var targetStartScale = compHeight * startPercentage / targetLayerFit.height;
            var targetEndScale = compHeight * endPercentage / targetLayerFit.height;
        }

        // slow zoom in
        var zoomDuration = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail : defaultCompDuration;
        if (zoom == true) {
            targetLayerFit.scale.setValueAtTime(0, [targetStartScale, targetStartScale, targetStartScale]);
            targetLayerFit.scale.setValueAtTime(zoomDuration, [targetEndScale, targetEndScale, targetEndScale]);
            targetLayerFit.scale.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
        } else {
            targetLayerFit.scale.setValue([targetStartScale, targetStartScale, targetStartScale]);
        }
    }

    function fitPostToComp(targetLayerName, zoom, audioLayerReference, scaleBumper) {
        var targetLayerFit = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        var layerOrientation = ((targetLayerFit.width / targetLayerFit.height) > postAspect) ? "horizontal" : "vertical";
        if (layerOrientation == "horizontal") {
            var startPercentage = (scaleBumper == true) ? 65 : 55;
            var endPercentage = (scaleBumper == true) ? 70 : 60;
            var targetStartScale = compWidth * startPercentage / targetLayerFit.width;
            var targetEndScale = compWidth * endPercentage / targetLayerFit.width;
        } else {
            var startPercentage = (scaleBumper == true) ? 80 : 70;
            var endPercentage = (scaleBumper == true) ? 90 : 80;
            var targetStartScale = compHeight * startPercentage / targetLayerFit.height;
            var targetEndScale = compHeight * endPercentage / targetLayerFit.height;
        }

        // slow zoom in
        var zoomDuration = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail : defaultCompDuration;
        if (zoom == true) {
            targetLayerFit.scale.setValueAtTime(0, [targetStartScale, targetStartScale, targetStartScale]);
            targetLayerFit.scale.setValueAtTime(zoomDuration, [targetEndScale, targetEndScale, targetEndScale]);
            targetLayerFit.scale.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
        } else {
            targetLayerFit.scale.setValue([targetStartScale, targetStartScale, targetStartScale]);
        }
    }

    function fitBackgroundToComp(targetLayerName, audioLayerReference, reverse) {
        var startPercentage = 120;
        var endPercentage = 100;

        var targetLayerFit = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        var layerOrientation = ((targetLayerFit.width / targetLayerFit.height) > (compWidth / compHeight)) ? "horizontal" : "vertical";
        if (layerOrientation == "vertical") {
            var targetStartScale = compWidth * startPercentage / targetLayerFit.width;
            var targetEndScale = compWidth * endPercentage / targetLayerFit.width;
        } else {
            var targetStartScale = compHeight * startPercentage / targetLayerFit.height;
            var targetEndScale = compHeight * endPercentage / targetLayerFit.height;
        }

        var zoomDuration = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail + 5 : defaultCompDuration;
        if (reverse) {
            targetLayerFit.scale.setValueAtTime(0, [targetEndScale, targetEndScale, targetEndScale]);
            targetLayerFit.scale.setValueAtTime(zoomDuration, [targetStartScale, targetStartScale, targetStartScale]);

        } else {
            targetLayerFit.scale.setValueAtTime(0, [targetStartScale, targetStartScale, targetStartScale]);
            targetLayerFit.scale.setValueAtTime(zoomDuration, [targetEndScale, targetEndScale, targetEndScale]);
        }

        targetLayerFit.scale.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
    }

    function documentScroll(targetLayerName, audioLayerReference) {
        var matteWidth = documentMatteWidth;
        var targetLayerScroll = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        var xTargetPixels = compWidth;
        var targetScale = xTargetPixels * 100 / targetLayerScroll.width;
        var xRealPixels = targetLayer.width * targetLayer.scale.value[0] / 100;
        targetLayerScroll.scale.setValue([targetScale, targetScale, targetScale]);
        targetLayer.trackMatteType = TrackMatteType.ALPHA;
        targetLayer.anchorPoint.setValue([0, 0]);

        if (audioLayerReference != undefined) {
            var scrollDurationReference = app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail;
            var scrollDuration = (scrollDurationReference < 14) ? 14 : scrollDurationReference;
        } else {
            var scrollDuration = defaultCompDuration;
        }

        var startXPosition = [(compWidth - matteWidth) / 2];
        var endXPosition = [(compWidth - matteWidth) / 2 * -1];

        targetLayer.position.dimensionsSeparated = true;
        targetLayer.transform.property("ADBE Position_1").setValue(0);

        var expressionX = "easeOut(time, inPoint, outPoint, (thisComp.width - " + documentMatteWidth + ") / 2, (thisComp.width - " + documentMatteWidth + ") / 2 * -1);"

        targetLayer.transform.property("ADBE Position_0").expressionEnabled = true;
        targetLayer.transform.property("ADBE Position_0").expression = expressionX;
        targetLayer.outPoint = scrollDuration;
    }

    function getOptimalBGScrollSpeed(targetLayerName, animationType, audioLayerReference) {
        var targetLayerScroll = app.project.item(1).layer(findLayerIdByName(targetLayerName));
        switch (animationType) {
            case 'onlyBackground':
                var sliderCap = 40;
                break;
            case 'socialBackground':
            default:
                var sliderCap = 20;
                break;
        }
        var targetTime = (audioLayerReference != undefined) ? app.project.item(1).layer(findLayerIdByName(audioLayerReference)).outPoint + defaultCompTail + 5 : defaultCompDuration;
        var calcSpeed = (targetLayerScroll.height * targetLayerScroll.transform.scale.value[1] / 100 - compHeight) / targetTime;
        return (calcSpeed > sliderCap) ? sliderCap : calcSpeed;
    }

    switch (animationType) {
        case "twitter":
        case "instagram":
            applyWipePreset(targetLayer, "open");
            fitPostToComp(layerName, postZoom, audioLayerReference, scaleBumper);
            break;
        case "photo":
            applyWipePreset(targetLayer, "open");
            fitImageToComp(layerName, postZoom, audioLayerReference, scaleBumper);
            break;
        case "document":
            applyWipePreset(targetLayer, "open");
            var solidMatte = app.project.item(1).layers.addSolid([1, 1, 1], "z_doc_matte_solid", documentMatteWidth, compHeight, 1, 100);
            solidMatte.enabled = false;
            solidMatte.shy = true;
            rearrangeLayers("z_doc_matte_solid", 'docMatte');
            documentScroll(layerName, audioLayerReference);
            break;
        case "photoOrDocumentBackground":
            fitBackgroundToComp(layerName, audioLayerReference);
            break;
        case "socialPost":
            applyScrollPreset(targetLayer);
            applyWipePreset(targetLayer, "open");
            if (scaleBumper == true) {
                targetLayer.scale.setValue([110, 110, 110]);
            }
            targetLayer.effect("Scroll Speed").slider.setValue(postScrollSpeed);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(false);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(true);
            targetLayer.effect("ZoomIn").checkbox.setValue(false);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            break;
        case "socialBackground":
            applyScrollPreset(targetLayer);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(true);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(false);
            targetLayer.effect("ZoomIn").checkbox.setValue(false);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.effect("Scroll Speed").slider.setValue(getOptimalBGScrollSpeed(layerName, animationType));
            targetLayer.motionBlur = false;
            break;
        case "onlyBackgroundScroll":
            app.project.item(1).layer(findLayerIdByName("Tint Wipe")).enabled = false;
            applyScrollPreset(targetLayer);
            targetLayer.effect("SlideIn").checkbox.setValue(false);
            targetLayer.effect("FitToBackground").checkbox.setValue(true);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(false);
            targetLayer.effect("ZoomIn").checkbox.setValue(true);
            targetLayer.effect("ZoomIn Amount").slider.setValue(10);
            targetLayer.effect("Scroll Speed").slider.setValue(getOptimalBGScrollSpeed(layerName, animationType));
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            break;
        case "onlyBackgroundZoom":
            app.project.item(1).layer(findLayerIdByName("Tint Wipe")).enabled = false;
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
            fitBackgroundToComp(layerName, audioLayerReference, true);
            break;
        case "compSlideIn":
            applyScrollPreset(targetLayer);
            targetLayer.effect("Scroll Speed").slider.setValue(0);
            targetLayer.effect("SlideIn").checkbox.setValue(true);
            targetLayer.effect("FitToBackground").checkbox.setValue(true);
            targetLayer.effect("FitToSocialPost").checkbox.setValue(false);
            targetLayer.effect("ZoomIn").checkbox.setValue(false);
            targetLayer.effect("ZoomIn Amount").slider.setValue(0);
            targetLayer.motionBlur = (globalMotionBlur) ? true : false;
        default:
            break;
    }
}