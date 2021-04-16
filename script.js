fetch("./data.json")
.then(response => {
    
    return response.json();
})
.then(data => {
    fTitre(data);
    fBottin(data);
    fNouvelles(data);
    fGuide(data);
});

function checkMediaWidth(){
    if(window.innerWidth <=600){
        document.getElementById("CommentaireBox").value = "Autres:";
    }
    else{
        document.getElementById("CommentaireBox").value = "";
    }
}



function fCommande(){
    let savon = document.getElementById("produit1Input").value;
    let guenille = document.getElementById("produit2Input").value;
    let desodorisant = document.getElementById("produit3Input").value;
    let ampoule = document.getElementById("produit4Input").value;
    let commentaire = document.getElementById("CommentaireBox").value;
    document.getElementById("Savon").innerHTML = "Savon: " + savon;
    document.getElementById("Guenille").innerHTML ="Guenille: " + guenille;
    document.getElementById("Désodorisant").innerHTML ="Désodorisant: " + desodorisant;
    document.getElementById("Ampoules").innerHTML ="Ampoules: " + ampoule;
    document.getElementById("Commentaire").innerHTML = commentaire;
    console.log(document.getElementById("popup3"));
    document.getElementById("CommandePopup").style.visibility = "visible";
    document.getElementById("background").style.visibility ="visible";
}

function fGuide(data){
    let guide = document.getElementById("Guide");
    //Creation popup guide
    let popupContainer = document.createElement("div");
    for(x in data.Guide){
        let popup = document.createElement("div");
        popup.className = "popup2 popup";
        popup.id = "GuidePopup" + x;

        let myImg = document.createElement("img");
        myImg.className = "xButton";
        myImg.id = "xButton2"
        myImg.src = "https://image.flaticon.com/icons/png/512/458/458595.png";

        myImg.onclick = function(){
            popupButton(popup.id);
        };

        let myTitle = document.createElement("h1");
        myTitle.className = "popup_title";
        myTitle.innerHTML = data.Guide[x].titre;

        let myDescription = document.createElement("p");
        myDescription.className = "popup_p popup2_p";
        myDescription.innerHTML = data.Guide[x].description;

        popup.appendChild(myImg);
        popup.appendChild(myTitle);
        popup.appendChild(myDescription);
        popupContainer.appendChild(popup);
    }

    guide.appendChild(popupContainer);

    //Creation guide liste
    let myListe = document.createElement("ul");

    for(x in data.Guide){
        let itemListe = document.createElement("li");
        itemListe.id = "item" +x;
        itemListe.onclick = function(){
            popup2(this.id[4]);
        };

        let myTitle = document.createElement("span");
        myTitle.className = "Guide firstGuide";
        myTitle.id = "firstGuide" +x;
        myTitle.innerHTML = data.Guide[x].titre;

        let retourLigne = document.createElement("br");

        itemListe.appendChild(myTitle);
        
        myListe.appendChild(itemListe);
    }

    guide.appendChild(myListe);
}

function fNouvelles(data){
    let news = document.getElementById("Nouvelles");
    //Creation popup
    let popupContainer = document.createElement("div");
    for(x in data.Nouvelles){
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "popup" + x;
    
    let myImg = document.createElement("img");
    myImg.className = "xButton";
    myImg.id = "xButton";
    myImg.src = "https://image.flaticon.com/icons/png/512/458/458595.png";

    myImg.onclick = function(){
        popupButton(popup.id);
    }
    
    let myTitle = document.createElement("span");
    myTitle.className = "popup_title";
    myTitle.innerHTML = data.Nouvelles[x].titre;

    let myDescription = document.createElement("p");
    myDescription.className = "popup_p";
    myDescription.innerHTML = data.Nouvelles[x].descriptionDetail; 

    popup.appendChild(myImg);
    popup.appendChild(myTitle);
    popup.appendChild(myDescription);
    popupContainer.appendChild(popup);
    }
    news.appendChild(popupContainer);

    //Creation nouvelles
    let unList = document.createElement("ul");
    for(x in data.Nouvelles){
        let itemListe = document.createElement("li");
        itemListe.className = "article-container";
        let article = document.createElement("div");
        article.onclick = function(){
            
            popup(this.id[16]);
        };
        article.className = "firstarticlecontainer";
        article.id = "articleConainter" + x;

        let articleTitle = document.createElement("span");
        articleTitle.className = "article";
        articleTitle.id = "firstarticle";
        articleTitle.innerHTML = data.Nouvelles[x].titre;

        let articleDescription = document.createElement("span");
        articleDescription.className = "articlep";
        articleDescription.innerHTML = data.Nouvelles[x].description;

        let retourLigne = document.createElement("br");
        article.appendChild(articleTitle);
        article.appendChild(retourLigne);
        article.appendChild(articleDescription);

        itemListe.appendChild(article);
        unList.appendChild(itemListe);
    }
    
    news.appendChild(unList);
}
function fTitre(data)
{
    document.getElementById("titre").innerHTML = data.donne[0].titre;
    document.getElementById("sous-titre").innerHTML = data.donne[1].titre;
    document.getElementById("fleche").innerHTML = data.donne[2].fleche;    
}

function fBottin(data)  
{   
    let text ="";
    let email="";
    let x;
    let plus = "Plus..."
   
    for (x in data.bottin){
        text = data.bottin[x].name +" "+ data.bottin[x].lastName + " - "+ data.bottin[x].poste;
        email = '<p> <span>'+data.bottin[x].email +"</span>"+ "<img class='copy_icon' id ='copy_icon' src='/picture/u205.svg'>"+ '</p>';
        document.getElementById("bottin_liste").innerHTML += "<li><div class='nom'>" +  text +"</div>" + "<div class='email' onClick='copyToClipboard(this)'>" +  email + "</div>" + "</li>";
    }
    document.getElementById("bottin_liste").innerHTML += "<div class='plus'>" + plus + "</div>";
}



function copyToClipboard(elem){

    let division1 = elem.innerHTML.split('<span>'); //divise le string aux endroits avec <p>
    let division2 = division1[1].split('</span>');  //divise le string aux endroits avec </p>
    let text = document.createElement('textarea');
    text.value = division2[0]; // le email clicke
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    text.remove(); //on veut pas afficher le textarea
}   


function buttonPlus(id){
    console.log('button plus');
    let input = document.getElementById("produit" + id + "input");
    input.value += parseInt(input.value,10)+1;
    }    


 function buttonMinus(id){
    input.value += parseInt(input.value,10)-1;
 }

 function popup(elem){

    document.getElementById("popup" + elem).style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";
    
 }
 
 function popupButton(elemId){
    document.getElementById(elemId).style.visibility = "hidden";
    document.getElementById("background").style.visibility = "hidden";

 }

 function popup2(elem){
    document.getElementById("GuidePopup" + elem).style.visibility = "visible";
    document.getElementById("background").style.visibility = "visible";

 }

 
 function popupExitButton(){
     document.getElementById("popupExit").style.visibility = "visible";
 }

 function popupExitAnnuler(){
    document.getElementById("popupExit").style.visibility = "hidden";
}

 function popupExitOk(){
    location.href = './index.html';
}

function goToMesFrigos(){
    location.href = './frigos.html';
}

varPopupExitLoaded = document.getElementById("popupExit");
if(varPopupExitLoaded){
    document.getElementById("popupExitAnnuler").addEventListener("click", popupExitAnnuler);
    document.getElementById("popupExitOk").addEventListener("click", popupExitOk);

}


 
document.getElementById("u97_img").addEventListener("click", popupExitButton);

document.getElementById("flecheMesFrigos").addEventListener("click", goToMesFrigos);


//Function pour les commandes
function up(InputTextId){
    let input = document.getElementById(InputTextId);
    let quantite = parseInt(input.value);
    quantite++;
    input.value = quantite;
}


function down(InputTextId){
    let input = document.getElementById(InputTextId);
    let quantite = parseInt(input.value);
    quantite--;
    input.value = quantite;
}