import './electricite.css';

const items = [
  { id: 1, nom: 'Marie Lise', gs: 'A-', date_admission: '12/08/25' },
  { id: 2, nom: 'Mac Gaver', gs: 'B+', date_admission: '20/06/25' },
  { id: 3, nom: 'Jean Pierre', gs: 'O+', date_admission: '02/05/25' },
  { id: 4, nom: 'Marie Antoinette', gs: 'AB', date_admission: '19/08/25' },
];

function Electricity({ showBoard = false, showPatient = null, showAll = false }) {
  // Si on veut afficher le board (ordre vital)
  if (showBoard) {
    return (
      <div className="board">
        <h3>ORDRE VITAL : O+ &gt; AB &gt; A- &gt; B+</h3>
      </div>
    );
  }

  // Si on veut afficher un patient spécifique
  if (showPatient) {
    return (
      <div className="card">
        <p><strong>Nom :</strong> {showPatient.nom}</p>
        <p><strong>Groupe Sanguin :</strong> {showPatient.gs}</p>
        <p><strong>Date d'admission :</strong> {showPatient.date_admission}</p>
      </div>
    );
  }

  // Si on veut afficher tout (vue normale de la salle électricité)
  if (showAll) {
    return (
      <div>
        <div className="board">
          <h3>ORDRE VITAL : O+ &gt; AB &gt; A- &gt; B+</h3>
        </div>
        {items.map(item => (
          <div className="card" key={item.id}>
            <p><strong>Nom :</strong> {item.nom}</p>
            <p><strong>Groupe Sanguin :</strong> {item.gs}</p>
            <p><strong>Date d'admission :</strong> {item.date_admission}</p>
          </div>
        ))}
      </div>
    );
  }

  // Vue par défaut
  return null;
}

export default Electricity;
