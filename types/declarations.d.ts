declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;

  // Common icons used across the project
  export const Sparkles: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const FolderOpen: LucideIcon;
  export const Camera: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const FileText: LucideIcon;
  export const FileSpreadsheet: LucideIcon;
  export const Presentation: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Zap: LucideIcon;
  export const Bot: LucideIcon;
  export const Search: LucideIcon;
  export const Layers: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Image: LucideIcon;
  export const FileCode: LucideIcon;
  export const File: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Info: LucideIcon;
  export const X: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const UploadCloud: LucideIcon;
  export const Loader2: LucideIcon;
  export const Trash2: LucideIcon;
  export const FilePlus: LucideIcon;
  export const Plus: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Settings: LucideIcon;
  export const HardDrive: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Mic: LucideIcon;
  export const Bell: LucideIcon;
  export const Menu: LucideIcon;
  export const MoreVertical: LucideIcon;
  export const Eye: LucideIcon;
  export const Copy: LucideIcon;
  export const Check: LucideIcon;
  export const Clock: LucideIcon;
  export const LayoutGrid: LucideIcon;
  export const List: LucideIcon;
  export const ListOrdered: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const FileCheck: LucideIcon;
  export const Filter: LucideIcon;
  export const ArrowUpDown: LucideIcon;
  export const Receipt: LucideIcon;
  export const Tag: LucideIcon;
  export const ZoomIn: LucideIcon;
  export const ZoomOut: LucideIcon;
  export const Maximize2: LucideIcon;
  export const Download: LucideIcon;
  export const Share2: LucideIcon;
  export const Send: LucideIcon;
  export const Bold: LucideIcon;
  export const Italic: LucideIcon;
  export const Type: LucideIcon;
  export const ScanText: LucideIcon;
  export const EyeOff: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Languages: LucideIcon;
  export const Calendar: LucideIcon;
  export const CheckSquare: LucideIcon;
  export const Mail: LucideIcon;
  export const Paperclip: LucideIcon;
  export const RotateCw: LucideIcon;
  export const Sliders: LucideIcon;
  export const User: LucideIcon;
  export const Moon: LucideIcon;
  export const Sun: LucideIcon;
  export const Shield: LucideIcon;

  const icons: Record<string, LucideIcon>;
  export default icons;
}

declare module 'next/link' {
  import * as React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
  }
  const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(url: string): void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams<T = Record<string, string | string[]>>(): T;
}

