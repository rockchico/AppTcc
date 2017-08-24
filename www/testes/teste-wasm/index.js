
let info = document.getElementById('info');
let container = document.getElementById('container');

function WasmIsReady() {
  console.log('Wasm is ready');
  if (!featuresReady) {
    console.log('Requred features are not ready.');
    return;
  }
  info.innerHTML = '';
  container.className = '';

}