function scaleExprScrollPreset() {
    zoomIn = effect("ZoomIn")("Checkbox").value;
    zoomInAmount = effect("ZoomIn Amount")("Slider").value;
    fitToWidth = effect("FitToBackground")("Checkbox").value;
    incoming = effect("Incoming")("Slider").value;
    fitToPost = effect("FitToSocialPost")("Checkbox").value;
    if (fitToWidth == true) {
        proportion = ' + compWidth + ' * 100 / thisLayer.width;
        x = proportion + value[0] - 100;
        y = proportion + value[1] - 100;
    } else if (fitToPost == true) {
        proportion = ' + compWidth * .52 + ' * 100 / thisLayer.width;
        x = proportion + value[0] - 100;
        y = proportion + value[1] - 100;
    } else {
        x = value[0];
        y = value[1];
    }
    if (zoomIn == true) {
        liner = linear(incoming, 0, thisComp.height, zoomInAmount, 0);
        [x + liner, y + liner]
        //easeOut(time, inPoint, inPoint + 1.5, [x, y], [x + zoomInAmount, y + zoomInAmount])
    } else {
        [x, y]
    };
}