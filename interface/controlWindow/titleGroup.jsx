function createTitleGroup(mainUIWindow, scriptVersion) {
    // title
    var identityGroup = mainUIWindow.add("group", undefined, "identityGroup");
    identityGroup.alignChildren = ['fill', 'fill'];

    var leftIDGroup = identityGroup.add('group', undefined, 'leftIDGroup');
    leftIDGroup.alignChildren = ['left', 'center'];
    leftIDGroup.orientation = 'column';

    var idText = leftIDGroup.add('statictext', undefined, 'CTA GFX Automator v' + scriptVersion);
    idText.alignment = ['left', 'center'];

    var helpButton = leftIDGroup.add('button', undefined, "Help");
    helpButton.onClick = function() {
        alert("Help in progress...");
    }
    return identityGroup;
}