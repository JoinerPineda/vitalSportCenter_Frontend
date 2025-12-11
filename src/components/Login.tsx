import { LogIn, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const { login, isLoading, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Detener propagación de eventos
    setError('');
    
    try {
      const loggedUser = await login(email, password);
      
      // Solo navega si login fue exitoso (loggedUser no es null)
      if (!loggedUser) {
        setError('Error al iniciar sesión: usuario no encontrado');
        toast.error('Error al iniciar sesión');
        return;
      }

      // Login exitoso
      toast.success('¡Sesión iniciada correctamente!');
      
      // Pequeño delay para asegurar que el toast se muestre antes de navegar
      setTimeout(() => {
        if (loggedUser.role === 'admin') {
          onNavigate('admin');
        } else {
          onNavigate('profile');
        }
      }, 300);
      
    } catch (err: any) {
      console.error('Login error:', err); // Debug
      const errorMsg = err?.message || 'Error al iniciar sesión';
      
      // Detectar si es credenciales inválidas
      const isInvalidCredentials = 
        errorMsg.toLowerCase().includes('unauthorized') || 
        errorMsg.toLowerCase().includes('invalid') ||
        errorMsg.toLowerCase().includes('credenciales') ||
        errorMsg.toLowerCase().includes('contraseña') ||
        errorMsg.toLowerCase().includes('not found') ||
        err?.status === 401;
      
      const displayMsg = isInvalidCredentials 
        ? 'Credenciales inválidas' 
        : errorMsg;
      
      setError(displayMsg);
      toast.error(displayMsg);
      // NO navega aquí - se queda en login
    }
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
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
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
              disabled={isLoading}
              className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
