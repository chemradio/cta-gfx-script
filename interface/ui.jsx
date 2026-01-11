function createGUI(app, mainDict, altDict, scriptVersion, defaultButtonSize) {
    Image.prototype.onDraw = function () {
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

    // title
    var identityGroup = mainUIWindow.add("group", undefined, "identityGroup");
    identityGroup.alignChildren = ['fill', 'fill'];

    var leftIDGroup = identityGroup.add('group', undefined, 'leftIDGroup');
    leftIDGroup.alignChildren = ['left', 'center'];
    leftIDGroup.orientation = 'column';

    var idText = leftIDGroup.add('statictext', undefined, 'CTA GFX Automator v' + scriptVersion);
    idText.alignment = ['left', 'center'];

    var helpButton = leftIDGroup.add('button', undefined, mainDict.helpButton);
    helpButton.onClick = function () {
        alert(mainDict.helpDescription);
    }

    var rightIDGroup = identityGroup.add('group', undefined, 'rightIDGroup');
    rightIDGroup.alignment = ['right', 'center'];
    rightIDGroup.alignChildren = ['right', 'fill'];
    rightIDGroup.orientation = 'column';

    rightIDGroup.add('statictext', undefined, mainDict.translateLabel);
    var translateButton = rightIDGroup.add('button', undefined, mainDict.translateButton);
    translateButton.onClick = function () {
        mainUIWindow.close();
        createGUI(app, altDict, mainDict, scriptVersion);
    }

    // first horizontal group for SRC FILES and OPTIONS
    var uberGroup1 = mainUIWindow.add("group", undefined, "uberGroup1");
    uberGroup1.orientation = "row";
    uberGroup1.alignment = ["fill", "fill"];
    uberGroup1.alignChildren = ["fill", "fill"];

    //panel for SRC FILES
    var sourcePanel = uberGroup1.add("panel", undefined, mainDict.sourceFiles);
    sourcePanel.orientation = "stack";
    sourcePanel.alignChildren = ["fill", "fill"];

    var sourceInitGroup = sourcePanel.add('group', undefined, 'sourceInitGroup');
    sourceInitGroup.alignChildren = ['center', 'center'];
    sourceInitGroup.visible = true;

    var browseFolderButton = sourceInitGroup.add('button', undefined, mainDict.pickAFolderLabel);
    browseFolderButton.size = defaultButtonSize;
    browseFolderButton.onClick = pickAFolderFunction;

    var orNote = sourceInitGroup.add('statictext', undefined, mainDict.orLabel);

    var browseFilesButton = sourceInitGroup.add('button', undefined, mainDict.pickFilesLabel);
    browseFilesButton.size = defaultButtonSize;
    browseFilesButton.onClick = pickFilesFunction;



    var filesGroup = sourcePanel.add("group", undefined, "manualTabGroup");
    filesGroup.visible = false;
    filesGroup.orientation = "row";
    filesGroup.alignChildren = ["fill", "fill"];

    var filesGroupLeftGroup = filesGroup.add('group', undefined, 'filesGroupLeftGroup');
    filesGroupLeftGroup.orientation = 'column';
    filesGroupLeftGroup.alignChildren = ['left', 'top'];
    filesGroupLeftGroup.margins = [20, 0, 20, 0];

    var backToPickerButton = filesGroupLeftGroup.add('button', undefined, mainDict.backButton);
    backToPickerButton.onClick = function () {
        sourceInitGroup.visible = true;
        filesGroup.visible = false;
        panelsEnabledTrigger('zeroLayer');
        noPreviewPreview.visible = true;
    }

    var filesGroupCenterGroup = filesGroup.add('group', undefined, 'filesGroupCenterGroup');
    filesGroupCenterGroup.orientation = 'column';
    filesGroupCenterGroup.alignChildren = ['right', 'fill'];

    var manualBGGroup = filesGroupCenterGroup.add("group", undefined, "manualTabBGGroup");
    manualBGGroup.orientation = "row";

    var manualBGLabel = manualBGGroup.add("statictext", undefined, mainDict.manualBGPath);
    var manualBGText = manualBGGroup.add("edittext", undefined, undefined, { readonly: true });
    manualBGText.characters = defaultPathCharacters;
    manualBGText.onChange = function () {
        if (manualBGText.text.length > 0) {
            outputPathText.text = manualBGText.text;
            manualPostText.enabled = true;
            manualPostBrowser.enabled = true;
            manualAudioText.enabled = true;
            manualAudioBrowser.enabled = true;
            if (manualPostText.text.length > 0) {
                swapFilesButton.enabled = true;
            } else {
                swapFilesButton.enabled = false;
            }
        } else {
            manualPostText.enabled = false;
            manualPostBrowser.enabled = false;
            manualAudioText.enabled = false;
            manualAudioBrowser.enabled = false;
            swapFilesButton.enabled = false;
        }
    }
    var manualBGBrowser = manualBGGroup.add("button", undefined, mainDict.browse);
    manualBGBrowser.onChange = function () {
        alert('changed' + this);
    }
    manualBGBrowser.onClick = function () {
        var targetPath = File.openDialog(mainDict.selectBGImage, "All files:*.png;*.jpg;*.jpeg;*.pdf");

        if (targetPath != null) {
            manualBGText.text = targetPath;
            outputPathText.text = targetPath.path;
            outputDescriptorText.text = targetPath.parent.name + "-GFX-" + generateTimeSuffix();
            manualPostText.enabled = true;
            // manualPostBrowser.enabled = true;
            manualAudioText.enabled = true;
            // manualAudioBrowser.enabled = true;
            doItButton.enabled = true;
            noPreviewPreview.visible = false;
            noPreviewExPreview.visible = false;
            manualBGPreview.enabled = true;
            manualBGClear.enabled = true;
            if (manualPostText.text.length > 0) {
                swapFilesButton.enabled = true;
            } else {
                swapFilesButton.enabled = false;
            }
            updatePreview();
        } else if (manualBGText.text && manualBGText.text != null) {
            outputPathText.text = targetPath.path;
            outputDescriptorText.text = targetPath.parent.name + "-GFX-" + generateTimeSuffix();
            manualPostText.enabled = true;
            // manualPostBrowser.enabled = true;
            manualAudioText.enabled = true;
            // manualAudioBrowser.enabled = true;
            doItButton.enabled = true;
            noPreviewPreview.visible = false;
            noPreviewExPreview.visible = false;
            manualBGPreview.enabled = true;
            manualBGClear.enabled = true;
            if (manualPostText.text.length > 0) {
                swapFilesButton.enabled = true;
            } else {
                swapFilesButton.enabled = false;
            }
            updatePreview();
        } else {
            manualPostText.enabled = false;
            // manualPostBrowser.enabled = false;
            manualAudioText.enabled = false;
            // manualAudioBrowser.enabled = false;
            swapFilesButton.enabled = false;
            doItButton.enabled = false;
            noPreviewPreview.visible = true;
            noPreviewExPreview.visible = true;
            manualBGPreview.enabled = false;
            manualBGClear.enabled = false;
        }

        panelsEnabledTrigger();
        updatePreview();
    }
    var manualBGPreview = manualBGGroup.add("button", undefined, 'Preview');
    manualBGPreview.enabled = false;
    manualBGPreview.onClick = function () {
        // showImagePreviewBox(File(manualBGText.text));
        File(manualBGText.text).execute();
    }

    var manualBGClear = manualBGGroup.add("button", undefined, mainDict.clearButtonLabel);
    // manualBGClear.visible = false;
    manualBGClear.enabled = false;
    manualBGClear.onClick = function () {
        manualBGText.text = '';
        doItButton.enabled = false;
        manualBGPreview.enabled = false;
        manualBGClear.enabled = false;
        panelsEnabledTrigger();
        updatePreview();
    }


    // var swapFilesButton = filesGroupCenterGroup.add('image', undefined, swapIcon);
    // swapFilesButton.addEventListener('click', swapBgFg)
    var swapFilesButton = filesGroupCenterGroup.add('button', undefined, mainDict.swapLabel);
    swapFilesButton.alignment = 'center';
    swapFilesButton.enabled = false;
    swapFilesButton.onClick = swapBgFg;

    function swapBgFg() {
        if (manualPostText.enabled == true && manualPostText.text.length > 0) {
            var tempBGText = manualBGText.text;
            manualBGText.text = manualPostText.text;
            manualPostText.text = tempBGText;
            updatePreview();
        }
    }

    var manualTabPostGroup = filesGroupCenterGroup.add("group", undefined, "manualTabPaths");
    manualTabPostGroup.orientation = "row";
    manualTabPostGroup.alignment = "right";

    var manualPostLabel = manualTabPostGroup.add("statictext", undefined, mainDict.manualPostPath);
    // manualPostLabel.characters = defaultDummyCharacters;
    var manualPostText = manualTabPostGroup.add("edittext", undefined, undefined, { readonly: true });
    manualPostText.characters = defaultPathCharacters;
    manualPostText.enabled = false;
    var manualPostBrowser = manualTabPostGroup.add("button", undefined, mainDict.browse);
    // manualPostBrowser.enabled = false;
    manualPostBrowser.onClick = function () {
        targetPath = File.openDialog(mainDict.selectPostPath, "All files:*.png;*.jpg;*.jpeg;*.pdf");
        if (targetPath != null) {
            manualPostText.text = targetPath.fsName;
            swapFilesButton.enabled = true;
            manualPostPreview.enabled = true;
            manualPostClear.enabled = true;
            if (chkTypePageScroll.value) {
                chkTypePageScroll.value = false;
                chkTypeFB.value = true;
            }
        } else {
            manualPostPreview.enabled = false;
            manualPostClear.enabled = false;
            swapFilesButton.enabled = false;
            manualPostText.text = '';
        }
        panelsEnabledTrigger();
        updatePreview();
    }

    var manualPostPreview = manualTabPostGroup.add("button", undefined, 'Preview');
    manualPostPreview.enabled = false;
    manualPostPreview.onClick = function () {
        // showImagePreviewBox(File(manualPostText.text));
        File(manualPostText.text).execute();
    }

    var manualPostClear = manualTabPostGroup.add("button", undefined, mainDict.clearButtonLabel);
    manualPostClear.enabled = false;
    manualPostClear.onClick = function () {
        manualPostText.text = '';
        swapFilesButton.enabled = false;
        manualPostPreview.enabled = false;
        manualPostClear.enabled = false;
        panelsEnabledTrigger();
        updatePreview();
    }

    var manualTabAudioGroup = filesGroupCenterGroup.add("group", undefined, "manualTabBrowsers");
    manualTabAudioGroup.orientation = "row";
    manualTabAudioGroup.alignment = "right";
    var manualAudioLabel = manualTabAudioGroup.add("statictext", undefined, mainDict.audioFilePath);
    // manualAudioLabel.characters = defaultDummyCharacters;
    var manualAudioText = manualTabAudioGroup.add("edittext", undefined, undefined, { readonly: true });
    manualAudioText.characters = defaultPathCharacters;
    manualAudioText.enabled = false;
    var manualAudioBrowser = manualTabAudioGroup.add("button", undefined, mainDict.browse);
    // manualAudioBrowser.enabled = false;
    manualAudioBrowser.onClick = function () {
        targetPath = File.openDialog(mainDict.selectAudioPath, "All files:*.wav;*.mp3");
        if (targetPath != null) {
            manualAudioText.text = targetPath.fsName;
            manualAudioClear.enabled = true;
            manualAudioPreview.enabled = true;
        } else {
            manualAudioText.text = '';
            manualAudioClear.enabled = false;
            manualAudioPreview.enabled = false;
        }
        panelsEnabledTrigger();
    }

    var manualAudioPreview = manualTabAudioGroup.add("button", undefined, 'Preview');
    manualAudioPreview.enabled = false;
    manualAudioPreview.onClick = function () {
        File(manualAudioText.text).execute();
        // alert("work in progress");
    }

    var manualAudioClear = manualTabAudioGroup.add("button", undefined, mainDict.clearButtonLabel);
    manualAudioClear.enabled = false;
    manualAudioClear.onClick = function () {
        manualAudioPreview.enabled = false;
        manualAudioClear.enabled = false;
        manualAudioText.text = '';
        panelsEnabledTrigger();
    }

    var chkSaveProjectManual = filesGroupCenterGroup.add("checkbox", undefined, mainDict.saveProjectManualPath);
    chkSaveProjectManual.alignment = ['left', 'bottom'];
    chkSaveProjectManual.value = (testingScript) ? false : true;

    var filesGroupRightGroup = filesGroup.add('group', undefined, 'filesGroupRightGroup');
    filesGroupRightGroup.orientation = ['fill', 'fill'];




    //second horizontal group for QUOTE and OUTPUT
    var uberGroup2 = mainUIWindow.add("group", undefined, "uberGroup2");
    uberGroup2.orientation = "row";
    uberGroup2.alignChildren = ["left", "fill"];
    uberGroup2.alignment = ["fill", "fill"];

    //options panel
    var optionsPanel = uberGroup2.add("panel", undefined, mainDict.options);
    optionsPanel.enabled = false;
    optionsPanel.orientation = "column";
    optionsPanel.alignChildren = ["fill", "fill"];
    optionsPanel.alignment = ['fill', 'fill'];

    var optionsRowOne = optionsPanel.add('group', undefined, 'optionsRowOne');
    optionsRowOne.orientation = 'row';

    var primarySettings = optionsRowOne.add('group', undefined, 'primarySettings');
    primarySettings.orientation = "column";
    primarySettings.alignChildren = ["left", 'fill'];
    // primarySettings.margins = [10,0,0,0];
    var primarySettingsLabel = primarySettings.add('statictext', undefined, mainDict.animationType);

    var chkTypeFB = primarySettings.add('radiobutton', undefined, mainDict.fbType);
    chkTypeFB.value = true;
    chkTypeFB.onClick = function () {
        chkScrollBackground.enabled = true;
        chkPhotoBackground.enabled = true;
        chkScrollBackground.value = true;
        chkPhotoBackground.value = false;
        chkRoundCorners.enabled = true;
        chkRoundCorners.value = true;
        chkStaticPost.enabled = true;
        updatePreview();
    }
    var chkTypeTwitter = primarySettings.add('radiobutton', undefined, 'Twitter');
    chkTypeTwitter.onClick = function () {
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = true;
        chkRoundCorners.value = true;
        chkStaticPost.enabled = true;
        updatePreview();
    }
    var chkTypeIG = primarySettings.add('radiobutton', undefined, 'Instagram');
    chkTypeIG.onClick = function () {
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = true;
        chkRoundCorners.value = true;
        chkStaticPost.enabled = true;
        updatePreview();
    }
    var chkTypePHOTO = primarySettings.add('radiobutton', undefined, mainDict.photoType);
    chkTypePHOTO.onClick = function () {
        chkScrollBackground.enabled = true;
        chkPhotoBackground.enabled = true;
        chkRoundCorners.enabled = false;
        chkRoundCorners.enabled = true;
        chkPhotoBackground.value = true;
        chkRoundCorners.value = false;
        chkStaticPost.value = false;
        chkStaticPost.enabled = false;
        updatePreview();
    }
    var chkTypeDOC = primarySettings.add('radiobutton', undefined, mainDict.docType);
    chkTypeDOC.onClick = function () {
        chkScrollBackground.enabled = true;
        chkPhotoBackground.enabled = true;
        chkPhotoBackground.value = true;
        chkRoundCorners.enabled = false;
        chkPhotoBackground.value = true;
        chkRoundCorners.value = false;
        chkStaticPost.value = false;
        chkStaticPost.enabled = false;
        updatePreview();
    }
    var chkTypePageScroll = primarySettings.add('radiobutton', undefined, mainDict.pageScrollType);
    chkTypePageScroll.onClick = function () {
        // chkTypePageScroll.value = true;
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = false;
        chkStaticPost.value = false;
        chkStaticPost.enabled = false;
        updatePreview();
    }

    var chkTypePageZoom = primarySettings.add('radiobutton', undefined, mainDict.chkTypeZoom);
    chkTypePageZoom.onClick = function () {
        // chkTypePageZoom.value = true;
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = false;
        chkStaticPost.value = false;
        chkStaticPost.enabled = false;
        updatePreview();
    }

    var secondarySettings = optionsRowOne.add('group', undefined, 'secondarySettings');
    secondarySettings.orientation = "column";
    secondarySettings.alignChildren = ["left", 'fill'];
    var secondarySettingsLabel = secondarySettings.add('statictext', undefined, mainDict.additionalSettings);
    var chkScrollBackground = secondarySettings.add('radiobutton', undefined, mainDict.scrollingBackground);
    chkScrollBackground.value = true;
    chkScrollBackground.enabled = true;
    chkScrollBackground.onClick = function () {
        if (chkTypeFB.value == true) {
            chkRoundCorners.value = true;
        }
        updatePreview();
    }
    var chkPhotoBackground = secondarySettings.add('radiobutton', undefined, mainDict.photoZoomBackground);
    chkPhotoBackground.enabled = true;
    chkPhotoBackground.onClick = function () {
        if (chkTypeFB.value == true) {
            chkRoundCorners.value = false;
        }
        updatePreview();

    }
    var chkRoundCorners = secondarySettings.add('checkbox', undefined, mainDict.roundCorners);
    chkRoundCorners.onClick = function () {
        updatePreview();
    }
    chkRoundCorners.value = true;
    var chkSlideInComp = secondarySettings.add('checkbox', undefined, mainDict.compSlideIn);

    var chkBiggerPost = secondarySettings.add('checkbox', undefined, mainDict.biggerPost);
    chkBiggerPost.enabled = false;
    var chkStaticPost = secondarySettings.add('checkbox', undefined, mainDict.staticPost);
    chkStaticPost.enabled = true;

    var chkMotionBlur = secondarySettings.add('checkBox', undefined, 'Motion Blur');
    chkMotionBlur.value = true;

    var previewPanel = uberGroup2.add("panel", undefined, mainDict.expamplePreviewLabel);
    previewPanel.alignChildren = ['fill', 'fill'];
    previewPanel.orientation = 'column';

    var previewRadioGroup = previewPanel.add('group', undefined, 'previewRadioGroup');
    previewRadioGroup.orientation = 'row';
    previewRadioGroup.alignChildren = ['center', 'top'];

    var radioExperimental = previewRadioGroup.add('radioButton', undefined, mainDict.experimentalLabel);
    radioExperimental.value = true;
    radioExperimental.onClick = function () {
        exGroupFull.visible = true;
        examplePreviewFullGroup.visible = false;
        updatePreview();
    }
    var radioExample = previewRadioGroup.add('radioButton', undefined, mainDict.examplePreviewLabel);
    radioExample.onClick = function () {
        exGroupFull.visible = false;
        examplePreviewFullGroup.visible = true;
        updatePreview();
    }

    var previewBoxesGroup = previewPanel.add('group', undefined, 'previewBoxesGroup');
    previewBoxesGroup.orientation = 'stack';
    // previewBoxesGroup.alignChildren = ['fill','fill'];
    // previewBoxesGroup.size = [defaultExPreviewWidth,defaultExPreviewHeight];
    // previewBoxesGroup.margins = 10;
    previewBoxesGroup.visible = true;

    var exGroupFull = previewBoxesGroup.add('group', undefined, 'exGroupFull');
    exGroupFull.orientation = 'column';
    exGroupFull.alignChildren = ['center', 'center'];

    var exGroup = exGroupFull.add('group', undefined, 'exGroup');
    exGroup.orientation = 'stack';
    exGroup.size = [defaultExPreviewWidth, defaultExPreviewHeight];

    var bgPre = exGroup.add('image', undefined, fbBGExPre);
    bgPre.onDraw = function () {
        dimensionsBack = bgPre.image.size;
        if (chkTypeFB.value || chkTypePHOTO.value || chkTypeDOC.value) {
            if (chkScrollBackground.value) {
                bgPre.graphics.drawImage(bgPre.image, 0, 0, defaultExPreviewWidth, dimensionsBack[1] * (defaultExPreviewWidth / dimensionsBack[0]));
            } else if (chkPhotoBackground.value) {
                var bgExOrientation = ((dimensionsBack[0] / dimensionsBack[1]) > (defaultExPreviewWidth / defaultExPreviewHeight)) ? "horizontal" : "vertical";
                if (bgExOrientation == "horizontal") {
                    var bgSqeezeRatio = defaultExPreviewHeight / dimensionsBack[1];
                    var bgPreXOffset = (dimensionsBack[0] * bgSqeezeRatio - defaultExPreviewWidth) / 2 * -1;
                    bgPre.graphics.drawImage(bgPre.image, bgPreXOffset, 0, dimensionsBack[0] * (defaultExPreviewHeight / dimensionsBack[1]), defaultExPreviewHeight);
                } else {
                    var bgSqeezeRatio = defaultExPreviewWidth / dimensionsBack[0];
                    var bgPreYOffset = (dimensionsBack[1] * bgSqeezeRatio - defaultExPreviewHeight) / 2 * -1;
                    bgPre.graphics.drawImage(bgPre.image, 0, bgPreYOffset, defaultExPreviewWidth, dimensionsBack[1] * bgSqeezeRatio);
                }
            }
        } else if (chkTypePageZoom.value) {
            var bgExOrientation = ((dimensionsBack[0] / dimensionsBack[1]) > (defaultExPreviewWidth / defaultExPreviewHeight)) ? "horizontal" : "vertical";
            if (bgExOrientation == "horizontal") {
                var bgSqeezeRatio = defaultExPreviewHeight / dimensionsBack[1];
                var bgPreXOffset = (dimensionsBack[0] * bgSqeezeRatio - defaultExPreviewWidth) / 2 * -1;
                bgPre.graphics.drawImage(bgPre.image, bgPreXOffset, 0, dimensionsBack[0] * (defaultExPreviewHeight / dimensionsBack[1]), defaultExPreviewHeight);
            } else {
                var bgSqeezeRatio = defaultExPreviewWidth / dimensionsBack[0];
                var bgPreYOffset = (dimensionsBack[1] * bgSqeezeRatio - defaultExPreviewHeight) / 2 * -1;
                bgPre.graphics.drawImage(bgPre.image, 0, bgPreYOffset, defaultExPreviewWidth, dimensionsBack[1] * bgSqeezeRatio);
            }
        } else {
            bgPre.graphics.drawImage(bgPre.image, 0, 0, defaultExPreviewWidth, dimensionsBack[1] * (defaultExPreviewWidth / dimensionsBack[0]));
        }
    }

    var overlayExPre = exGroup.add('image', undefined, overlay);
    overlayExPre.alignment = ['fill', 'fill'];
    overlayExPre.onDraw = function () {
        overlayExPre.graphics.drawImage(overlayExPre.image, 0, 0, defaultExPreviewWidth * 1.1, defaultExPreviewHeight * 1.1);
    }

    var postExPre = exGroup.add('image', undefined, fbPostExPre);
    postExPre.onDraw = function () {
        dimensionsPost = postExPre.image.size;
        if (chkTypeFB.value) {
            var postWidth = defaultExPreviewWidth * previewAssetsDimensions.fbPostWidthPercent;
            var postHeight = postWidth / dimensionsPost[0] * dimensionsPost[1];
            var xPost = (defaultExPreviewWidth - postWidth) / 2;
            var yPost = defaultExPreviewHeight * previewAssetsDimensions.fbPostOffsetPercent;
            postExPre.graphics.drawImage(postExPre.image, xPost, yPost, postWidth, postHeight);
        } else if (chkTypeTwitter.value || chkTypeIG.value || chkTypePHOTO) {
            var postExOrientation = ((dimensionsPost[0] / dimensionsPost[1]) > (defaultExPreviewWidth / defaultExPreviewHeight)) ? "horizontal" : "vertical";
            if (postExOrientation == "horizontal") {
                var postSqueezeRatio = defaultExPreviewWidth / dimensionsPost[0];
                var postPreXOffset = (defaultExPreviewWidth - defaultExPreviewWidth * previewAssetsDimensions.photoHeightPercent) / 2;
                var postPreYOffset = (defaultExPreviewHeight - dimensionsPost[1] * (postSqueezeRatio) * previewAssetsDimensions.photoHeightPercent) / 2;
                postExPre.graphics.drawImage(postExPre.image,
                    postPreXOffset, postPreYOffset,
                    defaultExPreviewWidth * previewAssetsDimensions.photoHeightPercent, dimensionsPost[1] * postSqueezeRatio * previewAssetsDimensions.photoHeightPercent);
            } else {
                var postSqueezeRatio = defaultExPreviewHeight / dimensionsPost[1];
                var postPreXOffset = (defaultExPreviewWidth - dimensionsPost[0] * (postSqueezeRatio) * previewAssetsDimensions.photoWidthPercent) / 2;
                var postPreYOffset = (defaultExPreviewHeight - defaultExPreviewHeight * previewAssetsDimensions.photoWidthPercent) / 2;
                postExPre.graphics.drawImage(postExPre.image,
                    postPreXOffset, postPreYOffset,
                    dimensionsPost[0] * (postSqueezeRatio) * previewAssetsDimensions.photoWidthPercent, defaultExPreviewHeight * previewAssetsDimensions.photoWidthPercent);
            }
        } else {
            postExPre.visible = false;
        }
    }


    var docExGroup = exGroup.add('group', undefined, 'docExGroup');
    docExGroup.visible = false;
    docExGroup.alignment = ['left', 'fill'];
    docExGroup.size = [defaultExPreviewWidth - (defaultExPreviewWidth - defaultExPreviewWidth * previewAssetsDimensions.docMatteWidth) / 2, defaultExPreviewHeight];
    var docExPre = docExGroup.add('image', undefined, docExPrePlaceholder);
    docExPre.onDraw = function () {
        var docExPreMatteWidth = defaultExPreviewWidth * previewAssetsDimensions.docMatteWidth;
        var docSqeezeRatio = defaultExPreviewWidth / docExPre.image.size[0];
        docExPre.graphics.drawImage(docExPre.image,
            (defaultExPreviewWidth - docExPreMatteWidth) / 2, 0,
            defaultExPreviewWidth, docExPre.image.size[1] * docSqeezeRatio);
    }


    var vignetteExPre = exGroup.add('image', undefined, vignette);
    vignetteExPre.alignment = ['fill', 'fill'];
    vignetteExPre.onDraw = function () {
        vignetteExPre.graphics.drawImage(vignetteExPre.image, 0, 0, defaultExPreviewWidth * 1.01, defaultExPreviewHeight * 1.01);
    }

    var quoteAuthorExPre = exGroup.add('image', undefined, quoteAutorBinary);
    quoteAuthorExPre.alignment = ['fill', 'fill'];
    quoteAuthorExPre.onDraw = function () {
        quoteAuthorExPre.graphics.drawImage(quoteAuthorExPre.image, 0, 0, defaultExPreviewWidth, defaultExPreviewHeight);
    }
    quoteAuthorExPre.visible = false;

    var quoteNoAuthorExPre = exGroup.add('image', undefined, quoteNoAutorBinary);
    quoteNoAuthorExPre.alignment = ['fill', 'fill'];
    quoteNoAuthorExPre.onDraw = function () {
        quoteNoAuthorExPre.graphics.drawImage(quoteNoAuthorExPre.image, 0, 0, defaultExPreviewWidth, defaultExPreviewHeight);
    }
    quoteNoAuthorExPre.visible = false;
    var noPreviewExPreview = exGroup.add('image', undefined, noPreview);

    var exPreNotePNG1 = exGroupFull.add('statictext', undefined, mainDict.experimentalPreviewNote);

    var examplePreviewFullGroup = previewBoxesGroup.add('group', undefined, 'examplePreviewFullGroup');
    examplePreviewFullGroup.orientation = 'column';
    examplePreviewFullGroup.visible = false;

    var examplePreviewGroup = examplePreviewFullGroup.add('group', undefined, 'Example Preview');
    examplePreviewGroup.orientation = 'stack';

    var backgroundPreviewGroup = examplePreviewGroup.add('group', undefined, 'backgroundPreviewGroup');
    backgroundPreviewGroup.orientation = 'stack';
    var fbBackgroundPreview = backgroundPreviewGroup.add('image', undefined, fbBackground);
    var igBackgroundPreview = backgroundPreviewGroup.add('image', undefined, igBackground);
    var twiBackgroundPreview = backgroundPreviewGroup.add('image', undefined, twiBackground);
    var scrollBackgroundPreview = backgroundPreviewGroup.add('image', undefined, scrollBackground);
    var zoomBackgroundPreview = backgroundPreviewGroup.add('image', undefined, zoomBackground);

    var overlayPreview = examplePreviewGroup.add('image', undefined, overlay);

    var foregroundPreviewGroup = examplePreviewGroup.add('group', undefined, 'foregroundPreviewGroup');
    foregroundPreviewGroup.orientation = 'stack';
    var docDocPreview = foregroundPreviewGroup.add('image', undefined, docDoc);
    var docFBRoundPreview = foregroundPreviewGroup.add('image', undefined, docFBRound);
    var docFBSharpPreview = foregroundPreviewGroup.add('image', undefined, docFBSharp);
    var fbPostRoundPreview = foregroundPreviewGroup.add('image', undefined, fbPostRound);
    var fbPostSharpPreview = foregroundPreviewGroup.add('image', undefined, fbPostSharp);
    var igPostRoundPreview = foregroundPreviewGroup.add('image', undefined, igPostRound);
    var igPostSharpPreview = foregroundPreviewGroup.add('image', undefined, igPostSharp);
    var photoRoundPreview = foregroundPreviewGroup.add('image', undefined, photoRound);
    var photoSharpPreview = foregroundPreviewGroup.add('image', undefined, photoSharp);
    var twiPostRoundPreview = foregroundPreviewGroup.add('image', undefined, twiPostRound);
    var twiPostSharpPreview = foregroundPreviewGroup.add('image', undefined, twiPostSharp);
    var scrollPreview = foregroundPreviewGroup.add('image', undefined, scroll);
    var pageZoomPreview = foregroundPreviewGroup.add('image', undefined, zoomBackground);

    var vignettePreview = examplePreviewGroup.add('image', undefined, vignette);
    var quotePreview = examplePreviewGroup.add('image', undefined, quote);
    var noPreviewPreview = examplePreviewGroup.add('image', undefined, noPreview);

    var examplePreviewNote = examplePreviewFullGroup.add('statictext', undefined, mainDict.examplePreviewNote);


    //panel for QUOTE
    var quotePanel = uberGroup2.add("panel", undefined, mainDict.quoteBox);
    // quotePanel.enabled = true;
    quotePanel.orientation = "column";
    quotePanel.alignment = ["fill", "fill"];
    quotePanel.alignChildren = ["left", "top"];

    var quoteBlock = quotePanel.add("group", undefined, "quoteBlock");
    quoteBlock.orientation = "column";
    quoteBlock.alignChildren = ["right", "top"];

    var quoteAuthorGroup = quoteBlock.add("group", undefined, "quoteAuthor");
    quoteAuthorGroup.orientation = "row";
    quoteAuthorGroup.alignChildren = ["left", "center"];

    var quoteAuthorLabel = quoteAuthorGroup.add("statictext", undefined, mainDict.quoteAuthor);
    var quoteAuthorText = quoteAuthorGroup.add("edittext", [0, 0, 400, 50], undefined, { multiline: true, scrolling: false });
    quoteAuthorText.onChange = function () {
        updatePreview();
    }

    var quoteText = quoteBlock.add("group", undefined, "outTexts");
    quoteText.orientation = "row";
    quoteText.alignChildren = ["right", "center"];

    var quoteTextLabel = quoteText.add("statictext", undefined, mainDict.quoteText);
    var quoteTextText = quoteText.add("edittext", [0, 0, 400, 150], undefined, { multiline: true, scrolling: false });
    quoteTextText.onChange = function () {
        if (quoteTextText.text.length > 0) {
            chkQuoteEnabled.value = true;
            updatePreview();
        } else {
            chkQuoteEnabled.value = false;
            updatePreview();
        }
    };
    var fontSelector = quotePanel.add('dropdownlist', undefined, ['Roboto Condensed', 'Arial', 'Segoe UI', 'Times New Roman']);
    fontSelector.alignment = 'right';
    fontSelector.selection = 0;
    fontSelector.margins = [quoteAuthorGroup.width, 0, 0, 0];
    fontSelector.helpTip = 'Font family';

    var chkQuoteEnabled = quotePanel.add("checkbox", undefined, mainDict.quoteEnabled);
    chkQuoteEnabled.value = false;
    chkQuoteEnabled.onClick = function () {
        if (chkQuoteEnabled.value == true) {
            if (quoteTextText.text < 1) {
                alert(mainDict.missingQuoteText);
                chkQuoteEnabled.value = false;
            }
        }
        updatePreview();
    }

    // finish buttons and hidden output
    var outputAndButtonsGroup = mainUIWindow.add("group", undefined, "outputAndButtonsGroup");
    outputAndButtonsGroup.alignment = ['fill', 'fill'];

    var resFpsSettings = outputAndButtonsGroup.add('panel', undefined, mainDict.resFpsSettings);
    resFpsSettings.orientation = 'row';
    resFpsSettings.alignChildren = ['left', 'top'];

    var resolutionSettings = resFpsSettings.add('group', undefined, 'resSet');
    resolutionSettings.orientation = 'column';
    resolutionSettings.alignChildren = ['left', 'fill'];

    var radioRes720p = resolutionSettings.add('radioButton', undefined, '720p');
    var radioRes1080p = resolutionSettings.add('radioButton', undefined, 'Full HD');
    radioRes1080p.value = true;

    var radioRes4k = resolutionSettings.add('radioButton', undefined, '4K');

    var frameRateSettings = resFpsSettings.add('group', undefined, 'fpsSet');
    frameRateSettings.orientation = 'column';
    frameRateSettings.alignChildren = ['left', 'top'];

    var radio24fps = frameRateSettings.add('radioButton', undefined, '23.976 fps');
    var radio25fps = frameRateSettings.add('radioButton', undefined, '25 fps');
    radio25fps.value = true;
    var radio30fps = frameRateSettings.add('radioButton', undefined, '30 fps');
    // var radio50fps = frameRateSettings.add('radioButton', undefined, '50 fps');
    // var radio60fps = frameRateSettings.add('radioButton', undefined, '60 fps');

    // var techOptions2 = outputAndButtonsGroup.add('panel', undefined, 'Additional Settings');
    // techOptions2.orientation = 'row';
    // techOptions2.alignChildren = ['left', 'top'];

    var chkFastMode = resFpsSettings.add('checkBox', undefined, mainDict.chkFastMode);
    chkFastMode.onClick = function () {
        if (chkFastMode.value) {
            chkMotionBlur.value = false;
            chkMotionBlur.enabled = false;
            radioRes720p.value = true;
            radioRes1080p.value = false;
            radioRes1080p.enabled = false;
            radioRes4k.value = false;
            radioRes4k.enabled = false;
        } else {
            chkMotionBlur.value = true;
            chkMotionBlur.enabled = true;
            radioRes720p.value = false;
            radioRes1080p.value = true;
            radioRes1080p.enabled = true;
            radioRes4k.value = false;
            radioRes4k.enabled = true;
        }
    }

    var outputGroup = outputAndButtonsGroup.add("group", undefined, "outputAndButtonsGroup");
    outputGroup.orientation = 'column';
    if (!testingScript) {
        outputGroup.visible = false;
        outputGroup.size = [0, 0];
    }

    var outputPathText = outputGroup.add("edittext", undefined, mainDict.outputPathNote, { readonly: "true" });
    var outputDescriptorText = outputGroup.add("edittext", undefined, "Name-" + generateTimeSuffix(), { readonly: "true" });
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

    cancelButton.onClick = function () {
        mainUIWindow.close();
        return false;
    }

    mainUIWindow.center();
    mainUIWindow.show();
    // return false;
}
