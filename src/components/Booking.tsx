import { Calendar, Clock, CreditCard, MapPin, ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingProps {
  onNavigate: (page: string) => void;
  court: any;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
}

export function Booking({ onNavigate, court, isAuthenticated, userRole, onLogout }: BookingProps) {
  const [selectedDate, setSelectedDate] = useState('2025-12-11');
  const [selectedTime, setSelectedTime] = useState('14:00 - 15:00');
  const [duration, setDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    '08:00 - 09:00',
    '09:00 - 10:00',
    '11:00 - 12:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
  ];

  const total = court.price * duration;
  const serviceFee = Math.round(total * 0.05);
  const finalTotal = total + serviceFee;

  const handleConfirmBooking = () => {
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          onNavigate={onNavigate}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={onLogout}
        />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-gray-900 text-3xl mb-4">¡Reserva Confirmada!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Tu reserva ha sido procesada exitosamente. Recibirás un correo de confirmación con todos los detalles.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-gray-900 mb-4">Detalles de la Reserva</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancha:</span>
                  <span className="text-gray-900">{court.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-900">{new Date(selectedDate).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="text-gray-900">{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total Pagado:</span>
                  <span className="text-emerald-600 text-xl">${finalTotal.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onNavigate('profile')}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ver Mis Reservas
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Ir al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={onLogout}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate('court-detail')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a detalles
        </button>

        <h1 className="text-gray-900 text-3xl mb-8">Confirmar Reserva</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-gray-900 text-xl mb-4">Información de la Cancha</h2>
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-gray-900 text-lg mb-2">{court.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{court.location}</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {court.sport}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-gray-900 text-xl mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Selecciona Fecha y Hora
              </h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Horario Disponible</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-4 py-3 rounded-lg border transition-colors ${
                        selectedTime === slot
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                          : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Duración (horas)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value={1}>1 hora</option>
                  <option value={2}>2 horas</option>
                  <option value={3}>3 horas</option>
                  <option value={4}>4 horas</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-gray-900 text-xl mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Método de Pago
              </h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border-emerald-500 bg-emerald-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <div>
                    <p className="text-gray-900">Tarjeta de Crédito/Débito</p>
                    <p className="text-gray-600 text-sm">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="pse"
                    checked={paymentMethod === 'pse'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <div>
                    <p className="text-gray-900">PSE</p>
                    <p className="text-gray-600 text-sm">Pago mediante tu banco</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="nequi"
                    checked={paymentMethod === 'nequi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-emerald-600"
                  />
                  <div>
                    <p className="text-gray-900">Nequi / Daviplata</p>
                    <p className="text-gray-600 text-sm">Pago mediante billetera digital</p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Número de tarjeta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Fecha vencimiento</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre del titular</label>
                    <input
                      type="text"
                      placeholder="Como aparece en la tarjeta"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-gray-900 text-xl mb-6">Resumen de Reserva</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Fecha:</span>
                  <span className="text-gray-900">
                    {new Date(selectedDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Hora:</span>
                  <span className="text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Duración:</span>
                  <span className="text-gray-900">{duration} {duration === 1 ? 'hora' : 'horas'}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="text-gray-900">${total.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tarifa de servicio:</span>
                  <span className="text-gray-900">${serviceFee.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-gray-900 text-lg">Total:</span>
                <span className="text-emerald-600 text-2xl">${finalTotal.toLocaleString('es-CO')} COP</span>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors mb-4"
              >
                Confirmar y Pagar
              </button>

              <p className="text-center text-gray-500 text-sm">
                Al confirmar aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
