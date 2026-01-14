function addRoundMask(postLayer) {
    targetLayer = app.project.item(1).layer(findLayerIdByName(postLayer));
    roundCorners = new Shape();
    ratio = 2.6
    roundness = targetLayer.width * ratio / 100;
    roundCorners.vertices = [
        [roundness, 0],
        [targetLayer.width - roundness, 0],
        [targetLayer.width, roundness],
        [targetLayer.width, targetLayer.height - roundness],
        [targetLayer.width - roundness, targetLayer.height],
        [roundness, targetLayer.height],
        [0, targetLayer.height - roundness],
        [0, roundness]
    ];
    roundCorners.inTangents = [
        [-roundness, 0],
        [0, 0],
        [0, -roundness],
        [0, 0],
        [roundness, 0],
        [0, 0],
        [0, roundness]
    ];
    roundCorners.closed = true;
    app.project.item(1).layer(findLayerIdByName(postLayer)).property('ADBE Mask Parade').addProperty("ADBE Mask Atom");
    app.project.item(1).layer(findLayerIdByName(postLayer)).property('ADBE Mask Parade').property("ADBE Mask Atom").property("ADBE Mask Shape").setValue(roundCorners);
};