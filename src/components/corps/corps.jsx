import Organe from "./organe";
import "./corps.css";

function answerCheck(){
    return document.getElementById("answer_input").value == "2417" ? alert("Bonne réponse !") : alert("Mauvaise réponse, réessayez !");
}

export default function Corps(){
    return(
        <div id="body">   
            <Organe nom="Cerveau" image="https://upload.wikimedia.org/wikipedia/commons/3/37/Human-brain-vector.svg" taille={100} code="1" />
            <div id="lungs">
                <Organe nom="Poumon" image="https://upload.wikimedia.org/wikipedia/commons/0/04/Birikak.png" taille={100} code="2" />
                <Organe nom="Poumon" image="https://upload.wikimedia.org/wikipedia/commons/0/04/Birikak.png" taille={100} code="2" />
            </div>
            <Organe nom="Cœur" image="https://upload.wikimedia.org/wikipedia/commons/c/c8/Diagram_of_the_human_heart_%28clean%29.svg" taille={100} code="3" />
            <div id="liverandstomch" >
                <Organe nom="Foie" image="https://upload.wikimedia.org/wikipedia/commons/d/d4/Liver.svg" taille={100} code="4" />
                <Organe nom="Estomac" image="https://upload.wikimedia.org/wikipedia/commons/b/be/Stomach_icon.svg" taille={100} code="5" />    
            </div>
            <Organe nom="Intestin" image="https://upload.wikimedia.org/wikipedia/commons/b/b5/Intestine_-_sized.png" taille={100} code="6" />
            <div id="kidneys">
                <Organe nom="Rein" image="https://upload.wikimedia.org/wikipedia/commons/8/80/202501_Normal_Kidney.svg" taille={70} code="7" />
                <Organe nom="Rein" image="https://upload.wikimedia.org/wikipedia/commons/8/80/202501_Normal_Kidney.svg" taille={70} code="7" />
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


