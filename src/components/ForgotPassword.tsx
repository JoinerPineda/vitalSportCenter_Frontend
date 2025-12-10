import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

interface ForgotPasswordProps {
  onNavigate: (page: string) => void;
}

export function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-gray-900 text-2xl mb-4">Revisa tu correo</h1>
            <p className="text-gray-600 mb-6">
              Te hemos enviado un enlace de recuperación a <span className="text-gray-900">{email}</span>. 
              Por favor revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Volver al inicio de sesión
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate('landing')}
              className="text-white hover:text-emerald-100 text-sm"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white">VS</span>
            </div>
          </div>
          <h1 className="text-white text-3xl mb-2">¿Olvidaste tu contraseña?</h1>
          <p className="text-emerald-100">No te preocupes, te ayudaremos a recuperarla</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar enlace de recuperación
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-white hover:text-emerald-100 text-sm"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
