function searchFunc(c)
{
    var input = document.querySelectorAll('.search-input')[c].value;
    var prods = document.querySelectorAll('.prod-box');
    for(var i=0; i<6; i++)
    {
        var pr = prods[i].innerHTML.toLowerCase();
        var inplow = input.toLowerCase();
        if(input.length > 0 && pr.includes(inplow))
        {
            prods[i].style.display = 'flex';
        }
        else
        {
            prods[i].style.display = 'none';
        }
    }
}