export default function Organe({nom, image, taille, code}){
    return(
        <div className="organe">
            <button
                className="organe-button"
                onClick={()=>alert(`code: ${code}`)}
                aria-label={nom}
                title={nom}
            >
                <img className="organe-img" src={image} alt={nom} width={taille} height={taille} />
            </button>
        </div>
    )
}