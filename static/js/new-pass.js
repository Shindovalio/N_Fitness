var password = document.querySelector("#password");
var password_missing = document.querySelector(".password-missing");

var password2 = document.querySelector("#password2");
var password2_missing = document.querySelector(".password2-missing");

var lowercase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numbers = "0123456789".split("");
var symbols = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");

function checkNum()
{
    if(password.value.length != 0)
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
function checkLower()
{
    if(password.value.length != 0)
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
function missingPass3()
{
    if(password.value.length == 0)
    {
        password_missing.innerHTML = "&#9888; Required Field.";
        password_missing.style.opacity = "1";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.style.opacity = "0";
        password.style.border = "rgba(0,0,0,0)";
        password.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingPass4()
{
    if(password2.value.length == 0)
    {
        password2_missing.innerHTML = "&#9888; Required Field.";
        password2_missing.style.opacity = "1";
        password2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password2_missing.style.opacity = "0";
        password2.style.border = "rgba(0,0,0,0)";
        password2.style.background = "rgb(241,241,241)";
        return true;
    }
}
function comparePass2()
{
    if(password2.value != password.value && password.value.length != 0 && password2.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; Passwords do NOT match.";
        password_missing.style.opacity = "1";
        return false;
    }
    else
    {
        passStrength2();
    }
}
function passStrength2()
{
    if(password.value.length < 6 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; New Password should be at least 6 characters."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkLower()==0)
    {
        password_missing.innerHTML = "&#9888; New Password should contain at least 1 letter [A-Z]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum()==0)
    {
        password_missing.innerHTML = "&#9888; New Password should contain at least 1 digit [0-9]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "0";
        password.style.border = "rgba(0,0,0,0)";
        password.style.background = "rgb(241,241,241)";
        return true;
    }
}
function validate4()
{
    comparePass2();
    passStrength2();
    missingPass3();
    missingPass4();
    if(missingPass3() == 0 || missingPass4() == 0 || comparePass2() == 0 || passStrength2() == 0)
    {
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