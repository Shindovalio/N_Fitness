var fname = document.querySelector("#fname");
var fname_missing = document.querySelector(".fname-missing");

var lname = document.querySelector("#lname");
var lname_missing = document.querySelector(".lname-missing");

var email = document.querySelector("#email");
var email_missing = document.querySelector(".email-missing");

var password = document.querySelector("#password");
var password_missing = document.querySelector(".password-missing");

var password2 = document.querySelector("#password2");
var password2_missing = document.querySelector(".password2-missing");

var lowercase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numbers = "0123456789".split("");
var symbols = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");

function missingFName()
{
    if(fname.value == 0)
    {
        fname_missing.style.opacity = "1";
        fname.style.border = "1px solid red";
        fname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        fname_missing.style.opacity = "0";
        fname.style.border = "none";
        fname.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingLName()
{
    if(lname.value == 0)
    {
        lname_missing.style.opacity = "1";
        lname.style.border = "1px solid red";
        lname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        lname_missing.style.opacity = "0";
        lname.style.border = "none";
        lname.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingEmail()
{
    if(email.value == 0)
    {
        email_missing.style.opacity = "1";
        email.style.border = "1px solid red";
        email.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        email_missing.style.opacity = "0";
        email.style.border = "none";
        email.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingPass()
{
    if(password.value == 0)
    {
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.style.opacity = "0";
        password.style.border = "none";
        password.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingPass2()
{
    if(password2.value == 0)
    {
        password2_missing.style.opacity = "1";
        password2.style.border = "1px solid red";
        password2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password2_missing.style.opacity = "0";
        password2.style.border = "none";
        password2.style.background = "rgb(241,241,241)";
        return true;
    }
}
function comparePass()
{
    if(password2.value != password.value && password.value != 0 && password2.value != 0)
    {
        password_missing.innerHTML = "&#9888; Passwords do NOT match."
        password_missing.style.opacity = "1";
        return false;
    }
    else
    {
        passStrength();
    }
}
function passStrength()
{
    if(password.value.length < 6 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; Password should be at least 6 characters."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        return false;
    }
    else if(checkLower()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 letter [A-Z]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        return false;
    }
    else if(checkNum()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 digit [0-9]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        return false;
    }
    else
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "0";
        password.style.border = "none";
        password.style.background = "rgb(241,241,241)";
        return true;
    }
}
function checkNum()
{
    if(password.value != 0)
    {
        var checked;
        for(var i=0; i<numbers.length; i++)
        {
            if(password.value.includes(numbers[i]))
            {
                checked = 1;
                break;
            }
            else
            {
                checked = 0;
            }
        }
        return checked;
    }
    else
    {
        return 1;
    }
}
function checkNum2(name1)
{
    if(name1.value != 0)
    {
        var checked;
        for(var i=0; i<numbers.length; i++)
        {
            if(name1.value.includes(numbers[i]))
            {
                checked = 1;
                break;
            }
            else
            {
                checked = 0;
            }
        }
        return checked;
    }
}
function checkLower()
{
    if(password.value != 0)
    {
        var checked;
        for(var i=0; i<lowercase.length; i++)
        {
            if(password.value.includes(lowercase[i]))
            {
                checked = 1;
                break;
            }
            else
            {
                checked = 0;
            }
        }
        return checked;
    }
    else
    {
        return 1;
    }
}
function validate2()
{
    if(missingFName()==0 || missingLName()==0 || missingEmail()==0 || missingPass()==0 || missingPass2()==0 || comparePass()==0 || passStrength() == 0 || fnameLen() == 0 || lnameLen() == 0)
    {
        fnameLen();
        lnameLen();
        missingFName();
        missingLName();
        missingEmail();
        missingPass();
        missingPass2();
        comparePass();
        return false;
    }
    else
    {
        return true;
    }
}
function fnameLen()
{
    if(fname.value.length > 12)
    {
        fname_missing.innerHTML = "&#9888; Max Characters Exceeded.";
        fname_missing.style.opacity = "1";
        fname.style.border = "1px solid red";
        fname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum2(fname))
    {
        fname_missing.innerHTML = "&#9888; Name cannot include numbers.";
        fname_missing.style.opacity = "1";
        fname.style.border = "1px solid red";
        fname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        fname_missing.innerHTML = "&#9888; Required Field.";
        fname_missing.style.opacity = "0";
        fname.style.border = "none";
        fname.style.background = "rgb(241,241,241)";
        return true;
    }
}
function lnameLen()
{
    if(lname.value.length > 12)
    {
        lname_missing.innerHTML = "&#9888; Max Characters Exceeded.";
        lname_missing.style.opacity = "1";
        lname.style.border = "1px solid red";
        lname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum2(lname))
    {
        lname_missing.innerHTML = "&#9888; Name cannot include numbers.";
        lname_missing.style.opacity = "1";
        lname.style.border = "1px solid red";
        lname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        lname_missing.innerHTML = "&#9888; Required Field.";
        lname_missing.style.opacity = "0";
        lname.style.border = "none";
        lname.style.background = "rgb(241,241,241)";
        return true;
    }
}
function focusOut(namec, namec_missing)
{
    namec.style.background = "rgb(241,241,241)";
    namec_missing.style.opacity = "0";
}