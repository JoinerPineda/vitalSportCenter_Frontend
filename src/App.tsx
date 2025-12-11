import { useState } from 'react';
import { Landing } from './components/Landing';
import { ExploreSports } from './components/ExploreSports';
import { CourtDetail } from './components/CourtDetail';
import { Booking } from './components/Booking';
import { UserProfile } from './components/UserProfile';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';

type Page = 
  | 'landing'
  | 'explore'
  | 'court-detail'
  | 'booking'
  | 'profile'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'admin';

 function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'admin' | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (role: 'client' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'admin') {
      navigate('admin');
    } else {
      navigate('landing');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('landing');
  };

  const handleSelectCourt = (court: any) => {
    setSelectedCourt(court);
    navigate('court-detail');
  };

  const handleBookCourt = () => {
    navigate('booking');
  };

  const handleSelectSport = (sport: string) => {
    setSelectedSport(sport);
    navigate('explore');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <Landing 
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
          onSelectSport={handleSelectSport}
        />
      )}
      {currentPage === 'explore' && (
        <ExploreSports 
          onNavigate={navigate}
          onSelectCourt={handleSelectCourt}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
          selectedSport={selectedSport}
        />
      )}
      {currentPage === 'court-detail' && (
        <CourtDetail 
          onNavigate={navigate}
          court={selectedCourt}
          onBook={handleBookCourt}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'booking' && (
        <Booking 
          onNavigate={navigate}
          court={selectedCourt}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'profile' && (
        <UserProfile 
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'login' && (
        <Login 
          onNavigate={navigate}
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'register' && (
        <Register 
          onNavigate={navigate}
        />
      )}
      {currentPage === 'forgot-password' && (
        <ForgotPassword 
          onNavigate={navigate}
        />
      )}
      {currentPage === 'admin' && (
        <AdminDashboard 
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  );
}

export default AppWrapper;
