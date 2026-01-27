function createGuideLayer(compWidth, compHeight) {
    var guideLayer = app.project.item(1).layers.addShape();
    guideLayer.name = 'Guides';
    guideLayer.guideLayer = true;
    guideLayer.locked = true;
    guideLayer.shy = true;

    var contents1 = guideLayer.property('ADBE Root Vectors Group');
    var rectangle1 = contents1.addProperty('ADBE Vector Group');
    var contents2 = rectangle1.addProperty('ADBE Vectors Group');
    var rect = contents2.addProperty('ADBE Vector Shape - Rect');
    var rectSize = rect.property('ADBE Vector Rect Size').setValue([compWidth * .87, compHeight * .59]);
    var rectPosition = rect.property('ADBE Vector Rect Position').setValue([0, 0]);
    var stroke = contents2.addProperty('ADBE Vector Graphic - Stroke');
    var strokeColor = stroke.property('ADBE Vector Stroke Color').setValue([1, 0, 0.33333334326744, .8]);
    var strokeWidth = stroke.property('ADBE Vector Stroke Width').setValue(compHeight * 0.003); // 10
    var strokeOpacity = stroke.property('ADBE Vector Stroke Opacity').setValue(100);
    var fill = contents2.addProperty('ADBE Vector Graphic - Fill');
    var fillColor = fill.property('ADBE Vector Fill Color').setValue([0, 0, 0, 0]);
    var fillOpacity = fill.property('ADBE Vector Fill Opacity').setValue(0);
    var rectTransform = rectangle1.property('ADBE Vector Transform Group');
    var rectVectAnchor = rectTransform.property('ADBE Vector Anchor').setValue([0, 0]);
    var rectVectPosition = rectTransform.property('ADBE Vector Position').setValue([0, 0]);

    var rectangle2 = contents1.addProperty('ADBE Vector Group');
    var contents2 = rectangle2.addProperty('ADBE Vectors Group');
    var rect = contents2.addProperty('ADBE Vector Shape - Rect');
    var rectSize = rect.property('ADBE Vector Rect Size').setValue([compWidth * 0.145, compHeight * 0.083]);
    var rectPosition = rect.property('ADBE Vector Rect Position').setValue([0, 0]);
    var stroke = contents2.addProperty('ADBE Vector Graphic - Stroke');
    var strokeColor = stroke.property('ADBE Vector Stroke Color').setValue([1, 0, 0.33333334326744, .8]);
    var strokeWidth = stroke.property('ADBE Vector Stroke Width').setValue(3); // 10
    var strokeOpacity = stroke.property('ADBE Vector Stroke Opacity').setValue(100);
    var fill = contents2.addProperty('ADBE Vector Graphic - Fill');
    var fillColor = fill.property('ADBE Vector Fill Color').setValue([0, 0, 0, 0]);
    var fillOpacity = fill.property('ADBE Vector Fill Opacity').setValue(0);
    var rectTransform = rectangle2.property('ADBE Vector Transform Group');
    var rectVectAnchor = rectTransform.property('ADBE Vector Anchor').setValue([0, 0]);
    var rectVectPosition = rectTransform.property('ADBE Vector Position').setValue([-compWidth / 2 * 0.75, -compHeight / 2 * .8]);
}