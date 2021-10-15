function goBack(path, message) 
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        if (http.readyState === 4 && http.status === 200) 
        {
            document.querySelector(".wrapper").innerHTML = this.responseText;
            reload();
            reload2();
            opencart();
        }
    };
    http.open('POST', path, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(message);
}