function loading(str, ind)
{
    var el = document.querySelector(str);
    var el_hover = document.querySelector(str+":hover");
    function executeLoad()
    {
        el_hover.style.transition = "0";
        el_hover.style.opacity = "1";
        el.style.transition = "0";
        el.style.color = "rgba(0,0,0,0)";
        el.style.backgroundImage = "url('../static/img/load.gif')";
    }
    if(ind == 0)
    {
        executeLoad();
    }
    if(ind == 1 && validate())
    {
        executeLoad();
    }
    if(ind == 3 && validate3())
    {
        executeLoad();
    }
    if(ind == 4 && validate4())
    {
        executeLoad();
    }
    if(ind == 5 && validate5())
    {
        executeLoad();
    }
}