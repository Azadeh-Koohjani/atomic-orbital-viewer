import GUI from 'lil-gui';

function createSetting(settings) {
    let intersector = settings.intersector, orbital = settings.orbital;
    const gui = new GUI({ width: 310 });
    const obj = {orbitals: orbital.current, intersector: orbital.intersector}
    gui.add(obj, 'orbitals', orbital.data).onChange(orbital.event);
    gui.add(obj, 'intersector', intersector.min, intersector.max, 0.05).onChange(intersector.event);
    return gui;
}
export { createSetting }