import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    lastLogin?: Date; // Include lastLogin in User
  }

  interface Session extends DefaultSession {
    user: User; // Ensure session.user has lastLogin
  }
}
