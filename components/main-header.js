import Link from 'next/link';
import Image from 'next/image';

import logoImg from '@/assets/logo.png';
import styles from './main-header.module.css';

export default function MainHeader() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image src={logoImg} priority alt="A plate with food on it" />
                NextLevel Food
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/meals">Browse Meals</Link>
                    </li>
                    <li>
                        <Link href="/community">Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
