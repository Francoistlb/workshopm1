"use client";
import React, { useState, useEffect } from "react";
import "./maladies.css";

export default function Maladies({ validateObjective }) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [associations, setAssociations] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const it = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 180);
    }, 8000);
    return () => clearInterval(it);
  }, []);

  const symptomes = [
    { id: "a", text: "Fièvre + toux + fatigue" },
    { id: "b", text: "Boutons rouges + démangeaisons" },
    { id: "c", text: "Maux de ventre + vomissements" },
    { id: "d", text: "Difficulté à respirer" },
    { id: "e", text: "Mal de tête + lumière insupportable" },
  ];

  const maladies = [
    { id: "varicelle", text: "Varicelle", correctSymptom: "b" },
    { id: "asthme", text: "Asthme", correctSymptom: "d" },
    { id: "gastro", text: "Gastro-entérite", correctSymptom: "c" },
    { id: "grippe", text: "Grippe", correctSymptom: "a" },
    { id: "migraine", text: "Migraine", correctSymptom: "e" },
  ];

  const handleSymptomClick = (id) => {
    if (!isCompleted) setSelectedSymptom(id);
  };

  const handleMaladieClick = (maladieId) => {
    if (isCompleted || !selectedSymptom) return;
    const next = { ...associations };
    // enlever une ancienne asso avec le même symptôme
    Object.keys(next).forEach(
      (k) => next[k] === selectedSymptom && delete next[k]
    );
    next[maladieId] = selectedSymptom;
    setAssociations(next);
    setSelectedSymptom(null);

    if (Object.keys(next).length === 5) {
      const ok = maladies.every((m) => next[m.id] === m.correctSymptom);
      if (ok) {
        setTimeout(() => {
          setIsCompleted(true);
          // Valider l'objectif laboratoire
          if (validateObjective) {
            validateObjective('laboratory');
          }
        }, 250);
      }
    }
  };

  const resetAssociation = (maladieId) => {
    if (isCompleted) return;
    const next = { ...associations };
    delete next[maladieId];
    setAssociations(next);
  };

  const getSymptomById = (id) => symptomes.find((s) => s.id === id);
  const isAssociated = (symptomId) =>
    Object.values(associations).includes(symptomId);

  const progress = (Object.keys(associations).length / 5) * 100;

  return (
    <div className="contam-root" data-version="v2">
      {/* overlays */}
      <div className="contam-bg" />
      <div className="contam-vignette" />
      <div className="contam-scanlines" />
      <div className={`contam-topline ${glitchActive ? "is-on" : ""}`} />
      <div className="contam-led">
        <span />
      </div>

      <main className="contam-wrap">
        {/* HEADER */}
        <header className={`contam-header ${glitchActive ? "glitch" : ""}`}>
          <h1 className="contam-title">CONTAMINATION</h1>
          <div className="contam-sub mono">
            ⚠ ZONE INFECTÉE ⚠
          </div>
          <p className="contam-desc">
            Les dossiers sont éparpillés dans le chaos. Associez les symptômes
            avant qu’il ne soit trop tard…
          </p>
        </header>

        {/* INSTRUCTIONS */}
        <section className="contam-panel">
          <p className="mono red">
            &gt; Cliquez sur un symptôme puis sur un diagnostic
          </p>
        </section>

        <div className="contam-grid">
          {/* SYMPTÔMES */}
          <section>
            <h2 className="contam-h2 red glow">SYMPTÔMES</h2>
            <div className="contam-stack">
              {symptomes.map((symptom) => {
                const selected = selectedSymptom === symptom.id;
                const used = isAssociated(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    className={`card symptom ${selected ? "is-selected" : ""} ${
                      used ? "is-used" : ""
                    }`}
                    onClick={() => handleSymptomClick(symptom.id)}
                    disabled={used || isCompleted}
                    title={used ? "Déjà associé" : "Sélectionner"}
                  >
                    <span className="card-text">{symptom.text}</span>
                    {selected && <span className="card-underline" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* DIAGNOSTICS */}
          <section>
            <h2 className="contam-h2 green glow">DIAGNOSTICS</h2>
            <div className="contam-stack">
              {maladies.map((m) => {
                const associated = associations[m.id];
                const isCorrect = associated === m.correctSymptom;
                const symptom = associated ? getSymptomById(associated) : null;
                return (
                  <div
                    key={m.id}
                    className={`card diag ${
                      !associated ? "idle" : isCorrect ? "ok" : "ko"
                    }`}
                    onClick={() => handleMaladieClick(m.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="diag-head">
                      <h3 className="diag-title">{m.text}</h3>
                      {associated && (
                        <button
                          className="diag-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            resetAssociation(m.id);
                          }}
                          aria-label={`Retirer l'association de ${m.text}`}
                          title="Retirer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {associated && symptom ? (
                      <div className="diag-chip">{symptom.text}</div>
                    ) : (
                      <div className="diag-empty mono">[VIDE – EN ATTENTE]</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* PROGRESSION */}
        <section className="contam-progress">
          <div className="contam-progress-head">
            <span className="mono dim">CONTAMINATION</span>
            <span className="mono red strong">
              {Object.keys(associations).length}/5
            </span>
          </div>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        {/* SUCCÈS */}
        {isCompleted && (
          <div className="contam-overlay">
            <div className="overlay-box">
              <div className="overlay-check">✓</div>
              <h2 className="overlay-title">ACCÈS AUTORISÉ</h2>
              <p className="overlay-text mono">
                Le coffre médical est déverrouillé. Vous avez récupéré la clé du laboratoire !
              </p>
            </div>
          </div>
        )}

        {/* ÉCHEC (tout rempli mais faux) */}
        {!isCompleted && Object.keys(associations).length === 5 && (
          <div className="fail-panel">
            <div className="fail-x">✕</div>
            <p className="fail-title">ERREUR FATALE</p>
            <p className="fail-sub mono">Diagnostics incorrects. Réessayez.</p>
          </div>
        )}
      </main>
    </div>
  );
}
