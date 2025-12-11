import { useState, useCallback } from 'react';
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
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleLogout = useCallback(() => {
    navigate('landing');
  }, [navigate]);

  const handleSelectCourt = useCallback((court: any) => {
    setSelectedCourt(court);
    navigate('court-detail');
  }, [navigate]);

  const handleBookCourt = useCallback(() => {
    navigate('booking');
  }, []);

  const handleSelectSport = useCallback((sport: string) => {
    setSelectedSport(sport);
    navigate('explore');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <Landing 
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          userRole={user?.role || null}
          onLogout={handleLogout}
          onSelectSport={handleSelectSport}
        />
      )}
      {currentPage === 'explore' && (
        <ExploreSports 
          onNavigate={navigate}
          onSelectCourt={handleSelectCourt}
          isAuthenticated={isAuthenticated}
          userRole={user?.role || null}
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
          userRole={user?.role || null}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'booking' && (
        <Booking 
          onNavigate={navigate}
          court={selectedCourt}
          isAuthenticated={isAuthenticated}
          userRole={user?.role || null}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'profile' && (
        <UserProfile 
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          userRole={user?.role || null}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'login' && (
        <Login 
          onNavigate={navigate}
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
