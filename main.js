document.body.onload = e => {

    console.log("loaded")

    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.strokeText("", 100, 100, 200);
    /*    navigator.permissions.query({ name: "accelerometer" }).then(v => {}, e => {
            console.log(e)
        });*/

    if (navigator.cookieEnabled == true) {
        text = "Cookies are enabled.";
    } else {
        text = "Cookies are not enabled.";
    }

    document.getElementById("demo").innerHTML = text;

    if (typeof Gyroscope === "function") {
        document.getElementById("demo").innerHTML = "Gyros detected";
    } else {
        document.getElementById("demo").innerHTML = "No Gyros detected";
    }


    if (window.AmbientLightSensor) {
        document.getElementById("demo").innerHTML += "Ambient detected";
    }

    let accelerometer = null;
    try {
        accelerometer = new Accelerometer({ referenceFrame: 'device' });
        accelerometer.addEventListener('error', event => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
                // Branch to code for requesting permission.
            } else if (event.error.name === 'NotReadableError') {
                console.log('Cannot connect to the sensor.');
            }
        });
        accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
        accelerometer.start();
    } catch (error) {
        // Handle construction errors.
        if (error.name === 'SecurityError') {
            // See the note above about feature policy.
            console.log('Sensor construction was blocked by a feature policy.');
        } else if (error.name === 'ReferenceError') {
            console.log('Sensor is not supported by the User Agent.');
        } else {
            throw error;
        }
    }

};

document.body.addEventListener("load", (e) => {
    console.log("ee");
});

console.log("Neu2")