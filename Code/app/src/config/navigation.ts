export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export const publicNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Visão executiva inicial',
  },
  {
    label: 'Trade Flow',
    href: '/dashboard',
    description: 'Fluxo comercial e séries',
  },
  {
    label: 'Products',
    href: '/reports',
    description: 'Classes e NCM/SH em foco',
  },
  {
    label: 'Reports',
    href: '/reports',
    description: 'Leitura analítica detalhada',
  },
];

export const shellNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    description: 'Resumo executivo',
  },
  {
    label: 'Trade Flow',
    href: '/dashboard',
    description: 'Fluxo comercial global',
  },
  {
    label: 'Products',
    href: '/reports',
    description: 'Detalhe por NCM',
  },
  {
    label: 'Partners',
    href: '/reports',
    description: 'Municípios e fábricas',
  },
  {
    label: 'Reports',
    href: '/reports',
    description: 'Análises detalhadas',
  },
];