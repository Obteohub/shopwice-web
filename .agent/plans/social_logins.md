# Implementation Plan - Social Logins

This plan outlines the steps to integrate Google and Facebook social logins into the Shopwice frontend.

## 1. Setup & Dependencies
- [ ] Install `@react-oauth/google` for Google Sign-In.
- [ ] Install `react-facebook-login` or use the Facebook SDK for Facebook Sign-In.
- [ ] Add the following environment variables to `.env`:
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
  - `NEXT_PUBLIC_FACEBOOK_APP_ID`

## 2. Global Provider Configuration
- [ ] Update `src/pages/_app.tsx` to wrap the application with `GoogleOAuthProvider`.

## 3. Auth Utility Updates
- [ ] Add `loginWithSocial(provider: string, token: string)` to `src/utils/auth.ts`.
- [ ] This function will send the social provider's token to the backend endpoint (e.g., `/auth/social-login`) to receive a session token.

## 4. UI Implementation
- [ ] Update `src/components/User/UserLogin.component.tsx`:
  - Integrate the Google Login hook/button.
  - Implement the Facebook Login logic.
  - Show loading states during social authentication.
- [ ] Ensure consistent styling with the existing login form.

## 5. Testing & Validation
- [ ] Verify the OAuth flow redirects correctly.
- [ ] Ensure user data is correctly stored in `localStorage` upon successful social login.
- [ ] Test error handling for cancelled or failed social logins.

---

**Note**: Backend support for social token verification is required. If endpoints are not yet available, we will implement the frontend hooks and mock the API response for development.
