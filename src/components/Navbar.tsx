import { Menu, User, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'client' | 'admin' | null;
  onLogout?: () => void;
  transparent?: boolean;
}

export function Navbar({ onNavigate, isAuthenticated, userRole, onLogout, transparent }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`${transparent ? 'absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className={`w-10 h-10 ${transparent ? 'bg-emerald-400' : 'bg-emerald-500'} rounded-lg flex items-center justify-center`}>
              <span className="text-white">VS</span>
            </div>
            <span className={`${transparent ? 'text-white' : 'text-gray-900'}`}>VITAL SPORT CENTER</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate('explore')}
              className={`${transparent ? 'text-white hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
            >
              Explorar Canchas
            </button>
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('profile')}
                  className={`${transparent ? 'text-white hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
                >
                  Mi Perfil
                </button>
                {userRole === 'admin' && (
                  <button 
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-2 ${transparent ? 'text-white hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Panel Admin
                  </button>
                )}
                <button 
                  onClick={onLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${transparent ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')}
                  className={`${transparent ? 'text-white hover:text-emerald-300' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className={transparent ? 'text-white' : 'text-gray-700'} />
          </button>
        </div>

        {menuOpen && (
          <div className={`md:hidden pb-4 ${transparent ? 'bg-black/80' : 'bg-white'}`}>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  onNavigate('explore');
                  setMenuOpen(false);
                }}
                className={`text-left px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'} rounded-lg`}
              >
                Explorar Canchas
              </button>
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => {
                      onNavigate('profile');
                      setMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'} rounded-lg`}
                  >
                    Mi Perfil
                  </button>
                  {userRole === 'admin' && (
                    <button 
                      onClick={() => {
                        onNavigate('admin');
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 text-left px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'} rounded-lg`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Panel Admin
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      onLogout?.();
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 text-left px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'} rounded-lg`}
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      onNavigate('login');
                      setMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'} rounded-lg`}
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate('register');
                      setMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
