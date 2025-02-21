// --- Fallback en cas d'erreur avec l'API Capybara ---
const fallbackGifs = [
    "https://i.chzbgr.com/full/9324013056/h3EB8D65F/a-group-of-capybaras-are-squeezed-into-an-outdoor-bath-tub",
    "https://media.tenor.com/oDB9EAV1ucoAAAAM/dancing-capybara.gif",
    "https://media.tenor.com/2UVcaTGegxoAAAAM/%D0%BA%D0%B0%D0%BF%D0%B8%D0%B1%D0%B0%D1%80%D0%B0.gif",
    "https://sweezy-cursors.com/wp-content/uploads/cursor/capybara-dancing-animated/capybara-dancing-animated-custom-cursor.gif"
  ];
  
  // --- Fonction de récupération d'un gif via l'API Capybara ---
  async function fetchCapybaraGif() {
    try {
      const response = await fetch('https://api.capy.lol/v1/capybara?t=' + Date.now(), { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Erreur lors du fetch de l'API Capybara:", error);
      return null;
    }
  }
  
  // --- Affichage du gif de Capybara avec animation spinner ---
  async function showRandomGif() {
    const gifContainer = document.querySelector(".gif-container");
    // Afficher un spinner pendant le chargement
    gifContainer.innerHTML = `
      <div class="flex justify-center items-center w-full h-40">
        <div class="border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    `;
    
    const gifUrl = await fetchCapybaraGif();
    let finalUrl;
    if (gifUrl) {
      finalUrl = gifUrl;
    } else {
      const randomIndex = Math.floor(Math.random() * fallbackGifs.length);
      finalUrl = fallbackGifs[randomIndex] + "?t=" + Date.now();
    }
    // Afficher l'image avec effet de fondu
    gifContainer.innerHTML = `<img id="capybaraGif" class="w-full rounded opacity-0 transition-opacity duration-500" src="${finalUrl}" alt="Capybara" />`;
    setTimeout(() => {
      document.getElementById("capybaraGif").classList.remove("opacity-0");
    }, 100);
  }
  
  // Afficher un gif dès le chargement
  showRandomGif();
  
  // --- Statistiques du jeu ---
  let stats = {
    wins: 0,
    losses: 0,
    draws: 0,
    tux: 0,
    gnu: 0,
    beastie: 0,
  };
  
  function updateStatsDisplay() {
    const statsElement = document.getElementById("stats");
    const totalGames = stats.wins + stats.losses + stats.draws;
    if (totalGames === 0) {
      statsElement.classList.add("hidden");
    } else {
      statsElement.classList.remove("hidden");
      statsElement.innerText =
        "Gagnés: " + stats.wins +
        " - Perdus: " + stats.losses +
        " - Égalités: " + stats.draws +
        " | Tux: " + stats.tux +
        " - GNU: " + stats.gnu +
        " - Beastie: " + stats.beastie;
    }
  }
  
  // --- Fonction de jeu ---
  function play(userChoice) {
    const countdownElement = document.getElementById("countdown");
    const resultElement = document.getElementById("result");
    
    // Empêcher de lancer le compte à rebours s'il est déjà actif
    if (!countdownElement.classList.contains("hidden")) return;
    
    // Masquer le résultat précédent
    resultElement.classList.add("hidden");
    
    // Afficher le compte à rebours
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
      
      const choices = ["tux", "gnu", "beastie"];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      stats[userChoice]++;
      
      let result = "";
      let colorClasses = "";
      
      if (userChoice === computerChoice) {
        // Match nul
        result = `Match nul ! 🤝`;
        colorClasses = "bg-yellow-100 text-yellow-800";
        stats.draws++;
      } else if (
        (userChoice === "tux" && computerChoice === "gnu") ||
        (userChoice === "gnu" && computerChoice === "beastie") ||
        (userChoice === "beastie" && computerChoice === "tux")
      ) {
        // Victoire
        stats.wins++;
        if (userChoice === "tux" && computerChoice === "gnu") {
          result = "Tux bat GNU : Tux impose l'ordre avec son noyau structuré.";
        } else if (userChoice === "gnu" && computerChoice === "beastie") {
          result = "GNU bat Beastie : GNU revendique la suprématie du libre sur BSD.";
        } else if (userChoice === "beastie" && computerChoice === "tux") {
          result = "Beastie bat Tux : BSD est plus permissif que Linux et l'attaque sur sa flexibilité.";
        }
        colorClasses = "bg-green-100 text-green-800";
      } else {
        // Défaite
        stats.losses++;
        if (userChoice === "tux" && computerChoice === "beastie") {
          result = "Beastie bat Tux : BSD est plus permissif que Linux et l'attaque sur sa flexibilité.";
        } else if (userChoice === "gnu" && computerChoice === "tux") {
          result = "Tux bat GNU : Tux impose l'ordre avec son noyau structuré.";
        } else if (userChoice === "beastie" && computerChoice === "gnu") {
          result = "GNU bat Beastie : GNU revendique la suprématie du libre sur BSD.";
        }
        colorClasses = "bg-red-100 text-red-800";
      }
      
      // Affichage du résultat avec coloration
      resultElement.innerHTML = result;
      resultElement.className = "hidden text-2xl font-semibold rounded-xl p-4 shadow-md mb-8 " + colorClasses;
      resultElement.classList.remove("hidden");
      
      updateStatsDisplay();
    }, 3000);
  }
  
  window.onload = function() {
    updateStatsDisplay();
  };
  
  function resetStats() {
    stats = {
      wins: 0,
      losses: 0,
      draws: 0,
      tux: 0,
      gnu: 0,
      beastie: 0,
    };
    updateStatsDisplay();
  }
  