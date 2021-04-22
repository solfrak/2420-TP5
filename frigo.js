fetch("./frigo.json")
    .then(response => {

        return response.json();
    })
    .then(data => {
        frigo(data);
    });

function frigo(data) {
    document.getElementById("titre").innerHTML = data.donne[0].titre;
    document.getElementById("sous-titre").innerHTML = data.donne[1].titre;
    document.getElementById("fleche").innerHTML = data.donne[2].fleche;
    let listfrigo = [];

    for (x in data.frigo) {
        listfrigo.push(new unFrigo(data.frigo[x].id, data.frigo[x].nettoyer, data.frigo[x].contenu.nom, data.frigo[x].contenu.year, data.frigo[x].contenu.month, data.frigo[x].contenu.date));
    }

    let ServiceReparation = document.getElementById("frigoDefectueux");

    for (let x = 0; x < listfrigo.length; x = x + 1) {//Pour chaque frigo
        let option = document.createElement("option");//creer une option
        let IDFrigo = "Frigo " + listfrigo[x].id;
        option.innerHTML = IDFrigo;
        option.value = IDFrigo;
        ServiceReparation.appendChild(option);
    }

}

function createFrigoPopup(listfrigo){
    let frigoPopup = document.getElementById("frigoPopup");
    let popupContainer = document.createElement("div");
    let myGrid = document.createElement("div");
    for(x in listfrigo){
        let popup = document.createElement("div");
        popup.className = "popup";
        popup.id = "popup" + listfrigo[x].id;

        let myImg = document.createElement("img");
        myImg.className = "xButton";
        myImg.id = "xButton";
        myImg.src = "https://image.flaticon.com/icons/png/512/458/458595.png";

        myImg.onclick = function(){
            fermerPopup(popup.id);
        }

        let myTitle = document.createElement("span");
        myTitle.className = "popup_title";
        myTitle.innerHTML = "Frigo ID: " + listfrigo[x].id;

        myGrid.className = "container-fluid";
        let myRow = document.createElement("div");
        myRow.className = "row";
        let xButton = document.createElement("img");
        
        
        popup.appendChild(myImg);
        popup.appendChild(myTitle);
        popupContainer.appendChild(popup);
    }
    frigoPopup.appendChild(popupContainer);

}
function fermerPopup(id) {
 
    var popUp = document.getElementById(id);
    popUp.style.visibility = "hidden";
}

function espaceEntretient() {
    location.href = './mainPage.html';
}

function openReparation() {
    document.getElementById("popupReparation").style.visibility = "visible";
}

function alerterReparation()
{
    alert('Le rapport de réparation a bien été envoyé.');
}

document.getElementById("imageReparation").addEventListener("click", openReparation);
document.getElementById("flecheEspaceEntretient").addEventListener("click", espaceEntretient);

class unFrigo {
    constructor(id, nettoyer, listeAliments) {

        this.id = id;
        this.nettoyer = nettoyer;
        this.listeAliments = listeAliments;
    }

    print() {
            return "<div class='col-md-4'><div class='container-fluid'><div class='row'><img src='/picture/u82.svg' style='margin-left: 30%;' id='"+ this.id + "net" +"'></div><div class='row'><img src='/picture/frigo.png' style='width: 200px; margin-left: auto; margin-right: auto;'></div><div class='row'><span style='margin: auto;'>" + this.id + "</span></div></div>";
    }
}

// document.querySelector('test-frigo').shadowRoot.querySelector("#myImg001").setAttribute("class", "");
