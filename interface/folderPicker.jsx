function pickAFolderFunction(mainDict) {
    // get a folder based on file select dialog with a mask of allowed file types
    if (osType == 'mac') {
        var autoModeFolder = Folder.selectDialog(mainDict.pickAnyFileFolder);
    } else {
        var autoModeFolder = File.openDialog(mainDict.pickAnyFileFolder, "Allowed files:*.png;*.jpg;*.jpeg;*.pdf;*.wav;*.mp3;").parent;
    }

    // check folder exists
    if (autoModeFolder.exists) {
        var autoFiles = autoModeFolder.getFiles();
        var autoImages = [];

        animationParams.isAutoDoable = false;
        animationParams.audioFile = undefined;

        audio_loop:
        for (var i = 0; i < audioExtensions.length; i++) {
            for (var j = 0; j < autoFiles.length; j++) {
                if (autoFiles[j].fsName.toLowerCase().indexOf(audioExtensions[i]) != -1) {
                    animationParams.audioFile = autoFiles[j];
                    animationParams.hasAudio = true;
                    break audio_loop;
                }

            }
        }

        animationParams.backGroundImage = undefined;
        animationParams.foregroundImage = undefined;

        image_loop:
        for (var i = 0; i < imageExtensions.length; i++) {
            for (var j = 0; j < autoFiles.length; j++) {
                if (autoFiles[j].fsName.toLowerCase().indexOf(imageExtensions[i]) != -1) {
                    autoImages.push(autoFiles[j]);
                    if (animationParams.backGroundImage == undefined) {
                        animationParams.backGroundImage = autoFiles[j];
                        animationParams.isAutoDoable = true;
                        animationParams.isTwoLayer = false;
                    } else {
                        animationParams.foregroundImage = autoFiles[j];
                        animationParams.isTwoLayer = true;
                        break image_loop;
                    }
                }
            }
        }

        image_sort:
        for (var i = 0; i < autoImages.length; i++) {
            if (animationParams.isAutoDoable == true && animationParams.isTwoLayer == true) {
                for (var j = 0; j < bgKeywords.length; j++) {
                    if (autoImages[i].fsName.toLowerCase().indexOf(bgKeywords[j]) != -1) {
                        animationParams.backGroundImage = autoImages[i];
                        autoImages.splice(i, 1);
                        animationParams.foregroundImage = autoImages[0];
                        break image_sort;
                    } else if (autoImages[i].fsName.toLowerCase().indexOf(fgKeywords[j]) != -1) {
                        animationParams.foregroundImage = autoImages[i];
                        autoImages.splice(i, 1);
                        animationParams.backGroundImage = autoImages[0];
                        break image_sort;
                    }
                }
            } else {
                break image_sort;
            }
        }

        // alert(animationParams.toSource());
        // populate manual tab
        if (animationParams.isAutoDoable == true) {
            filesGroup.visible = true;
            sourceInitGroup.visible = false;
            manualBGPreview.enabled = true;
            manualBGClear.enabled = true;
            manualAudioText.enabled = true;
            manualAudioBrowser.enabled = true;

            manualBGText.text = animationParams.backGroundImage.fsName;

            manualPostText.enabled = true;
            manualPostBrowser.enabled = true;


            if (animationParams.isTwoLayer == true) {
                manualPostText.text = animationParams.foregroundImage.fsName;
                manualPostPreview.enabled = true;
                manualPostClear.enabled = true;
                swapFilesButton.enabled = true;
            } else {
                manualPostText.text = '';
                manualPostPreview.enabled = false;
                manualPostClear.enabled = false;
                swapFilesButton.enabled = false;
            }

            if (animationParams.hasAudio == true) {
                manualAudioText.text = animationParams.audioFile.fsName;
                manualAudioPreview.enabled = true;
                manualAudioClear.enabled = true;
            } else {
                manualAudioText.text = '';
                manualAudioPreview.enabled = false;
                manualAudioClear.enabled = false;
            }

            outputPathText.text = autoModeFolder.fsName;
            outputDescriptorText.text = autoModeFolder.name + "-GFX-" + generateTimeSuffix();
            doItButton.enabled = true;
            optionsPanel.enabled = true;
            // quotePanel.enabled = true;
            noPreviewPreview.visible = false;
            noPreviewExPreview.visible = false;
            panelsEnabledTrigger();
            mainUIWindow.update();
        } else {
            alert('Missing Files');
            doItButton.enabled = false;
            optionsPanel.enabled = false;
            // quotePanel.enabled = false;
            noPreviewPreview.visible = true;
            noPreviewExPreview.visible = true;
        }
    } else {
        alert('Invalid Folder');
        doItButton.enabled = false;
        optionsPanel.enabled = false;
        // quotePanel.enabled = false;
        noPreviewPreview.visible = true;
        noPreviewExPreview.visible = true;
    }
    updatePreview();
}