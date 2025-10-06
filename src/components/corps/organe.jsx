export default function Organe({nom, image, taille, code}){
    return(
        <div>
            <Button onClick={()=>alert(`code: ${code}`)}>
                <img src={image} alt="" />
                width={taille}
                height={taille}
            </Button>
        </div>
    )
}