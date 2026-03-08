"use client";

import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CalendarHeart,
  Gift,
  Navigation,
  PartyPopper,
  Music,
  Camera,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
} from "lucide-react";

// Variantes de animación elegantes
const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  viewport: { once: true, amount: 0.1 },
};

// TEXTURA DE PLACEHOLDER (Para que Next.js no falle al compilar)
const texturaPlaceholder =
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop";

export default function InvitacionBodaBasica() {
  // 1. ESTADOS PRINCIPALES
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // SOLUCIÓN DE AUDIO: Manejo con JavaScript en lugar de etiqueta HTML
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Esto asegura que el audio solo se cargue en el cliente (navegador)
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    setAudioElement(audio);

    // Limpiamos el audio si el usuario sale de la página
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // 2. ESTADO PARA LA CUENTA REGRESIVA
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Fecha de la boda
    const targetDate = new Date(2026, 10, 15, 18, 0, 0).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. ESTADO DEL FORMULARIO RSVP
  const [formData, setFormData] = useState({
    nombre: "",
    asistencia: "Sí, ¡ahí estaré!",
    alergias: "",
    cancion: "",
  });

  // 4. LÓGICA DE WHATSAPP
  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre) {
      alert("Por favor, dinos tu nombre.");
      return;
    }
    const numeroWhatsApp = "56971874099"; // Tu número de FaroWeb
    const mensaje = `¡Hola! Soy *${formData.nombre}* ✨%0A%0AQuiero confirmar que: *${formData.asistencia}*%0A%0A🍽️ Alergias/Restricciones: ${formData.alergias || "Ninguna"}%0A🎵 Canción que no puede faltar: ${formData.cancion || "La que ponga el DJ"}%0A%0A¡Nos vemos! 🥂`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  // 5. FUNCIÓN PARA ABRIR SOBRE Y REPRODUCIR MÚSICA
  const handleAbrirSobre = () => {
    setInvitacionAbierta(true);
    if (audioElement) {
      audioElement
        .play()
        .catch((err) => console.log("Audio autoplay prevenido:", err));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-900 bg-cover bg-center bg-blend-overlay"
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

              {/* Sello de cera interactivo */}
              <button
                onClick={handleAbrirSobre}
                className="w-32 h-32 mx-auto rounded-full border border-rose-300/30 flex items-center justify-center bg-stone-800 shadow-[0_0_40px_rgba(255,228,230,0.05)] relative cursor-pointer hover:scale-105 transition-transform duration-500 group outline-none"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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

      {/* BOTÓN FLOTANTE DE MÚSICA */}
      <AnimatePresence>
        {invitacionAbierta && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full flex items-center justify-center shadow-lg text-stone-600 hover:text-rose-500 transition-colors"
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* SECCIÓN 1: PORTADA (HERO) */}
      <section className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-900">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
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
            15 · 11 · 2026
          </p>
        </motion.div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none"></div>
      </section>

      {/* SECCIÓN 2: CUENTA REGRESIVA & CALENDARIO */}
      <section
        style={{ backgroundImage: `url(${"/textura2.jpg"})` }}
        className="py-20 px-6 w-full relative z-20 bg-cover bg-center bg-blend-multiply"
      >
        <div className="max-w-4xl mx-auto text-center -mt-10">
          <motion.div
            {...fadeInUp}
            className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-stone-100 flex flex-col items-center"
          >
            <Calendar className="w-8 h-8 text-rose-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-serif text-stone-700 mb-8 italic">
              Falta muy poco para el gran día
            </h2>
            <div className="flex justify-center gap-3 md:gap-8 mb-10">
              {[
                { valor: timeLeft.dias, label: "Días" },
                { valor: timeLeft.horas, label: "Horas" },
                { valor: timeLeft.minutos, label: "Minutos" },
                { valor: timeLeft.segundos, label: "Segundos" },
              ].map((tiempo, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-stone-50/80 rounded-full flex items-center justify-center text-2xl md:text-4xl font-serif text-rose-900 border border-stone-200 shadow-inner">
                    {tiempo.valor}
                  </div>
                  <span className="text-[10px] md:text-sm uppercase tracking-wider text-stone-400 mt-3">
                    {tiempo.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Valentina+y+Diego&dates=20261115T210000Z/20261116T080000Z&details=¡Los+esperamos+para+celebrar+nuestro+matrimonio!&location=Hacienda+Elqui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-rose-50 text-rose-900 border border-rose-200 px-6 py-3 rounded-full hover:bg-rose-100 transition text-sm tracking-wide font-medium"
            >
              <Calendar size={18} /> Agendar en mi Calendario
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3: GALERÍA DE 6 FOTOS */}
      <section
        style={{ backgroundImage: `url(${"/textura2.jpg"})` }}
        className="py-24 px-6 bg-white bg-cover bg-center bg-blend-multiply"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-3 px-4">
            <Camera className="w-8 h-8 text-rose-300 mx-auto" />
            <h2 className="text-4xl font-serif text-stone-800 italic">
              Un poco de nosotros
            </h2>
            <p className="text-stone-500 tracking-widest uppercase text-sm font-light">
              Nuestra Historia
            </p>

            <p className="text-stone-600 font-light max-w-2xl mx-auto leading-relaxed pt-4">
              Nuestra aventura comenzó hace cinco años con un café casual cerca
              del Faro. Entre atardeceres en la playa, escapadas al Valle del
              Elqui y una infinidad de risas compartidas, construimos un amor
              sincero y cómplice. Hoy estamos listos para dar el paso más
              importante de nuestras vidas y nos hace inmensamente felices que
              seas parte de este momento.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
            ].map((imgUrl, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg group"
              >
                <img
                  src={imgUrl}
                  alt={`Nuestra foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 4: DÓNDE & UBICACIONES (MAPS + WAZE) */}
      <section
        id="ubicaciones"
        style={{ backgroundImage: `url(${"/textura1.jpg"})` }}
        className="py-24 px-6 bg-stone-100 bg-cover bg-center bg-blend-multiply"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-serif text-stone-800 mb-4 italic">
              Ubicaciones
            </h2>
            <p className="text-stone-500 tracking-widest uppercase text-sm">
              Acompáñanos a celebrar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Ceremonia */}
            <motion.div
              {...fadeInUp}
              className="bg-white/95 backdrop-blur-sm p-10 rounded-4xl text-center shadow-lg border border-stone-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-300"></div>
              <CalendarHeart className="w-12 h-12 text-rose-300 mx-auto mb-6 group-hover:scale-110 transition duration-500" />
              <h3 className="text-2xl font-serif mb-2">La Ceremonia</h3>
              <p className="font-medium text-stone-700 mb-1">
                Parroquia San Pedro
              </p>
              <p className="text-stone-500 text-sm mb-8">
                Av. del Mar 1234, La Serena
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://maps.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-stone-800 text-white px-5 py-3 rounded-full hover:bg-stone-700 transition text-sm tracking-wide"
                >
                  <Navigation size={16} /> Google Maps
                </a>
                <a
                  href="https://waze.com/ul?q=La+Serena"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-5 py-3 rounded-full hover:bg-blue-100 transition text-sm tracking-wide font-medium"
                >
                  <MapPin size={16} /> Waze
                </a>
              </div>
            </motion.div>

            {/* Fiesta */}
            <motion.div
              {...fadeInUp}
              className="bg-white/95 backdrop-blur-sm p-10 rounded-4xl text-center shadow-lg border border-stone-200 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-300"></div>
              <PartyPopper className="w-12 h-12 text-rose-300 mx-auto mb-6 group-hover:scale-110 transition duration-500" />
              <h3 className="text-2xl font-serif mb-2">La Fiesta</h3>
              <p className="font-medium text-stone-700 mb-1">Hacienda Elqui</p>
              <p className="text-stone-500 text-sm mb-8">
                Ruta 41 Km 15, Valle del Elqui
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://maps.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-stone-800 text-white px-5 py-3 rounded-full hover:bg-stone-700 transition text-sm tracking-wide"
                >
                  <Navigation size={16} /> Google Maps
                </a>
                <a
                  href="https://waze.com/ul?q=Valle+del+Elqui"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-5 py-3 rounded-full hover:bg-blue-100 transition text-sm tracking-wide font-medium"
                >
                  <MapPin size={16} /> Waze
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* SECCIÓN 5: DRESS CODE & INFO GENERAL (REGALOS) */}
        <section className="py-24 px-6 w-full mt-10">
          <div className="max-w-4xl mx-auto text-center space-y-20">
            <motion.div {...fadeInUp} className="space-y-6">
              <h2 className="text-3xl font-serif italic text-stone-800">
                Dress Code
              </h2>
              <p className="text-stone-500 tracking-widest uppercase text-sm">
                Formal Elegante
              </p>
              <div className="flex justify-center gap-3 mt-4">
                {[
                  { color: "bg-stone-900", label: "" },
                  { color: "bg-rose-200", label: "" },
                  { color: "bg-emerald-800", label: "" },
                  { color: "bg-stone-200", label: "🚫" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${item.color} border border-stone-300 shadow-sm flex items-center justify-center text-xs`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-2">
                Por favor, reserva el color blanco para la novia.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-rose-50/95 backdrop-blur-sm p-10 md:p-14 rounded-[3rem] border border-rose-100 shadow-sm"
            >
              <Gift className="w-10 h-10 text-rose-400 mx-auto mb-6" />
              <h2 className="text-3xl font-serif italic text-stone-800 mb-4">
                Mesa de Regalos
              </h2>
              <p className="text-stone-600 mb-8 max-w-lg mx-auto font-light leading-relaxed">
                Nuestra casa ya está armada y llena de amor. Si desean hacernos
                un regalo, pueden ayudarnos a tener la luna de miel de nuestros
                sueños.
              </p>
              <div className="bg-white p-6 rounded-2xl max-w-sm mx-auto text-left shadow-sm border border-stone-100">
                <p className="text-sm text-stone-500 mb-1">Banco Falabella</p>
                <p className="font-medium text-stone-800 mb-1">
                  Cuenta Corriente: 123456789
                </p>
                <p className="font-medium text-stone-800 mb-1">
                  RUT: 18.234.567-8
                </p>
                <p className="text-sm text-stone-500">
                  valentina.boda@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </section>

      {/* SECCIÓN 6: RSVP (Confirmación Directa WhatsApp) */}
      <section
        style={{ backgroundImage: `url(${texturaPlaceholder})` }}
        className="py-24 px-6 bg-stone-900 text-stone-100 rounded-t-[3rem] md:rounded-t-[5rem] bg-cover bg-center bg-blend-overlay"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 italic text-white">
              Confirma tu Asistencia
            </h2>
            <p className="text-stone-300 font-light">
              Por favor, confírmanos antes del 1 de Octubre.
            </p>
          </motion.div>

          <motion.form
            {...fadeInUp}
            onSubmit={handleConfirmar}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm tracking-wide text-rose-200">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej. Familia Pérez o Juan Pérez"
                className="w-full p-4 rounded-xl bg-stone-800/80 backdrop-blur-sm border border-stone-700 focus:border-rose-400 outline-none transition text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wide text-rose-200">
                ¿Asistirás?
              </label>
              <select
                value={formData.asistencia}
                onChange={(e) =>
                  setFormData({ ...formData, asistencia: e.target.value })
                }
                className="w-full p-4 rounded-xl bg-stone-800/80 backdrop-blur-sm border border-stone-700 focus:border-rose-400 outline-none transition appearance-none cursor-pointer text-white"
              >
                <option>Sí, ¡ahí estaré!</option>
                <option>Lamentablemente no podré asistir</option>
              </select>
            </div>

            {formData.asistencia === "Sí, ¡ahí estaré!" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm tracking-wide text-rose-200 flex items-center gap-2">
                    Alguna restricción alimentaria
                  </label>
                  <input
                    type="text"
                    value={formData.alergias}
                    onChange={(e) =>
                      setFormData({ ...formData, alergias: e.target.value })
                    }
                    placeholder="Vegano, celiaco, alergia al maní..."
                    className="w-full p-4 rounded-xl bg-stone-800/80 backdrop-blur-sm border border-stone-700 focus:border-rose-400 outline-none transition text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm tracking-wide text-rose-200 flex items-center gap-2">
                    <Music size={16} /> Canción que te hará bailar
                  </label>
                  <input
                    type="text"
                    value={formData.cancion}
                    onChange={(e) =>
                      setFormData({ ...formData, cancion: e.target.value })
                    }
                    placeholder="Nombre de la canción o artista..."
                    className="w-full p-4 rounded-xl bg-stone-800/80 backdrop-blur-sm border border-stone-700 focus:border-rose-400 outline-none transition text-white"
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-rose-200 text-stone-900 font-bold tracking-widest uppercase py-5 rounded-xl hover:bg-rose-300 transition mt-4"
            >
              Enviar Confirmación
            </button>
          </motion.form>
        </div>
      </section>

      {/* FOOTER FAROWEB */}
      <footer
        style={{ backgroundImage: `url(${texturaPlaceholder})` }}
        className="bg-stone-950 text-stone-500 py-8 text-center text-xs tracking-widest uppercase relative z-20 bg-cover bg-center bg-blend-overlay"
      >
        <p>Hecho con amor para Valentina & Diego</p>
        <p className="mt-2">
          Desarrollo digital por{" "}
          <a
            href="https://faroweb.cl"
            target="_blank"
            rel="noreferrer"
            className="text-rose-200 font-bold hover:text-white transition"
          >
            FaroWeb
          </a>
        </p>
      </footer>
    </main>
  );
}