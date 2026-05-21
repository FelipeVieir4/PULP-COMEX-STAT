export type NavItem = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export const publicNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Visão executiva inicial',
    icon: 'dashboard',
  },
  {
    label: 'Trade Flow',
    href: '/dashboard',
    description: 'Fluxo comercial e séries',
    icon: 'swap_horiz',
  },
  {
    label: 'Products',
    href: '/reports',
    description: 'Classes e NCM/SH em foco',
    icon: 'inventory_2',
  },
  {
    label: 'Reports',
    href: '/reports',
    description: 'Leitura analítica detalhada',
    icon: 'assessment',
  },
];

export const shellNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Resumo executivo',
    icon: 'dashboard',
  },
  {
    label: 'Trade Flow',
    href: '/dashboard',
    description: 'Fluxo comercial global',
    icon: 'swap_horiz',
  },
  {
    label: 'Products',
    href: '/reports',
    description: 'Detalhe por NCM',
    icon: 'inventory_2',
  },
  {
    label: 'Partners',
    href: '/reports',
    description: 'Municípios e fábricas',
    icon: 'handshake',
  },
  {
    label: 'Reports',
    href: '/reports',
    description: 'Análises detalhadas',
    icon: 'assessment',
  },
];