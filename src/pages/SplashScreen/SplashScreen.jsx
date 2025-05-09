
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page d'accueil après 2,5 secondes
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.splash}>
      <div className={styles.splash__logo}>min.day</div>
      <div className={styles.splash__dino}>
        {/* Image du dinosaure - en emoji pour l'instant */}
        🦖
      </div>
      <div className={styles.splash__subtitle}>
        PARFAIT POUR S'ENRICHIR CHAQUE JOUR
      </div>
    </div>
  );
};

export default SplashScreen;
