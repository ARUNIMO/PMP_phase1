
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import TurfOwner from "./pages/TurfOwner";
import BookTurf from "./pages/BookTurf";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AnimatePresence>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="/turf-owner" element={<TurfOwner />} />
                  <Route path="/turf-owner/*" element={<TurfOwner />} />
                  <Route path="/book-turf" element={<BookTurf />} />
                  <Route path="/book-turf/:id" element={<BookTurf />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <Sonner />
              </>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
