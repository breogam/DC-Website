import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Design1 from './designs/Design1'
import Design2 from './designs/Design2'
import Design3 from './designs/Design3'
import Design4 from './designs/Design4'
import Design5 from './designs/Design5'

function DesignPicker() {
  return (
    <div className="min-h-screen bg-dc-deep flex items-center justify-center font-sans">
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
          Dynamic Colors
        </h1>
        <p className="text-dc-gold text-lg md:text-xl mb-12 tracking-widest uppercase">
          Five Design Concepts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { id: 1, name: 'Noir Luxe', color: 'from-dc-navy to-dc-deep' },
            { id: 2, name: 'Color Block', color: 'from-dc-rust to-dc-gold' },
            { id: 3, name: 'Editorial', color: 'from-dc-sage to-dc-teal' },
            { id: 4, name: 'Immersive', color: 'from-dc-copper to-dc-rust' },
            { id: 5, name: 'Artisan', color: 'from-dc-blush to-dc-cream' },
          ].map((d) => (
            <a
              key={d.id}
              href={`#/${d.id}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${d.color} p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              <span className="block text-5xl font-serif font-bold text-white/90 mb-2 group-hover:text-white transition-colors">
                {d.id}
              </span>
              <span className="block text-sm text-white/70 group-hover:text-white/90 tracking-wider uppercase transition-colors">
                {d.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<DesignPicker />} />
        <Route path="/1" element={<Design1 />} />
        <Route path="/2" element={<Design2 />} />
        <Route path="/3" element={<Design3 />} />
        <Route path="/4" element={<Design4 />} />
        <Route path="/5" element={<Design5 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
