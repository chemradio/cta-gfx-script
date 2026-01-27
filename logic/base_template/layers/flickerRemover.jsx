function createFlickerRemover(midnightSolid) {
    var flickerRemover = midnightSolid.duplicate();
    flickerRemover.name = "FlickerRemover";
    var reduceInterlaceFlickerEffect = flickerRemover.property('ADBE Effect Parade').addProperty("ADBE Reduce Interlace Flicker");
    reduceInterlaceFlickerEffect.softness.setValue(1);
    flickerRemover.adjustmentLayer = true;
    return flickerRemover;
}