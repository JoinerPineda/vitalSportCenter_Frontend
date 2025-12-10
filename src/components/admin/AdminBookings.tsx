import { Search, Calendar, Clock, MapPin, User, DollarSign, Filter } from 'lucide-react';
import { useState } from 'react';

export function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bookings = [
    {
      id: 1,
      bookingNumber: 'VSC-001',
      user: 'Juan Carlos Rodríguez',
      court: 'Cancha Fútbol Premium',
      sport: 'Fútbol',
      location: 'Centro, Manizales',
      date: '2025-12-15',
      time: '14:00 - 16:00',
      duration: 2,
      price: 160000,
      status: 'confirmed'
    },
    {
      id: 2,
      bookingNumber: 'VSC-002',
      user: 'María López García',
      court: 'Cancha Tenis Club Campestre',
      sport: 'Tenis',
      location: 'El Cable, Manizales',
      date: '2025-12-18',
      time: '10:00 - 11:00',
      duration: 1,
      price: 60000,
      status: 'confirmed'
    },
    {
      id: 3,
      bookingNumber: 'VSC-003',
      user: 'Carlos Méndez',
      court: 'Baloncesto Arena Central',
      sport: 'Baloncesto',
      location: 'Palermo, Manizales',
      date: '2025-12-08',
      time: '18:00 - 19:00',
      duration: 1,
      price: 70000,
      status: 'completed'
    },
    {
      id: 4,
      bookingNumber: 'VSC-004',
      user: 'Ana Martínez',
      court: 'Pádel Sport Complex',
      sport: 'Pádel',
      location: 'Milán, Manizales',
      date: '2025-12-20',
      time: '16:00 - 18:00',
      duration: 2,
      price: 130000,
      status: 'confirmed'
    },
    {
      id: 5,
      bookingNumber: 'VSC-005',
      user: 'Pedro González',
      court: 'Vóleibol Playa Palogrande',
      sport: 'Vóleibol',
      location: 'Palogrande, Manizales',
      date: '2025-12-05',
      time: '15:00 - 16:00',
      duration: 1,
      price: 50000,
      status: 'cancelled'
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.court.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Confirmada</span>;
    } else if (status === 'completed') {
      return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Completada</span>;
    } else if (status === 'cancelled') {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Cancelada</span>;
    } else if (status === 'pending') {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pendiente</span>;
    }
  };

  const stats = [
    { label: 'Total Reservas', value: bookings.length, color: 'bg-blue-500' },
    { label: 'Confirmadas', value: bookings.filter(b => b.status === 'confirmed').length, color: 'bg-emerald-500' },
    { label: 'Completadas', value: bookings.filter(b => b.status === 'completed').length, color: 'bg-gray-500' },
    { label: 'Canceladas', value: bookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-500' },
  ];

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-gray-900 text-3xl mb-2">Gestión de Reservas</h1>
        <p className="text-gray-600">Administra todas las reservas del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-gray-900 text-2xl">{stat.value}</p>
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Ingresos</p>
          <p className="text-gray-900 text-xl">${totalRevenue.toLocaleString('es-CO')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por número, usuario o cancha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
            <option value="pending">Pendientes</option>
          </select>
          <input
            type="date"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Número</th>
                <th className="px-6 py-4 text-left text-gray-700">Usuario</th>
                <th className="px-6 py-4 text-left text-gray-700">Cancha</th>
                <th className="px-6 py-4 text-left text-gray-700">Fecha y Hora</th>
                <th className="px-6 py-4 text-left text-gray-700">Duración</th>
                <th className="px-6 py-4 text-left text-gray-700">Monto</th>
                <th className="px-6 py-4 text-left text-gray-700">Estado</th>
                <th className="px-6 py-4 text-left text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.bookingNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{booking.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.court}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      {booking.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(booking.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock className="w-3 h-3" />
                      {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {booking.duration} {booking.duration === 1 ? 'hora' : 'horas'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${booking.price.toLocaleString('es-CO')} COP
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
