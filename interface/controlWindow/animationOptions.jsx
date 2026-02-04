function createAnimationOptionsGroup(parentGroup) {
    //options panel
    var optionsPanel = parentGroup.add("panel", undefined, mainDict.options);
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
    chkTypeFB.onClick = function() {
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
    chkTypeTwitter.onClick = function() {
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = true;
        chkRoundCorners.value = true;
        chkStaticPost.enabled = true;
        updatePreview();
    }
    var chkTypeIG = primarySettings.add('radiobutton', undefined, 'Instagram');
    chkTypeIG.onClick = function() {
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = true;
        chkRoundCorners.value = true;
        chkStaticPost.enabled = true;
        updatePreview();
    }
    var chkTypePHOTO = primarySettings.add('radiobutton', undefined, mainDict.photoType);
    chkTypePHOTO.onClick = function() {
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
    chkTypeDOC.onClick = function() {
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
    chkTypePageScroll.onClick = function() {
        // chkTypePageScroll.value = true;
        chkScrollBackground.enabled = false;
        chkPhotoBackground.enabled = false;
        chkRoundCorners.enabled = false;
        chkStaticPost.value = false;
        chkStaticPost.enabled = false;
        updatePreview();
    }

    var chkTypePageZoom = primarySettings.add('radiobutton', undefined, mainDict.chkTypeZoom);
    chkTypePageZoom.onClick = function() {
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
    chkScrollBackground.onClick = function() {
        if (chkTypeFB.value == true) {
            chkRoundCorners.value = true;
        }
        updatePreview();
    }
    var chkPhotoBackground = secondarySettings.add('radiobutton', undefined, mainDict.photoZoomBackground);
    chkPhotoBackground.enabled = true;
    chkPhotoBackground.onClick = function() {
        if (chkTypeFB.value == true) {
            chkRoundCorners.value = false;
        }
        updatePreview();

    }
    var chkRoundCorners = secondarySettings.add('checkbox', undefined, mainDict.roundCorners);
    chkRoundCorners.onClick = function() {
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
    return optionsPanel;
}