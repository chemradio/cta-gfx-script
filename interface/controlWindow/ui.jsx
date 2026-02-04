function createGUI(scriptVersion, defaultButtonSize) {
    Image.prototype.onDraw = function() {
        // written by Marc Autret
        // "this" is the container; "this.image" is the graphic
        if (!this.image) return;
        var WH = this.size,
            wh = this.image.size,
            k = Math.min(WH[0] / wh[0], WH[1] / wh[1]),
            xy;
        // Resize proportionally:
        wh = [k * wh[0], k * wh[1]];
        // Center:
        xy = [(WH[0] - wh[0]) / 2, (WH[1] - wh[1]) / 2];
        this.graphics.drawImage(this.image, xy[0], xy[1], wh[0], wh[1]);
        WH = wh = xy = null;
    }


    var mainUIWindow = new Window("palette", mainDict.windowName, undefined);
    mainUIWindow.orientation = "column";
    mainUIWindow.alignChildren = ["fill", "fill"];

    var identityGroup = createTitleGroup(mainUIWindow, scriptVersion);

    var filePickerGroup = createFilePickerGroup(mainUIWindow);


    //second horizontal group for QUOTE and OUTPUT
    var uberGroup2 = mainUIWindow.add("group", undefined, "uberGroup2");
    uberGroup2.orientation = "row";
    uberGroup2.alignChildren = ["left", "fill"];
    uberGroup2.alignment = ["fill", "fill"];

    var animationOptionsGroup = createAnimationOptionsGroup(uberGroup2);

    var previewPanel = createPreviewPanel(uberGroup2);

    var quotePanel = createQuotePanel(uberGroup2);

    var outputAndButtonsGroup = createOutputAndButtonsGroup(mainUIWindow);
    // finish buttons and hidden output
    var outputAndButtonsGroup = mainUIWindow.add("group", undefined, "outputAndButtonsGroup");
    outputAndButtonsGroup.alignment = ['fill', 'fill'];

    var resolutionFpsGroup = createAnimationOptionsGroup(outputAndButtonsGroup);


    var outputGroup = outputAndButtonsGroup.add("group", undefined, "outputAndButtonsGroup");
    outputGroup.orientation = 'column';
    if (!testingScript) {
        outputGroup.visible = false;
        outputGroup.size = [0, 0];
    }

    var outputPathText = outputGroup.add("edittext", undefined, mainDict.outputPathNote, {
        readonly: "true"
    });
    var outputDescriptorText = outputGroup.add("edittext", undefined, "Name-" + generateTimeSuffix(), {
        readonly: "true"
    });
    outputPathText.characters = outputDescriptorText.characters = 60;

    var buttonsGroup = outputAndButtonsGroup.add("group", undefined, "buttonsGroup");
    buttonsGroup.alignment = ["right", "center"];
    buttonsGroup.alignChildren = ["right", "center"];

    var doItButton = buttonsGroup.add("button", undefined, mainDict.doIt);
    // doItButton.graphics.font = ScriptUI.newFont ("Verdana", "Bold", 18);
    doItButton.size = defaultButtonSize;
    doItButton.onClick = doItFunction;
    doItButton.enabled = false;

    var cancelButton = buttonsGroup.add("button", undefined, mainDict.cancel);
    cancelButton.size = defaultButtonSize;

    //events and variables
    function filterMac(theFile) {
        if (file instanceof Folder) {
            return true;
        } else {
            return theFile.name.match(/\.png$/i) != null;
        }
    }

    function showImagePreviewBox(previewImage) {
        var previewBox = new Window('dialog', 'Image Preview');
        previewBox.size = defaultPreviewBoxSize;
        var previewBoxImage = previewBox.add('image', undefined, previewImage);
        previewBoxImage.size = defaultPreviewBoxSize * .95;
        previewBox.show();
    }

    function updatePreview() {
        if (chkQuoteEnabled.value) {
            quotePreview.visible = true;
        } else {
            quotePreview.visible = false;
        }

        for (var i = 0; i < backgroundPreviewGroup.children.length; i++) {
            backgroundPreviewGroup.children[i].visible = false;
        }
        for (var i = 0; i < foregroundPreviewGroup.children.length; i++) {
            foregroundPreviewGroup.children[i].visible = false;
        }

        // experimental triggers
        quoteAuthorExPre.visible = (chkQuoteEnabled.value && quoteAuthorText.text) ? true : false;
        quoteNoAuthorExPre.visible = (chkQuoteEnabled.value && !quoteAuthorText.text) ? true : false;

        try {
            docExPre.image = (manualPostText.text && manualPostText.text.toLowerCase().indexOf('png') != -1) ? ScriptUI.newImage(File(manualPostText.text)) : docExPrePlaceholder;
            bgPre.image = (manualBGText.text && manualBGText.text.toLowerCase().indexOf('png') != -1) ? ScriptUI.newImage(File(manualBGText.text)) : fbBGExPre;
            postExPre.image = (manualPostText.text && manualPostText.text.toLowerCase().indexOf('png') != -1) ? ScriptUI.newImage(File(manualPostText.text)) : fbPostExPre;
            postExPre.visible = (!chkTypePageScroll.value && !chkTypeDOC.value && !chkTypePageZoom.value) ? true : false;
            overlayExPre.visible = (!chkTypePageScroll.value && !chkTypePageZoom.value) ? true : false;
            docExGroup.visible = (chkTypeDOC.value) ? true : false;
        } catch (e) {
            alert(e);
        }

        // bg previews update
        if (chkTypeFB.value) {
            if (chkScrollBackground.value) {
                fbBackgroundPreview.visible = true;
                if (chkRoundCorners.value) {
                    fbPostRoundPreview.visible = true;
                } else {
                    fbPostSharpPreview.visible = true;
                }
            } else {
                zoomBackgroundPreview.visible = true;
                if (chkRoundCorners.value) {
                    docFBRoundPreview.visible = true;
                } else {
                    docFBSharpPreview.visible = true;
                }
            }
        } else if (chkTypeTwitter.value) {
            twiBackgroundPreview.visible = true;
            if (chkRoundCorners.value) {
                twiPostRoundPreview.visible = true;
            } else {
                twiPostSharpPreview.visible = true;
            }
        } else if (chkTypeIG.value) {
            igBackgroundPreview.visible = true;
            if (chkRoundCorners.value) {
                igPostRoundPreview.visible = true;
            } else {
                igPostSharpPreview.visible = true;
            }
        } else if (chkTypePageScroll.value) {
            scrollPreview.visible = true;
        } else if (chkTypePageZoom.value) {
            pageZoomPreview.visible = true;
        } else {
            if (chkTypePHOTO.value) {
                if (chkRoundCorners.value) {
                    photoRoundPreview.visible = true;
                } else {
                    photoSharpPreview.visible = true;
                }
            } else if (chkTypeDOC.value) {
                docDocPreview.visible = true;
            }
            if (chkScrollBackground.value) {
                scrollBackgroundPreview.visible = true;
            } else if (chkPhotoBackground.value) {
                zoomBackgroundPreview.visible = true;
            }
        }
        mainUIWindow.update();
    }

    function panelsEnabledTrigger(state) {
        if (filesGroup.visible == true && manualBGText.text.length > 0) {
            if (manualPostText.text.length > 0) {
                var state = 'twoLayer';
            } else {
                var state = 'singleLayer';
            }
        } else {
            var state = 'zeroLayer';
        }

        switch (state) {
            case 'singleLayer':
                optionsPanel.enabled = true;
                // quotePanel.enabled = true;
                doItButton.enabled = true;
                chkTypeFB.enabled = false;
                chkTypeTwitter.enabled = false;
                chkTypeTwitter.enabled = false;
                chkTypeIG.enabled = false;
                chkTypePHOTO.enabled = false;
                chkTypeDOC.enabled = false;
                chkTypePageScroll.value = true;
                chkScrollBackground.enabled = false;
                chkPhotoBackground.enabled = false;
                chkRoundCorners.enabled = false;
                chkStaticPost.enabled = false;
                break;
            case 'twoLayer':
                optionsPanel.enabled = true;
                // quotePanel.enabled = true;
                doItButton.enabled = true;
                chkTypeFB.enabled = true;
                chkTypeTwitter.enabled = true;
                chkTypeTwitter.enabled = true;
                chkTypeIG.enabled = true;
                chkTypePHOTO.enabled = true;
                chkTypeDOC.enabled = true;
                break;
            case 'zeroLayer':
                optionsPanel.enabled = false;
                // quotePanel.enabled = false;
                doItButton.enabled = false;
                break;
        }
    }

    function pickFilesFunction() {
        sourceInitGroup.visible = false;
        filesGroup.visible = true;
        if (manualBGText.text.length > 0) {
            noPreviewPreview.visible = false;
            noPreviewExPreview.visible = false;
        }
        panelsEnabledTrigger();
    }






    function doItFunction() {
        // try{experimentalPreviewBox(File(manualBGText.text));}catch(e){alert(e)}
        // return false;

        function getAppVersion() {
            switch (app.version.split(".")[0]) {
                case "14":
                    return 2017;
                case "15":
                    return 2018;
                case "16":
                    return 2019;
                case "17":
                    return 2020;
                case "18":
                    return 2021;
                default:
                    // alert(localDict.unsupportedCCVersion);
                    mainUIWindow.close();
                    return false;
            }
        }

        animationParams.backGroundImage = File(manualBGText.text);
        animationParams.foregroundImage = (manualPostText.text.length > 0) ? File(manualPostText.text) : undefined;
        animationParams.isTwoLayer = (animationParams.foregroundImage != undefined) ? true : false;
        animationParams.audioFile = (manualAudioText.text.length > 0) ? File(manualAudioText.text) : undefined;
        animationParams.hasAudio = (animationParams.audioFile != undefined) ? true : false;
        animationParams.roundCorners = chkRoundCorners.value;
        animationParams.biggerPost = chkBiggerPost.value;
        animationParams.staticPost = chkStaticPost.value;
        animationParams.compSlideIn = chkSlideInComp.value;
        animationParams.quoteEnabled = chkQuoteEnabled.value;
        animationParams.quoteAuthor = quoteAuthorText.text;
        animationParams.quoteText = quoteTextText.text;
        animationParams.saveProject = chkSaveProjectManual.value;
        animationParams.outputPath = outputPathText.text;
        animationParams.descriptor = outputDescriptorText.text;
        animationParams.ccVersion = getAppVersion();
        animationParams.fontFamily = fontSelector.selection.text;
        animationParams.fastMode = chkFastMode.value;

        //determine animation type
        if (chkTypeFB.value) {
            animationParams.animationType = 'facebook';
        } else if (chkTypeIG.value) {
            animationParams.animationType = 'instagram';
        } else if (chkTypeDOC.value) {
            animationParams.animationType = 'document';
        } else if (chkTypePHOTO.value) {
            animationParams.animationType = 'photo';
        } else if (chkTypePageScroll.value) {
            animationParams.animationType = 'scroll';
            animationParams.isTwoLayer = false;
        } else if (chkTypeTwitter.value) {
            animationParams.animationType = 'twitter';
        } else if (chkTypePageZoom.value) {
            animationParams.animationType = 'zoom';
            animationParams.isTwoLayer = false;
        }

        if (chkPhotoBackground.value) {
            animationParams.backgroundAnimationType = "zoom";
        } else {
            animationParams.backgroundAnimationType = "scroll";
        }

        if (radioRes720p.value) {
            animationParams.resolution = [1280, 720];
        } else if (radioRes1080p.value) {
            animationParams.resolution = [1920, 1080];
        } else if (radioRes4k.value) {
            animationParams.resolution = [3840, 2160];
        }

        if (radio24fps.value) {
            animationParams.frameRate, compFrameRate = 23.976;
        } else if (radio25fps.value) {
            animationParams.frameRate, compFrameRate = 25;
        } else if (radio30fps.value) {
            animationParams.frameRate, compFrameRate = 30;
        }

        compWidth = animationParams.resolution[0];
        compHeight = animationParams.resolution[1];
        // compFrameRate = animationParams.frameRate;

        animationParams.typeFB = chkTypeFB.value;
        animationParams.typeIG = chkTypeIG.value;
        animationParams.typeDOC = chkTypeDOC.value;
        animationParams.typePHOTO = chkTypePHOTO.value;

        animationParams.motionBlur = chkMotionBlur.value;
        globalMotionBlur = chkMotionBlur.value;
        $.writeln(animationParams.toSource());
        mainUIWindow.hide();

        // return;
        try {
            composer(animationParams, mainUIWindow);
        } catch (errorMessage) {
            alert("Main script failed" + "\n\n" + errorMessage + "\n\nPlease send this report to the script author");
            return false;
        }
    }

    cancelButton.onClick = function() {
        mainUIWindow.close();
        return false;
    }

    mainUIWindow.center();
    mainUIWindow.show();
    // return false;
}