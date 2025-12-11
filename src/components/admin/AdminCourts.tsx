import { Search, Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AdminCourts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const courts = [
    {
      id: 1,
      name: 'Cancha Fútbol Premium',
      sport: 'Fútbol',
      location: 'Centro, Manizales',
      price: 80000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1641029185333-7ed62a19d5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjUzOTk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Césped sintético', 'Iluminación LED', 'Vestidores']
    },
    {
      id: 2,
      name: 'Cancha Tenis Club Campestre',
      sport: 'Tenis',
      location: 'El Cable, Manizales',
      price: 60000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1564769353575-73f33a36d84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHNwb3J0fGVufDF8fHx8MTc2NTM2OTYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Superficie dura', 'Graderías', 'Cafetería']
    },
    {
      id: 3,
      name: 'Baloncesto Arena Central',
      sport: 'Baloncesto',
      location: 'Palermo, Manizales',
      price: 70000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY1MzkyMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Cancha techada', 'Aire acondicionado', 'Parqueadero']
    },
    {
      id: 4,
      name: 'Vóleibol Playa Palogrande',
      sport: 'Vóleibol',
      location: 'Palogrande, Manizales',
      price: 50000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnR8ZW58MXx8fHwxNzY1MzMxMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Arena de playa', 'Al aire libre', 'Duchas']
    },
    {
      id: 5,
      name: 'Pádel Sport Complex',
      sport: 'Pádel',
      location: 'Milán, Manizales',
      price: 65000,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1657704358775-ed705c7388d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWRlbCUyMHRlbm5pc3xlbnwxfHx8fDE3NjUzOTc1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Cristal panorámico', 'Iluminación profesional', 'Tienda deportiva']
    },
  ];

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 text-3xl mb-2">Gestión de Canchas</h1>
          <p className="text-gray-600">Administra las canchas deportivas</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Cancha
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Todos los deportes</option>
            <option>Fútbol</option>
            <option>Tenis</option>
            <option>Baloncesto</option>
            <option>Vóleibol</option>
            <option>Pádel</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Todos los estados</option>
            <option>Activas</option>
            <option>Inactivas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <div key={(court as any)._id || court.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{court.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {court.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Precio/hora</p>
                  <p className="text-emerald-600 text-xl">
                    ${court.price.toLocaleString('es-CO')} COP
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                  Activa
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
            <h2 className="text-gray-900 text-2xl mb-6">Agregar Nueva Cancha</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nombre de la cancha</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Cancha Premium"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Deporte</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Fútbol</option>
                    <option>Tenis</option>
                    <option>Baloncesto</option>
                    <option>Vóleibol</option>
                    <option>Pádel</option>
                    <option>Squash</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ubicación</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Centro, Manizales"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Precio por hora (COP)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Características</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Separadas por comas: Césped sintético, Iluminación LED..."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Describe la cancha y sus instalaciones..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Guardar Cancha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
