var quant = document.querySelectorAll('.qnt');
var allowed = ['0','1','2','3','4','5','6','7','8','9'];
validation(num)
{
    var stri = String(quant[num].value);
    for(var i = 0; i< stri.length; i++)
    {
        if(!(allowed.includes(stri[i])))
        {
            quant.style.border = "1px solid red";
            return false;
            
        }
    }
    return true;
}