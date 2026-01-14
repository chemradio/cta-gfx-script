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