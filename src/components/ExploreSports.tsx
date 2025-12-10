import { Search, Filter, MapPin, Star, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExploreSportsProps {
  onNavigate: (page: string) => void;
  onSelectCourt: (court: any) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
  selectedSport?: string | null;
}

export function ExploreSports({ onNavigate, onSelectCourt, isAuthenticated, userRole, onLogout, selectedSport }: ExploreSportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSportFilter, setSelectedSportFilter] = useState(selectedSport || 'Todos');
  const [priceRange, setPriceRange] = useState('Todos');

  const courts = [
    {
      id: 1,
      name: 'Cancha Fútbol Premium',
      sport: 'Fútbol',
      location: 'Centro, Manizales',
      price: 80000,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1641029185333-7ed62a19d5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjUzOTk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Césped sintético', 'Iluminación LED', 'Vestidores']
    },
    {
      id: 2,
      name: 'Cancha Tenis Club Campestre',
      sport: 'Tenis',
      location: 'El Cable, Manizales',
      price: 60000,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1564769353575-73f33a36d84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHNwb3J0fGVufDF8fHx8MTc2NTM2OTYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Superficie dura', 'Graderías', 'Cafetería']
    },
    {
      id: 3,
      name: 'Baloncesto Arena Central',
      sport: 'Baloncesto',
      location: 'Palermo, Manizales',
      price: 70000,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY1MzkyMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Cancha techada', 'Aire acondicionado', 'Parqueadero']
    },
    {
      id: 4,
      name: 'Vóleibol Playa Palogrande',
      sport: 'Vóleibol',
      location: 'Palogrande, Manizales',
      price: 50000,
      rating: 4.6,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnR8ZW58MXx8fHwxNzY1MzMxMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Arena de playa', 'Al aire libre', 'Duchas']
    },
    {
      id: 5,
      name: 'Pádel Sport Complex',
      sport: 'Pádel',
      location: 'Milán, Manizales',
      price: 65000,
      rating: 4.8,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1657704358775-ed705c7388d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMHRlbm5pc3xlbnwxfHx8fDE3NjUzOTc1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Cristal panorámico', 'Iluminación profesional', 'Tienda deportiva']
    },
    {
      id: 6,
      name: 'Fútbol 5 La Enea',
      sport: 'Fútbol',
      location: 'La Enea, Manizales',
      price: 55000,
      rating: 4.5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1641029185333-7ed62a19d5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjUzOTk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Fútbol 5', 'Césped sintético', 'Seguridad 24/7']
    }
  ];

  const sports = ['Todos', 'Fútbol', 'Tenis', 'Baloncesto', 'Vóleibol', 'Pádel', 'Squash'];
  const priceRanges = ['Todos', 'Menos de $50.000', '$50.000 - $70.000', 'Más de $70.000'];

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          court.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSportFilter === 'Todos' || court.sport === selectedSportFilter;
    
    let matchesPrice = true;
    if (priceRange === 'Menos de $50.000') {
      matchesPrice = court.price < 50000;
    } else if (priceRange === '$50.000 - $70.000') {
      matchesPrice = court.price >= 50000 && court.price <= 70000;
    } else if (priceRange === 'Más de $70.000') {
      matchesPrice = court.price > 70000;
    }

    return matchesSearch && matchesSport && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 text-4xl mb-2">Explorar Canchas</h1>
          <p className="text-gray-600">Encuentra la cancha perfecta en Manizales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSportFilter}
                onChange={(e) => setSelectedSportFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              >
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Mostrando {filteredCourts.length} {filteredCourts.length === 1 ? 'cancha' : 'canchas'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map(court => (
            <div 
              key={court.id}
              onClick={() => onSelectCourt(court)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-emerald-600">{court.sport}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-gray-900 text-xl mb-2">{court.name}</h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{court.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{court.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">({court.reviews} reseñas)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-gray-600 text-sm">Desde</p>
                    <p className="text-emerald-600 text-2xl">
                      ${court.price.toLocaleString('es-CO')} COP
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No se encontraron canchas con los filtros seleccionados</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSportFilter('Todos');
                setPriceRange('Todos');
              }}
              className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
