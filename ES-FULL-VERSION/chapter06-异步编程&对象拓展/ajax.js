function ajax(url, succesCallback, failCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            succesCallback(xmlhttp.responseText);
        } else if (xmlhttp.readyState === 4 && xmlhttp.status !== 200) {
            failCallback && failCallback(xmlhttp.statusText);
        }
    };
}
export default ajax