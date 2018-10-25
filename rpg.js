document.getElementById('btndemarrage').addEventListener('click', jeu, false);


function jeu() {



    document.getElementById('btnattaquer').addEventListener('click', attaque, false);       //Si bouton btnattaquer cliqué -> executer fonction attaque
    document.getElementById('btnboutique').addEventListener('click', boutique, false);      //Si bouton btnboutique cliqué -> executer fonction boutique
    document.getElementById('btninventaire').addEventListener('click', inventaire, false);  //Si bouton btninventaire cliqué -> executer fonction inventaire
    document.getElementById('btncombat').addEventListener('click', combat, false);          //Si bouton btncombat cliqué -> executer fonction combat

    document.getElementById('btnPoFo').addEventListener('click', AjPoFo, false);    //Bouton d'ajout des potions
    document.getElementById('btnPoAg').addEventListener('click', AjPoAg, false);
    document.getElementById('btnPoEn').addEventListener('click', AjPoEn, false);
    document.getElementById('btnPoVi').addEventListener('click', AjPoVi, false);

    document.getElementById('UtilPoFo').addEventListener('click', UtilPoFo, false);    //Bouton d'utilisation des potions
    document.getElementById('UtilPoAg').addEventListener('click', UtilPoAg, false);
    document.getElementById('UtilPoEn').addEventListener('click', UtilPoEn, false);
    document.getElementById('UtilPoVi').addEventListener('click', UtilPoVi, false);

    var Pinv = [0,0,0,0]; //Tableau de l'inventaire du perso (4 types de potion)  [0]:Force  [1]:Agilité  [2]:Endurance  [3]:Vie

    var monstre = { //Objet Monstre avec 4 variable 
        Mnom : 'Méchant',
        Mfor : 5,
        Mend : 50,
        Mvie : 50
    }

    var perso = {   //Objet Personnage avec 6 variable et 1 tableau
        Pnom : document.getElementById('persoNom').value,   
        Pfor : 10,
        Pagi : 50,
        Pend : 100,
        Pvie : 100,
        Por : 10,   //nombre de piece d'or
        Pinv
    }



    //affichage des caracteristiques dans la div caractéristique
    document.getElementById('nom').value = perso.Pnom ;
    document.getElementById('force').value = perso.Pfor ;
    document.getElementById('agilite').value = perso.Pagi ;
    document.getElementById('endurance').value = perso.Pend ;
    document.getElementById('or').value = perso.Por ;

    
    //Cycle Jour-Nuit

    jourNuit();

    function jourNuit(){

        document.getElementById('journuit').innerHTML = 'Jour' ;               

        
        function timerNuit(){                                                   //Cette fonction va appeler la fonction suivante
            var timerNuit;

            if (timerNuit){
                clearInterval(timerNuit);
            }

            timerNuit = setInterval(function(){
                document.getElementById('journuit').innerHTML = 'Nuit';
                monstre.Mfor++;
                clearInterval(timerNuit);
                timerJour();
            }, 5000)
        }
        
        function timerJour(){                                                   //Cette fonction va appeler la fonction précédente
            var timerJour;

            if(timerJour){
                clearInterval(timerJour);
            }

            timerJour = setInterval(function(){
                document.getElementById('journuit').innerHTML = 'Jour';
                monstre.Mfor--;
                clearInterval(timerJour);
                timerNuit();
            }, 5000);
        }

        timerNuit();                                                            //On appelle la première fonction pour lancer la boucle

    }


    combat();//Lance le premier combat

    
    
    
    
    
    function combat(){    //Fonction du combat
        
        var noms = [1, Melanie, Titouan, Freddy];
        random = Math.ceil(Math.random() * 4);
        monstre.Mnom = noms[random];

        var sprite = [1, 'riri', 'fifi', 'loulou'];
        random1 = Math.ceil(Math.random() * 4);
        var imgMonstre = sprite[random];

        monstre.Mvie = monstre.Mend; //Remet la vie du monstre au max (endurance)

        document.getElementById('win').style.display = 'none' ;                 //efface la div win
        document.getElementById('inventaire').style.display = 'none' ;          //efface la div inventaire
        document.getElementById('creation').style.display = 'none' ;            //efface la div creation     
        document.getElementById('caracteristique').style.display = 'block' ;    //affiche la div caracteristique
        document.getElementById('aventure').style.display = 'block' ;           //affiche la div aventure
        document.getElementById('btnattaquer').style.display = 'block';         //affiche le bouton btnattaquer

     /*Jet d'initiative*/
           if (perso.Pagi < opif(100)){        //Perso attaque en premier
               console.log('initiative gagne');
               document.getElementById('Mvie').value = monstre.Mvie -= perso.Pfor;  // Vie du monstre = Vie du monstre - Force du personnage
               document.getElementById('vie').value = perso.Pvie;                   //Affiche la vie du perso dans les caractéristique
               document.getElementById('Pvie').value = perso.Pvie;                  //Affiche la vie du perso dans le combat

           }else{                              //Monstre attaque en premier
               console.log('initiative perdu');
               document.getElementById('vie').value = perso.Pvie -= monstre.Mfor;   //Vie du perso = Vie du perso - Force du monstre
               document.getElementById('Pvie').value = perso.Pvie;                  //Affiche la vie du perso dans le combat
               document.getElementById('Mvie').value = monstre.Mvie;                //Affiche la vie du monstre dans le combat
           }
       
       
       
             
    }

    function attaque(){

     //Attaque
        document.getElementById('vie').value = perso.Pvie -= monstre.Mfor;          //Vie du perso = Vie du perso - Force du monstre
        document.getElementById('Pvie').value = perso.Pvie ;                        //Affiche la vie du monstre dans le combat
        document.getElementById('Mvie').value = monstre.Mvie -= perso.Pfor;         //Vie du monstre = Vie du monstre - Force du personnage
        
        if(perso.Pvie <= 0){            //Combat Perdu
            alert("Game Over");    
            console.log("combat perdu");
        }else if(monstre.Mvie <= 0){    //Combat Gagné 
            document.getElementById('win').style.display = 'block' ;                //affiche la div win
            document.getElementById('btnattaquer').style.display = 'none' ;         //efface le bouton attaquer
            perso.Por += opif(20);                                                  //Drop de 1 a 20 Or
            document.getElementById('or').value = perso.Por;                        //affiche l'or du personnage dans les caractéristique
            console.log("combat gagné");
        }                            
    }

    function boutique(){
        document.getElementById('boutique').style.display = 'block' ;               //Affiche
        document.getElementById('aventure').style.display = 'none' ;                //efface
    }

    function inventaire(){
        document.getElementById('nbPoFo').value = perso.Pinv[0] ;                   //Affiche le nombre de potion dans la div inventaire
        document.getElementById('nbPoAg').value = perso.Pinv[1] ;
        document.getElementById('nbPoEn').value = perso.Pinv[2] ;
        document.getElementById('nbPoVi').value = perso.Pinv[3] ;

        document.getElementById('boutique').style.display = 'none' ;                //efface
        document.getElementById('inventaire').style.display = 'block';              //Affiche    
    }
    
/*--------------------------------------------- Fonction Ajouter des potions (Boutique) ------------------------------------------------------------------- */

    function AjPoFo(){       
        if(perso.Por < 2){                                                          //Test si assez d'argent
            alert("Vous n'avez pas assez d'argent");
        }else{
            perso.Por -= 2;                                                         //Or du perso -2
            perso.Pinv[0] += 1;                                                     //Nombre de potion +1   
            document.getElementById('or').value = perso.Por ;                       //affiche Or du perso dans la div caracteristique
            document.getElementById('nbPoFo').value = perso.Pinv[0] ;               //affiche le nombre de potion
            console.log(perso.Pinv); 
        }

    }
    function AjPoAg(){
        if(perso.Por < 2){
            alert("Vous n'avez pas assez d'argent");
        }else{
            perso.Por -= 2;
            perso.Pinv[1] += 1;
            document.getElementById('or').value = perso.Por ;
            document.getElementById('nbPoAg').value = perso.Pinv[1] ;
            console.log(perso.Pinv); 
        }

    }
    function AjPoEn(){
        if(perso.Por < 2){
            alert("Vous n'avez pas assez d'argent");
        }else{
            perso.Por -= 2;
            perso.Pinv[2] += 1;
            document.getElementById('or').value = perso.Por ;
            document.getElementById('nbPoEn').value = perso.Pinv[2] ;
            console.log(perso.Pinv);
        }

    }
    function AjPoVi(){
        if(perso.Por < 5){
            alert("Vous n'avez pas assez d'argent");
        }else{
            perso.Por -= 5;
            perso.Pinv[3] += 1;
            document.getElementById('or').value = perso.Por ;
            document.getElementById('nbPoVi').value = perso.Pinv[3] ;
            console.log(perso.Pinv);
        }

    }

/*--------------------------------------------- Fonction Utiliser les potions (Inventaire) ------------------------------------------------------------------- */

    function UtilPoFo(){
        if(perso.Pinv[0] != 0){                                             //Test si il reste des potion
            if(perso.Pfor >= 100){                                          //Test si le maximum est atteint
                alert("Vous avez atteint la force maximale"); 
            }else{
                perso.Pinv[0] -= 1;                                         //  -1 potion
                perso.Pfor += 1;                                            //  +1 caracteristique
                console.log(perso.Pinv);
                document.getElementById('nbPoFo').value = perso.Pinv[0] ;   //affichage du nombre de potion dans l'inventaire
                document.getElementById('force').value = perso.Pfor ;       //affichage de la force dans les caractéristique
            }
        }else{
            alert("Vous n'avez plus de potion");
            console.log(perso.Pinv);
        }

    }

    function UtilPoAg(){
        if(perso.Pinv[1] != 0){
            if(perso.Pagi >= 100){
                console.log(perso.Pagi);
                alert("Vous avez atteint l'agilité maximale"); 
            }else{
                perso.Pinv[1] -= 1;
                perso.Pagi += 1;
                document.getElementById('nbPoAg').value = perso.Pinv[1] ;
                document.getElementById('agilite').value = perso.Pagi ;
                console.log(perso.Pinv);
            }
            
        }else{
            alert("Vous n'avez plus de potion");
            console.log(perso.Pinv);
        }

    }

    function UtilPoEn(){
        if(perso.Pinv[2] != 0){
            if(perso.Pend >= 200){
                alert("Vous avez atteint l'endurance maximale"); 
            }else{
                perso.Pinv[2] -= 1;
                perso.Pend += 1;
                document.getElementById('nbPoEn').value = perso.Pinv[2] ;
                document.getElementById('endurance').value = perso.Pend ;
                console.log(perso.Pinv);
            }
        }else{
            alert("Vous n'avez plus de potion");
            console.log(perso.Pinv);
        }

    }

    function UtilPoVi(){
        if(perso.Pinv[3] != 0){
            if(perso.Pvie >= perso.Pend){
                alert("Vous etes entièrement remis de vos blessures"); 
            }else{
                perso.Pinv[3] -= 1;
                perso.Pvie += 20;
                document.getElementById('nbPoVi').value = perso.Pinv[3] ;
                document.getElementById('vie').value = perso.Pvie ;
                console.log(perso.Pinv);
            }
        }else{
            alert("Vous n'avez plus de potion");
            console.log(perso.Pinv);
        }

    }

}



function opif(max) { //Chiffre au hasard
    return Math.floor(Math.random() * Math.floor(max));
}
