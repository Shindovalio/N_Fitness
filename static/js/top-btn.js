var top_btn = document.getElementById("top-btn");
window.onscroll = function(){scrollFunction()};
function scrollFunction ()
{
    if(document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000)
    {
        top_btn.style.display = "block";
    }
    else
    {
        top_btn.style.display = "none";
    }
}
function gotop ()
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}