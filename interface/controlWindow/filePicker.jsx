function createFilePickerGroup(mainUIWindow) {
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
    backToPickerButton.onClick = function() {
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
    var manualBGText = manualBGGroup.add("edittext", undefined, undefined, {
        readonly: true
    });
    manualBGText.characters = defaultPathCharacters;
    manualBGText.onChange = function() {
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
    manualBGBrowser.onChange = function() {
        alert('changed' + this);
    }
    manualBGBrowser.onClick = function() {
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


    var manualBGClear = manualBGGroup.add("button", undefined, mainDict.clearButtonLabel);
    // manualBGClear.visible = false;
    manualBGClear.enabled = false;
    manualBGClear.onClick = function() {
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
    var manualPostText = manualTabPostGroup.add("edittext", undefined, undefined, {
        readonly: true
    });
    manualPostText.characters = defaultPathCharacters;
    manualPostText.enabled = false;
    var manualPostBrowser = manualTabPostGroup.add("button", undefined, mainDict.browse);
    // manualPostBrowser.enabled = false;
    manualPostBrowser.onClick = function() {
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
    manualPostPreview.onClick = function() {
        // showImagePreviewBox(File(manualPostText.text));
        File(manualPostText.text).execute();
    }

    var manualPostClear = manualTabPostGroup.add("button", undefined, mainDict.clearButtonLabel);
    manualPostClear.enabled = false;
    manualPostClear.onClick = function() {
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
    var manualAudioText = manualTabAudioGroup.add("edittext", undefined, undefined, {
        readonly: true
    });
    manualAudioText.characters = defaultPathCharacters;
    manualAudioText.enabled = false;
    var manualAudioBrowser = manualTabAudioGroup.add("button", undefined, mainDict.browse);
    // manualAudioBrowser.enabled = false;
    manualAudioBrowser.onClick = function() {
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

    var manualAudioClear = manualTabAudioGroup.add("button", undefined, mainDict.clearButtonLabel);
    manualAudioClear.enabled = false;
    manualAudioClear.onClick = function() {
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


}