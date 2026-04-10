/**
 * BottomNav — persistent bottom navigation bar with 4 tabs: Logs, Programs, Statistics, Profile.
 * Hidden on /login and /signup (auth pages have no nav).
 * Active tab is highlighted with accent color + 2px top line indicator.
 * Uses NavLink for automatic active state detection based on current route.
 * Reads: current route (via NavLink isActive)
 */

import { NavLink, useLocation } from 'react-router-dom';
import { ClipboardList, Dumbbell, BarChart2, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const TABS = [
  { to: '/logs',       label: 'Logs',       Icon: ClipboardList },
  { to: '/programs',   label: 'Programs',   Icon: Dumbbell      },
  { to: '/statistics', label: 'Statistics', Icon: BarChart2     },
  { to: '/profile',    label: 'Profile',    Icon: User          },
];

const HIDDEN_ROUTES = ['/login', '/signup'];

export default function BottomNav() {
  const { pathname } = useLocation();

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <nav className={styles.nav}>
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          <Icon size={22} strokeWidth={1.75} />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
