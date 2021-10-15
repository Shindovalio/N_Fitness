var fname = document.querySelector("#fname");
var fname_missing = document.querySelector(".fname-missing");

var lname = document.querySelector("#lname");
var lname_missing = document.querySelector(".lname-missing");

var email = document.querySelector("#email");
var email_missing = document.querySelector(".email-missing");

var password0 = document.querySelector("#password0");
var password0_missing = document.querySelector(".password0-missing");

var password = document.querySelector("#password");
var password_missing = document.querySelector(".password-missing");

var password2 = document.querySelector("#password2");
var password2_missing = document.querySelector(".password2-missing");

var feedback = document.querySelector("#feedback");
var feedback_missing = document.querySelector(".feedback-missing");

var lowercase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numbers = "0123456789".split("");
var symbols = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");

var info = document.querySelectorAll(".info");
var butt = document.querySelectorAll(".desktop");
var butt2 = document.querySelectorAll(".mobile");

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
function missingPass0()
{
    if(password0.value == 0)
    {
        password0_missing.style.opacity = "1";
        password0.style.border = "1px solid red";
        password0.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password0_missing.style.opacity = "0";
        password0.style.border = "none";
        password0.style.background = "white";
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
function missingFeedback()
{
    if(feedback.value == 0)
    {
        feedback_missing.style.opacity = "1";
        feedback.style.border = "1px solid red";
        feedback.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        feedback_missing.style.opacity = "0";
        feedback.style.border = "none";
        feedback.style.background = "rgb(241,241,241)";
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
    else if(password2.value == 0)
    {
        password2_missing.style.opacity = "1";
        password2.style.border = "1px solid red";
        password2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        passStrength();
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
function checkUpper()
{
    if(password.value != 0)
    {
        var checked;
        for(var i=0; i<uppercase.length; i++)
        {
            if(password.value.includes(uppercase[i]))
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
function checkSymbol()
{
    if(password.value != 0)
    {
        var checked;
        for(var i=0; i<symbols.length; i++)
        {
            if(password.value.includes(symbols[i]))
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
function passStrength()
{
    if(password.value.length < 6 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; Password should be at least 6 characters."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkLower()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 ENGLISH letter."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 number."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(password.value == 0)
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
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
function validate2()
{
    if(missingFName()==0 || missingLName()==0 || missingEmail()==0 || missingPass()==0 || missingPass2()==0 || comparePass()==0 || passStrength() == 0)
    {
        missingFName();
        missingLName();
        missingEmail();
        missingPass();
        missingPass2();
        comparePass();
        passStrength();
        return false;
    }
    else
    {
        return true;
    }
}
function validate3()
{
    if(missingFName()==0 || missingLName()==0 || missingEmail()==0 || missingFeedback()==0)
    {
        missingFName();
        missingLName();
        missingEmail();
        missingFeedback();
        return false;
    }
    else
    {
        return true;
    }
}
function validate4()
{
    if(missingPass0()==0 || missingPass()==0 || missingPass2()==0 || comparePass()==0 || passStrength()==0)
    {
        missingPass0();
        missingPass();
        missingPass2();
        comparePass();
        passStrength();
        return false;
    }
    else
    {
        return true;
    }
}
function switchInfo(n)
{
    for(var i = 0; i<4; i++)
    {
        info[i].style.display = "none";
        butt[i].style.background = "rgb(0,162,232)";
        butt[i].style.color = "white";
    }
    info[n].style.display = "flex";
    butt[n].style.background = "white";
    butt[n].style.color = "rgb(0,162,232)";
}
function switchInfo2(n)
{
    for(var i = 0; i<4; i++)
    {
        info[i].style.display = "none";
    }
    info[n].style.display = "flex";
    if(n == 0)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-gray.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 1)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-gray.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 2)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-gray.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 3)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-gray.png')";
    }
}

var add1 = document.querySelector('#address-1');
var add1_missing = document.querySelector('.address1-missing');
var add2 = document.querySelector('#address-2');
var add2_missing = document.querySelector('.address2-missing');
var code = document.querySelector('#post-code');
var code_missing = document.querySelector('.post-code-missing');
var city = document.querySelector('#city');
var city_missing = document.querySelector('.city-missing');
var country = document.querySelector('#country');
var country_missing = document.querySelector('.country-missing');

function missingAdd1()
{
    if(add1.value == 0)
    {
        add1_missing.style.opacity = "1";
        add1.style.border = "1px solid red";
        add1.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add1_missing.style.opacity = "0";
        add1.style.border = "none";
        add1.style.background = "white";
        return true;
    }
}
function missingAdd2()
{
    if(add2.value == 0)
    {
        add2_missing.style.opacity = "1";
        add2.style.border = "1px solid red";
        add2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add2_missing.style.opacity = "0";
        add2.style.border = "none";
        add2.style.background = "white";
        return true;
    }
}
function missingCode()
{
    if(code.value == 0)
    {
        code_missing.style.opacity = "1";
        code.style.border = "1px solid red";
        code.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        code_missing.style.opacity = "0";
        code.style.border = "none";
        code.style.background = "white";
        return true;
    }
}
function missingCity()
{
    if(city.value == 0)
    {
        city_missing.style.opacity = "1";
        city.style.border = "1px solid red";
        city.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        city_missing.style.opacity = "0";
        city.style.border = "none";
        city.style.background = "white";
        return true;
    }
}
function missingCountry()
{
    if(country.value == "0")
    {
        country_missing.style.opacity = "1";
        return false;
    }
    else
    {
        country_missing.style.opacity = "0";
        return true;
    }
}
function missingPass3()
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
        password.style.background = "white";
        return true;
    }
}
function missingPass4()
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
        password2.style.background = "white";
        return true;
    }
}
function comparePass2()
{
    if(password2.value != password.value && password.value != 0 && password2.value != 0)
    {
        password_missing.innerHTML = "&#9888; Passwords do NOT match."
        password_missing.style.opacity = "1";
        return false;
    }
    else if(password2.value == 0)
    {
        password2_missing.style.opacity = "1";
        password2.style.border = "1px solid red";
        password2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        passStrength2();
        return true;
    }
}
function passStrength2()
{
    if(password.value.length < 6 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; Password should be at least 6 characters."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkLower()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 ENGLISH letter."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum()==0)
    {
        password_missing.innerHTML = "&#9888; Password should contain at least 1 number."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(password.value == 0)
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "0";
        password.style.border = "none";
        password.style.background = "white";
        return true;
    }
}
function validate5()
{
    if(missingAdd1()==0 || missingAdd2()==0 || missingCode()==0 || missingCity()==0 || missingCountry()==0)
    {
        missingAdd1();
        missingAdd2();
        missingCode();
        missingCity();
        missingCountry();
        return false;
    }
    else
    {
        return true;
    }
}