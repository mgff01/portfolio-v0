import ProfileSidebar from "@/components/profile-sidebar";
import MainContent from "@/components/main-content";
import MobileNav from "@/components/mobile-nav";

import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import certificationsData from "@/data/certifications.json";

import type { Profile, Project, Experience, Certification } from "@/types/portfolio";

const profile = profileData as Profile;
const projects = projectsData as Project[];
const experiences = experienceData as Experience[];
const certifications = certificationsData as Certification[];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <ProfileSidebar profile={profile} />
        </div>

        {/* Mobile Profile Section */}
        <div className="lg:hidden pt-16">
          <ProfileSidebar profile={profile} />
        </div>

        {/* Main Content */}
        <MainContent
          projects={projects}
          experiences={experiences}
          certifications={certifications}
        />
      </div>
    </div>
  );
}
