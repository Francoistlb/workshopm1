"use client";
import React, { useState, useEffect } from "react";

export default function Maladies() {
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
      if (ok) setTimeout(() => setIsCompleted(true), 250);
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
            ⚠ ZONE INFECTÉE – ACCÈS NON AUTORISÉ ⚠
          </div>
          <p className="contam-desc">
            Les dossiers sont éparpillés dans le chaos. Associez les symptômes
            avant qu’il ne soit trop tard…
          </p>
          <div className="contam-time mono">
            Temps écoulé depuis l’évacuation : 72 heures
          </div>
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
                Le coffre médical est déverrouillé. L’antidote est à vous.
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

      {/* CSS embarqué */}
      <style>{`
:root{
  --bg0:#000; --bg1:#120000; --ink:#eaecef; --muted:#8b8f94;
  --red:#ef4444; --redDark:#7f1d1d; --green:#22c55e;
}
*{box-sizing:border-box}
.contam-root{position:fixed; inset:0; overflow:auto; color:var(--ink); background:#000; font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif}
.contam-bg{position:fixed; inset:0; background:linear-gradient(180deg,#000 0%, rgba(127,29,29,.25) 50%, #000 100%); z-index:0}
.contam-vignette{position:fixed; inset:0; box-shadow:inset 0 0 180px rgba(0,0,0,.9); z-index:1; pointer-events:none}
.contam-scanlines{position:fixed; inset:0; z-index:1; opacity:.12; pointer-events:none;
  background:repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,.05) 2px 4px);
}
.contam-topline{position:fixed; left:0; right:0; top:0; height:2px; background:var(--red); opacity:.35; transition:opacity .1s; z-index:2}
.contam-topline.is-on{opacity:1}
.contam-led{position:fixed; right:18px; top:18px; width:14px; height:14px; z-index:3}
.contam-led span{position:absolute; inset:0; border-radius:999px; background:var(--red); animation:ping 1.2s infinite}
@keyframes ping{0%{transform:scale(.7);opacity:.8}80%{transform:scale(1.8);opacity:0}100%{opacity:0}}
.contam-wrap{position:relative; z-index:4; max-width:980px; margin:0 auto; padding:32px 20px 56px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.dim{color:#a1a1aa}
.red{color:var(--red)}
.green{color:var(--green)}
.strong{font-weight:800}
.glow{text-shadow:2px 2px 0 rgba(0,0,0,.85)}
.contam-header{margin-bottom:28px}
.contam-header.glitch{transform:translateX(1px)}
.contam-title{
  display:inline-block; position:relative;
  font-weight:900; font-size:68px; line-height:.9; letter-spacing:.5px;
  color:var(--red);
  text-shadow:0 0 28px rgba(239,68,68,.95), 0 0 46px rgba(239,68,68,.35), 3px 3px 0 rgba(0,0,0,.85);
}
.contam-sub{margin-top:8px; font-size:12px; letter-spacing:.16em; color:rgba(239,68,68,.9)}
.contam-desc{margin-top:8px; color:#c3c5c7; max-width:720px}
.contam-time{margin-top:4px; font-size:12px; color:#7f1d1d}
.contam-panel{background:rgba(0,0,0,.6); border:1px solid rgba(127,29,29,.6); padding:12px 16px; margin-bottom:28px}
.contam-grid{display:grid; grid-template-columns:1fr; gap:40px}
@media (min-width: 980px){ .contam-grid{grid-template-columns:1fr 1fr; gap:48px} }
.contam-h2{font-weight:900; text-align:center; font-size:28px; margin:0 0 16px}
.contam-stack{display:flex; flex-direction:column; gap:14px}
.card{position:relative; border:1px solid rgba(127,29,29,.55); background:linear-gradient(180deg, rgba(0,0,0,.7), rgba(127,29,29,.1)); padding:16px 18px; transition:border-color .15s, box-shadow .15s, transform .08s}
.card:hover{border-color:var(--red)}
.card .card-text{font-weight:600}
.card.symptom.is-selected{border-color:var(--red); box-shadow:0 0 30px rgba(239,68,68,.35)}
.card.symptom.is-used{opacity:.4; cursor:not-allowed}
.card.symptom .card-underline{position:absolute; left:0; right:0; bottom:-1px; height:1px; background:rgba(239,68,68,.6)}
.card.diag.idle{border-color:rgba(6,95,70,.55); background:linear-gradient(180deg, rgba(0,0,0,.7), rgba(6,95,70,.1))}
.card.diag.ok{border-color:var(--green); box-shadow:0 0 28px rgba(34,197,94,.35); background:linear-gradient(180deg, rgba(2,44,24,.6), rgba(0,0,0,.7))}
.card.diag.ko{border-color:var(--red); box-shadow:0 0 28px rgba(239,68,68,.35); background:linear-gradient(180deg, rgba(76,5,5,.55), rgba(0,0,0,.7))}
.diag-head{display:flex; align-items:center; justify-content:space-between; margin-bottom:8px}
.diag-title{margin:0; font-weight:800; color:#f3f4f6}
.diag-remove{appearance:none; border:0; background:none; font-size:20px; line-height:1; color:var(--red); cursor:pointer}
.diag-remove:hover{filter:brightness(1.1)}
.diag-chip{display:inline-block; padding:10px 12px; border:1px solid #263238; background:rgba(0,0,0,.55); color:#d1d5db; font-weight:600}
.diag-empty{color:#9ca3af; text-align:center; font-style:italic; font-size:12.5px}
.contam-progress{margin-top:36px; background:rgba(0,0,0,.6); border:1px solid rgba(127,29,29,.6); padding:14px 16px}
.contam-progress-head{display:flex; align-items:center; justify-content:space-between; margin-bottom:8px}
.bar{height:22px; border:1px solid rgba(127,29,29,.75); background:#000; position:relative; overflow:hidden}
.bar-fill{height:100%; background:linear-gradient(90deg, #b91c1c, #ef4444, #b91c1c); transition:width .7s}
.contam-overlay{position:fixed; inset:0; background:rgba(0,0,0,.9); display:flex; align-items:center; justify-content:center; z-index:50; animation:fadeIn .4s}
.overlay-box{text-align:center; padding:48px 24px}
.overlay-check{font-size:88px; margin-bottom:16px}
.overlay-title{font-size:48px; font-weight:900; color:var(--green); text-shadow:0 0 30px rgba(34,197,94,.8), 3px 3px 0 rgba(0,0,0,.85); margin:0 0 8px}
.overlay-text{color:#86efac}
.fail-panel{margin-top:24px; background:#000; border:2px solid var(--red); text-align:center; padding:20px}
.fail-x{font-size:48px; margin-bottom:6px}
.fail-title{color:var(--red); font-size:22px; font-weight:900; margin:0}
.fail-sub{color:#fca5a5; margin-top:6px}
@keyframes fadeIn{from{opacity:0} to{opacity:1}}
      `}</style>
    </div>
  );
}
