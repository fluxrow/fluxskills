import { useState } from "react";
import { Navbar, type Tab } from "@/components/Navbar";
import { SkillsLibrary } from "@/components/SkillsLibrary";
import { WorkflowsSection } from "@/components/WorkflowsSection";
import { CommunitySection } from "@/components/CommunitySection";

const Index = () => {
  const [tab, setTab] = useState<Tab>("skills");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar active={tab} onChange={setTab} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {tab === "skills" && <SkillsLibrary />}
        {tab === "workflows" && <WorkflowsSection />}
        {tab === "community" && <CommunitySection />}
      </main>
    </div>
  );
};

export default Index;
