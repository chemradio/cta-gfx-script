function createProgressWindow(progressMaxValue, magicText, prepareText) {
    var progressWindow = new Window("palette", "Progress", undefined);
    progressWindow.orientation = "column";
    progressWindow.alignChildren = "fill";
    var makingMagicText = progressWindow.add('statictext', undefined, magicText);
    makingMagicText.bounds = [0, 0, 300, 20];
    progressWindow.progressBar = progressWindow.add('progressbar', undefined, 0, progressMaxValue || 250);
    progressBar.value = 0;
    progressWindow.progressStage = progressWindow.add('statictext', undefined, prepareText);
    return progressWindow;
}


function updateProgress(progressWindow, stage, percent) {
    progressWindow.progressStage.text = stage;
    progressWindow.progressBar.value = percent || 10;
    progressWindow.update();
}