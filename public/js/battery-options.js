async function loadBatteries() {
    // Read model ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get("model");

    if (!modelId) {
        alert("Invalid model selected!");
        return;
    }

    const response = await fetch(`/api/battery/batteries/${modelId}`);
    const batteries = await response.json();

    let container = document.getElementById("batteryList");
    container.innerHTML = "";

    if (batteries.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-size:18px; padding:20px;">No battery options found.</p>`;
        return;
    }

    batteries.forEach(b => {
        container.innerHTML += `
            <div class="battery-row">
                <div><img src="${b.image_url}" alt="Battery"></div>
                <div>${b.battery_model}</div>
                <div>${b.ah}</div>
                <div>${b.warranty} Months</div>
                <div>₹${b.price}</div>
                <div>${b.description || "-"}</div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadBatteries);
