function createVignette(midnightSolid, compHeight) {
    var vignetteOverlay = midnightSolid.duplicate();
    vignetteOverlay.name = "Vignette";
    vignetteOverlay.transform.opacity.setValue(80);

    var featherMultiplier = .37;
    var vignetteMaskFeather = [0, compHeight * featherMultiplier];

    var maskMultiplier = .76;
    var vignetteMaskCoordinates = [
        [-700, (compHeight - compHeight * maskMultiplier) / 2],
        [compWidth + 700, (compHeight - compHeight * maskMultiplier) / 2],
        [compWidth + 700, (compHeight - compHeight * maskMultiplier) / 2 + compHeight * maskMultiplier],
        [-700, (compHeight - compHeight * maskMultiplier) / 2 + compHeight * maskMultiplier]
    ];

    vignetteMaskPath = new Shape();
    vignetteMaskPath.vertices = vignetteMaskCoordinates;
    vignetteMaskPath.closed = true;
    vignetteOverlay.property('ADBE Mask Parade').addProperty("ADBE Mask Atom");
    vignetteOverlay.property('ADBE Mask Parade').property("ADBE Mask Atom").property("ADBE Mask Shape").setValue(vignetteMaskPath);
    vignetteOverlay.property('ADBE Mask Parade').property("ADBE Mask Atom").property("ADBE Mask Feather").setValue(vignetteMaskFeather);
    vignetteOverlay.property('ADBE Mask Parade').property("ADBE Mask Atom").maskMode = MaskMode.SUBTRACT;
    return vignetteOverlay;
}