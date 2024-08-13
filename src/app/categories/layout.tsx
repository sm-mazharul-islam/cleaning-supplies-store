import Container from "@/components/shared/Container";
import CategoryList from "@/components/ui/CategoryList/CategoryList";

const CategoriesLayout = ({ children }: { children: string }) => {
  return (
    <Container>
      <div className="flex space-x-4">
        <div className="w-1/4">
          <CategoryList />
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </Container>
  );
};

export default CategoriesLayout;
