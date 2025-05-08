
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Home, Library, Book, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      path: '/home',
      label: 'Accueil',
      icon: Home,
    },
    {
      path: '/library',
      label: 'Bibliothèque',
      icon: Library,
    },
    {
      path: '/challenges',
      label: 'Défis',
      icon: Book,
    },
    {
      path: '/profile',
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <nav className={styles.bottom_nav}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${styles.bottom_nav__item} ${
            path === item.path ? styles.active : ''
          }`}
        >
          <item.icon className={styles.bottom_nav__icon} size={24} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
