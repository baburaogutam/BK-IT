// If you need to udpate this type, make sure to also update
// components/ProtectedRoute
// endpoints/auth/login_with_password_POST
// endpoints/auth/register_with_password_POST
// endpoints/auth/session_GET
// helpers/getServerUserSession
// together with this in one toolcall.

import type { UserRole } from "./postgresqlDatabaseSchema";

export interface User {
  id: number;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
}
