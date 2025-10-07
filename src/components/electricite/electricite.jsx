import './electricite.css';
const items = [
  { id: 1, nom: 'Marie Lise', gs: 'A-',date_admission:'12/08/25' },
  { id: 2, nom: 'Mac Gaver', gs: 'B+',date_admission:'20/06/25' },
  { id: 3, nom: 'Jean Pierre', gs: 'O+',date_admission:'02/05/25' },
  { id: 4, nom: 'Marie Antoinette', gs: 'A+',date_admission:'19/08/25' },
];

function Electricity() {
  return (
    <div>
      <div className="board">
            <h3> ORDRE VITAL : O+ &gt; AB &gt; A- &gt; B+ </h3>
      </div>
      {items.map(item => (
        <div className="card" key={item.id}>
          <p>Nom :{ item.nom}</p>
          <p>Groupe Sanguin : {item.gs}</p>
          <p>Date d'admission: {item.date_admission}</p>
        </div>
      ))}
    </div>
  );
}

export default Electricity;
