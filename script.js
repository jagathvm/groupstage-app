const isoDatabase = {
  mexico: "mx",
  "south africa": "za",
  "south korea": "kr",
  czechia: "cz",
  "czech republic": "cz",
  canada: "ca",
  "bosnia & herzegovina": "ba",
  bosnia: "ba",
  qatar: "qa",
  switzerland: "ch",
  brazil: "br",
  morocco: "ma",
  haiti: "ht",
  scotland: "gb-sct",
  "united states": "us",
  usa: "us",
  paraguay: "py",
  australia: "au",
  türkiye: "tr",
  turkey: "tr",
  germany: "de",
  curaçao: "cw",
  curacao: "cw",
  "ivory coast": "ci",
  ecuador: "ec",
  netherlands: "nl",
  holland: "nl",
  japan: "jp",
  sweden: "se",
  tunisia: "tn",
  belgium: "be",
  egypt: "eg",
  iran: "ir",
  "new zealand": "nz",
  spain: "es",
  "cape verde": "cv",
  "saudi arabia": "sa",
  uruguay: "uy",
  france: "fr",
  senegal: "sn",
  iraq: "iq",
  norway: "no",
  argentina: "ar",
  algeria: "dz",
  austria: "at",
  jordan: "jo",
  portugal: "pt",
  "dr congo": "cd",
  congo: "cd",
  uzbekistan: "uz",
  colombia: "co",
  england: "gb-eng",
  croatia: "hr",
  ghana: "gh",
  panama: "pa",
  italy: "it",
};

// Generates flag image HTML via CDN lookup
function getFlagHTML(countryName) {
  const sanitized = countryName.toLowerCase().trim();
  const code = isoDatabase[sanitized];
  if (code) {
    return `<img src="https://flagcdn.com/w40/${code}.png" alt="${countryName} flag" style="width: 20px; height: auto; border-radius: 2px; object-fit: contain;">`;
  }
  return `⚽`;
}

// Initial hydration from local storage
window.onload = function () {
  if (localStorage.getItem("efb_players")) {
    document.getElementById("players").value =
      localStorage.getItem("efb_players");
  }
  if (localStorage.getItem("efb_countries")) {
    document.getElementById("countries").value =
      localStorage.getItem("efb_countries");
  }
};

// Formats text outputs and triggers clipboard or system share sheet
async function shareGroups() {
  const displayElement = document.getElementById("groupsDisplay");

  try {
    // Render the HTML element as a visual canvas image
    const canvas = await html2canvas(displayElement, {
      backgroundColor: "#0f0f13", // Matches your deep dark mode background var(--bg-main)
      scale: 2, // High resolution screenshot scaling
      logging: false,
      useCORS: true, // Essential for loading external flagcdn image URLs cleanly
    });

    // Convert the structural graphic canvas to a raw blob file
    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("Failed to render the groups image.");
        return;
      }

      const file = new File([blob], "groupstage-draw.png", {
        type: "image/png",
      });

      // Check if system natively supports sharing files (Mobile/Mac/Windows native share sheet)
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "GroupStage Draw Results",
          text: "🏆 Group allocations are locked in! Check your matchups.",
        });
      } else {
        // Desktop/Browser Fallback: Directly download the crisp png file so they can attach it manually
        const link = document.createElement("a");
        link.download = "groupstage-draw.png";
        link.href = URL.createObjectURL(blob);
        link.click();
        alert(
          "📋 Image Sharing not supported on this browser. The high-res screenshot has been downloaded to your files so you can send it directly!",
        );
      }
    }, "image/png");
  } catch (error) {
    console.error("Screenshot engine encountered an error:", error);
    alert("An error occurred while generating the image layout.");
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Persists inputs, updates UI counters, and validates target count requirements
function saveAndVerify() {
  const playersRaw = document.getElementById("players").value;
  const countriesRaw = document.getElementById("countries").value;

  const players = playersRaw
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p !== "");
  const countries = countriesRaw
    .split("\n")
    .map((c) => c.trim())
    .filter((c) => c !== "");

  document.getElementById("countPlayers").innerText = players.length;
  document.getElementById("countCountries").innerText = countries.length;

  document.getElementById("verifyPlayersList").innerHTML = players
    .map((p) => `<li class="badge">🎮 ${p}</li>`)
    .join("");
  document.getElementById("verifyCountriesList").innerHTML = countries
    .map((c) => `<li class="badge">${getFlagHTML(c)} ${c}</li>`)
    .join("");

  localStorage.setItem("efb_players", playersRaw);
  localStorage.setItem("efb_countries", countriesRaw);
  document.getElementById("verifyZone").style.display = "block";

  if (players.length === 16 && countries.length === 16) {
    document.getElementById("generateBtn").disabled = false;
  } else {
    document.getElementById("generateBtn").disabled = true;
    alert(
      `Data Mismatch Error:\nYou have structured ${players.length} Players and ${countries.length} Countries.\nBoth target pools require exactly 16 values to deploy bracket allocations.`,
    );
  }
}

// Performs random drawing allocations and renders structured visual grids
function generateTournament() {
  const players = document
    .getElementById("players")
    .value.split("\n")
    .map((p) => p.trim())
    .filter((p) => p !== "");
  const countries = document
    .getElementById("countries")
    .value.split("\n")
    .map((c) => c.trim())
    .filter((c) => c !== "");

  if (players.length !== 16 || countries.length !== 16) return;

  const shuffledPlayers = shuffle([...players]);
  const shuffledCountries = shuffle([...countries]);

  let pairings = [];
  for (let i = 0; i < 16; i++) {
    pairings.push({
      player: shuffledPlayers[i],
      country: shuffledCountries[i],
    });
  }

  const alphabet = ["A", "B", "C", "D"];
  let html = "";

  for (let g = 0; g < 4; g++) {
    html += `
        <div class="group-box">
            <div class="group-header">GROUP ${alphabet[g]}</div>
            <ul class="group-list">`;

    for (let p = 0; p < 4; p++) {
      let item = pairings[g * 4 + p];
      html += `
                <li class="group-item">
                    <span class="team-player">🎮 ${item.player}</span>
                    <span class="team-country">${getFlagHTML(item.country)} ${item.country}</span>
                </li>`;
    }
    html += `</ul></div>`;
  }

  document.getElementById("groupsDisplay").innerHTML = html;
  document
    .getElementById("groupsDisplay")
    .scrollIntoView({ behavior: "smooth" });
  document.getElementById("shareContainer").style.display = "block";
}
