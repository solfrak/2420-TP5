
function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var benevoleCheckbox = document.getElementById("benevole");
    if(username == "jbradette" && password == "123456" && benevoleCheckbox.checked == true)
    {   
        location.href = './mainPage.html';
    }
    else{
        document.getElementById("error").style.visibility = "visible";
    }
}

document.getElementById("button_connecter").addEventListener("click", login);
