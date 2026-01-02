export function init() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const moduleId = tile.dataset.module;
            window.loadModule(moduleId);
        });
    });
}
