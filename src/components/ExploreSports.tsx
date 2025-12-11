import { Search, Filter, MapPin, Star, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { courtsApi } from '../api/courts';
import { Court } from '../types/api';
import { toast } from 'sonner';

interface ExploreSportsProps {
  onNavigate: (page: string) => void;
  onSelectCourt: (court: Court) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
  selectedSport?: string | null;
}

export function ExploreSports({ onNavigate, onSelectCourt, isAuthenticated, userRole, onLogout, selectedSport }: ExploreSportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSportFilter, setSelectedSportFilter] = useState(selectedSport || 'Todos');
  const [priceRange, setPriceRange] = useState('Todos');
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sports = ['Todos', 'Fútbol', 'Tenis', 'Baloncesto', 'Vóleibol', 'Pádel'];
  const priceRanges = ['Todos', 'Menos de $50.000', '$50.000 - $70.000', 'Más de $70.000'];

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const filters: any = {};
        if (selectedSportFilter !== 'Todos') {
          filters.sport = selectedSportFilter;
        }
        const data = await courtsApi.getAll(filters);
        setCourts(data.courts);
        setError('');
      } catch (err) {
        setError('Error al cargar las canchas. Por favor intenta de nuevo.');
        toast.error('Error al cargar las canchas');
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [selectedSportFilter]);

  const filteredCourts = courts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          court.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'Menos de $50.000') {
      matchesPrice = court.price < 50000;
    } else if (priceRange === '$50.000 - $70.000') {
      matchesPrice = court.price >= 50000 && court.price <= 70000;
    } else if (priceRange === 'Más de $70.000') {
      matchesPrice = court.price > 70000;
    }

    return matchesSearch && matchesPrice;
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

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : filteredCourts.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map(court => (
            <div 
              key={court._id}
              onClick={() => onSelectCourt(court)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={court.image || ''}
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.amenities && court.amenities.map((amenity, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {amenity}
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
        )}
      </div>
    </div>
  );
}
