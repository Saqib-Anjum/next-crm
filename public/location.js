console.log("location file loader")


function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        XMLDocument.innerHTML = "Geolocation not Support"
    }
    
}

function showPosition(position) {
    console.log(position)
    
}
getLocation();
