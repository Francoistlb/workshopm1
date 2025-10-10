export default function Organe({nom, image, taille, code}){
    const handleClick = () => {
        try {
            alert(`code: ${code}`);
        } catch (error) {
            console.error('Erreur dans Organe:', error);
        }
    };

    return(
        <div className="organe">
            <button
                className="organe-button"
                onClick={handleClick}
                aria-label={nom}
                title={nom}
            >
                <img 
                    className="organe-img" 
                    src={image} 
                    alt={nom} 
                    width={taille} 
                    height={taille}
                    onError={(e) => {
                        console.error('Erreur de chargement image:', image);
                        e.target.style.display = 'none';
                    }}
                />
            </button>
        </div>
    )
}