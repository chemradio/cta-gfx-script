function createHighlighter(compWidth, compHeight) {
    var selectorLayer = app.project.item(1).layers.addShape();
    selectorLayer.name = 'Highlighter';
    selectorLayer.enabled = false;
    var contents1 = selectorLayer.property('ADBE Root Vectors Group');
    var rectangle = contents1.addProperty('ADBE Vector Group');
    var contents2 = rectangle.addProperty('ADBE Vectors Group');
    var rect = contents2.addProperty('ADBE Vector Shape - Rect');
    var rectSize = rect.property('ADBE Vector Rect Size').setValue([compWidth, compHeight]);
    var rectPosition = rect.property('ADBE Vector Rect Position').setValue([0, 0]);
    var stroke = contents2.addProperty('ADBE Vector Graphic - Stroke');
    var strokeOpacity = stroke.property('ADBE Vector Stroke Opacity').setValue(0);
    var fill = contents2.addProperty('ADBE Vector Graphic - Fill');
    var fillColor = fill.property('ADBE Vector Fill Color').setValue([0.05490196078431, 0.7921568627451, 0.89019607843137, 1]);
    var fillOpacity = fill.property('ADBE Vector Fill Opacity').setValue(100);
    var rectTransform = rectangle.property('ADBE Vector Transform Group');
    var rectVectAnchor = rectTransform.property('ADBE Vector Anchor').setValue([-960, 0]);
    var rectVectPosition = rectTransform.property('ADBE Vector Position').setValue([0, 0]);
    rectTransform.property('ADBE Vector Scale').setValueAtTime(0, [0, 100]);
    rectTransform.property('ADBE Vector Scale').setValueAtTime(1.5, [100, 100]);
    rectTransform.property('ADBE Vector Scale').setTemporalEaseAtKey(1, [new KeyframeEase(0, 33), new KeyframeEase(0, 33)]);
    rectTransform.property('ADBE Vector Scale').setTemporalEaseAtKey(2, [new KeyframeEase(0, 80), new KeyframeEase(0, 80)]);
    var layerTransform = selectorLayer.property('ADBE Transform Group');
    var layerAnchor = layerTransform.property('ADBE Anchor Point').setValue([0, 0, 0]);
    var layerPosition = layerTransform.property('ADBE Position').setValue([100, 600, 0]);
    var layerScale = layerTransform.property('ADBE Scale').setValue([60, 5, 100]);

    selectorLayer.blendingMode = BlendingMode.MULTIPLY;
    return selectorLayer;
}