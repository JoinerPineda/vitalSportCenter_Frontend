import { LogIn, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: (role: 'client' | 'admin') => void;
}

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: check if email contains 'admin' to determine role
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'client';
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white">VS</span>
            </div>
          </div>
          <h1 className="text-white text-3xl mb-2">Bienvenido de nuevo</h1>
          <p className="text-emerald-100">Inicia sesión en tu cuenta</p>
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
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                <span className="text-gray-700 text-sm">Recordarme</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-emerald-600 hover:text-emerald-700 text-sm"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes una cuenta?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center mb-4">Demo de usuarios:</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                • <span className="text-gray-900">cliente@email.com</span> - Usuario Cliente
              </p>
              <p className="text-gray-600">
                • <span className="text-gray-900">admin@email.com</span> - Administrador
              </p>
            </div>
          </div>
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
