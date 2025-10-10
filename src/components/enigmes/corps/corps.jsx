import { useState } from "react";
import Organe from "./organe";
import "./corps.css";

export default function Corps({ validateObjective }) {
    const [inputValue, setInputValue] = useState("");

    const answerCheck = (e) => {
        e.preventDefault();
        
        try {
            console.log('Validation du code:', inputValue);
            
            if (inputValue === "2314") {
                alert("🎉 Bonne réponse ! Vous avez récupéré la clé de la salle d'opération !");
                // Valider l'objectif salle d'opération
                if (validateObjective && typeof validateObjective === 'function') {
                    console.log('Appel validateObjective pour operation');
                    validateObjective('operation');
                } else {
                    console.error('validateObjective n\'est pas une fonction valide');
                }
            } else {
                alert("❌ Mauvaise réponse, réessayez !");
            }
        } catch (error) {
            console.error('Erreur lors de la validation:', error);
            alert("❌ Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    const handleInputChange = (e) => {
        try {
            setInputValue(e.target.value);
        } catch (error) {
            console.error('Erreur lors du changement d\'input:', error);
        }
    };
    return(
        <div id="body-container">
            {/* Image du corps en arrière-plan */}
            <img 
                src="/src/assets/organs/body.png"
                alt="Corps humain" 
                className="body-background-image"
            />
            
            <div id="body">   
                <Organe nom="Cerveau" image="/src/assets/organs/brain.svg" taille={60} code="1" />
                <div id="lungs">
                    <Organe nom="Poumon" image="/src/assets/organs/l_lung.png" taille={60} code="2" />
                    <Organe nom="Cœur" image="/src/assets/organs/heart.svg" taille={60} code="3" />
                    <Organe nom="Poumon" image="/src/assets/organs/r_lung.png" taille={60} code="2" />
                </div>
                <div id="liverandstomch" >
                    <Organe nom="Foie" image="/src/assets/organs/liver.svg" taille={60} code="4" />
                    <Organe nom="Estomac" image="/src/assets/organs/stomach.svg" taille={60} code="5" />    
                </div>
                <Organe nom="Intestin" image="/src/assets/organs/guts.png" taille={60} code="6" />
                <div id="kidneys">
                    <Organe nom="Rein" image="/src/assets/organs/l_kidney.png" taille={40} code="7" />
                    <Organe nom="Rein" image="/src/assets/organs/r_kidney.png" taille={40} code="7" />
                </div>
            </div>
        <div id="answer">
            <form onSubmit={answerCheck}>
                <input 
                    type="text" 
                    name="answer_input" 
                    id="answer_input" 
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Entrez le code à 4 chiffres"
                    maxLength="4"
                />
                <input type="submit" value="Valider" />
            </form>
        </div>
    </div>
    )
}


