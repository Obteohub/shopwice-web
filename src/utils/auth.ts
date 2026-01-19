import { ApolloClient, InMemoryCache } from '@apollo/client';
import { LOGIN_USER } from './gql/GQL_MUTATIONS';

// Cookie-based authentication - no token storage needed
export function hasCredentials() {
  if (typeof window === 'undefined') {
    return false; // Server-side, no credentials available
  }

  // With cookie-based auth, we'll check if user is logged in through a query
  // For now, we'll return false and let components handle the check
  return false;
}

export async function getAuthToken() {
  // Cookie-based auth doesn't need JWT tokens
  return null;
}

function getErrorMessage(error: any): string {
  // Check for GraphQL errors
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    const message = graphQLError.message;

    // Map GraphQL error messages to user-friendly messages
    switch (message) {
      case 'invalid_username':
        return 'Invalid username or email address. Please check and try again.';
      case 'incorrect_password':
        return 'Incorrect password. Please check your password and try again.';
      case 'invalid_email':
        return 'Invalid email address. Please enter a valid email address.';
      case 'empty_username':
        return 'Please enter username or email address.';
      case 'empty_password':
        return 'Please enter password.';
      case 'too_many_retries':
        return 'Too many failed attempts. Please wait a moment before trying again.';
      default:
        return 'Login failed. Please check your credentials and try again.';
    }
  }

  // Check for network errors
  if (error.networkError) {
    return 'Network error. Please check your internet connection and try again.';
  }

  // Fallback for other errors
  if (error.message) {
    return 'An error occurred during login. Please try again.';
  }

  return 'An unknown error occurred. Please try again later.';
}

export async function login(username: string, password: string) {
  try {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      // credentials: 'include', // Not strictly needed for JWT but harmless
    });

    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    const loginResult = data.login;

    if (loginResult && loginResult.authToken) {
      // Store Auth Token
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-data', JSON.stringify({
          authToken: loginResult.authToken,
          refreshToken: loginResult.refreshToken,
          user: loginResult.user
        }));
      }
      return { success: true, status: 'SUCCESS' };
    } else {
      throw new Error('Login failed. No token received.');
    }
  } catch (error: any) {
    const userFriendlyMessage = getErrorMessage(error);
    throw new Error(userFriendlyMessage);
  }
}

export async function logout() {
  if (typeof window !== 'undefined') {
    // Clear Auth Data
    localStorage.removeItem('auth-data');
    localStorage.removeItem('woo-session');

    // Clear Apollo Cache
    // We can't easily access the client instance here without circular deps or restructuring.
    // So we rely on a hard reload to clear memory state.

    // Redirect to login or home page after logout
    window.location.href = '/login';
  }
}
