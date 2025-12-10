import { Search, MapPin, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingProps {
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
  onSelectSport: (sport: string) => void;
}

export function Landing({ onNavigate, isAuthenticated, userRole, onLogout, onSelectSport }: LandingProps) {
  const sports = [
    { name: 'Fútbol', icon: '⚽', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1641029185333-7ed62a19d5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjUzOTk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Tenis', icon: '🎾', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1564769353575-73f33a36d84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHNwb3J0fGVufDF8fHx8MTc2NTM2OTYyOHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Baloncesto', icon: '🏀', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY1MzkyMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Vóleibol', icon: '🏐', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnR8ZW58MXx8fHwxNzY1MzMxMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Pádel', icon: '🎯', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1657704358775-ed705c7388d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMHRlbm5pc3xlbnwxfHx8fDE3NjUzOTc1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Búsqueda Fácil',
      description: 'Encuentra la cancha perfecta por deporte, ubicación y horario'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Tiempo Real',
      description: 'Consulta disponibilidad actualizada al instante'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Pago Seguro',
      description: 'Transacciones protegidas y confirmación inmediata'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'En Manizales',
      description: 'Centros deportivos verificados en toda la ciudad'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://img.freepik.com/foto-gratis/herramientas-deportivas_53876-138077.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Sports Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <Navbar 
          onNavigate={onNavigate} 
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={onLogout}
          transparent
        />

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white text-5xl md:text-7xl mb-6">
              VITAL SPORT CENTER
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8">
              Reserva tu cancha deportiva en Manizales
            </p>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
              Conectamos a deportistas con los mejores centros deportivos de la ciudad. Reserva fácil, rápido y seguro.
            </p>
            <button 
              onClick={() => onNavigate('explore')}
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center gap-2 text-lg"
            >
              Explorar Canchas
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl mb-4">¿Qué deporte practicas?</h2>
            <p className="text-gray-600 text-lg">Selecciona tu deporte favorito y encuentra canchas disponibles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport, index) => (
              <div 
                key={index}
                onClick={() => onSelectSport(sport.name)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <ImageWithFallback
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`w-12 h-12 ${sport.color} rounded-lg flex items-center justify-center mb-3 text-2xl`}>
                    {sport.icon}
                  </div>
                  <h3 className="text-white text-2xl">{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl mb-4">¿Por qué elegirnos?</h2>
            <p className="text-gray-600 text-lg">La forma más fácil de reservar canchas deportivas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="text-gray-900 text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl mb-6">¿Listo para jugar?</h2>
          <p className="text-white/90 text-lg mb-8">
            Únete a miles de deportistas que ya reservan sus canchas con nosotros
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Crear Cuenta Gratis
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white">VS</span>
                </div>
                <span>VITAL SPORT CENTER</span>
              </div>
              <p className="text-gray-400">
                La mejor plataforma para reservar canchas deportivas en Manizales, Colombia.
              </p>
            </div>
            <div>
              <h3 className="mb-4">Enlaces</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <button onClick={() => onNavigate('explore')} className="text-left hover:text-white">Explorar Canchas</button>
                <button onClick={() => onNavigate('login')} className="text-left hover:text-white">Iniciar Sesión</button>
                <button onClick={() => onNavigate('register')} className="text-left hover:text-white">Registrarse</button>
              </div>
            </div>
            <div>
              <h3 className="mb-4">Contacto</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <p>Manizales, Caldas</p>
                <p>Colombia</p>
                <p>info@vitalsport.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VITAL SPORT CENTER. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
