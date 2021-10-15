var dimcho2 = document.querySelector('.dimcho2');
var popup = document.querySelector('.referral');

function showPop()
{
    setTimeout(function(){
        if(dimcho2 != null)
        {
            dimcho2.style.display = "block";
            popup.style.display = "flex";
        }
    }, 5000)
}
showPop();
function referBack(path, message) 
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() 
    {
        if (http.readyState === 4 && http.status === 200) 
        {
            if(parseInt(this.responseText) == 0)
            {
                popup.remove();
                dimcho2.remove();
            }
            if(parseInt(this.responseText) == 1)
            {
                popup.innerHTML = 'Sorry, you have to use your first given link before referring another friend!';
                popup.style.justifyContent = 'center';
                popup.style.fontSize = '25px';
                popup.style.color = 'rgb(0,162,232)';
                popup.style.textAlign = 'center';
            }
            else
            {
                link = 'https://nfit.co.uk/referrals/' + this.responseText;
                popup.innerHTML = '<div style="user-select:none;">Give the link below to your friend and redeem your discount codes!</div><input style="color: rgb(0,162,232); font-size: 20px; border: none; outline: none; width: 100%; text-align: center;" type="text" value="' + link + '" id="linkec"><div class="copiec" style="cursor: pointer;" onclick="copyLink()">Copy link</div>';
                popup.style.justifyContent = 'space-evenly';
                popup.style.fontSize = '25px';
                popup.style.color = 'rgb(0,162,232)';
                popup.style.textAlign = 'center';
            }
        }
    };
    http.open('POST', path, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(message);
}
function copyLink() 
{
    /* Get the text field */
    var copyText = document.querySelector("#linkec");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    document.querySelector(".copiec").innerHTML = "Copied to clipboard";
}
function copyCode1()
{
    /* Get the text field */
    var copyText = document.querySelector(".code1");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    document.querySelector(".code1-copy").innerHTML = "Copied to clipboard";
}
function copyCode2()
{
    /* Get the text field */
    var copyText = document.querySelector(".code2");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    document.querySelector(".code2-copy").innerHTML = "Copied to clipboard";
}