import React from "react";
import Container from "@/components/shared/Container";
import CategoryList from "@/components/ui/CategoryList/CategoryList";

/**
 * CategoriesLayout
 * Updated children type from 'string' to 'React.ReactNode' to satisfy
 * Next.js Layout constraints and fix the Vercel build error.
 */
const CategoriesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="flex space-x-4">
        {/* Sidebar / Category Navigation */}
        <div className="w-1/4">
          <CategoryList />
        </div>

        {/* Main Content Area */}
        <div className="w-3/4">{children}</div>
      </div>
    </Container>
  );
};

export default CategoriesLayout;
