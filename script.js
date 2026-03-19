const thicknessSellEl = document.getElementById("thicknessSell");
const sheetsEl = document.getElementById("sheets");
const widthEl = document.getElementById("width");
const lengthEl = document.getElementById("length");
const cbmPerBundleEl = document.getElementById("cbmPerBundle");
const bundleCountEl = document.getElementById("bundleCount");
const corePerBundleEl = document.getElementById("corePerBundle");
const thicknessMmEl = document.getElementById("thicknessMm");
const optionTypeEl = document.getElementById("optionType");
const customCbmWrapEl = document.getElementById("customCbmWrap");
const customCbmEl = document.getElementById("customCbm");

const totalCbmEl = document.getElementById("totalCbm");
const bundleHeightEl = document.getElementById("bundleHeight");
const statusTextEl = document.getElementById("statusText");

const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");

function toNumber(value) {
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

function getCbmLimit() {
  if (optionTypeEl.value === "custom") {
    return toNumber(customCbmEl.value);
  }
  return 54;
}

function updateOptionView() {
  if (optionTypeEl.value === "custom") {
    customCbmWrapEl.classList.remove("hidden");
  } else {
    customCbmWrapEl.classList.add("hidden");
    customCbmEl.value = "";
  }
}

function calculate() {
  const thicknessSell = toNumber(thicknessSellEl.value);
  const sheets = toNumber(sheetsEl.value);
  const width = toNumber(widthEl.value);
  const length = toNumber(lengthEl.value);
  const cbmPerBundle = toNumber(cbmPerBundleEl.value);
  const bundleCount = toNumber(bundleCountEl.value);
  const corePerBundle = toNumber(corePerBundleEl.value);
  const thicknessMm = toNumber(thicknessMmEl.value);
  const cbmLimit = getCbmLimit();

  let totalCbm = 0;
  let bundleHeight = 0;
  let status = "Waiting input";

  if (cbmPerBundle > 0 && bundleCount > 0) {
    totalCbm = cbmPerBundle * bundleCount;
  } else if (thicknessSell > 0 && sheets > 0 && width > 0 && length > 0) {
    totalCbm = (thicknessSell * width * length * sheets) / 1000000000;
  }

  if (corePerBundle > 0 && thicknessMm > 0) {
    bundleHeight = corePerBundle * thicknessMm;
  }

  if (totalCbm > 0) {
    if (cbmLimit > 0) {
      if (totalCbm < cbmLimit) {
        status = `OK, under ${cbmLimit} CBM`;
      } else if (totalCbm === cbmLimit) {
        status = `Exactly ${cbmLimit} CBM`;
      } else {
        status = `Over ${cbmLimit} CBM`;
      }
    } else {
      status = "Calculated";
    }
  }

  totalCbmEl.textContent = totalCbm.toFixed(3);
  bundleHeightEl.textContent = `${bundleHeight.toFixed(2)} mm`;
  statusTextEl.textContent = status;
}

function resetForm() {
  thicknessSellEl.value = "";
  sheetsEl.value = "";
  widthEl.value = "";
  lengthEl.value = "";
  cbmPerBundleEl.value = "";
  bundleCountEl.value = "1";
  corePerBundleEl.value = "";
  thicknessMmEl.value = "";
  optionTypeEl.value = "54";
  customCbmEl.value = "";
  updateOptionView();

  totalCbmEl.textContent = "0.000";
  bundleHeightEl.textContent = "0.00 mm";
  statusTextEl.textContent = "Waiting input";
}

optionTypeEl.addEventListener("change", updateOptionView);
calcBtn.addEventListener("click", calculate);
resetBtn.addEventListener("click", resetForm);

[
  thicknessSellEl,
  sheetsEl,
  widthEl,
  lengthEl,
  cbmPerBundleEl,
  bundleCountEl,
  corePerBundleEl,
  thicknessMmEl,
  customCbmEl
].forEach((el) => {
  el.addEventListener("input", calculate);
  el.addEventListener("change", calculate);
});

updateOptionView();
