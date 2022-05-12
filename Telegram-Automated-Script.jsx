fileIncluded = true;
var currentFile = File($.fileName);
var gfxScriptFile = File(currentFile.parent.parent.fsName + "/AEScript/CTA-GFX-Automator.jsx").fsName;
#include 'CTA-GFX-Automator.jsx';
#include 'parameters.jsx';

uberWindow.close();

try {
    uberScriptOne(uberParameters);
    var renderComp = app.project.item(1);
    var renderQueueItemObject = app.project.renderQueue.items.add(renderComp);
    renderQueueItemObject.outputModule(1).file = File(uberParameters.outputPath+'/'+uberParameters.descriptor);
    $.writeln(app.project.renderQueue.canQueueInAME);
    app.project.renderQueue.queueInAME(true);
    app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
} catch (errorMessage) {
    $.writeln('Something went wrong')
    $.writeln(errorMessage)
}