import React, { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { OnboardingWizard } from "./components/OnboardingWizard";
import { Dashboard } from "./components/Dashboard";
import { PropertySearch } from "./components/PropertySearch";
import { PropertyListing } from "./components/PropertyListing";
import { AIAssistant } from "./components/AIAssistant";
import { UserProfile } from "./components/UserProfile";
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "./components/ui/sonner";

export type UserType =
  | "owner"
  | "buyer"
  | "renter"
  | "seller"
  | "admin";

export interface AppState {
  currentView:
    | "landing"
    | "signin"
    | "signup"
    | "onboarding"
    | "dashboard"
    | "search"
    | "listing"
    | "profile"
    | "admin";
  userType: UserType | null;
  isAuthenticated: boolean;
  onboardingStep: number;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentView: "landing",
    userType: null,
    isAuthenticated: false,
    onboardingStep: 0,
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleUserTypeSelection = (userType: UserType) => {
    if (appState.isAuthenticated) {
      // If already authenticated, go directly to onboarding
      setAppState({
        currentView: "onboarding",
        userType,
        isAuthenticated: true,
        onboardingStep: 0,
      });
    } else {
      // If not authenticated, go to sign up
      setAppState({
        currentView: "signup",
        userType,
        isAuthenticated: false,
        onboardingStep: 0,
      });
    }
  };

  const handleSignInSuccess = (userType: string) => {
    if (userType === "admin") {
      setAppState({
        currentView: "admin",
        userType: userType as UserType,
        isAuthenticated: true,
        onboardingStep: 0,
      });
    } else {
      setAppState({
        currentView: "dashboard",
        userType: userType as UserType,
        isAuthenticated: true,
        onboardingStep: 0,
      });
    }
  };

  const handleSignUpSuccess = (userType: string) => {
    setAppState({
      currentView: "onboarding",
      userType: userType as UserType,
      isAuthenticated: true,
      onboardingStep: 0,
    });
  };

  const handleOnboardingComplete = () => {
    setAppState((prev) => ({
      ...prev,
      currentView: "dashboard",
    }));
  };

  const handleBackToLanding = () => {
    setAppState({
      currentView: "landing",
      userType: null,
      isAuthenticated: false,
      onboardingStep: 0,
    });
  };

  const handleViewChange = (view: AppState["currentView"]) => {
    setAppState((prev) => ({
      ...prev,
      currentView: view,
    }));
  };

  const handleSignOut = () => {
    setAppState({
      currentView: "landing",
      userType: null,
      isAuthenticated: false,
      onboardingStep: 0,
    });
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {appState.currentView === "landing" && (
        <LandingPage
          onUserTypeSelect={handleUserTypeSelection}
          onSignIn={() =>
            setAppState((prev) => ({
              ...prev,
              currentView: "signin",
            }))
          }
          onSignUp={() =>
            setAppState((prev) => ({
              ...prev,
              currentView: "signup",
            }))
          }
        />
      )}

      {appState.currentView === "signin" && (
        <SignIn
          onSignInSuccess={handleSignInSuccess}
          onBack={handleBackToLanding}
          onSignUp={() =>
            setAppState((prev) => ({
              ...prev,
              currentView: "signup",
            }))
          }
        />
      )}

      {appState.currentView === "signup" && (
        <SignUp
          onSignUpSuccess={handleSignUpSuccess}
          onBack={handleBackToLanding}
          onSignIn={() =>
            setAppState((prev) => ({
              ...prev,
              currentView: "signin",
            }))
          }
        />
      )}

      {appState.currentView === "onboarding" &&
        appState.userType && (
          <OnboardingWizard
            userType={appState.userType}
            onComplete={handleOnboardingComplete}
            onBack={handleBackToLanding}
          />
        )}

      {appState.currentView === "dashboard" &&
        appState.isAuthenticated && (
          <Dashboard
            userType={appState.userType}
            onViewChange={handleViewChange}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

      {appState.currentView === "search" &&
        appState.isAuthenticated && (
          <PropertySearch
            userType={appState.userType}
            onViewChange={handleViewChange}
          />
        )}

      {appState.currentView === "listing" &&
        appState.isAuthenticated && (
          <PropertyListing
            userType={appState.userType}
            onViewChange={handleViewChange}
          />
        )}

      {appState.currentView === "profile" &&
        appState.isAuthenticated && (
          <UserProfile
            userType={appState.userType}
            onViewChange={handleViewChange}
            onSignOut={handleSignOut}
          />
        )}

      {appState.currentView === "admin" &&
        appState.userType === "admin" &&
        appState.isAuthenticated && (
          <AdminPanel onViewChange={handleViewChange} />
        )}

      {/* AI Assistant - Only show when authenticated */}
      {appState.isAuthenticated && (
        <AIAssistant
          userType={appState.userType}
          currentView={appState.currentView}
          onViewChange={handleViewChange}
          isOpen={isChatOpen}
          onToggleOpen={setIsChatOpen}
        />
      )}

      <Toaster />
    </div>
  );
}