document.body.onload = e => {

    console.log("loaded")

    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.strokeStyle = "wheat";
    ctx.strokeText("Nothing yet", 100, 100, 200);
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

    const console_log = (...t) => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        ctx.strokeStyle = "wheat";
        ctx.strokeText(t.join(", "), 100, 100, 200);
    };
    const reloadOnShake = function(accelerometer) {

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, innerWidth, innerHeight);
        ctx.strokeStyle = "wheat";
        ctx.strokeText("Nothing yet", 100, 100, 200);
    };


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


        accelerometer.addEventListener('reading', e => {
            console.log("Magnetic field along the X-axis " + magSensor.x);
            console.log("Magnetic field along the Y-axis " + magSensor.y);
            console.log("Magnetic field along the Z-axis " + magSensor.z);
        })
        accelerometer.addEventListener('error', event => {
            console.log(event.error.name, event.error.message);
        })

        // accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
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



const deviceOrientationHandler = (evt) => {
    const jumpMax = {
        x: 0,
        y: 0,
        z: 0
    };
    if (evt.acceleration.x > jumpMax.x) {
        jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
        jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
        jumpMax.z = evt.acceleration.z;
    }

    console_log("Soweit ", JSON.stringify(jumpMax))

};

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    document.getElementById("demo").innerText = "Supported!";
}


if (navigator.geolocation) {

    // Get a reference to a <div id="map"> tag on the page to insert the map into

    var mapElem = document.getElementById("map"),

        // Define a function to execute once the user’s location has been established,
        // plotting their latitude and longitude as a map tile image

        successCallback = function(position) {
            var lat = position.coords.latitude,
                long = position.coords.longitude;

            //            mapElem.innerHTML = `<iframe width="100%" height="400px" src="https://www.openstreetmap.org/#map=15/${lat}/${long}"></iframe>`;

            mapElem.innerHTML =
                `<iframe 
                  width="425" 
                  height="350" 
                  frameborder="0" 
                  scrolling="no" 
                  marginheight="0" 
                  marginwidth="0" 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=${long-0.00001}%2C${lat-0.00001}%2C${long+0.00001}%2C${lat+0.00001}&amp;layer=mapnik&amp;marker=${lat}%2C${long}" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=51.1836&amp;mlon=6.6889#map=15/51.1836/6.6889">View Larger Map</a></small>`
            console.log(mapElem.innerHTML)
        },

        // Define a function to execute if the user’s location couldn’t be established

        errorCallback = function() {
            alert("Sorry! I couldn’t get your location.");
        };

    // Start watching the user’s location, updating once per second (1s = 1000ms)
    // and execute the appropriate callback function based on whether the user
    // was successfully located or not

    navigator.geolocation.watchPosition(successCallback, errorCallback, {
        maximumAge: 1000
    });
}