function editText(text) {
    while (
        text.indexOf("«") > -1 ||
        text.indexOf("»") > -1 ||
        text.indexOf(" - ") > -1
    ) {
        text = text.replace('«', '"')
        text = text.replace('»', '"')
        text = text.replace(' - ', ' – ')
    }
    text = text.replace(/^\s+|\s+$/g, '')
    while (text.indexOf('  ') > -1) {
        text = text.replace('  ', ' ')
    }
    return text
}


function insertUnbreakableSpaces(text) {
    var punctuationSpace = " ";
    var textArray = text.split(" ");
    var output = "";
    var space = ' ';
    for (var i = 0; i < textArray.length - 1; i++) {
        var word = textArray[i];
        if (word.length < 4) {
            space = " ";
        } else {
            space = " ";
        }
        output += word + space
    }
    return output + textArray[textArray.length - 1];
}

function splitStringParagraph(longString, maxCharsPerLine, maxLines) {
    var textLength = longString.length;
    var MAX_TEXT_LENGTH = maxCharsPerLine * maxLines;

    if (textLength > MAX_TEXT_LENGTH) {
        return false
    }

    // generate table array
    var initialRatio = maxCharsPerLine / maxLines;
    var lineTable = [];
    for (var i = 1; i <= maxLines; i++) {
        var lines = i;
        var charsPerLine = i * initialRatio;
        var totalChars = lines * charsPerLine;
        lineTable.push({
            lines: lines,
            charsPerLine: Math.floor(charsPerLine),
            totalChars: Math.floor(totalChars)
        })
    }

    //  print out the table
    $.writeln("line table: ", lineTable.toSource());
    $.writeln("max lines: ", maxLines);
    $.writeln("max chars line: ", maxCharsPerLine);


    var targetDimensions = {};
    for (var i = 0; i < lineTable.length; i++) {
        if (textLength > lineTable[i]["totalChars"]) {
            continue;
        }
        targetDimensions = lineTable[i];
        $.writeln("current chars per line limit: ", lineTable[i].charsPerLine);
        break;
    }

    var procString = longString;
    var output = '';
    var splitIndex = targetDimensions["charsPerLine"];

    while (true) {
        if (procString.length >= splitIndex) {
            var targetIndex = procString.slice(0, splitIndex).lastIndexOf(' ');
            var firstString = procString.slice(0, targetIndex);
            var secondString = procString.slice(targetIndex);
            output += (firstString + '\n');
            procString = secondString.slice(1);
        } else {
            output += procString;
            break;
        }
    }

    // return output.split('\n');
    return output;
}
