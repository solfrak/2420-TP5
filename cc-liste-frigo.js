// const template = document.createElement('template');
// template.innerHTML=

// class CCListeFrigo extends HTMLElement{
//     constructor(){
//         super();

//         this._root = this.attachShadow({mode: 'open'});

//         this.frigo = [];
//         this.fichier = "";


//         this._root.innerHTML = "<template id='template-frigo'><div class='frame' id = 'frigo-item'></template><div id='result'></div>";
//     }   

//     connectedCallback(){
//         let jData;
//         $.ajaxSetup({
//             async: false
//         });
//         $.getJSON(this.fichier, function (data) {
//             jData = data;
//         })
//         this.frigo = jData;


//         this.templateContent = this._root.querySelector('#template-frigo').content;
//         this.result = this._root.querySelector('#result');


//         this.frigo.map(frigo =>{
//             const clone = document.importNode(this.templateContent, true);
//             const cadre_item = clone.querySelector('#frigo-item');
//             cadre_item.setAttribute("id", vehicule.id);
            
//             this.result.appendChild(clone);
//         });
//     }
// }

// window.customElements.define('les-friogs', CCListeFrigo);
// console.log("test");

class CcListeVehicules extends HTMLElement {
    constructor() {
        super();//heriter les attributs et methodes de HTMLElement

        //obtient le shadow root pour recevoir le code encapsule'
        this._root = this.attachShadow({ mode: 'open' });

        //donnees
    
        this.vehicules = [];
        this.fichier = '';
        this.frigo = [];//
        this.fichierFrigo = '';//

        //defini le code encapsule'
        this._root.innerHTML = `
        <style>
            
            .frame {
                background-color: #33b5e5;
                color: #ffffff;
                margin: 5px;
                padding: 5px;
                width: 200px;
            }
            h1, h2 {
                color:blue;
            }
            .grid-container{
                display: grid;
                grid-template-columns: 33% 33% 33%;
            }
            
        </style>
        <template id="template-vehicule">
            <div class="frame col-md-4" id="vehicule-item">
                <div class='row'>
                    <div class='col-md-6' id = 'marque'></div>
                    <div class='col-md-6' id = 'modele'></div>
                </div>
                <p id="annee"></p>
            </div>
        </template>
        <div id="result" class="grid-container"></div>
    `;
    }


    //lorsque connecte'
    connectedCallback() {
        let jData;
        $.ajaxSetup({
            async: false
        });
        $.getJSON(this.fichier, function (data) {
            jData = data;
        })
        this.vehicules = jData;
        this.frigo=jData;
        //cree les variables avec le fragment du code encapsule'
        this.templateContent = this._root.querySelector('#template-vehicule').content;
        this.result = this._root.querySelector('#result');

        this.vehicules.map(vehicule => {
            //clone le templateContent - en cree' une copie
            const clone = document.importNode(this.templateContent, true);
        
            //prend la div d'un vehicule
            const cadre_item = clone.querySelector('#vehicule-item');
            cadre_item.setAttribute("id", vehicule.id);
            //met 'a jour le clone avec les donnees de chaque vehicule si demande'
                clone.querySelector('#marque').innerHTML = vehicule.marque;
                clone.querySelector('#marque').setAttribute("id", vehicule.id + '_marque');
                clone.querySelector('#modele').innerHTML = vehicule.modele;
                clone.querySelector('#modele').setAttribute("id", vehicule.id + '_modele');
                clone.querySelector('#annee').innerHTML = vehicule.annee;
                clone.querySelector('#annee').setAttribute("id", vehicule.id + '_annee');
            
            //ajoute le clone au shadow DOM
          
            this.result.appendChild(clone);
        });

        console.log(this.vehicules);
    }

    static get observedAttributes() {
        return ["vehicules", "affiche_marque", "affiche_modele", "affiche_annee", 'fichier'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //this._root.getElementById(name).innerHTML=newValue;   
        console.log('attributCHanged', name, oldValue, newValue);

        if (name === 'vehicules') {
            this.vehicules = newValue;
        }
        if (name === 'affiche_marque') {
            this.affiche_marque = newValue;
        }
        if (name === 'affiche_modele') {
            this.affiche_modele = newValue;
        }
        if (name === 'affiche_annee') {
            this.affiche_annee = newValue;
        }
        if (name === 'fichier') {
            this.fichier = newValue;
        }
    }


}//fin de la classe

//registre de la classe en dehors de la classe
window.customElements.define('cc-liste-vehicules', CcListeVehicules); // (tag , instance)






