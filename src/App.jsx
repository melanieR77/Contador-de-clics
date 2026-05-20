import { useState, useCallback, useRef } from "react";

const MIN = -999;
const MAX = 999;

function getCounterColor(n) {
  if (n > 0) return "#39ff14";   // verde neón
  if (n < 0) return "#ff3a3a";   // rojo
  return "#e2e240";              // amarillo neutro
}

export default function App() {
  const [count, setCount]     = useState(0);
  const [key, setKey]         = useState(0);  
  const [ring, setRing]       = useState(false);
  const [error, setError]     = useState("");
  const [history, setHistory] = useState([]);  
  const ringTimer = useRef(null);

  const triggerPop = () => {
    setKey((k) => k + 1);
    clearTimeout(ringTimer.current);
    setRing(true);
    ringTimer.current = setTimeout(() => setRing(false), 500);
  };

  const addHistory = (action, value) => {
    setHistory((h) => [{ action, value, time: new Date().toLocaleTimeString("es-HN") }, ...h].slice(0, 5));
  };

  const clearError = () => setError("");

  const increment = useCallback(() => {
    clearError();
    if (count >= MAX) {
      setError(`⚠ Límite máximo alcanzado (${MAX})`);
      return;
    }
    setCount((c) => {
      addHistory("incremento", c + 1);
      return c + 1;
    });
    triggerPop();
  }, [count]);

  const decrement = useCallback(() => {
    clearError();
    if (count <= MIN) {
      setError(`⚠ Límite mínimo alcanzado (${MIN})`);
      return;
    }
    setCount((c) => {
      addHistory("decremento", c - 1);
      return c - 1;
    });
    triggerPop();
  }, [count]);

  const reset = useCallback(() => {
    clearError();
    if (count === 0) {
      setError("⚠ El contador ya está en cero");
      return;
    }
    addHistory("reinicio", 0);
    setCount(0);
    triggerPop();
  }, [count]);

  const color = getCounterColor(count);
  const pct   = ((count - MIN) / (MAX - MIN)) * 100; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">

      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#39ff14 1px,transparent 1px),linear-gradient(90deg,#39ff14 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="relative w-full max-w-sm rounded-2xl border overflow-hidden"
        style={{
          background: "rgba(10,10,20,0.95)",
          borderColor: color,
          boxShadow: `0 0 40px ${color}33, inset 0 0 20px rgba(0,0,0,0.6)`,
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-body" style={{ color: "#555" }}>
              Sistema de Conteo
            </p>
            <h1
              className="font-display text-2xl tracking-widest"
              style={{ color }}
            >
              DANIEL.ANALYST
            </h1>
          </div>
          
          <div className="relative flex items-center justify-center w-8 h-8">
            {ring && (
              <div
                className="ring absolute w-8 h-8 rounded-full border-2"
                style={{ borderColor: color }}
              />
            )}
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
          </div>
        </div>

        <div className="mx-6 mt-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </div>

        <div className="flex items-center justify-center py-10">
          <div className="relative">
            <span
              key={key}
              className="counter-number pop font-mono block text-center leading-none"
              style={{
                fontSize: "7rem",
                color,
                textShadow: `0 0 20px ${color}, 0 0 60px ${color}66`,
                letterSpacing: "0.05em",
                minWidth: "220px",
                transition: "color 0.4s, text-shadow 0.4s",
              }}
            >
              {count >= 0 ? `+${count}` : count}
            </span>
          </div>
        </div>

        <div className="mx-6 mb-4 h-6">
          {error && (
            <p className="text-center text-xs font-body" style={{ color: "#ff6b6b" }}>
              {error}
            </p>
          )}
        </div>

        <div className="px-6 pb-6 grid grid-cols-3 gap-3">
          {/* Decremento */}
          <button
            onClick={decrement}
            disabled={count <= MIN}
            className="relative group py-4 rounded-xl border font-mono text-2xl font-bold transition-all duration-150
              disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: "#ff3a3a55",
              color: "#ff3a3a",
              background: "rgba(255,58,58,0.06)",
            }}
            onMouseEnter={(e) => { if (count > MIN) e.currentTarget.style.background = "rgba(255,58,58,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,58,58,0.06)"; }}
          >
            −
          </button>

          <button
            onClick={reset}
            disabled={count === 0}
            className="py-4 rounded-xl border font-body text-xs tracking-widest uppercase font-semibold
              transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: "#e2e24055",
              color: "#e2e240",
              background: "rgba(226,226,64,0.06)",
            }}
            onMouseEnter={(e) => { if (count !== 0) e.currentTarget.style.background = "rgba(226,226,64,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(226,226,64,0.06)"; }}
          >
            Reset
          </button>
          
          <button
            onClick={increment}
            disabled={count >= MAX}
            className="py-4 rounded-xl border font-mono text-2xl font-bold transition-all duration-150
              disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: "#39ff1455",
              color: "#39ff14",
              background: "rgba(57,255,20,0.06)",
            }}
            onMouseEnter={(e) => { if (count < MAX) e.currentTarget.style.background = "rgba(57,255,20,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(57,255,20,0.06)"; }}
          >
            +
          </button>
        </div>

        <div className="mx-6 border-t" style={{ borderColor: "#ffffff10" }} />

        <div className="px-6 py-4">
          <p className="text-xs tracking-[0.25em] uppercase mb-3 font-body" style={{ color: "#444" }}>
            Historial reciente
          </p>
          {history.length === 0 ? (
            <p className="text-xs font-mono text-center py-2" style={{ color: "#333" }}>
              — sin eventos —
            </p>
          ) : (
            <ul className="space-y-1">
              {history.map((h, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="font-mono text-xs" style={{ color: "#555" }}>
                    {h.time}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#555" }}>
                    {h.action}
                  </span>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: getCounterColor(h.value) }}
                  >
                    {h.value >= 0 ? `+${h.value}` : h.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="px-6 py-3 text-center border-t font-mono text-xs"
          style={{ borderColor: "#ffffff08", color: "#2a2a2a" }}
        >
      
        </div>
      </div>
    </div>
  );
}
