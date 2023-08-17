const colours = ["#EB5757", "#F2994A", "#6FCF97", "#9B51E0", "#2F80ED", "#56CCF2", "#219653", "#F2C94C"];
const data = [45, 50, 20, 15, 10, 8, 6, 4];
const radius = [150, 200, 120, 140, 160, 100, 110, 170];

function drawPieSlice(settings) {
    let d = "";

    const firstCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians);
    const firstCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians);
    const secondCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians + settings.sweepAngleRadians);
    const secondCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians + settings.sweepAngleRadians);

    // move to centre
    d += "M" + settings.centreX + "," + settings.centreY + " ";
    // line to first edge
    d += "L" + firstCircumferenceX + "," + firstCircumferenceY + " ";
    // arc
    // Radius X, Radius Y, X Axis Rotation, Large Arc Flag, Sweep Flag, End X, End Y
    d += "A" + settings.radius + "," + settings.radius + " 0 0,1 " + secondCircumferenceX + "," + secondCircumferenceY + " ";
    // close path
    d += "Z";

    const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");

    arc.setAttributeNS(null, "d", d);
    arc.setAttributeNS(null, "fill", settings.fillColour);
    // arc.setAttributeNS(null, "style", "stroke:" + settings.strokeColour + ";");

    document.getElementById(settings.id).appendChild(arc);
}
function pieChart() {
    const total = data.reduce((a, b) => a + b);
    const radiansPerUnit = (2 * Math.PI) / total;

    let startAngleRadians = -(2 * Math.PI) / 4;
    let sweepAngleRadians = null;

    for (let i = 0, l = data.length; i < l; i++) {
        sweepAngleRadians = data[i] * radiansPerUnit;

        drawPieSlice({ id: "svg", centreX: 256, centreY: 256, startAngleRadians: startAngleRadians, sweepAngleRadians: sweepAngleRadians, radius: radius[i], fillColour: colours[i], strokeColour: "#000000" });

        startAngleRadians += sweepAngleRadians;
    }
}
window.onload = function () {
    pieChart();
    document.querySelector('#svg').insertAdjacentHTML('beforeend', `<circle cx="256" cy="256" r="50" fill="white"/>`);
}