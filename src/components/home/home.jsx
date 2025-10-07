import React from "react";
import './home.css'
function Home(){
    const handleClick = () => {
        alert('🎉 Jeu lancé !');
    };
    return(
        <div>
            <h1 class="home_header">Hopital Escape</h1>
                <div class="home_container">
                <p class="home_intro">
                    Une épidémie fulgurante, inconnue et hautement contagieuse, ravage la population. 
                    En moins de 72 heures, les communications chutent, les villes se vident, et les systèmes médicaux s’effondrent.
                    Les rares laboratoires capables de fabriquer un antidote ont été contaminés… sauf un : l’Hôpital Saint-Vital, isolé mais encore fonctionnel.
                    <br /><br />
                    Cet hôpital détient les ressources nécessaires à la fabrication d’un antidote, mais les protocoles d'urgence ont verrouillé l'accès aux ingrédients.
                    Selon les dernières données, 4 ou 5 composés essentiels sont encore disséminés dans différents services de l’hôpital. Ils portent chacun un nom de code et ne peuvent être trouvés qu’en résolvant des énigmes ou en collectant des indices laissés par le personnel avant l'évacuation.
                </p> 
                <button className="game-button" onClick={handleClick}>
                    LANCER LE JEU
                </button>
                </div>
        </div>
    )
}
export default Home
