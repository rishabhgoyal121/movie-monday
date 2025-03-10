import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabbedCarouselProps {
  title: string;
  tabNames: string[];
}

const TabbedCarousel: React.FC<TabbedCarouselProps> = ({ title, tabNames }) => {
  // Use the first tab as the default value
  const defaultValue = tabNames.length > 0 ? tabNames[0].toLowerCase() : "";

  return (
    <div className="w-full mx-auto my-8">
      <Tabs defaultValue={defaultValue} className="w-full">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>

          <TabsList
            className="grid"
            style={{ gridTemplateColumns: `repeat(${tabNames.length}, 1fr)` }}
          >
            {tabNames.map((tabName) => (
              <TabsTrigger
                key={tabName}
                value={tabName.toLowerCase()}
                className="px-4 py-2 transition-all duration-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-lg data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                {tabName}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabNames.map((tabName) => (
          <TabsContent
            key={tabName}
            value={tabName.toLowerCase()}
            className="p-6 border rounded-md shadow-sm animate-in fade-in-50 duration-300"
          >
            Content for {tabName} tab goes here.
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabbedCarousel;
