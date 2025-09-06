import React from "react";
import ResetPassword from "@/components/auth/ResetPassword";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md">
          <ResetPassword />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;