// User role constants
export const USER_ROLES = {
  ADMIN: 1,
  USER: 2,
} as const;

// Type for role values
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Helper function to check if user is admin
export const isAdmin = (roleId: number | undefined): boolean => {
  return roleId === USER_ROLES.ADMIN;
};

// Helper function to check if user is regular user
export const isUser = (roleId: number | undefined): boolean => {
  return roleId === USER_ROLES.USER;
};
