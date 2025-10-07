export default function Organe({nom, image, taille, code}){
    return(
        <div>
            <button onClick={()=>alert(`code: ${code}`)}>
                <img src={image} alt={nom} width={taille} height={taille}/>
                
            </button>
        </div>
    )
}