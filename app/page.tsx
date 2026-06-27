import ProfileSidebar from "@/components/profile-sidebar";
import MainContent from "@/components/main-content";
import MobileNav from "@/components/mobile-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>

        {/* Mobile Profile Section */}
        <div className="lg:hidden pt-16">
          <ProfileSidebar />
        </div>

        {/* Main Content */}
        <MainContent />
      </div>
    </div>
  );
}
