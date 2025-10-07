import Organe from "./organe";
import "./corps.css";

export default function Corps(){
    return(
        <div id="body">   
            <h1>Corps</h1>
            <Organe nom="Cerveau" image="https://upload.wikimedia.org/wikipedia/commons/3/37/Human-brain-vector.svg" taille={100} code="CRV001" />
            <div id="lungs">
                <Organe nom="Poumon" image="https://upload.wikimedia.org/wikipedia/commons/0/04/Birikak.png" taille={100} code="PLM003" />
                <Organe nom="Poumon" image="https://upload.wikimedia.org/wikipedia/commons/0/04/Birikak.png" taille={100} code="PLM003" />
            </div>
            <Organe nom="Cœur" image="https://upload.wikimedia.org/wikipedia/commons/c/c8/Diagram_of_the_human_heart_%28clean%29.svg" taille={100} code="CRD002" />
            <div id="liverandstomch" >
                <Organe nom="Foie" image="https://upload.wikimedia.org/wikipedia/commons/d/d4/Liver.svg" taille={100} code="FVR004" />
                <Organe nom="Estomac" image="https://upload.wikimedia.org/wikipedia/commons/b/be/Stomach_icon.svg" taille={100} code="EST005" />    
            </div>
            <Organe nom="Intestin" image="https://upload.wikimedia.org/wikipedia/commons/b/b5/Intestine_-_sized.png" taille={100} code="INT007" />
            <div id="kidneys">
                <Organe nom="Rein" image="https://upload.wikimedia.org/wikipedia/commons/8/80/202501_Normal_Kidney.svg" taille={70} code="REN006" />
                <Organe nom="Rein" image="https://upload.wikimedia.org/wikipedia/commons/8/80/202501_Normal_Kidney.svg" taille={70} code="REN006" />
            </div>
    </div>
    )
}
