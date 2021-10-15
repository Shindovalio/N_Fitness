var email = document.querySelector("#email");
var email_missing = document.querySelector(".email-missing");

var password = document.querySelector("#password");
var password_missing = document.querySelector(".password-missing");

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
function missingPass()
{
    if(password.value == 0)
    {
        password_missing.style.opacity = "1";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.style.opacity = "0";
        password.style.background = "rgb(241,241,241)";
        return true;
    }
}
function validate()
{
    if(missingEmail() == 0 || missingPass() == 0)
    {
        missingEmail();
        missingPass();
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