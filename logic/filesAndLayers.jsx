function filterFiles(files, extension) {
    var filtered = [];
    if (typeof extension == "object") {
        for (var j = 0; j < extension.length; j++) {
            for (var k = 0; k < files.length; k++) {
                if (files[k].name.toLowerCase().indexOf(extension[j]) != -1) {
                    filtered.push(files[k]);
                }
            }
        }
    } else {
        for (var i = 0; i < files.length; i++) {
            if (files[i].name.toLowerCase().indexOf(extension) != -1) {
                filtered.push(files[i]);
            }
        }
    }
    return filtered;
}



function importAsset(file, app) {
    app.beginSuppressDialogs();
    app.project.importFile(new ImportOptions(file));
    app.endSuppressDialogs(false);
}

function findAsset(filename, app) {
    for (var i = 1; i <= app.project.items.length; i++) {
        if (app.project.item(i).name == filename) {
            var reqID = i;
            break;
        } else {
            continue;
        }
    }
    return reqID;
}

function addToTimeline(asset, app) {
    app.project.item(1).time = 0;
    assetID = findAsset(asset, app);
    addedLayer = app.project.item(1).layers.add(app.project.item(assetID));
}



function findLayerIdByName(layerName, app) {
    for (var i = 1; i <= app.project.item(1).layers.length; i++) {
        if (app.project.item(1).layer(i).name == layerName) {
            layerId = i;
            break;
        } else {
            continue;
        }
    }
    return layerId;
}

function applyPresetToLayer(layerName, presetName, wild, app) {
    app.project.item(1).time = 0;
    srcLayerIndex = findLayerIdByName(layerName, app);
    app.project.item(1).layer(srcLayerIndex).selected = true;
    app.project.item(1).layer(srcLayerIndex).applyPreset(presetName);
}


function rearrangeLayers(layer, layerType, app) {
    srcLayerIndex = findLayerIdByName(layer, app);
    tintWipeIndex = findLayerIdByName('Tint Wipe', app);
    flickerLayer = findLayerIdByName('FlickerRemoval', app);
    switch (layerType) {
        case "background":
            app.project.item(1).layer(srcLayerIndex).moveAfter(app.project.item(1).layer(tintWipeIndex));
            break;
        case 'foreground':
            app.project.item(1).layer(srcLayerIndex).moveBefore(app.project.item(1).layer(tintWipeIndex));
            break;
        case "docMatte":
            app.project.item(1).layer(srcLayerIndex).moveAfter(app.project.item(1).layer(flickerLayer));
            break;
        default:
            alert(localDict.rearrangingLayersError);
            break;
    }
}