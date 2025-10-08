import Organe from "./organe";
import "./corps.css";

function answerCheck(){
    return document.getElementById("answer_input").value == "2417" ? alert("Bonne réponse !") : alert("Mauvaise réponse, réessayez !");
}

export default function Corps(){
    return(
        <div id="body">   
            <Organe nom="Cerveau" image="src/assets/organs/brain.svg" taille={100} code="1" />
            <div id="lungs">
                <Organe nom="Poumon" image="src/assets/organs/l_lung.png" taille={100} code="2" />
                <Organe nom="Cœur" image="src/assets/organs/heart.svg" taille={100} code="3" />
                <Organe nom="Poumon" image="src/assets/organs/r_lung.png" taille={100} code="2" />
            </div>
            <div id="liverandstomch" >
                <Organe nom="Foie" image="src/assets/organs/liver.svg" taille={100} code="4" />
                <Organe nom="Estomac" image="src/assets/organs/stomach.svg" taille={100} code="5" />    
            </div>
            <Organe nom="Intestin" image="src/assets/organs/guts.png" taille={100} code="6" />
            <div id="kidneys">
                <Organe nom="Rein" image="src/assets/organs/l_kidney.png" taille={70} code="7" />
                <Organe nom="Rein" image="src/assets/organs/r_kidney.png" taille={70} code="7" />
        </div>
        <div id="answer">
            <form action="" method="get">
                <input type="text" name="answer_input" id="answer_input" />
                <input type="submit" value="Valider" onClick={answerCheck}/>
            </form>
        </div>
    </div>
    )
}


