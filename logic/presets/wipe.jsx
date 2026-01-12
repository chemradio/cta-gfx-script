function applyWipePreset(wipeTargetLayer, type, easeInKeyframe, easeOutKeyframe) {
    wipeTargetLayer.selected = true;
    var wiperEffect = wipeTargetLayer.property("ADBE Effect Parade").addProperty("ADBE Linear Wipe");
    if (type == "open") {
        wiperEffect.name = "Linear Wipe Open";
        wiperEffect.property("ADBE Linear Wipe-0001").setValueAtTime(0, 100);
        wiperEffect.property("ADBE Linear Wipe-0001").setValueAtTime(1.3, 0);
        wiperEffect.property("ADBE Linear Wipe-0002").setValue(0);
    } else if (type == "close") {
        wiperEffect.name = "Linear Wipe Close";
        wiperEffect.property("ADBE Linear Wipe-0001").setValueAtTime(0, 0);
        wiperEffect.property("ADBE Linear Wipe-0001").setValueAtTime(1.3, 100);
        wiperEffect.property("ADBE Linear Wipe-0002").setValue(180);
    }
    wiperEffect.property("ADBE Linear Wipe-0001").setTemporalEaseAtKey(1, [easeInKeyframe]);
    wiperEffect.property("ADBE Linear Wipe-0001").setTemporalEaseAtKey(2, [easeOutKeyframe]);
    wipeTargetLayer.selected = false;
}