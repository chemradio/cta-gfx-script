functionCreateQuotePanel(parentGroup) {
    //panel for QUOTE
    var quotePanel = uberGroup2.add("panel", undefined, mainDict.quoteBox);
    // quotePanel.enabled = true;
    quotePanel.orientation = "column";
    quotePanel.alignment = ["fill", "fill"];
    quotePanel.alignChildren = ["left", "top"];

    var quoteBlock = quotePanel.add("group", undefined, "quoteBlock");
    quoteBlock.orientation = "column";
    quoteBlock.alignChildren = ["right", "top"];

    var quoteAuthorGroup = quoteBlock.add("group", undefined, "quoteAuthor");
    quoteAuthorGroup.orientation = "row";
    quoteAuthorGroup.alignChildren = ["left", "center"];

    var quoteAuthorLabel = quoteAuthorGroup.add("statictext", undefined, mainDict.quoteAuthor);
    var quoteAuthorText = quoteAuthorGroup.add("edittext", [0, 0, 400, 50], undefined, {
        multiline: true,
        scrolling: false
    });
    quoteAuthorText.onChange = function() {
        updatePreview();
    }

    var quoteText = quoteBlock.add("group", undefined, "outTexts");
    quoteText.orientation = "row";
    quoteText.alignChildren = ["right", "center"];

    var quoteTextLabel = quoteText.add("statictext", undefined, mainDict.quoteText);
    var quoteTextText = quoteText.add("edittext", [0, 0, 400, 150], undefined, {
        multiline: true,
        scrolling: false
    });
    quoteTextText.onChange = function() {
        if (quoteTextText.text.length > 0) {
            chkQuoteEnabled.value = true;
            updatePreview();
        } else {
            chkQuoteEnabled.value = false;
            updatePreview();
        }
    };
    var fontSelector = quotePanel.add('dropdownlist', undefined, ['Roboto Condensed', 'Arial', 'Segoe UI', 'Times New Roman']);
    fontSelector.alignment = 'right';
    fontSelector.selection = 0;
    fontSelector.margins = [quoteAuthorGroup.width, 0, 0, 0];
    fontSelector.helpTip = 'Font family';

    var chkQuoteEnabled = quotePanel.add("checkbox", undefined, mainDict.quoteEnabled);
    chkQuoteEnabled.value = false;
    chkQuoteEnabled.onClick = function() {
        if (chkQuoteEnabled.value == true) {
            if (quoteTextText.text < 1) {
                alert(mainDict.missingQuoteText);
                chkQuoteEnabled.value = false;
            }
        }
        updatePreview();
    }
    return quotePanel;
}