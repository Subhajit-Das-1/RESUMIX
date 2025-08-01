import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing-page';
import SavedResumesDashboard from './pages/saved-resumes-dashboard';
import TemplateSelection from './pages/template-selection';
import ResumeBuilderForm from './pages/resume-builder-form';
import ResumePreview from './pages/resume-preview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/saved-resumes-dashboard" element={<SavedResumesDashboard />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/resume-builder-form" element={<ResumeBuilderForm />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
