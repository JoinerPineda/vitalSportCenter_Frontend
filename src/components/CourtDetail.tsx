import { MapPin, Star, Clock, Users, Shield, Calendar, ArrowLeft, Check } from 'lucide-react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourtDetailProps {
  onNavigate: (page: string) => void;
  court: any;
  onBook: () => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
}

export function CourtDetail({ onNavigate, court, onBook, isAuthenticated, userRole, onLogout }: CourtDetailProps) {
  if (!court) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onNavigate={onNavigate}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={onLogout}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 text-lg mb-4">No se encontró información de la cancha</p>
          <button
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Volver a explorar
          </button>
        </div>
      </div>
    );
  }

  const availableSlots = [
    { time: '08:00 - 09:00', available: true },
    { time: '09:00 - 10:00', available: true },
    { time: '10:00 - 11:00', available: false },
    { time: '11:00 - 12:00', available: true },
    { time: '14:00 - 15:00', available: true },
    { time: '15:00 - 16:00', available: true },
    { time: '16:00 - 17:00', available: false },
    { time: '17:00 - 18:00', available: true },
    { time: '18:00 - 19:00', available: true },
    { time: '19:00 - 20:00', available: true },
  ];

  const reviews = [
    { id: 1, name: 'Carlos Méndez', rating: 5, comment: 'Excelente cancha, muy bien mantenida y con buenas instalaciones.', date: '2 días atrás' },
    { id: 2, name: 'María López', rating: 4, comment: 'Buena ubicación y precio razonable. Recomendada.', date: '1 semana atrás' },
    { id: 3, name: 'Juan Pérez', rating: 5, comment: 'La mejor cancha de Manizales. Siempre vuelvo aquí.', date: '2 semanas atrás' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={onLogout}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate('explore')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a explorar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative h-96">
                <ImageWithFallback
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full">
                  <span className="text-emerald-600">{court.sport}</span>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-gray-900 text-3xl mb-4">{court.name}</h1>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{court.location}</span>
                  </div>
                  {(() => {
                    const rating = court.rating ?? '—';
                    const reviewsCount = court.reviews ?? court.totalReviews ?? 0;
                    return (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span>{rating}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">({reviewsCount} reseñas)</span>
                      </div>
                    );
                  })()}
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h2 className="text-gray-900 text-xl mb-4">Características</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {((court.features ?? court.amenities) as string[] ?? []).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-700">Wi-Fi gratuito</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-700">Baños y vestidores</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h2 className="text-gray-900 text-xl mb-4">Descripción</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Esta cancha de {court.sport.toLowerCase()} está ubicada en una de las mejores zonas de Manizales. 
                    Cuenta con instalaciones de primera calidad, perfectamente mantenidas y con todos los servicios 
                    necesarios para disfrutar de tu deporte favorito. El complejo ofrece seguridad 24/7, 
                    estacionamiento amplio y fácil acceso desde cualquier punto de la ciudad.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-gray-900 text-xl mb-4">Horarios Disponibles - Hoy</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.available}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          slot.available
                            ? 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                            : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8">
              <h2 className="text-gray-900 text-xl mb-6">Reseñas de Usuarios</h2>
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={(review as any)._id || review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{review.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: review.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Precio por hora</p>
                <p className="text-emerald-600 text-4xl">
                  ${court.price ? String(court.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '—'}
                </p>
                <p className="text-gray-500">COP</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span>Reserva mínima 1 hora</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span>Capacidad según deporte</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <span>Pago seguro</span>
                </div>
              </div>

              <button
                onClick={onBook}
                className="w-full py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <Calendar className="w-5 h-5" />
                Reservar Ahora
              </button>

              <p className="text-center text-gray-500 text-sm">
                Confirmación inmediata • Cancelación gratuita hasta 24h antes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
