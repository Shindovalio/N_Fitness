var email = document.querySelector("#email");
var email_missing = document.querySelector(".email-missing");

function missingEmail()
{
    if(email.value == 0)
    {
        email_missing.style.opacity = "1";
        email.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        email_missing.style.opacity = "0";
        email.style.background = "rgb(241,241,241)";
        return true;
    }
}
function validate3()
{
    if(missingEmail() == 0)
    {
        missingEmail();
        return false;
    }
    else
    {
        return true;
    }
}
function focusOut(namec, namec_missing)
{
    namec.style.background = "rgb(241,241,241)";
    namec_missing.style.opacity = "0";
}