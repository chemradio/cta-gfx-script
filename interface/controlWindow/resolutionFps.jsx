function createResolutionFpsGroup(parentGroup) {
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
    chkFastMode.onClick = function() {
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
    return resFpsSettings;
}