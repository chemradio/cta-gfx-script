function createPreviewPanel(parentGroup) {
    var previewPanel = parentGroup.add("panel", undefined, mainDict.expamplePreviewLabel);
    previewPanel.alignChildren = ['fill', 'fill'];
    previewPanel.orientation = 'column';

    var previewRadioGroup = previewPanel.add('group', undefined, 'previewRadioGroup');
    previewRadioGroup.orientation = 'row';
    previewRadioGroup.alignChildren = ['center', 'top'];

    var radioExperimental = previewRadioGroup.add('radioButton', undefined, mainDict.experimentalLabel);
    radioExperimental.value = true;
    radioExperimental.onClick = function() {
        exGroupFull.visible = true;
        examplePreviewFullGroup.visible = false;
        updatePreview();
    }
    var radioExample = previewRadioGroup.add('radioButton', undefined, mainDict.examplePreviewLabel);
    radioExample.onClick = function() {
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
    bgPre.onDraw = function() {
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
    overlayExPre.onDraw = function() {
        overlayExPre.graphics.drawImage(overlayExPre.image, 0, 0, defaultExPreviewWidth * 1.1, defaultExPreviewHeight * 1.1);
    }

    var postExPre = exGroup.add('image', undefined, fbPostExPre);
    postExPre.onDraw = function() {
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
    docExPre.onDraw = function() {
        var docExPreMatteWidth = defaultExPreviewWidth * previewAssetsDimensions.docMatteWidth;
        var docSqeezeRatio = defaultExPreviewWidth / docExPre.image.size[0];
        docExPre.graphics.drawImage(docExPre.image,
            (defaultExPreviewWidth - docExPreMatteWidth) / 2, 0,
            defaultExPreviewWidth, docExPre.image.size[1] * docSqeezeRatio);
    }


    var vignetteExPre = exGroup.add('image', undefined, vignette);
    vignetteExPre.alignment = ['fill', 'fill'];
    vignetteExPre.onDraw = function() {
        vignetteExPre.graphics.drawImage(vignetteExPre.image, 0, 0, defaultExPreviewWidth * 1.01, defaultExPreviewHeight * 1.01);
    }

    var quoteAuthorExPre = exGroup.add('image', undefined, quoteAutorBinary);
    quoteAuthorExPre.alignment = ['fill', 'fill'];
    quoteAuthorExPre.onDraw = function() {
        quoteAuthorExPre.graphics.drawImage(quoteAuthorExPre.image, 0, 0, defaultExPreviewWidth, defaultExPreviewHeight);
    }
    quoteAuthorExPre.visible = false;

    var quoteNoAuthorExPre = exGroup.add('image', undefined, quoteNoAutorBinary);
    quoteNoAuthorExPre.alignment = ['fill', 'fill'];
    quoteNoAuthorExPre.onDraw = function() {
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
    return previewPanel;

}