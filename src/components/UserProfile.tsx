import { User, Calendar, CreditCard, MapPin, Clock, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import { bookingsApi } from '../api/bookings';

interface UserProfileProps {
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
}

export function UserProfile({ onNavigate, isAuthenticated, userRole, onLogout }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('reservations');
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        setLoadingBookings(true);
        const resp = await bookingsApi.getMyBookings();
        setBookings((resp as any).bookings || []);
      } catch (err) {
        console.error('Error cargando reservas del usuario', err);
      } finally {
        setLoadingBookings(false);
      }
    };
    load();
  }, [user]);

  const paymentHistory = [
    { id: 1, date: '2025-12-10', description: 'Reserva Cancha Fútbol Premium', amount: 160000, status: 'completed' },
    { id: 2, date: '2025-12-09', description: 'Reserva Cancha Tenis Club', amount: 60000, status: 'completed' },
    { id: 3, date: '2025-12-08', description: 'Reserva Baloncesto Arena', amount: 70000, status: 'completed' },
    { id: 4, date: '2025-11-28', description: 'Reserva Pádel Sport Complex', amount: 130000, status: 'completed' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Confirmada</span>;
    } else if (status === 'completed') {
      return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Completada</span>;
    } else if (status === 'cancelled') {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Cancelada</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <ImageWithFallback
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Usuario')}&background=10b981&color=fff&size=200`}
                    alt={user?.name || 'Usuario'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-gray-900 text-xl mb-1">{user?.name || 'Nombre de usuario'}</h2>
                <p className="text-gray-600">Cliente</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{user?.email || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{(user as any)?.phone || '-'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'reservations' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Mis Reservas
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'payments' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Historial de Pagos
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'reservations' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-gray-900 text-3xl mb-2">Mis Reservas</h1>
                  <p className="text-gray-600">Gestiona tus reservas de canchas deportivas</p>
                </div>

                <div className="space-y-4">
                  {loadingBookings ? (
                    <div className="text-center py-8 text-gray-600">Cargando reservas...</div>
                  ) : bookings.length > 0 ? (
                    bookings.map(booking => {
                      const courtName = typeof booking.court === 'string' ? booking.court : booking.court?.name || 'Cancha';
                      const courtImage = typeof booking.court !== 'string' ? booking.court?.image : '';
                      const courtLocation = typeof booking.court !== 'string' ? booking.court?.location : '';
                      return (
                        <div key={booking._id || booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                              <ImageWithFallback
                                src={courtImage || ''}
                                alt={courtName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-gray-900 text-xl mb-2">{courtName}</h3>
                                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{courtLocation || '-'}</span>
                                  </div>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(booking.date).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.startTime} - {booking.endTime}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div>
                                  <p className="text-gray-600 text-sm">Total pagado</p>
                                  <p className="text-emerald-600 text-xl">${booking.totalPrice?.toLocaleString('es-CO') || '0'} COP</p>
                                </div>
                                {booking.status === 'confirmed' && (
                                  <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                    Cancelar Reserva
                                  </button>
                                )}
                                {booking.status === 'completed' && (
                                  <button className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                                    Reservar de Nuevo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-600">No tienes reservas aún</div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-gray-900 text-3xl mb-2">Historial de Pagos</h1>
                  <p className="text-gray-600">Revisa todas tus transacciones</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-gray-700">Fecha</th>
                          <th className="px-6 py-4 text-left text-gray-700">Descripción</th>
                          <th className="px-6 py-4 text-left text-gray-700">Monto</th>
                          <th className="px-6 py-4 text-left text-gray-700">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paymentHistory.map(payment => (
                          <tr key={(payment as any)._id || payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">
                              {new Date(payment.date).toLocaleDateString('es-CO')}
                            </td>
                            <td className="px-6 py-4 text-gray-700">{payment.description}</td>
                            <td className="px-6 py-4 text-gray-900">
                              ${payment.amount.toLocaleString('es-CO')} COP
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                Completado
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
