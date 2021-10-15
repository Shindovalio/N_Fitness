var fname = document.querySelector("#fname");
var fname_missing = document.querySelector(".fname-missing");

var lname = document.querySelector("#lname");
var lname_missing = document.querySelector(".lname-missing");

var email = document.querySelector("#email");
var email_missing = document.querySelector(".email-missing");

var feedback = document.querySelector("#feedback");
var feedback_missing = document.querySelector(".feedback-missing");

function missingFName()
{
    if(fname.value == 0)
    {
        fname_missing.style.opacity = "1";
        fname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        fname_missing.style.opacity = "0";
        fname.style.background = "rgb(241,241,241)";
        return true;
    }
}
function missingLName()
{
    if(lname.value == 0)
    {
        lname_missing.style.opacity = "1";
        lname.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        lname_missing.style.opacity = "0";
        lname.style.background = "rgb(241,241,241)";
        return true;
    }
}
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
function missingFeedback()
{
    if(feedback.value == 0)
    {
        feedback_missing.style.opacity = "1";
        feedback.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        feedback_missing.style.opacity = "0";
        feedback.style.background = "rgb(241,241,241)";
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
function focusOut(namec, namec_missing)
{
    namec.style.background = "rgb(241,241,241)";
    namec_missing.style.opacity = "0";
}