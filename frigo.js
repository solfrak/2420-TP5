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
    console.log(listfrigo);

    for (let x = 0; x < listfrigo.length; x = x + 3) {
        document.getElementById("listfrigo").innerHTML += "<div class = 'row' id='inListFrigo'>";
        document.getElementById("inListFrigo").innerHTML += listfrigo[x].print();
        if(x+1 < listfrigo.length){
            document.getElementById("inListFrigo").innerHTML += listfrigo[x+1].print();
        }
        if(x+2 < listfrigo.length){
            document.getElementById("inListFrigo").innerHTML += listfrigo[x+2].print();
        }
        document.getElementById("listfrigo").innerHTML += "</div>";
    }

    for (let x = 0; x < listfrigo.length; x++) {
        let monImg = document.getElementById(listfrigo[x].id + "net");
        if(listfrigo[x].nettoyer == 0){
            monImg.style.visibility = "hidden";
        }
        else{
            monImg.style.visibility = "visible";
        }
        

    }
    createFrigoPopup(listfrigo)
    
    let ServiceReparation = document.getElementById("frigoDefectueux");

    for (let x = 0; x < listfrigo.length; x = x + 1) {//Pour chaque frigo
        let option = document.createElement("option");//creer une option
        let IDFrigo = "Frigo" + listfrigo[x].id;
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

// class FRIGO extends HTMLElement{
    
//     constructor(){
//         super();
//         this.root = this.attachShadow({mode: "open"});
//         this.listFrigo = [];
//         this.nom = "empty";
//         this.fichier = "";
//     }
   
//         this.root.innerHTML = `
//         <template id='template-frigo'>
//                 <div class='nom' id = 'nom'>
//                 </div>
//         </template>`;

// }
// window.customElements.define('un-frigo', FRIGO);
// var elem = document.querySelector('un-frigo');
// console.log(elem.attributes);
// console.log(elem.getAttribute("nom"));

