const fallbackGifs = [
    "https://i.chzbgr.com/full/9324013056/h3EB8D65F/a-group-of-capybaras-are-squeezed-into-an-outdoor-bath-tub",
    "https://media.tenor.com/oDB9EAV1ucoAAAAM/dancing-capybara.gif",
    "https://media.tenor.com/2UVcaTGegxoAAAAM/%D0%BA%D0%B0%D0%BF%D0%B8%D0%B1%D0%B0%D1%80%D0%B0.gif",
    "https://sweezy-cursors.com/wp-content/uploads/cursor/capybara-dancing-animated/capybara-dancing-animated-custom-cursor.gif"
  ];
  
  // --- Fonction de récupération d'un gif via l'API Capybara ---
  async function fetchCapybaraGif() {
    try {
      // Ajout d'un paramètre pour éviter la mise en cache
      const response = await fetch('https://api.capy.lol/v1/capybara?t=' + Date.now(), { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      // Récupérer la réponse sous forme de Blob (image binaire)
      const blob = await response.blob();
      // Créer une URL temporaire pour l'image
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Erreur lors du fetch de l'API Capybara:", error);
      return null;
    }
  }
  
  // --- Affichage du gif de Capybara avec animation pendant le chargement ---
  async function showRandomGif() {
    const gifContainer = document.querySelector(".gif-container");
    // Pendant le chargement, on affiche une animation spinner
    gifContainer.innerHTML = `
      <div class="flex justify-center items-center w-full h-40">
        <div class="border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    `;
    
    // Récupérer le gif via l'API
    const gifUrl = await fetchCapybaraGif();
    let finalUrl;
    if (gifUrl) {
      finalUrl = gifUrl;
    } else {
      const randomIndex = Math.floor(Math.random() * fallbackGifs.length);
      finalUrl = fallbackGifs[randomIndex] + "?t=" + Date.now();
    }
    // Afficher l'image dans le conteneur avec une animation de fondu (transition opacity)
    gifContainer.innerHTML = `<img id="capybaraGif" class="w-full rounded opacity-0 transition-opacity duration-500" src="${finalUrl}" alt="Capybara" />`;
    // Après un court délai, supprimer l'opacité pour afficher l'image en fondu
    setTimeout(() => {
      document.getElementById("capybaraGif").classList.remove("opacity-0");
    }, 100);
  }
  
  // Afficher un gif dès le chargement
  showRandomGif();
  
  let stats = {
    wins: 0,
    losses: 0,
    draws: 0,
    pierre: 0,
    papier: 0,
    ciseau: 0,
  };
  
  function updateStatsDisplay() {
    const statsElement = document.getElementById("stats");
    // On cache la section stats si aucune statistique n'est à afficher (tous à 0)
    const totalGames = stats.wins + stats.losses + stats.draws;
    if (totalGames === 0) {
      statsElement.classList.add("hidden");
    } else {
      statsElement.classList.remove("hidden");
      statsElement.innerText =
        "Gagnés: " + stats.wins +
        " - Perdus: " + stats.losses +
        " - Égalités: " + stats.draws +
        " | Pierre: " + stats.pierre +
        " - Papier: " + stats.papier +
        " - Ciseau: " + stats.ciseau;
    }
  }
  
  function play(userChoice) {
    const countdownElement = document.getElementById("countdown");
    const resultElement = document.getElementById("result");
    
    // Empêcher de lancer un compte à rebours si déjà actif
    if (!countdownElement.classList.contains("hidden")) return;
    
    // Masquer le résultat s'il existe
    resultElement.classList.add("hidden");
    
    // Afficher le compte à rebours (on supprime la classe "hidden")
    countdownElement.classList.remove("hidden");
    countdownElement.innerHTML = `<img class="w-24" src="https://static8.depositphotos.com/1338574/829/i/450/depositphotos_8292990-stock-photo-the-number-3-in-gold.jpg" alt="3"/>`;
  
    setTimeout(() => {
      countdownElement.innerHTML = `<img class="w-24" src="https://t3.ftcdn.net/jpg/00/25/85/36/360_F_25853657_TZaY3PRevrRfVLhVwACDw1YxdmGQLXhf.jpg" alt="2"/>`;
    }, 1000);
  
    setTimeout(() => {
      countdownElement.innerHTML = `<img class="w-24" src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-1-png-image_2158836.jpg" alt="1"/>`;
    }, 2000);
  
    setTimeout(() => {
      // Masquer le compte à rebours
      countdownElement.innerHTML = "";
      countdownElement.classList.add("hidden");
  
      // Déterminer le choix de l'ordinateur
      const choices = ["pierre", "papier", "ciseau"];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      stats[userChoice]++;
  
      let result = "";
      if (userChoice === computerChoice) {
        result = "Égalité !";
        stats.draws++;
      } else if (
        (userChoice === "pierre" && computerChoice === "ciseau") ||
        (userChoice === "papier" && computerChoice === "pierre") ||
        (userChoice === "ciseau" && computerChoice === "papier")
      ) {
        result = "Vous gagnez !";
        stats.wins++;
      } else {
        result = "Vous perdez !";
        stats.losses++;
      }
  
      resultElement.innerText =
        "Vous avez choisi " + userChoice +
        ", l'ordinateur a choisi " + computerChoice +
        ". " + result;
      resultElement.classList.remove("hidden");
      
      updateStatsDisplay();
    }, 3000);
  }
  
  window.onload = function() {
    updateStatsDisplay();
  }
  
  function resetStats() {
    stats = {
      wins: 0,
      losses: 0,
      draws: 0,
      pierre: 0,
      papier: 0,
      ciseau: 0,
    };
    updateStatsDisplay();
  }
  