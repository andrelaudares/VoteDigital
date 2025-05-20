
export type UserRole = 'admin' | 'account_admin' | 'user';

export interface UserPermissions {
  canManageUsers: boolean;
  canManageGlobalSettings: boolean;
  canManageElections: boolean;
  canViewReports: boolean;
  canManageTemplates: boolean;
}

export interface UserAuth {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: UserPermissions;
}

// Helper function to get permissions based on role
export const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'admin':
      return {
        canManageUsers: true,
        canManageGlobalSettings: true,
        canManageElections: true,
        canViewReports: true,
        canManageTemplates: true,
      };
    case 'account_admin':
      return {
        canManageUsers: true,
        canManageGlobalSettings: false,
        canManageElections: true,
        canViewReports: true,
        canManageTemplates: false,
      };
    case 'user':
      return {
        canManageUsers: false,
        canManageGlobalSettings: false,
        canManageElections: false,
        canViewReports: false,
        canManageTemplates: false,
      };
  }
};
