class Test extends HTMLElement {
    constructor() {
        super();


        this._root = this.attachShadow({ mode: 'open' });


        this.frigos = [];
        this.fichier = '';



        this._root.innerHTML = `
        <style>
      
          .x{
            filter: grayscale(1);
            filter:invert(100%);
          }
            .frame {
                margin: 5px;
                padding:5px;
                
            }
            .grid-container{
                display: grid;
                grid-template-columns: 33% 33% 33%;
            }

            .hidden{
               display:none;
                visibility: hidden;
            }
            .visible{
                display: inline;

            }
            .popup_title{
                margin: 180px;
                font-size:24px;

            }
            .popup{
                display: none;
                z-index: 10;
                background-color: rgba(245, 245, 245, 0.95);
                position: fixed;
                width: 500px;
                height: 285px;
                top: 50%;
                left: 50%;
                margin-top: -142px;
                margin-left: -291px;
                padding: 20px 15px 0px 15px;
                border-radius: 5px;
                box-shadow: 2px 2px 5px rgb(0 0 0 / 35%);
              }
              .xButton{
                top: 10px;
                right: 10px;
                width: 15px;
                height: 15px;
                border-width: 0px;
                z-index: 5;
                position: absolute;
              }
              .xButton:hover{
                cursor: pointer;
              }

              .grid-container-2{
                display: grid;
                grid-template-columns: 20% 20% 20% 20% 20%;
            }
             .verticalhorizontal {
                 margin: auto;
             }
             
            #Nettoyage{
            
                width:150px;
                height:40px;
                border-radius: 5px;  
                font-size: 18px;
                
                text-align: center;
                color: rgb(255,255,255);
                vertical-align: none;
                text-align: center;
                background-color:rgb(0, 140, 140);
                border-color: transparent;
          
            }
            #Nettoyage:hover{
                background-color:rgba(0, 140, 140, 0.8);
                cursor:pointer;
            }
            .visiblePropre{
                margin-top: 87px;
            }
            .visibleSale{
                margin-top: 46px;
               width: 106px;
               height: 241px;
            }
            #frigoID{
                text-align:center;

            }
            .row2, .row3{
                text-align:center;
                position:relative;
                bottom:;

            }
           
        </style>
        <template id="template-frigo">
            <div id="frigo-item" class="frame">
             
                <div class="row2">
                    
                <img src="/picture/FrigoSale.png" alt="" id="myImg2" class="hidden">
                    <img src="/picture/frigo.png" alt="" style='width: 200px; margin-left: auto; margin-right: auto;' id="frigo" class="visiblePropre">
                   
                </div>
                <div class="row3">
                   
                    <span id="frigoID">Frigo: </span>
                   
                </div>
            </div>
        </template> 

        <template id="template-frigo-popup">
              
        </template>
        
        <div id="result" class="grid-container"></div>
        <div id="FrigoPopupContainer"></div>
    `;
    }


    connectedCallback() {
        console.log("custom")
        let jData;
        $.ajaxSetup({
            async: false
        });
        $.getJSON(this.fichier, function (data) {
            jData = data;
        })
        this.frigos = jData;
        this.frigos = jData;

        this.templateContent = this._root.querySelector('#template-frigo').content;
        this.result = this._root.querySelector('#result');
        this.container = this._root.querySelector("#FrigoPopupContainer");
        this.frigos.map(frigo => {
            const clone = document.importNode(this.templateContent, true);

            const cadre_item = clone.querySelector("#frigo-item");
            cadre_item.setAttribute("id", frigo.id);



            clone.querySelector("#frigoID").innerHTML += frigo.id;



            clone.querySelector("#myImg2").setAttribute("id", "myImg" + frigo.id);
            clone.querySelector("#frigo").setAttribute("id", "frigo" + frigo.id);
            //create popup
            let popupContainer = document.createElement("div");

            let popup = document.createElement("div");
            popup.className = "popup";
            popup.id = "popup" + frigo.id;

            let myImg = document.createElement("img");
            myImg.className = "xButton x";
            myImg.id = "xButton";
            myImg.src = "https://image.flaticon.com/icons/png/512/458/458595.png";

            myImg.onclick = function () {
                closePopupFrigo(popup.id);
            }

            let myTitle = document.createElement("span");
            myTitle.className = "popup_title";
            myTitle.innerHTML = "Frigo ID: " + frigo.id;
            popup.appendChild(myImg);
            popup.appendChild(myTitle);


            popupContainer.appendChild(popup);
            this.container.appendChild(popupContainer);

            let d = new Date();
            for (let x in frigo.aliment) {
                let p = new Date(frigo.aliment[x].year, frigo.aliment[x].month, frigo.aliment[x].date);
                if (p < d) {
                    clone.querySelector("#myImg" + frigo.id).setAttribute("class", "visibleSale");
                    clone.querySelector("#myImg" + frigo.id).setAttribute("onClick", "openPopupFrigo(" + frigo.id + ")");
                    clone.querySelector("#frigo" + frigo.id).setAttribute("class", "hidden");
                   
+
                    // clone.getElementById("frigo").src = "/picture/FrigoSale.png";

                    console.log(p.toLocaleDateString());
                }
                let contenu = document.createElement("div");
                contenu.className = "grid-container-2";
                contenu.id = "contenu" + frigo.id + x;

                //create x symbol
                let xButton = document.createElement("center");
                xButton.className = "verticalhorizontal x";
                xButton.id = "x" + frigo.id + x;
                let myImg = document.createElement("img");
                myImg.src = "https://image.flaticon.com/icons/png/512/458/458595.png";
                myImg.style = "width: 20px; text-align: center; ";
                if (p > d) {
                    xButton.style.visibility = "hidden";
                }

                xButton.setAttribute("onClick", "removeFood('" + "contenu" + frigo.id + x + "')");
                xButton.appendChild(myImg);

                //create name
                let name = document.createElement("p");
                name.innerHTML = frigo.aliment[x].nom;

                //create if perime
                let perime = document.createElement("p");
                perime.id = "perime" + frigo.id;

                if (p < d) {
                    perime.innerHTML = "Périmé";
                    perime.style.color = "red";
                }
                else {
                    perime.innerHTML = "Non périmé";
                }

                //create date
                let mydate = document.createElement("p");
                mydate.innerHTML = p.toLocaleDateString();

                //create checkbox
                let container = document.createElement("div");
                container.className = "verticalhorizontal";

                let myCheck = document.createElement("input");
                myCheck.type = "checkbox";
                myCheck.id = "checkbox" + frigo.id + x;
                let myLabel = document.createElement("label");
                myLabel.setAttribute("for", "checkbox" + frigo.id + x);
                myLabel.innerHTML = "Moisi";
                if (p > d) {
                    myCheck.setAttribute("onClick", "ToggleXButton(" + frigo.id + x + ")");
                }
                container.appendChild(myCheck);
                container.appendChild(myLabel);

                contenu.appendChild(xButton);
                contenu.appendChild(name);
                contenu.appendChild(perime);
                contenu.appendChild(mydate);
                contenu.appendChild(container);

                popup.appendChild(contenu);

            }
            let center = document.createElement("center");
            let button = document.createElement("button");
            button.innerHTML = "Fin nettoyage";
            //Bouton fin nettoyage
            button.setAttribute("onClick", "finNettoyage('" + frigo.id + "')")
            button.id = "Nettoyage"
            console.log(frigo.id)
            center.appendChild(button);
            popup.appendChild(center);

            clone.querySelector("#frigo" + frigo.id).setAttribute("onClick", "openPopupFrigo(" + frigo.id + ")");

            this.result.appendChild(clone);
        });
    }

    static get observedAttributes() {
        return ["frigos", 'fichier'];
    }

    attributeChangedCallback(name, oldValue, newValue) {


        if (name === 'frigos') {
            this.frigos = newValue;
        }

        if (name === 'fichier') {
            this.fichier = newValue;
        }
    }
}
function removeFood(id) {

    let elem = document.querySelector('test-frigo').shadowRoot.getElementById(id);
    elem.parentNode.removeChild(elem);
}
function openPopupFrigo(d) {
    document.querySelector('test-frigo').shadowRoot.getElementById("popup" + d).style.display = "block";
}

function finNettoyage(id) {
    var popUp = document.querySelector("test-frigo").shadowRoot.querySelector("#popup" + id);
    popUp.style.display = "none";

    document.querySelector("test-frigo").shadowRoot.querySelector("#myImg" + id).setAttribute("class", "hidden");
    document.querySelector("test-frigo").shadowRoot.querySelector("#frigo" + id).setAttribute("class", "visiblePropre");


}
function closePopupFrigo(id) {
    var popUp = document.querySelector("test-frigo").shadowRoot.querySelector("#" + id);
    popUp.style.display = "none";

}

function ToggleXButton(id) {
    console.log("toggle");
    let xButton = document.querySelector("test-frigo").shadowRoot.querySelector("#x" + id);


    if (xButton.style.visibility == "hidden") {
        xButton.style.visibility = "visible";
    }
    else {
        xButton.style.visibility = "hidden";
    }
}


window.customElements.define('test-frigo', Test);