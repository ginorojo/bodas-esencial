"use client";

import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Church,
  Gift,
  Navigation,
  PartyPopper,
  Music,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  ExternalLink,
  Heart
} from "lucide-react";

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  viewport: { once: true, amount: 0.1 },
};

// --- ICONOS PERSONALIZADOS (VESTIDO Y TRAJE) ---
const IconoVestido = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 4h8l-1.5 5h-5L8 4z" />
    <path d="M9.5 9L6 21h12l-3.5-12" />
    <path d="M12 9v12" strokeDasharray="2 2" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const IconoTraje = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M5 3l7 9 7-9" />
    <path d="M12 12v9" />
    <path d="M9.5 6.5l2.5 1.5 2.5-1.5" />
  </svg>
);

// --- TEXTURAS Y DATOS ---
const texturaPlaceholder = "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop";
const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
const paddingDays = Array(6).fill(null); // Noviembre 2026 empieza en domingo
const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

export default function InvitacionBodaBasica() {
  // 1. ESTADOS
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    dias: 0, horas: 0, minutos: 0, segundos: 0,
  });

  const [formData, setFormData] = useState({
    nombre: "", asistencia: "Sí, ¡ahí estaré!", alergias: "", cancion: "",
  });

  // 2. EFECTOS (AUDIO Y TIMER)
  useEffect(() => {
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    setAudioElement(audio);
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  useEffect(() => {
    const targetDate = new Date(2026, 10, 15, 18, 0, 0).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. FUNCIONES
  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre) {
      alert("Por favor, dinos tu nombre.");
      return;
    }
    const numeroWhatsApp = "56971874099"; 
    const mensaje = `¡Hola! Soy *${formData.nombre}* ✨%0A%0AQuiero confirmar que: *${formData.asistencia}*%0A%0A🍽️ Alergias/Restricciones: ${formData.alergias || "Ninguna"}%0A🎵 Canción que no puede faltar: ${formData.cancion || "La que ponga el DJ"}%0A%0A¡Nos vemos! 🥂`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  const handleAbrirSobre = () => {
    setInvitacionAbierta(true);
  };

  const toggleAudio = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch((err) => console.log("Audio prevenido:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main
      className={`relative bg-[#faf9f6] font-sans text-stone-800 selection:bg-rose-200 overflow-x-hidden ${
        !invitacionAbierta ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {/* EL SOBRE DIGITAL (SPLASH SCREEN) */}
      <AnimatePresence>
        {!invitacionAbierta && (
          <motion.div
            key="sobre-digital"
            initial={{ y: 0 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.39, 1] }}
            style={{ backgroundImage: `url(${texturaPlaceholder})` }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-stone-900 bg-cover bg-center bg-blend-overlay"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center space-y-12"
            >
              <p className="text-rose-200 tracking-[0.4em] uppercase text-xs font-light">
                Tienes una invitación
              </p>
              <button
                onClick={handleAbrirSobre}
                className="w-32 h-32 mx-auto rounded-full border border-rose-300/30 flex items-center justify-center bg-stone-800 shadow-[0_0_40px_rgba(255,228,230,0.05)] relative cursor-pointer hover:scale-105 transition-transform duration-500 group outline-none"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1.5 border border-dashed border-rose-300/40 rounded-full group-hover:border-rose-300/80 transition-colors"
                ></motion.div>
                <span className="text-4xl font-serif italic text-rose-200">
                  V<span className="text-2xl text-rose-400 mx-1">&</span>D
                </span>
              </button>
              <button
                onClick={handleAbrirSobre}
                className="px-8 py-4 bg-rose-200 text-stone-900 font-bold tracking-widest uppercase text-xs rounded-full hover:bg-rose-300 transition-colors shadow-lg shadow-rose-200/20"
              >
                Abrir Sobre
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECCIÓN 1: PORTADA (HERO) */}
      <section className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-900">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 text-center text-white px-6 mt-12"
        >
          <p className="text-sm md:text-lg tracking-[0.3em] uppercase mb-4 font-light drop-shadow-md">
            ¡Nos Casamos!
          </p>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 drop-shadow-lg italic">
            Valentina <br className="md:hidden" />{" "}
            <span className="text-rose-300 text-5xl md:text-7xl">&</span> Diego
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest drop-shadow-md">
            15 · Noviembre · 2026
          </p>
        </motion.div>

        <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
      </section>

      {/* SECCIÓN 2: REPRODUCTOR DE MÚSICA INDEPENDIENTE */}
      <section className="py-20 px-6 bg-white relative z-20">
        
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <motion.div {...fadeInUp} className="w-full flex flex-col items-center">
            <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8 font-light">
              Acompaña tu lectura con nuestra canción
            </p>
            <div className="relative flex items-center justify-center group w-16 h-16 mx-auto">
              <AnimatePresence>
                {isPlaying && (
                  <div className="absolute left-full top-0 ml-2 h-full flex flex-col justify-center items-start pointer-events-none w-20">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, scale: 0.5, x: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0], 
                          y: -20 - (Math.random() * 30), 
                          scale: [0.5, 1.2, 0.8],
                          x: 10 + (Math.random() * 30)
                        }}
                        transition={{ 
                          duration: 2 + Math.random(), 
                          repeat: Infinity, 
                          delay: i * 0.4,
                          ease: "easeOut"
                        }}
                        className="absolute text-rose-300"
                      >
                        <Heart size={14} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
              <button 
                onClick={toggleAudio}
                className={`relative z-10 w-16 h-16 rounded-full border border-rose-200 flex items-center justify-center text-rose-400 transition-all bg-rose-50 shadow-md hover:bg-rose-100 hover:text-rose-500 ${isPlaying ? 'animate-pulse' : ''}`}
              >
                {isPlaying ? <Music size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3: CUENTA REGRESIVA INDEPENDIENTE */}
      <section style={{ backgroundImage: `url(${"/textura2.jpg"})` }} className="py-24 px-6 w-full relative z-20 bg-cover bg-center bg-blend-multiply">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp} className="bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-[3rem] shadow-xl border border-stone-100 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4 italic">
              Falta muy poco
            </h2>
            <p className="text-stone-500 text-xs md:text-sm tracking-widest uppercase mb-12 font-light">
              Cada segundo nos acerca más
            </p>
            <div className="flex justify-center gap-4 md:gap-10 w-full">
              {[
                { valor: timeLeft.dias, label: "Días" },
                { valor: timeLeft.horas, label: "Hrs" },
                { valor: timeLeft.minutos, label: "Min" },
                { valor: timeLeft.segundos, label: "Seg" },
              ].map((tiempo, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-20 md:w-28 md:h-32 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-serif text-rose-400 border border-stone-100 shadow-sm">
                    {tiempo.valor.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-stone-400 mt-4 font-medium">
                    {tiempo.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 4: CALENDARIO INDEPENDIENTE */}
      <section style={{ backgroundImage: `url(${"/textura1.jpg"})` }} className="py-24 px-6 bg-stone-100 bg-cover bg-center bg-blend-multiply">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div {...fadeInUp} className="flex flex-col items-center">
            <Calendar className="w-10 h-10 text-rose-400 mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-10 italic">
              Reserva la fecha
            </h2>
            <div className="w-full max-w-sm mx-auto bg-white border border-stone-100 shadow-md rounded-4xl p-8 md:p-10 mb-10">
              <h3 className="text-2xl font-serif italic text-stone-700 mb-8">Noviembre 2026</h3>
              <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center">
                {diasSemana.map((dia, idx) => (
                  <div key={idx} className="text-rose-400 text-[10px] font-bold tracking-widest">{dia}</div>
                ))}
                {paddingDays.map((_, idx) => (
                  <div key={`pad-${idx}`} className="text-transparent">0</div>
                ))}
                {novemberDays.map((dia) => (
                  <div key={dia} className="flex items-center justify-center">
                    {dia === 15 ? (
                      <div className="w-8 h-8 rounded-full bg-rose-300 text-white flex items-center justify-center font-bold text-sm shadow-md transform scale-110">
                        {dia}
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center text-stone-500 text-sm font-light">
                        {dia}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Valentina+y+Diego&dates=20261115T210000Z/20261116T080000Z&details=¡Los+esperamos+para+celebrar+nuestro+matrimonio!&location=Hacienda+Elqui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 border border-rose-200 px-8 py-4 rounded-full hover:bg-rose-100 hover:text-rose-600 transition text-xs tracking-widest uppercase font-bold"
            >
              <Calendar size={16} /> Agendar en mi Calendario
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 5: HISTORIA EN PARTES */}
      <section style={{ backgroundImage: `url(${"/textura2.jpg"})` }} className="py-24 px-6 bg-stone-100 bg-cover bg-center bg-blend-multiply">
        <div className="max-w-6xl mx-auto space-y-32 px-6">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Nuestra Historia" className="w-full aspect-4/5 object-cover rounded-[3rem] shadow-xl"/>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <Heart className="w-8 h-8 text-rose-300 mx-auto md:mx-0 fill-rose-50" />
              <p className="text-stone-400 text-xs tracking-[0.3em] uppercase font-light">Nuestro comienzo</p>
              <h3 className="text-4xl md:text-5xl font-serif italic text-stone-800 leading-tight">
                "Desde el primer día supimos que nuestra historia estaba escrita."
              </h3>
              <p className="text-stone-500 font-light leading-relaxed text-lg">
                Comenzó con un encuentro casual cerca del Faro de La Serena. Una tarde de café que se transformó en horas de charlas interminables. Desde ese instante, nuestras vidas se unieron de la forma más natural y hermosa.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop" alt="Nuestro Amor" className="w-full aspect-4/5 object-cover rounded-[3rem] shadow-xl"/>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right space-y-6">
              <Heart className="w-8 h-8 text-rose-300 mx-auto md:ml-auto md:mr-0 fill-rose-50" />
              <p className="text-stone-400 text-xs tracking-[0.3em] uppercase font-light">El Compromiso</p>
              <h3 className="text-4xl md:text-5xl font-serif italic text-stone-800 leading-tight">
                "Eres mi lugar favorito, mi refugio y mi mejor aventura."
              </h3>
              <p className="text-stone-500 font-light leading-relaxed text-lg">
                Han sido años llenos de viajes, aprendizajes y sobre todo, de un amor profundo y sincero. Hoy, con el corazón lleno de gratitud, estamos listos para construir nuestra propia familia y dar el "Sí, acepto" rodeados de quienes más amamos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 6: DÓNDE & UBICACIONES */}
      <section id="ubicaciones" style={{ backgroundImage: `url(${"/textura1.jpg"})` }} className="py-24 px-6 bg-stone-100 bg-cover bg-center bg-blend-multiply">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4 italic">Dónde y Cuándo</h2>
            <p className="text-stone-500 tracking-widest uppercase text-xs font-light max-w-lg mx-auto">
              Toma nota de las coordenadas para que no te pierdas ningún detalle de nuestra celebración.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div {...fadeInUp} className="bg-white/95 backdrop-blur-sm p-10 rounded-[3rem] text-center shadow-lg border border-stone-200 relative overflow-hidden group hover:-translate-y-2 transition duration-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-200"></div>
              <Church className="w-12 h-12 text-rose-300 mx-auto mb-6 group-hover:scale-110 transition duration-500" />
              <h3 className="text-3xl font-serif mb-2 text-stone-800 italic">La Ceremonia</h3>
              <p className="font-medium text-stone-700 mb-1">Parroquia San Pedro</p>
              <p className="text-stone-500 text-sm mb-2">Av. del Mar 1234, La Serena</p>
              <p className="text-rose-400 font-serif text-lg mb-8">19:00 hrs</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://maps.google.com/" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition text-xs uppercase tracking-widest font-bold">
                  <Navigation size={14} /> Maps
                </a>
                <a href="https://waze.com/ul?q=La+Serena" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-white text-stone-800 border border-stone-300 px-6 py-3 rounded-full hover:bg-stone-50 transition text-xs uppercase tracking-widest font-bold">
                  <MapPin size={14} /> Waze
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-white/95 backdrop-blur-sm p-10 rounded-[3rem] text-center shadow-lg border border-stone-200 relative overflow-hidden group hover:-translate-y-2 transition duration-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-200"></div>
              <PartyPopper className="w-12 h-12 text-rose-300 mx-auto mb-6 group-hover:scale-110 transition duration-500" />
              <h3 className="text-3xl font-serif mb-2 text-stone-800 italic">La Fiesta</h3>
              <p className="font-medium text-stone-700 mb-1">Hacienda Elqui</p>
              <p className="text-stone-500 text-sm mb-2">Ruta 41 Km 15, Valle del Elqui</p>
              <p className="text-rose-400 font-serif text-lg mb-8">21:00 hrs</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://maps.google.com/" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition text-xs uppercase tracking-widest font-bold">
                  <Navigation size={14} /> Maps
                </a>
                <a href="https://waze.com/ul?q=Valle+del+Elqui" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-white text-stone-800 border border-stone-300 px-6 py-3 rounded-full hover:bg-stone-50 transition text-xs uppercase tracking-widest font-bold">
                  <MapPin size={14} /> Waze
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: DRESS CODE & REGALOS */}
      <section style={{ backgroundImage: `url(${"/textura2.jpg"})` }} className="py-24 px-6 bg-stone-100 bg-cover bg-center bg-blend-multiply">
        <div className="max-w-4xl mx-auto text-center space-y-28">
          
          {/* Dress Code con Iconos */}
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="text-4xl font-serif italic text-stone-800">Dress Code</h2>
            <p className="text-stone-400 tracking-[0.2em] uppercase text-xs font-light mb-2">Formal Elegante</p>
            <p className="text-stone-500 font-light max-w-md mx-auto mb-8">
              Queremos que te sientas increíble y cómodo, pero por favor respeta nuestra paleta y código de vestimenta.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-16 mt-8">
              
              {/* Sección Mujeres */}
              <div className="space-y-5 text-center">
                <IconoVestido className="w-12 h-12 text-rose-300 mx-auto" />
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Mujeres</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-200 border border-stone-300 shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-stone-300 border border-stone-300 shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-[#E5D3B3] border border-stone-300 shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-sm" title="Prohibido blanco">🚫</div>
                </div>
              </div>

              {/* Sección Hombres */}
              <div className="space-y-5 text-center">
                <IconoTraje className="w-12 h-12 text-stone-400 mx-auto" />
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Hombres</p>
                <div className="flex justify-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-stone-300 shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-900 border border-stone-300 shadow-md"></div>
                  <div className="w-10 h-10 rounded-full bg-stone-500 border border-stone-300 shadow-md"></div>
                </div>
              </div>

            </div>
            
            <p className="text-xs text-rose-400 mt-10 uppercase tracking-widest font-bold bg-rose-50 inline-block px-4 py-2 rounded-full">
              Reserva el color blanco para la novia
            </p>
          </motion.div>

          {/* Mesa de Regalos */}
          <motion.div {...fadeInUp} className="bg-rose-50/95 backdrop-blur-sm p-10 md:p-16 rounded-[4rem] border border-rose-100 shadow-xl relative overflow-hidden">
            <Gift className="w-12 h-12 text-rose-400 mx-auto mb-6" />
            <h2 className="text-4xl font-serif italic text-stone-800 mb-4">
              Mesa de Regalos
            </h2>
            <p className="text-stone-600 mb-10 max-w-xl mx-auto font-light leading-relaxed">
              Tu presencia es nuestro mayor regalo y lo que más nos emociona. Pero si deseas tener un detalle con nosotros, hemos preparado una lista de novios para ayudarnos a construir nuestro futuro hogar. ¡Gracias por tanto cariño!
            </p>
            
            <a 
              href="https://tupagina.com/lista-de-novios" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-3 max-w-sm w-full mx-auto py-5 bg-white border-2 border-rose-200 text-rose-500 rounded-2xl hover:bg-rose-400 hover:text-white hover:border-rose-400 transition-all uppercase text-[10px] tracking-[0.2em] font-bold shadow-sm"
            >
              Ver lista de novios <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 8: RSVP */}
      <section style={{ backgroundImage: `url(${texturaPlaceholder})` }} className="py-24 px-6 bg-stone-900 text-stone-100 rounded-t-[4rem] md:rounded-t-[6rem] bg-cover bg-center bg-blend-overlay">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 italic text-white">
              Confirma tu Asistencia
            </h2>
            <p className="text-stone-300 font-light tracking-wide">
              Por favor, confírmanos antes del 1 de Octubre para organizar los últimos detalles.
            </p>
          </motion.div>

          <motion.form {...fadeInUp} onSubmit={handleConfirmar} className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase text-rose-200 ml-2">Nombre Completo</label>
              <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej. Familia Pérez o Juan Pérez" className="w-full p-5 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700 focus:border-rose-400 outline-none transition text-white placeholder:text-stone-500 font-light" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase text-rose-200 ml-2">¿Asistirás?</label>
              <select value={formData.asistencia} onChange={(e) => setFormData({ ...formData, asistencia: e.target.value })} className="w-full p-5 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700 focus:border-rose-400 outline-none transition appearance-none cursor-pointer text-white font-light">
                <option>Sí, ¡ahí estaré!</option>
                <option>Lamentablemente no podré asistir</option>
              </select>
            </div>

            {formData.asistencia === "Sí, ¡ahí estaré!" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase text-rose-200 ml-2">Menú / Alergias</label>
                  <input type="text" value={formData.alergias} onChange={(e) => setFormData({ ...formData, alergias: e.target.value })} placeholder="Ej. Vegano, celiaco, alergia al maní..." className="w-full p-5 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700 focus:border-rose-400 outline-none transition text-white placeholder:text-stone-500 font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase text-rose-200 ml-2 flex items-center gap-2">
                    <Music size={14} /> Canción favorita
                  </label>
                  <input type="text" value={formData.cancion} onChange={(e) => setFormData({ ...formData, cancion: e.target.value })} placeholder="Nombre de la canción para bailar..." className="w-full p-5 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700 focus:border-rose-400 outline-none transition text-white placeholder:text-stone-500 font-light" />
                </div>
              </>
            )}
            
            <button type="submit" className="w-full bg-rose-200 text-stone-900 font-bold tracking-[0.3em] uppercase py-4 rounded-2xl hover:bg-white hover:text-rose-600 transition-all mt-8 shadow-lg shadow-rose-200/20">
              Enviar por WhatsApp
            </button>
          </motion.form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundImage: `url(${texturaPlaceholder})` }} className="bg-stone-950 text-stone-500 py-12 text-center text-[10px] tracking-[0.3em] uppercase relative z-20 bg-cover bg-center bg-blend-overlay border-t border-stone-800">
        <p>Hecho con amor para Valentina & Diego</p>
        <p className="mt-4">
          Diseño digital por{" "}
          <a href="https://faroweb.cl" target="_blank" rel="noreferrer" className="text-rose-300 font-bold hover:text-white transition">
            FaroWeb
          </a>
        </p>
      </footer>
    </main>
  );
}