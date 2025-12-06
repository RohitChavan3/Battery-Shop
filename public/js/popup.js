async function getCompanies() {
    const res = await fetch("/api/battery/companies");
    const companies = await res.json();

    let companySelect = document.getElementById("companySelect");

    companySelect.innerHTML = `<option value="">-- Select Company --</option>`;

    companies.forEach(c => {
        companySelect.innerHTML += `<option value="${c.company_id}">${c.company_name}</option>`;
    });
}

async function getModels() {
    let companyId = document.getElementById("companySelect").value;
    const res = await fetch(`/api/battery/models/${companyId}`);
    const models = await res.json();

    let modelSelect = document.getElementById("modelSelect");

    modelSelect.innerHTML = `<option value="">-- Select Model --</option>`;
    models.forEach(m => {
        modelSelect.innerHTML += `<option value="${m.model_id}">${m.model_name}</option>`;
    });
}

async function showBatteryOptions() {
    let modelId = document.getElementById("modelSelect").value;
    window.location.href = `/battery-options.html?model=${modelId}`;
}
