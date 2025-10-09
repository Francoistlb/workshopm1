# Documentation Technique - Escape Game Hospitalier

## 📋 Table des Matières
1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Technologies et Bibliothèques](#technologies-et-bibliothèques)
3. [Architecture du Projet](#architecture-du-projet)
4. [Thème et Scénario](#thème-et-scénario)
5. [Solutions Techniques](#solutions-techniques)
6. [Zones de Jeu](#zones-de-jeu)
7. [Système de Progression](#système-de-progression)

---

## 🎯 Vue d'ensemble du projet

**Workshop M1** est un jeu d'évasion (escape game) en 2D développé en React, situé dans un hôpital abandonné en proie à une épidémie zombie. Le joueur incarne un survivant qui doit explorer différentes zones, résoudre des énigmes et collecter des éléments pour s'échapper avant la fin du temps imparti (30 minutes).

---

## 🛠️ Technologies et Bibliothèques

### Stack Technique Principal

#### **Frontend Framework**
- **React 19.1.1** - Framework JavaScript moderne avec hooks
- **React DOM 19.1.1** - Rendu des composants React

#### **Build Tool & Development**
- **Vite 7.1.14** (Rolldown variant) - Bundler ultra-rapide
- **@vitejs/plugin-react 5.0.4** - Plugin React pour Vite

#### **Communication Temps Réel**
- **Socket.IO Client 4.8.1** - Websockets pour le multijoueur (préparé mais non implémenté)

#### **Quality & Development Tools**
- **ESLint 9.36.0** - Linter JavaScript/JSX
- **@eslint/js** - Configuration ESLint moderne
- **eslint-plugin-react-hooks** - Règles spécifiques aux hooks React
- **eslint-plugin-react-refresh** - Support Hot Reload

#### **TypeScript Support**
- **@types/react** & **@types/react-dom** - Définitions TypeScript

### Configuration Spécifique

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
})
```

### Scripts de Développement
```json
{
  "dev": "vite --host --port 5173",    // Serveur de développement
  "build": "vite build",               // Build de production
  "lint": "eslint .",                  // Analyse du code
  "preview": "vite preview"            // Prévisualisation du build
}
```

---

## 🏗️ Architecture du Projet

### Structure des Dossiers

```
src/
├── components/
│   ├── enigmes/           # Composants d'énigmes spécialisées
│   │   ├── corps/         # Énigme anatomique (salle d'opération)
│   │   ├── electricite/   # Énigme électrique (hall d'accueil)
│   │   ├── maladies/      # Énigme médicale (consultation)
│   │   └── pictogrames/   # Système de pictogrammes de danger
│   ├── home/              # Menu principal et accueil
│   ├── modals/            # Composants modaux réutilisables
│   │   ├── GameOverModal/ # Modal de fin de partie
│   │   └── PaperModal/    # Modal générique pour documents
│   ├── plateau/           # Contrôleur principal du jeu
│   └── zones/             # Salles de jeu individuelles
│       ├── accueil/       # Hall d'accueil de l'hôpital
│       ├── consultation/  # Cabinet médical
│       ├── couloir/       # Couloir principal (navigation)
│       ├── morgue/        # Morgue (zone non-interactive)
│       ├── operation/     # Salle d'opération
│       ├── pharmacie/     # Pharmacie (énigme finale)
│       └── stockage/      # Salle de stockage (objectif final)
└── assets/                # Resources visuelles (SVG, images)
```

### Patterns Architecturaux Utilisés

#### **1. Composition de Composants**
```jsx
function App() {
  const [currentView, setCurrentView] = useState("home");
  
  return (
    <div className="App">
      {currentView === "home" ? (
        <Home onStartGame={startGame} />
      ) : (
        <Plateau players={gameData.players} onReturnHome={returnToHome} />
      )}
    </div>
  );
}
```

#### **2. State Management avec Hooks**
- **useState** pour l'état local des composants
- **useEffect** pour les effets de bord (timer, événements clavier)
- **Prop drilling** pour la communication parent-enfant

#### **3. Modularité par Zone**
Chaque zone est un composant indépendant avec :
- État local pour les interactions
- Props communes (position joueur, callbacks)
- Logique de collision spécifique

---

## 🎭 Thème et Scénario

### **Contexte Narratif**
> *"L'hôpital central de la ville a été évacué suite à une épidémie mystérieuse. Vous êtes un survivant bloqué à l'intérieur. Votre mission : trouver un antidote et vous échapper avant que les autorités ne bombardent le bâtiment dans 30 minutes."*

### **Objectif Principal**
Résoudre 5 énigmes dans l'ordre pour :
1. 🔌 **Rétablir l'électricité** (Hall d'accueil)
2. 🏥 **Trouver la clé du médecin** (Consultation)
3. 💊 **Trouver la clé de la pharmacie** (Pharmacie)
4. ⚕️ **Trouver la clé de l'opération** (Salle d'opération)
5. 💉 **Trouver l'antidote** (Stockage)

### **Mécaniques de Progression**
- **Progression linéaire** : certaines zones nécessitent des clés d'autres zones
- **Système de verrouillage** : le stockage n'est accessible qu'après avoir collecté 3 clés
- **Timer de pression** : 30 minutes pour s'échapper
- **Feedback immédiat** : validation visuelle des objectifs dans l'interface

---

## ⚙️ Solutions Techniques

### 1. Système de Déplacement

#### **Contrôles Clavier**
```jsx
useEffect(() => {
  const handleKeyPress = (event) => {
    const moveSpeed = 20
    
    setPlayerPosition(prev => {
      let newX = prev.x, newY = prev.y
      
      switch (event.key.toLowerCase()) {
        case 'w': case 'arrowup':    newY -= moveSpeed; break
        case 's': case 'arrowdown':  newY += moveSpeed; break
        case 'a': case 'arrowleft':  newX -= moveSpeed; break
        case 'd': case 'arrowright': newX += moveSpeed; break
      }
      
      // Validation des collisions avant le mouvement
      if (hasCollision) return prev
      return { x: newX, y: newY }
    })
  }
  
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [currentRoom])
```

#### **Logs de Déplacement**
```jsx
console.log(`Vérification collision ${currentRoom} à (${newX}, ${newY})`)
console.log('Collision avec la réception') // Debug spécifique
```

### 2. Système de Collisions

#### **Détection par Boîtes Englobantes (AABB)**
```jsx
const checkCollision = (x, y, playerSize = 40) => {
  const playerRadius = playerSize / 2
  
  // Exemple : Comptoir pharmacie
  if (x + playerRadius > 180 && x - playerRadius < 320 && 
      y + playerRadius > 200 && y - playerRadius < 280) {
    return true // Collision détectée
  }
  
  return false
}
```

#### **Collisions Spécifiques par Zone**
```jsx
if (currentRoom === 'pharmacie') {
  // Comptoir central
  if (newX + playerRadius > 180 && newX - playerRadius < 320 && 
      newY + playerRadius > 200 && newY - playerRadius < 280) {
    hasCollision = true
    console.log('Collision avec le comptoir')
  }
  
  // Étagères gauche
  if (newX + playerRadius > 40 && newX - playerRadius < 65 && 
      newY + playerRadius > 80 && newY - playerRadius < 340) {
    hasCollision = true
    console.log('Collision avec les étagères gauche')
  }
}
```

### 3. Système d'Interactions

#### **Détection de Proximité**
```jsx
const isPlayerNear = (elementX, elementY, threshold = 60) => {
  const distance = Math.sqrt(
    Math.pow(playerPosition.x - elementX, 2) + 
    Math.pow(playerPosition.y - elementY, 2)
  )
  return distance <= threshold
}
```

#### **Interactions Contextuelles**
```jsx
// Exemple : Terminal informatique de la pharmacie
<div 
  className={`computer-terminal ${isPlayerNear(297.5, 172.5) ? 'interactive' : 'non-interactive'}`}
  onClick={handleComputerClick}
  title="Système d'analyse chimique - Cliquez pour analyser"
>
  <div className="computer-screen"></div>
</div>
```

### 4. Validation des Objectifs

#### **Système de Validation Centralisé**
```jsx
const validateObjective = (objectiveKey) => {
  setObjectives(prev => ({ ...prev, [objectiveKey]: true }))
  console.log(`🎯 Objectif validé : ${objectiveKey}`)
  
  // Condition de victoire
  if (objectiveKey === 'antidote') {
    const timeUsed = (30 * 60) - timeLeft
    const timeString = formatTime(timeUsed)
    setFinalTime(timeString)
    setIsGameWon(true)
    setSessionStarted(false) // Arrêt du timer
  }
}
```

#### **Propagation par Props**
```jsx
<Pharmacie 
  playerPosition={playerPosition}
  setPlayerPosition={setPlayerPosition}
  onReturnToAccueil={() => handleRoomChange('couloir')}
  validateObjective={validateObjective} // Fonction passée en prop
/>
```

### 5. Événements Progressifs

#### **Contrôle d'Accès Dynamique**
```jsx
const isStorageUnlocked = () => {
  return objectives.laboratory && objectives.pharmacy && objectives.operation
}

const handleRoomChange = (roomId) => {
  if (roomId === 'stockage' && !isStorageUnlocked()) {
    alert('🔒 Accès refusé ! Récupérez toutes les clés d\'abord.')
    return // Empêche la navigation
  }
  setCurrentRoom(roomId)
}
```

#### **Feedback Visuel en Temps Réel**
```jsx
<div className="objectives">
  <div className="objective">
    {objectives.electricity ? '✅' : '🔒'} Rétablir l'électricité
  </div>
  <div className="objective">
    {objectives.laboratory ? '✅' : '🔒'} Trouver la clé du médecin
  </div>
  {/* ... autres objectifs */}
</div>
```

### 6. Timer et Système de Fin

#### **Gestion du Timer**
```jsx
useEffect(() => {
  if (!sessionStarted || isGameOver || isGameWon) return

  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setIsGameOver(true)
        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, [sessionStarted, isGameOver, isGameWon])
```

#### **Affichage Conditionnel du Temps**
```jsx
<span className={`stat-value ${getTimeClass()}`}>
  {isGameWon ? `VICTOIRE! ${finalTime}` : formatTime(timeLeft)}
</span>
```

---

## 🗺️ Zones de Jeu

### **1. Hall d'Accueil (`accueil/`)**
- **Fonction** : Zone de départ, énigme électrique
- **Énigme** : Code 5886 pour rétablir l'électricité
- **Éléments** : Terminal de sécurité, réception, bancs, entrée couloir
- **Validation** : `validateObjective('electricity')`

### **2. Couloir Principal (`couloir/`)**
- **Fonction** : Hub de navigation centrale
- **Mécaniques** : Portes vers toutes les zones, affichage des accès
- **Restriction** : Stockage verrouillé sans les 3 clés
- **Interface** : Indicateurs visuels pour les portes accessibles

### **3. Salle d'Opération (`operation/`)**
- **Fonction** : Énigme anatomique sur le corps humain
- **Énigme** : Placer les organes correctement (code 2314)
- **Éléments** : Table d'opération, monitoring, équipement médical
- **Validation** : `validateObjective('operation')`

### **4. Consultation (`consultation/`)**
- **Fonction** : Énigme médicale sur les pathologies
- **Énigme** : Diagnostic médical via le composant Maladies
- **Éléments** : Bureau médecin, armoire, table d'examen
- **Validation** : `validateObjective('laboratory')`

### **5. Pharmacie (`pharmacie/`)**
- **Fonction** : Énigme chimique finale
- **Énigme** : Sélection d'agents chimiques sûrs (code 134)
- **Solution** : Acétone (1) + Éthanol (3) + Paracétamol (4)
- **Éléments** : Terminal d'analyse, étagères, réfrigérateur
- **Validation** : `validateObjective('pharmacy')`

### **6. Stockage (`stockage/`)**
- **Fonction** : Zone finale avec l'antidote
- **Accès** : Débloqué après 3 objectifs (laboratory, pharmacy, operation)
- **Objectif** : Trouver l'antidote dans le coffre-fort
- **Fin de jeu** : `validateObjective('antidote')` → Victoire

### **7. Morgue (`morgue/`)**
- **Fonction** : Zone atmosphérique (non-interactive)
- **Rôle** : Immersion narrative, pas d'énigme

---

## 📈 Système de Progression

### **États d'Objectifs**
```jsx
const [objectives, setObjectives] = useState({
  electricity: false,  // Code 5886 (Accueil)
  laboratory: false,   // Diagnostic médical (Consultation)
  pharmacy: false,     // Agents chimiques (Pharmacie)
  operation: false,    // Anatomie (Opération)
  antidote: false      // Antidote final (Stockage)
})
```

### **Conditions de Déblocage**
- **Stockage** : `laboratory && pharmacy && operation`
- **Victoire** : `antidote === true`

### **Feedback Utilisateur**
- ✅ **Objectif validé** : Icône verte, log console
- 🔒 **Objectif en attente** : Icône verrouillée
- 🎯 **Progression** : Compteur dynamique "X/5 énigmes résolues"
- ⏱️ **Temps** : Couleur selon urgence (normal/warning/critical/victory)

### **Logs de Débogage**
```javascript
console.log(`🎯 Objectif validé : ${objectiveKey}`)
console.log(`Collision détectée à (${newX}, ${newY}) dans la zone ${currentRoom}`)
console.log('Vous devez vous approcher de la porte pour entrer !')
```

---

## 🎨 Considérations Techniques Supplémentaires

### **Performance**
- **Collision Detection** : Optimisée par zone avec early returns
- **Event Listeners** : Nettoyage automatique dans useEffect
- **State Updates** : Utilisation de fonctions de mise à jour pour éviter les re-renders

### **Accessibilité**
- **Contrôles** : Support WASD + flèches directionnelles
- **Feedback** : Tooltips contextuels selon la proximité
- **Visibilité** : Animations CSS pour les éléments interactifs

### **Extensibilité**
- **Modulaire** : Chaque zone est indépendante
- **Configurable** : Timer, vitesse de déplacement paramétrable
- **Évolutif** : Socket.IO préparé pour le multijoueur

---

*Documentation générée le ${new Date().toLocaleDateString('fr-FR')} - Workshop M1 Escape Game*