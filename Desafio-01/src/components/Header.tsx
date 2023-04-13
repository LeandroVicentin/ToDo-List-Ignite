import styles from './Header.module.css';

import toDoLogo from '../assets/Logo.png';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={toDoLogo} alt="Logotipo do ToDo" />
        </header>
    );
}