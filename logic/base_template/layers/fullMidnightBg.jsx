function createMidnightBg(compWidth, compHeight, compLength) {
    var midnightSolid = app.project.item(1).layers.addSolid([0.0627, 0.1725, 0.2666], "Full Midnight BG", compWidth, compHeight, 1, compLength);
    midnightSolid.shy = true;
    midnightSolid.selected = false;
    return midnightSolid
}