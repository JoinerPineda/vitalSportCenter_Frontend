import { User, Calendar, CreditCard, Settings, MapPin, Clock, Mail, Phone, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
}

export function UserProfile({ onNavigate, isAuthenticated, userRole, onLogout }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('reservations');

  const mockUser = {
    name: 'Juan Carlos Rodríguez',
    email: 'juan.rodriguez@email.com',
    phone: '+57 312 456 7890',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Rodriguez&background=10b981&color=fff&size=200'
  };

  const bookings = [
    {
      id: 1,
      court: 'Cancha Fútbol Premium',
      sport: 'Fútbol',
      location: 'Centro, Manizales',
      date: '2025-12-15',
      time: '14:00 - 16:00',
      status: 'confirmed',
      price: 160000,
      image: 'https://images.unsplash.com/photo-1641029185333-7ed62a19d5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NjUzOTk5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      court: 'Cancha Tenis Club Campestre',
      sport: 'Tenis',
      location: 'El Cable, Manizales',
      date: '2025-12-18',
      time: '10:00 - 11:00',
      status: 'confirmed',
      price: 60000,
      image: 'https://images.unsplash.com/photo-1564769353575-73f33a36d84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMHNwb3J0fGVufDF8fHx8MTc2NTM2OTYyOHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      court: 'Baloncesto Arena Central',
      sport: 'Baloncesto',
      location: 'Palermo, Manizales',
      date: '2025-12-08',
      time: '18:00 - 19:00',
      status: 'completed',
      price: 70000,
      image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY1MzkyMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

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
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-gray-900 text-xl mb-1">{mockUser.name}</h2>
                <p className="text-gray-600">Cliente</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{mockUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{mockUser.phone}</span>
                </div>
              </div>

              <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
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
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Configuración
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
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                          <ImageWithFallback
                            src={booking.image}
                            alt={booking.court}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-gray-900 text-xl mb-2">{booking.court}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.location}</span>
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
                              <span>{booking.time}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div>
                              <p className="text-gray-600 text-sm">Total pagado</p>
                              <p className="text-emerald-600 text-xl">${booking.price.toLocaleString('es-CO')} COP</p>
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
                  ))}
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
                          <tr key={payment.id} className="hover:bg-gray-50">
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

            {activeTab === 'settings' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-gray-900 text-3xl mb-2">Configuración</h1>
                  <p className="text-gray-600">Administra tu cuenta y preferencias</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-gray-900 text-xl mb-4">Información Personal</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Nombre completo</label>
                        <input
                          type="text"
                          defaultValue={mockUser.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Correo electrónico</label>
                        <input
                          type="email"
                          defaultValue={mockUser.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          defaultValue={mockUser.phone}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                        Guardar Cambios
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-gray-900 text-xl mb-4">Cambiar Contraseña</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Contraseña actual</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Nueva contraseña</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Confirmar nueva contraseña</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                        Actualizar Contraseña
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-gray-900 text-xl mb-4">Notificaciones</h2>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="text-gray-900">Confirmaciones de reserva</p>
                          <p className="text-gray-600 text-sm">Recibe notificaciones cuando se confirme tu reserva</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="text-gray-900">Recordatorios</p>
                          <p className="text-gray-600 text-sm">Recibe recordatorios antes de tus reservas</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600" />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="text-gray-900">Promociones</p>
                          <p className="text-gray-600 text-sm">Recibe ofertas y promociones especiales</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-emerald-600" />
                      </label>
                    </div>
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
