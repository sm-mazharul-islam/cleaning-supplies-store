import Container from "@/components/shared/Container";
import CategoryList from "@/components/ui/CategoryList/CategoryList";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
