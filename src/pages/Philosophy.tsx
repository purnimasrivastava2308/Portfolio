import { motion } from 'framer-motion';
import { Heart, Feather, Star, Compass } from 'lucide-react';

export default function Philosophy() {
  return (
    <div className="min-h-screen bg-cosmic-black/30 text-cosmic-white">
      {/* Hero - The Space Between Signals */}
      <section className="min-h-screen flex items-center justify-center relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center max-w-3xl mx-auto px-4 relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">The Space Between Signals</h1>
          <p className="text-xl text-cosmic-white/70">
            Where data meets awareness, and complexity becomes clarity.
          </p>
        </motion.div>
      </section>

      {/* Stillness */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-cosmic-cyan" />
            <h2 className="text-3xl font-bold mb-6">Stillness</h2>
            <p className="text-lg text-cosmic-white/70 leading-relaxed">
              In a world filled with information, constant movement and noise, I value moments of 
              stillness. Not as escape, but as clarity. Stillness is where I listen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meditation */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Feather className="w-12 h-12 mx-auto mb-6 text-cosmic-cyan" />
            <h2 className="text-3xl font-bold mb-6">Meditation</h2>
            <p className="text-lg text-cosmic-white/70 leading-relaxed mb-6">
              Meditation teaches me to observe without immediately reacting. To pause. To be present.
            </p>
            <div className="bg-cosmic-indigo/20 border border-cosmic-violet/30 rounded-lg p-6">
              <p className="text-cosmic-white/80 italic">
                "Meditation teaches me to observe without immediately reacting. Data analysis teaches 
                me something similar: observe the evidence before drawing conclusions."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cosmic Connection */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Star className="w-12 h-12 mx-auto mb-6 text-cosmic-cyan" />
            <h2 className="text-3xl font-bold mb-6">Cosmic Connection</h2>
            <p className="text-lg text-cosmic-white/70 leading-relaxed mb-6">
              I feel connected to something larger than myself. I believe there is a greater 
              intelligence or supreme power, and I try to approach life with trust, gratitude and surrender.
            </p>
            <div className="bg-cosmic-indigo/20 border border-cosmic-violet/30 rounded-lg p-6">
              <p className="text-cosmic-white/80">
                This is not religious dogma. It's a personal belief in patterns that exist beyond 
                my understanding, and a commitment to doing my best while accepting what I cannot control.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Surrender */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Compass className="w-12 h-12 mx-auto mb-6 text-cosmic-cyan" />
            <h2 className="text-3xl font-bold mb-6">Surrender</h2>
            <div className="bg-gradient-to-b from-cosmic-violet/20 to-cosmic-cyan/20 border border-cosmic-violet/30 rounded-lg p-6 mb-6">
              <p className="text-lg text-cosmic-white italic">
                "I believe in doing my part with sincerity, and surrendering the outcome to 
                something greater than myself."
              </p>
            </div>
            <p className="text-cosmic-white/70">
              This means I work with intention, create with care, and then let go. I don't try to 
              control every outcome. I trust the process. I trust the journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data and Stillness */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Two Paths to Clarity
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'The Outer Path',
                subtitle: 'Data & Analysis',
                steps: ['Observe', 'Question', 'Analyse', 'Find patterns', 'Create insight'],
                icon: '📊',
              },
              {
                title: 'The Inner Path',
                subtitle: 'Meditation & Awareness',
                steps: ['Pause', 'Observe', 'Reflect', 'Understand', 'Find clarity'],
                icon: '🧘',
              },
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 rounded-lg bg-cosmic-navy/30 border border-cosmic-violet/20 hover:border-cosmic-violet/50 transition-colors backdrop-blur-sm"
              >
                <div className="text-4xl mb-3">{path.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                <p className="text-sm text-cosmic-white/60 mb-4">{path.subtitle}</p>
                <ol className="space-y-2">
                  {path.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center gap-2 text-cosmic-white/70">
                      <span className="w-1 h-1 rounded-full bg-cosmic-cyan" />
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>

          {/* Meeting Point */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-8 rounded-lg bg-gradient-to-r from-cosmic-violet/20 to-cosmic-cyan/20 border border-cosmic-violet/50 text-center"
          >
            <p className="text-2xl font-bold text-cosmic-white mb-3">They meet at:</p>
            <h3 className="text-4xl md:text-5xl font-bold text-cosmic-cyan">CLARITY</h3>
            <p className="text-cosmic-white/70 mt-4">
              The understanding that both analysis and awareness are ways of seeing clearly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-20 px-4 border-t border-cosmic-violet/20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">How I Live This</h2>
            <div className="space-y-4">
              {[
                'I work with intention and care.',
                'I listen more than I speak.',
                'I seek to understand before being understood.',
                'I believe in continuous learning.',
                'I practice gratitude for what I have.',
                'I approach challenges with curiosity, not fear.',
                'I try to be kind, especially when it is difficult.',
                'I trust that clarity comes through stillness and observation.',
              ].map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="text-lg text-cosmic-white/70"
                >
                  ✓ {item}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
