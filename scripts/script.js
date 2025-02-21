const gifs = [
    "https://i.chzbgr.com/full/9324013056/h3EB8D65F/a-group-of-capybaras-are-squeezed-into-an-outdoor-bath-tub",
    "https://media.tenor.com/oDB9EAV1ucoAAAAM/dancing-capybara.gif",
    "https://media.tenor.com/2UVcaTGegxoAAAAM/%D0%BA%D0%B0%D0%BF%D0%B8%D0%B1%D0%B0%D1%80%D0%B0.gif",
    "https://sweezy-cursors.com/wp-content/uploads/cursor/capybara-dancing-animated/capybara-dancing-animated-custom-cursor.gif",
];

function showRandomGif() {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    document.getElementById("capybaraGif").src = gifs[randomIndex];
}

// Afficher un premier GIF aléatoire au chargement
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
    document.getElementById("stats").innerText =
        "Gagnés: " + stats.wins +
        " - Perdus: " + stats.losses +
        " - Égalités: " + stats.draws +
        " | Pierre: " + stats.pierre +
        " - Papier: " + stats.papier +
        " - Ciseau: " + stats.ciseau;
}

function play(userChoice) {
    const countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = '<img src="https://static8.depositphotos.com/1338574/829/i/450/depositphotos_8292990-stock-photo-the-number-3-in-gold.jpg" />';
    countdownElement.classList.add("countdown");

    setTimeout(() => {
        countdownElement.innerHTML = '<img src="https://t3.ftcdn.net/jpg/00/25/85/36/360_F_25853657_TZaY3PRevrRfVLhVwACDw1YxdmGQLXhf.jpg" />';
    }, 1000);

    setTimeout(() => {
        countdownElement.innerHTML = '<img src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-1-png-image_2158836.jpg" />';
    }, 2000);

    setTimeout(() => {
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

        document.getElementById("result").innerText =
            "Vous avez choisi " + userChoice +
            ", l'ordinateur a choisi " + computerChoice +
            ". " + result;
        
        updateStatsDisplay();
        countdownElement.innerHTML = "";
        countdownElement.classList.remove("countdown");
    }, 3000);
}
