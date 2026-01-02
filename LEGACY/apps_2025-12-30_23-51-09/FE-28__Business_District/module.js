let CONFIG = {};
let FUNCTIONS = {};
let LEVELS = {};
let ROLES = {};
let CERTS = {};

let USER_STATE = {
    id: "user123",
    role: "viewer",
    reputation: 0,
    tokens: 0,
    level: 1
};

async function loadConfig() {
    CONFIG = await fetch("module.config.json").then(r => r.json());
    FUNCTIONS = await fetch("functions.config.json").then(r => r.json());
    LEVELS = await fetch("levels.config.json").then(r => r.json());
    ROLES = await fetch("roles.config.json").then(r => r.json());
    CERTS = await fetch("certificates.config.json").then(r => r.json());
}

function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    const rolePanels = ROLES.roles[USER_STATE.role].panels;

    sidebar.innerHTML = rolePanels
        .map(p => `<button onclick="showPanel('${p}')">${p}</button>`)
        .join("");
}

function showPanel(panelName) {
    const workspace = document.getElementById("workspace");

    import(`./panels/${panelName}.js`)
        .then(module => module.render(workspace))
        .catch(() => {
            workspace.innerHTML = `<h2>${panelName}</h2><p>Panel not implemented.</p>`;
        });
}

function renderTopbar() {
    document.getElementById("module-name").innerText = CONFIG.moduleName;
    document.getElementById("user-info").innerText =
        `Reputacja: ${USER_STATE.reputation} | Tokeny: ${USER_STATE.tokens}`;
}

async function init() {
    await loadConfig();
    renderTopbar();
    renderSidebar();
    showPanel("DATA");
}

init();
