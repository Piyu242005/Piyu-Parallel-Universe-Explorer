import { UniverseScene } from "@/components/3d/UniverseScene";
import { AIInteraction } from "@/components/ui/AIInteraction";

export default function Home() {
  return (
    <main className="universe-shell">
      <UniverseScene />
      <AIInteraction />
    </main>
  );
}
