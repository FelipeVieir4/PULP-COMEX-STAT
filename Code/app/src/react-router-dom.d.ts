declare module 'react-router-dom' {
  export const BrowserRouter: (props: { children?: unknown }) => unknown;
  export const Navigate: (props: { to: string; replace?: boolean }) => unknown;
  export const Route: (props: { path: string; element: unknown }) => unknown;
  export const Routes: (props: { children?: unknown }) => unknown;
  export const Link: (props: { to: string; className?: string; children?: unknown }) => unknown;
  export const NavLink: (props: {
    to: string;
    className?: string | ((state: { isActive: boolean }) => string);
    children?: unknown;
  }) => unknown;
}