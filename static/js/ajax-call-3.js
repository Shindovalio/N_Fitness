var timed_out = 0;
function goBack(path, message) 
{
    if(timed_out == 0)
    {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() 
        {
            if (http.readyState === 4 && http.status === 200) 
            {
                document.querySelector(".bod").innerHTML = this.responseText;
                eval(document.querySelector(".sass").innerHTML);
                reload();
            }
        };
        http.open('POST', path, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(message);
    }
}