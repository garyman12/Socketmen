var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "../stats.xml", true);
xhttp.send();

function myFunction(xml) {
 //   var xmlDoc = xhttp.responseXML;
   // document.getElementById("temp").innerHTML = xmlDoc.getElementsByTagName("PRESSED")[0].childNodes[0].nodeValue;
   // document.getElementById("button").innerHTML = xmlDoc.getElementsByTagName("CURRENT")[0].childNodes[0].nodeValue;
   // document.getElementById("vibration").innerHTML = xmlDoc.getElementsByTagName("LEVEL")[0].childNodes[0].nodeValue;  


}