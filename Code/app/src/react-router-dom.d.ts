import type { ReactNode, ComponentPropsWithRef } from 'react';

declare module 'react-router-dom' {
  export function BrowserRouter(props: { children?: ReactNode }): React.ReactElement;
  export function Navigate(props: { to: string; replace?: boolean }): React.ReactElement | null;
  export function Route(props: { path: string; element?: ReactNode; children?: ReactNode }): React.ReactElement | null;
  export function Routes(props: { children?: ReactNode }): React.ReactElement | null;
  export function Link(props: ComponentPropsWithRef<'a'> & { to: string; children?: ReactNode }): React.ReactElement;
  export function NavLink(props: ComponentPropsWithRef<'a'> & {
    to: string;
    end?: boolean;
    className?: string | ((state: { isActive: boolean; isPending: boolean }) => string);
    children?: ReactNode;
  }): React.ReactElement;
  export function useNavigate(): (to: string, options?: { replace?: boolean; state?: unknown }) => void;
  export function useLocation(): { pathname: string; search: string; hash: string; state: unknown };
  export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void];
}
