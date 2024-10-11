import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  User,
  ShoppingBag,
  Shield,
  Calendar,
  PlaneTakeoff,
  Sun,
  Moon,
  LogOut,
  Menu,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const NavLink: React.FC<{
    to: string;
    icon: React.ReactNode;
    title: string;
  }> = ({ to, icon, title }) => (
    <Link
      to={to}
      className="flex items-center p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
      title={title}
    >
      {icon}
      <span className="ml-2 md:hidden">{title}</span>
    </Link>
  );

  return (
    <header
      className={`${
        darkMode ? 'bg-gray-900' : 'bg-blue-600'
      } text-white shadow-md`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <PlaneTakeoff className="mr-2" size={24} />
            <span className="hidden sm:inline">Oceanic APP</span>
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
            >
              <Menu size={24} />
            </button>
          </div>
          <div
            className={`md:flex space-y-2 md:space-y-0 md:space-x-4 items-center ${
              menuOpen
                ? 'flex flex-col absolute top-16 right-4 bg-blue-600 p-4 rounded-lg shadow-lg'
                : 'hidden'
            }`}
          >
            <NavLink to="/" icon={<Home size={20} />} title="Inicio" />
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  icon={<User size={20} />}
                  title="Perfil"
                />
                <NavLink
                  to="/market"
                  icon={<ShoppingBag size={20} />}
                  title="Mercado"
                />
                <NavLink
                  to="/admin"
                  icon={<Shield size={20} />}
                  title="Admin"
                />
                <NavLink
                  to="/calendar"
                  icon={<Calendar size={20} />}
                  title="Eventos"
                />
                <NavLink
                  to="/flight-log"
                  icon={<PlaneTakeoff size={20} />}
                  title="Registro de Vuelos"
                />
                <button
                  onClick={logout}
                  className="flex items-center p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
                  title="Cerrar sesión"
                >
                  <LogOut size={20} />
                  <span className="ml-2 md:hidden">Cerrar sesión</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                icon={<User size={20} />}
                title="Iniciar sesión"
              />
            )}
            <button
              onClick={toggleDarkMode}
              className="flex items-center p-2 hover:bg-blue-700 rounded-full transition-colors duration-200"
              title="Cambiar tema"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="ml-2 md:hidden">Cambiar tema</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
