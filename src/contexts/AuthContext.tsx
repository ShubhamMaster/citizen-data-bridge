import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'super_admin' | 'admin' | 'user';
  two_fa_enabled?: boolean;
  two_fa_verified?: boolean;
  login_status?: string;
  session_expires_at?: string;
  last_login?: string;
  login_count?: number;
  today_login_count?: number;
  created_at?: string;
  last_password_change?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: any; requiresOTP?: boolean; user?: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadUserProfile = React.useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  }, []);

  const updateLoginStatus = React.useCallback(async (userId: string, status: 'login' | 'logout') => {
    try {
      const sessionToken = status === 'login' ? crypto.randomUUID() : null;
      
      await supabase.rpc('update_login_status', {
        p_user_id: userId,
        p_status: status,
        p_session_token: sessionToken
      });
      
      console.log(`Login status updated to: ${status} for user: ${userId}`);
    } catch (error) {
      console.error('Error updating login status:', error);
    }
  }, []);

  React.useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const userProfile = await loadUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
            // Update login status if user has valid session
            await updateLoginStatus(session.user.id, 'login');
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        // Defer profile loading to prevent deadlocks
        setTimeout(async () => {
          const userProfile = await loadUserProfile(session.user.id);
          if (userProfile) {
            setProfile(userProfile);
            await updateLoginStatus(session.user.id, 'login');
          }
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        // Keep user logged in and update activity
        if (session.user.id) {
          await updateLoginStatus(session.user.id, 'login');
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserProfile, updateLoginStatus]);

  const signIn = React.useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Starting sign in process for:', email);
      
      // First, sign in with email/password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      if (data.user) {
        console.log('Initial sign in successful, checking 2FA status...');
        
        // Load user profile to check 2FA status
        const userProfile = await loadUserProfile(data.user.id);
        console.log('User profile loaded:', userProfile);
        
        if (userProfile?.two_fa_enabled) {
          console.log('2FA is enabled, signing out and sending OTP...');
          
          // Store password temporarily for 2FA completion
          sessionStorage.setItem('tempPassword', password);
          
          // Sign out immediately since we need 2FA verification
          await supabase.auth.signOut();
          
          try {
            // Generate OTP
            console.log('Generating OTP...');
            const { data: otpCode, error: otpError } = await supabase.rpc('generate_otp_with_history', {
              p_user_id: data.user.id,
              p_otp_type: '2fa_login',
              p_email: data.user.email,
              p_expires_minutes: 10
            });

            if (otpError) {
              console.error('OTP generation error:', otpError);
              return { error: otpError };
            }

            console.log('OTP generated successfully, sending email...');

            // Send OTP via email
            const { error: emailError } = await supabase.functions.invoke('send-auth-otp', {
              body: {
                email: data.user.email,
                otpCode,
                otpType: '2fa_login',
                userName: data.user.email?.split('@')[0] || 'User'
              }
            });

            if (emailError) {
              console.error('Email sending error:', emailError);
              return { error: { message: 'Failed to send verification code. Please try again.' } };
            }

            console.log('OTP email sent successfully');

            // Update login status to indicate 2FA pending
            await updateLoginStatus(data.user.id, 'login');

            // Return 2FA required result
            return { 
              requiresOTP: true, 
              user: { 
                id: data.user.id, 
                email: data.user.email,
                twoFactorEnabled: true
              },
              error: null
            };
          } catch (otpError) {
            console.error('Error in 2FA process:', otpError);
            return { error: { message: 'Failed to send verification code. Please try again.' } };
          }
          } else {
            console.log('No 2FA required, proceeding with normal login...');
            
            // No 2FA required, proceed with normal login
            await updateLoginStatus(data.user.id, 'login');
            
            try {
              await supabase.rpc('update_login_stats', { user_id: data.user.id });
            } catch (err) {
              console.warn('Error updating login stats:', err);
            }

            // Check for redirect parameter and navigate accordingly
            const urlParams = new URLSearchParams(window.location.search);
            const redirectPath = urlParams.get('redirect');
            
            if (redirectPath && redirectPath.startsWith('/admin')) {
              // Redirect to the intended admin page
              window.location.href = redirectPath;
            } else {
              // Default admin redirect
              window.location.href = '/admin';
            }
            
            return {
              requiresOTP: false,
              user: data.user,
              error: null
            };
          }
      }

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  }, [updateLoginStatus, loadUserProfile]);

  const signUp = React.useCallback(async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/login`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = React.useCallback(async () => {
    try {
      setLoading(true);
      
      // Update login status before signing out
      if (user) {
        await updateLoginStatus(user.id, 'logout');
      }
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear local state immediately
      setUser(null);
      setProfile(null);
      
      // Redirect to login page
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if there's an error, clear local state
      setUser(null);
      setProfile(null);
      window.location.href = '/login';
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, updateLoginStatus]);

  const value = React.useMemo(() => ({
    user,
    profile,
    userRole: profile?.role || null,
    signIn,
    signUp,
    signOut,
    loading,
    isLoading: loading
  }), [user, profile, signIn, signUp, signOut, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
});

AuthProvider.displayName = 'AuthProvider';

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
