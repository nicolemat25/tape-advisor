import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres el Tape Reading Advisor, un asistente especializado en lectura del tape, opciones financieras y análisis de flujo institucional basado en el Tape Reading Bootcamp.

INSTRUCCIONES:
- Responde SIEMPRE en español
- Sé directo y práctico — da respuestas accionables como lo haría un trader experimentado  
- Aplica el proceso de las capas de la cebolla: data → sector → noticias → ejecución
- Usa la leyenda de deltas (.10 venta prima, .20 hedge, .30-.40 transición, .50-.60 tape zone, .70 smart move, .80 directional, .90-1.00 aggressive)
- Aplica el proceso del bootcamp cuando alguien mencione delta, DTE, tape, premium, OI
- No inventes información fuera del contexto del bootcamp
- Máximo 200 palabras por respuesta salvo análisis profundo`;


const SUGGESTIONS = [
  "Veo un movimiento en delta .70 en mid tape con $2M — ¿qué hago?",
  "¿Cómo diferencio un hedge de una posición direccional?",
  "¿Qué significa que el OI no subió al día siguiente?",
  "Explícame la leyenda de deltas completa",
  "¿Cuándo uso mensual vs semanal?",
  "¿Qué es un Golden Sweep?",
];

export default function TapeAdvisor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    setStarted(true);

    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const reply = String(data?.content?.[0]?.text || (typeof data?.error === "string" ? data.error : "") || "Error al procesar respuesta.");
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Courier New', monospace",
      color: "#e0e0e0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1a1a2e",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#0d0d18",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          width: 36, height: 36,
          background: "linear-gradient(135deg, #00ff88, #0099ff)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: "bold", color: "#000",
          flexShrink: 0,
        }}>T</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", letterSpacing: "0.05em" }}>
            TAPE ADVISOR
          </div>
          <div style={{ fontSize: 11, color: "#00ff88", letterSpacing: "0.1em" }}>
            TAPE READING BOOTCAMP · ACTIVO
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}/>
          <span style={{ fontSize: 11, color: "#666", letterSpacing: "0.08em" }}>EN LÍNEA</span>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px", maxWidth: 760, width: "100%", margin: "0 auto" }}>

        {/* Welcome screen */}
        {!started && (
          <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
            <div style={{
              fontSize: 48,
              background: "linear-gradient(135deg, #00ff88, #0099ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}>◎</div>
            <h1 style={{ fontSize: 22, color: "#fff", margin: "0 0 8px", letterSpacing: "0.08em" }}>
              TAPE READING ADVISOR
            </h1>
            <p style={{ color: "#666", fontSize: 13, margin: "0 0 36px", lineHeight: 1.6 }}>
              Tu asistente personal basado en el bootcamp completo.<br/>
              Pregunta sobre delta, tape, opciones, hedge, expiraciones.
            </p>

            <div style={{ display: "grid", gap: 10, maxWidth: 580, margin: "0 auto" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{
                  background: "#0d0d18",
                  border: "1px solid #1a1a2e",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#aaa",
                  fontSize: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  letterSpacing: "0.02em",
                  transition: "all 0.15s",
                  lineHeight: 1.4,
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "#00ff8844"; e.target.style.color = "#fff"; e.target.style.background = "#111"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#1a1a2e"; e.target.style.color = "#aaa"; e.target.style.background = "#0d0d18"; }}
                >
                  <span style={{ color: "#00ff8866", marginRight: 8 }}>→</span>{s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: m.role === "user" ? "row-reverse" : "row",
            gap: 10,
            alignItems: "flex-start",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: "bold",
              background: m.role === "user" ? "#1a1a2e" : "linear-gradient(135deg, #00ff88, #0099ff)",
              color: m.role === "user" ? "#666" : "#000",
              border: m.role === "user" ? "1px solid #2a2a3e" : "none",
            }}>
              {m.role === "user" ? "YO" : "T"}
            </div>
            <div style={{
              maxWidth: "80%",
              background: m.role === "user" ? "#111" : "#0d0d18",
              border: `1px solid ${m.role === "user" ? "#1a1a2e" : "#0f2a1a"}`,
              borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
              padding: "12px 16px",
              fontSize: 13,
              lineHeight: 1.7,
              color: m.role === "user" ? "#ccc" : "#e8e8e8",
              whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #00ff88, #0099ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: "bold", color: "#000", flexShrink: 0,
            }}>T</div>
            <div style={{
              background: "#0d0d18", border: "1px solid #0f2a1a",
              borderRadius: "4px 12px 12px 12px", padding: "14px 18px",
              display: "flex", gap: 6, alignItems: "center",
            }}>
              {[0,1,2].map(n => (
                <div key={n} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#00ff88",
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${n * 0.2}s`,
                  opacity: 0.6,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid #1a1a2e",
        padding: "16px",
        background: "#0d0d18",
        position: "sticky",
        bottom: 0,
      }}>
        <div style={{
          maxWidth: 760, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pregunta sobre delta, tape, opciones, hedge..."
            rows={1}
            style={{
              flex: 1,
              background: "#111",
              border: "1px solid #1a1a2e",
              borderRadius: 10,
              padding: "12px 14px",
              color: "#e0e0e0",
              fontSize: 13,
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
              minHeight: 44,
              maxHeight: 120,
              overflowY: "auto",
              transition: "border-color 0.15s",
            }}
            onFocus={e => e.target.style.borderColor = "#00ff8844"}
            onBlur={e => e.target.style.borderColor = "#1a1a2e"}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44,
              borderRadius: 10,
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #00ff88, #0099ff)"
                : "#1a1a2e",
              border: "none",
              cursor: input.trim() && !loading ? "pointer" : "default",
              color: input.trim() && !loading ? "#000" : "#333",
              fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            ↑
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#333", marginTop: 8, letterSpacing: "0.06em" }}>
          ENTER para enviar · SHIFT+ENTER para nueva línea
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a1a2e; border-radius: 2px; }
        textarea::placeholder { color: #333; }
      `}</style>
    </div>
  );
}
