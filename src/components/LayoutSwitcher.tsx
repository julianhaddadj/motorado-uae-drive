import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";

export const LayoutSwitcher = () => {
  const { layout, setLayout } = useLayout();

  return (
    <div className="flex rounded-md border overflow-hidden" role="group" aria-label="Layout options">
      <Button
        variant={layout === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLayout('grid')}
        className="rounded-none px-3 py-2 border-r"
        aria-pressed={layout === 'grid'}
        aria-label="Grid view"
      >
        <Grid3x3 className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={layout === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLayout('list')}
        className="rounded-none px-3 py-2"
        aria-pressed={layout === 'list'}
        aria-label="List view"
      >
        <List className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
};