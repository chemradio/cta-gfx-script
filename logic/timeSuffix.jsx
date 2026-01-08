function generateTimeSuffix() {
    var today = new Date();
    var hh = String(today.getHours());
    var mm = String(today.getMinutes());
    var ss = String(today.getSeconds());
    if (hh.length < 2) { hh = "0" + hh; }
    if (mm.length < 2) { mm = "0" + mm; }
    if (ss.length < 2) { ss = "0" + ss; }
    var timeSuffix = hh + "-" + mm + "-" + ss;
    return timeSuffix;
}