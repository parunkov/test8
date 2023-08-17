const colours = ["#EB5757", "#F2994A", "#6FCF97", "#9B51E0", "#2F80ED", "#56CCF2", "#219653", "#F2C94C"];
const data = [45, 50, 20, 15, 10, 8, 6, 4];
const radius = [150, 200, 120, 140, 160, 100, 110, 170];

const drawPieSlice = (settings) => {
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
const pieChart = (sectorsData, sectorsColors, sectorsRadius) => {
    const total = sectorsData.reduce((a, b) => a + b);
    const radiansPerUnit = (2 * Math.PI) / total;

    let startAngleRadians = -(2 * Math.PI) / 4;
    let sweepAngleRadians = null;

    for (let i = 0, l = sectorsData.length; i < l; i++) {
        sweepAngleRadians = sectorsData[i] * radiansPerUnit;

        drawPieSlice({ id: "svg", centreX: 256, centreY: 256, startAngleRadians: startAngleRadians, sweepAngleRadians: sweepAngleRadians, radius: sectorsRadius[i], fillColour: sectorsColors[i], strokeColour: "#000000" });

        startAngleRadians += sweepAngleRadians;
    }
}
const runScript = () => {
    pieChart(data, colours, radius);
    const svg = document.querySelector('#svg');
    svg.insertAdjacentHTML('beforeend', `<circle cx="256" cy="256" r="50" fill="white"/>`);
    svg.addEventListener('click', () => {
        function randomIntFromInterval(min, max) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(1, 8);
        svg.innerHTML = '';
        if (rndInt === 1) {
            svg.insertAdjacentHTML('beforeend', `<circle cx="256" cy="256" r="150" fill="#EB5757"/>`);
            svg.insertAdjacentHTML('beforeend', `<circle cx="256" cy="256" r="50" fill="white"/>`);
        } else {
            pieChart(data.slice(0, rndInt), colours.slice(0, rndInt), radius.slice(0, rndInt));
            svg.insertAdjacentHTML('beforeend', `<circle cx="256" cy="256" r="50" fill="white"/>`);
        }
    })
}
export { runScript };
