import { UniverseScene } from "@/components/3d/UniverseScene";
import { AIInteraction } from "@/components/ui/AIInteraction";
import { ExplorationSystem } from "@/components/ui/ExplorationSystem";

export default function Home() {
  return (
    <main className="universe-shell">
      <UniverseScene />
      <AIInteraction />
      <ExplorationSystem />
      <div className="creator-mark" aria-label="Created by Piyush Ramteke">
        <span>CREATED BY</span>
        <strong>PIYUSH RAMTEKE</strong>
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
    </main>
  );
}
