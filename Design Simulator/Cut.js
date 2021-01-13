// This executes after polymer finishes composing the templates.
// It sets default values for simulator.
document.addEventListener('polymer-ready', function () {
    var top = document.querySelector('#top');
    top.cutterDiameter = 0.125;
    top.cutterHeight = 1;
        top.gcode =
            'G1 Z0.1 F100\n'+
            'G1 X0 Y0 F100\n'+
            'G1 Z0.0000\n'+
            'G1 Z-0.1250 F20\n'+
            'G1 X1 Y1 F40\n';
});
