let microSpaOneContainer = null;
export async function bootstrap() {
  console.log("应用正在启动");
}
export async function mount() {
  console.log("应用正在挂载");
  microSpaOneContainer = document.createElement("div");
  microSpaOneContainer.id = "microSpaOneContainer";
  microSpaOneContainer.innerHTML = "Hello microSpaOne";
  document.body.appendChild(microSpaOneContainer);
}
export async function unmount() {
  console.log("应用正在卸载");
  document.body.removeChild(microSpaOneContainer);
}
