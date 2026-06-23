import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Code2, LogOut } from 'lucide-react';

interface RoleOption {
  label: string;
  role: 'client' | 'inspector' | 'admin' | 'cs';
  dashboardUrl: string;
  description: string;
}

const roles: RoleOption[] = [
  {
    label: 'Client Dashboard',
    role: 'client',
    dashboardUrl: '/customer/dashboard',
    description: 'Kundenansicht - Buchungen und Reports',
  },
  {
    label: 'Inspector Dashboard',
    role: 'inspector',
    dashboardUrl: '/inspector/dashboard',
    description: 'Inspektoransicht - Aufträge und Inspektionen',
  },
  {
    label: 'Admin Dashboard',
    role: 'admin',
    dashboardUrl: '/admin/dashboard',
    description: 'Administratoransicht - Vollständige Verwaltung',
  },
  {
    label: 'Customer Success Dashboard',
    role: 'cs',
    dashboardUrl: '/cs/dashboard',
    description: 'Support-Ansicht - Tickets und Beschwerden',
  },
];

export function DevRoleSwitcher() {
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-40 gap-2 bg-background border-primary/50 hover:border-primary"
        >
          <Code2 className="w-4 h-4" />
          <span className="hidden sm:inline">Dev</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          Test Rollen
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {roles.map((role) => (
          <Link key={role.role} href={role.dashboardUrl}>
            <a>
              <DropdownMenuItem
                onClick={() => setCurrentRole(role.role)}
                className="flex flex-col items-start cursor-pointer"
              >
                <div className="font-medium">{role.label}</div>
                <div className="text-xs text-muted-foreground">{role.description}</div>
              </DropdownMenuItem>
            </a>
          </Link>
        ))}

        <DropdownMenuSeparator />

        <Link href="/">
          <a>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
              Zur Home
            </DropdownMenuItem>
          </a>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
