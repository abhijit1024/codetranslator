import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import CodeTranslation from './pages/code-translation/index';
import DocumentationHub from './pages/documentation-hub/index';
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<CodeTranslation />} />
      <Route path="/code-translation" element={<CodeTranslation />} />
      <Route path="/documentation-hub" element={<DocumentationHub />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
