// ===== Ohm's Law Calculator =====
// V = I × R   →   I = V / R   →   R = V / I
// Enter any two of Voltage, Current, Resistance; the third is calculated.

(function () {
  "use strict";

  var els = {
    voltage: document.getElementById("voltage"),
    current: document.getElementById("current"),
    resistance: document.getElementById("resistance"),
    solve: document.getElementById("solve"),
    reset: document.getElementById("reset"),
    message: document.getElementById("message"),
    result: document.getElementById("result"),
    resultSymbol: document.getElementById("resultSymbol"),
    resultNumber: document.getElementById("resultNumber"),
    resultUnit: document.getElementById("resultUnit"),
    resultFormula: document.getElementById("resultFormula"),
  };

  var UNITS = { v: "V", i: "A", r: "Ω" };
  var SYMBOLS = { v: "V", i: "I", r: "R" };

  // Read a numeric value, or null when empty/invalid.
  function read(input) {
    if (!input) return null;
    var raw = input.value.trim();
    if (raw === "") return null;
    var num = Number(raw);
    return Number.isFinite(num) ? num : null;
  }

  // Trim long decimals to a clean, readable string.
  function formatNumber(n) {
    if (n === 0) return "0";
    var abs = Math.abs(n);
    if (abs >= 1000 || abs < 0.01) {
      // exponential for very large/small
      return abs < 0.01 && abs > 0
        ? n.toExponential(3).replace(/\.?0+e/, "e")
        : n.toLocaleString(undefined, { maximumFractionDigits: 3 });
    }
    return String(parseFloat(n.toFixed(4)));
  }

  function showMessage(text, isValid) {
    els.message.textContent = text || "";
    els.message.classList.toggle("is-valid", !!isValid && !!text);
  }

  function showResult(target, value, formulaHtml) {
    els.result.classList.remove("is-empty");
    els.resultSymbol.textContent = SYMBOLS[target];
    els.resultNumber.textContent = formatNumber(value);
    els.resultUnit.textContent = UNITS[target];
    els.resultFormula.innerHTML = formulaHtml;
  }

  function clearResult() {
    els.result.classList.add("is-empty");
    els.resultSymbol.textContent = "—";
    els.resultNumber.textContent = "—";
    els.resultUnit.textContent = "";
    els.resultFormula.textContent = "";
  }

  function solve() {
    var v = read(els.voltage);
    var i = read(els.current);
    var r = read(els.resistance);

    var provided = [v, i, r].filter(function (x) { return x !== null; }).length;

    if (provided === 0) {
      showMessage("Enter any two values to calculate the third.");
      clearResult();
      return;
    }

    if (provided === 1) {
      showMessage("Please enter a second value.");
      clearResult();
      return;
    }

    if (provided === 3) {
      showMessage("All three values entered — leaving as-is. Clear one to solve for it.", true);
      clearResult();
      return;
    }

    // Exactly two provided → solve for the missing one.
    if (v === null) {
      // Solve V = I × R
      if (i === 0) {
        showMessage("Current is 0 — voltage would be 0 V regardless of resistance.", true);
        showResult("v", 0, "V = I × R = 0 × " + formatNumber(r) + " = 0 V");
        return;
      }
      var vRes = i * r;
      showMessage("Voltage calculated.", true);
      showResult("v", vRes, "V = I × R = " + formatNumber(i) + " × " + formatNumber(r));
      return;
    }

    if (i === null) {
      // Solve I = V / R
      if (r === 0) {
        showMessage("Resistance is 0 — current is undefined (divide by zero).");
        clearResult();
        return;
      }
      var iRes = v / r;
      showMessage("Current calculated.", true);
      showResult("i", iRes, "I = V ÷ R = " + formatNumber(v) + " ÷ " + formatNumber(r));
      return;
    }

    if (r === null) {
      // Solve R = V / I
      if (i === 0) {
        showMessage("Current is 0 — resistance is undefined (divide by zero).");
        clearResult();
        return;
      }
      var rRes = v / i;
      showMessage("Resistance calculated.", true);
      showResult("r", rRes, "R = V ÷ I = " + formatNumber(v) + " ÷ " + formatNumber(i));
      return;
    }
  }

  function reset() {
    els.voltage.value = "";
    els.current.value = "";
    els.resistance.value = "";
    showMessage("");
    clearResult();
    els.voltage.focus();
  }

  // Wire up events.
  els.solve.addEventListener("click", solve);
  els.reset.addEventListener("click", reset);

  [els.voltage, els.current, els.resistance].forEach(function (input) {
    input.addEventListener("input", solve);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") solve();
    });
  });

  clearResult();

  // ===== Scroll reveal animations =====
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal").forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
