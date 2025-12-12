import { Search, Calendar, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { bookingsApi } from '../../api/bookings';
import { Booking } from '../../types/api';

export function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingsApi.getAll();
      setBookings(res.bookings || []);
    } catch (err: any) {
      console.error('Error cargando reservas:', err);
      alert(err?.message || 'Error cargando reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id?: string, status?: string) => {
    if (!id || !status) return;
    try {
      await bookingsApi.updateStatus(id, status);
      setBookings((prev) => prev.map((b) => (b._id === id || b.id === id ? { ...b, status: status as any } : b)));
    } catch (err: any) {
      console.error('Error updating status', err);
      alert(err?.message || 'Error actualizando estado');
    }
  };

  const handleCancel = async (id?: string) => {
    if (!id) return;
    const ok = window.confirm('¿Seguro que deseas cancelar esta reserva?');
    if (!ok) return;
    try {
      await bookingsApi.cancel(id);
      setBookings((prev) => prev.map((b) => (b._id === id || b.id === id ? { ...b, status: 'cancelled' } : b)));
    } catch (err: any) {
      console.error('Error cancelling booking', err);
      alert(err?.message || 'Error cancelando reserva');
    }
  };

  const filtered = bookings.filter((booking) => {
    const bookingNumber = (booking as any).bookingNumber || (booking._id || booking.id);
    const courtName = typeof booking.court === 'string' ? booking.court : (booking.court as any)?.name || '';
    const userName = typeof booking.user === 'string' ? booking.user : (booking.user as any)?.name || '';

    const matchesSearch = [String(bookingNumber), courtName, userName]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

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
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

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
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">Cargando reservas...</td>
                </tr>
              ) : (
                filtered.map((booking) => (
                  <tr key={(booking as any)._id || booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{(booking as any).bookingNumber || (booking._id || booking.id)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{typeof booking.user === 'string' ? booking.user : (booking.user as any)?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{typeof booking.court === 'string' ? booking.court : (booking.court as any)?.name}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        {(booking.court as any)?.location || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-900 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(booking.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-3 h-3" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {booking.duration} {booking.duration === 1 ? 'hora' : 'horas'}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ${((booking.totalPrice || 0)).toLocaleString('es-CO')} COP
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status as string)}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                      {booking.status !== 'confirmed' && booking.status !== 'completed' && (
                        <button onClick={() => handleUpdateStatus(booking._id || booking.id, 'confirmed')} className="text-emerald-600 hover:text-emerald-700">Confirmar</button>
                      )}
                      {booking.status !== 'completed' && (
                        <button onClick={() => handleUpdateStatus(booking._id || booking.id, 'completed')} className="text-gray-600 hover:text-gray-800">Marcar completada</button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button onClick={() => handleCancel(booking._id || booking.id)} className="text-red-600 hover:text-red-700">Cancelar</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
