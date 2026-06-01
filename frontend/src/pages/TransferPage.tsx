import { useState, useEffect } from "react";
import type { Office } from "../types/Office";
import type { Copy } from "../types/Copy";
import type { Transfer } from "../types/Transfer";
import { getAllOffices } from "../service/OfficeService";
import { getCopiesByOffice } from "../service/CopyService";
import { transferGame } from "../service/TransferService";

const PASOS = ["Sucursal origen", "Seleccionar copia", "Destino", "Confirmar"];

export default function ModuloTraslado() {
  const [paso, setPaso] = useState(1);
  const [sucursales, setSucursales] = useState<Office[]>([]);
  const [copias, setCopias] = useState<Copy[]>([]);
  
  const [origenId, setOrigenId] = useState<number | null>(null);
  const [copiaSeleccionada, setCopiaSeleccionada] = useState<Copy | null>(null);
  const [destinoId, setDestinoId] = useState<number | null>(null);
  const [comentarios, setComentarios] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exitoso, setExitoso] = useState(false);

  useEffect(() => {
    getAllOffices().then(setSucursales).catch(console.error);
  }, []);

  useEffect(() => {
    if (!origenId) return;
    setCargando(true);
    setError(null);
    getCopiesByOffice(origenId)
      .then((data) => setCopias(data.filter((c) => c.availability === "S")))
      .catch((e: Error) => setError(e.message))
      .finally(() => setCargando(false));
  }, [origenId]);

  const irSiguiente = () => {
    if (paso === 1 && !origenId) return alert("Por favor seleccione una sucursal origen.");
    if (paso === 2 && !copiaSeleccionada) return alert("Por favor seleccione una copia para trasladar.");
    if (paso === 3 && !destinoId) return alert("Por favor seleccione una sucursal destino.");
    
    if (paso === 1) setCopiaSeleccionada(null);
    if (paso === 2) { setDestinoId(null); setComentarios(""); }
    
    setPaso((prev) => prev + 1);
  };

  const irAtras = () => setPaso((prev) => prev - 1);

  async function manejarTraslado() {
    if (!origenId || !destinoId || !copiaSeleccionada) return;
    setCargando(true);
    setError(null);
    try {
      const traslado: Transfer = {
        operationNumber: 0,
        copyId: copiaSeleccionada.serialNumber,  // ⚠️ Verificar si es número
        transferDate: new Date(),
        originOfficeId: origenId,
        destinationOfficeId: destinoId,
        comments: comentarios,
      };
      console.log(JSON.stringify(traslado));
      await transferGame(traslado);
      setExitoso(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al realizar el traslado.");
    } finally {
      setCargando(false);
    }
  }

  const sucursalOrigen = sucursales.find((s) => s.number === origenId);
  const sucursalDestino = sucursales.find((s) => s.number === destinoId);
  const destinosDisponibles = sucursales.filter((s) => s.number !== origenId);

  const estiloTarjeta = { background: "#1a0a2e", border: "0.5px solid #3a1a5a", borderRadius: 12, padding: "1.25rem" };
  const estiloTitulo = { fontSize: 13, fontWeight: 500, color: "#a07cc5", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 };
  const estiloSelector = { width: "100%", background: "#0f0020", border: "0.5px solid #4a2272", borderRadius: 8, color: "#f0e6ff", padding: "9px 12px", fontSize: 14, outline: "none" };
  const estiloBtnPrimario = { background: "#6c3ab0", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 15, cursor: "pointer", fontWeight: 500 };
  const estiloBtnSecundario = { background: "transparent", color: "#a07cc5", border: "0.5px solid #4a2272", borderRadius: 8, padding: "10px 20px", fontSize: 14, cursor: "pointer" };
  const estiloEtiqueta = { fontSize: 13, color: "#a07cc5", display: "block", marginBottom: 6 };

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto", background: "#0a0010", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif" }}>
      
      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "0.5px solid #3a1a5a" }}>
        <div style={{ width: 40, height: 40, background: "#6c3ab0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⇄</div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Módulo de traslados</h1>
          <p style={{ fontSize: 14, color: "#a07cc5", margin: "2px 0 0" }}>Mover una copia entre sucursales</p>
        </div>
      </div>

      {/* Indicador de pasos */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        {PASOS.map((label, i) => {
          const idx = i + 1;
          const listo = idx < paso;
          const activo = idx === paso;
          return (
            <div key={idx} style={{ display: "flex", alignItems: "center", flex: i < PASOS.length - 1 ? 1 : undefined }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500,
                  background: listo ? "#4a1f8a" : activo ? "#6c3ab0" : "#2a0e50",
                  border: `1.5px solid ${listo || activo ? "#8b5cf6" : "#4a2272"}`,
                  color: listo || activo ? (activo ? "#fff" : "#c09aea") : "#a07cc5",
                }}>{listo ? "✓" : idx}</div>
                <span style={{ fontSize: 11, color: "#7a5ea0", whiteSpace: "nowrap" }}>{label}</span>
              </div>
              {i < PASOS.length - 1 && <div style={{ flex: 1, height: 1, background: "#2a0e50", marginBottom: 14, marginLeft: 8, marginRight: 8 }} />}
            </div>
          );
        })}
      </div>

      {/* Cuerpo del Asistente */}
      <div style={estiloTarjeta}>
        
        {/* PASO 1: ORIGEN */}
        {paso === 1 && (
          <>
            <div style={estiloTitulo}><span>🏬</span> Seleccionar sucursal origen</div>
            <div style={{ marginBottom: "1rem" }}>
              <span style={estiloEtiqueta}>Sucursal</span>
              <select style={estiloSelector} value={origenId ?? ""} onChange={(e) => setOrigenId(e.target.value ? parseInt(e.target.value) : null)}>
                <option value="">— elegir —</option>
                {sucursales.map((s) => <option key={s.number} value={s.number}>{s.number} — {s.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={estiloBtnPrimario} onClick={irSiguiente}>Siguiente →</button>
            </div>
          </>
        )}

        {/* PASO 2: SELECCIONAR COPIA */}
        {paso === 2 && (
          <>
            <div style={estiloTitulo}><span>📋</span> Seleccionar copia a trasladar</div>
            <div style={{ fontSize: 12, color: "#7a5ea0", marginBottom: 12 }}>🔍 Copias disponibles en: <span style={{ color: "#d4aaff" }}>{sucursalOrigen?.name}</span></div>
            
            {cargando ? <p style={{ color: "#7a5ea0", fontSize: 14 }}>⏳ Cargando copias…</p> : 
             copias.length === 0 ? <p style={{ color: "#7a5ea0", fontSize: 14 }}>No hay copias disponibles en esta sucursal.</p> : 
             copias.map((c) => (
              <div key={c.serialNumber} onClick={() => setCopiaSeleccionada(c)} style={{
                border: "0.5px solid", borderRadius: 8, padding: "0.9rem 1rem", marginBottom: "0.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                background: copiaSeleccionada?.serialNumber === c.serialNumber ? "#1e0840" : "#0f0020",
                borderColor: copiaSeleccionada?.serialNumber === c.serialNumber ? "#8b5cf6" : "#3a1a5a",
              }}>
                <div>
                  <div style={{ fontSize: 15, color: "#d4aaff", fontWeight: 500 }}>#{c.serialNumber}</div>
                  <div style={{ fontSize: 13, color: "#c09aea", marginTop: 3 }}>Videojuego ID: {c.videogameId} · Estado: {c.condition}</div>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: "#1a3a1a", color: "#6abf6a" }}>S — disponible</span>
              </div>
            ))}
            
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={estiloBtnSecundario} onClick={irAtras}>← Atrás</button>
              <button style={estiloBtnPrimario} onClick={irSiguiente} disabled={copias.length === 0}>Siguiente →</button>
            </div>
          </>
        )}

        {/* PASO 3: DESTINO Y COMENTARIOS */}
        {paso === 3 && copiaSeleccionada && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <div style={estiloTitulo}><span>📦</span> Copia seleccionada</div>
                <div style={{ marginBottom: 10 }}><span style={estiloEtiqueta}>Número de serie</span> <span style={{ color: "#f0e6ff" }}>#{copiaSeleccionada.serialNumber}</span></div>
                <div><span style={estiloEtiqueta}>Videojuego ID</span> <span style={{ color: "#f0e6ff" }}>{copiaSeleccionada.videogameId}</span></div>
              </div>
              <div>
                <div style={estiloTitulo}><span>🏢</span> Sucursal destino</div>
                <span style={estiloEtiqueta}>Trasladar a</span>
                <select style={estiloSelector} value={destinoId ?? ""} onChange={(e) => setDestinoId(e.target.value ? parseInt(e.target.value) : null)}>
                  <option value="">— elegir —</option>
                  {destinosDisponibles.map((s) => <option key={s.number} value={s.number}>{s.number} — {s.name}</option>)}
                </select>
                <span style={{ ...estiloEtiqueta, marginTop: 12, display: "block" }}>Comentarios</span>
                <textarea style={{ ...estiloSelector, minHeight: 60, resize: "vertical" as const }} value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Notas sobre el traslado... (opcional)" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button style={estiloBtnSecundario} onClick={irAtras}>← Atrás</button>
              <button style={estiloBtnPrimario} onClick={irSiguiente}>Revisar traslado</button>
            </div>
          </>
        )}

        {/* PASO 4: CONFIRMAR */}
        {paso === 4 && copiaSeleccionada && (
          <>
            <div style={estiloTitulo}><span>✅</span> Confirmar traslado</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <div style={{ fontSize: 12, color: "#7a5ea0", marginBottom: 6 }}>🏬 DESDE</div>
                <div style={{ marginBottom: 8 }}><span style={estiloEtiqueta}>Sucursal:</span> <span style={{ color: "#f0e6ff" }}>{sucursalOrigen?.name}</span></div>
                <div><span style={estiloEtiqueta}>Serie:</span> <span style={{ color: "#f0e6ff" }}>#{copiaSeleccionada.serialNumber}</span></div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#7a5ea0", marginBottom: 6 }}>🏢 HACIA</div>
                <div style={{ marginBottom: 8 }}><span style={estiloEtiqueta}>Sucursal Destino:</span> <span style={{ color: "#f0e6ff" }}>{sucursalDestino?.name}</span></div>
                <div><span style={estiloEtiqueta}>Comentarios:</span> <span style={{ color: "#f0e6ff" }}>{comentarios || "(ninguno)"}</span></div>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "0.5px solid #2a0e50", margin: "1.25rem 0" }} />
            
            {error && <div style={{ background: "#3a1a1a", border: "0.5px solid #7a3a3a", borderRadius: 8, padding: "0.75rem 1rem", color: "#c26060", fontSize: 14, marginBottom: "1rem" }}>⚠ {error}</div>}
            
            {exitoso ? (
              <div style={{ background: "#0f0020", border: "0.5px solid #8b5cf6", borderRadius: 8, padding: "1rem", color: "#c09aea", fontSize: 14, textAlign: "center" }}>
                ✓ Traslado registrado con éxito de {sucursalOrigen?.name} → {sucursalDestino?.name}.
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button style={estiloBtnSecundario} onClick={irAtras} disabled={cargando}>← Atrás</button>
                <button style={estiloBtnPrimario} onClick={manejarTraslado} disabled={cargando}>
                  {cargando ? "Guardando…" : "Confirmar y guardar"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}