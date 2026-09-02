import ProfileSidebar from "@/components/profile-sidebar";
import MainContent from "@/components/main-content";
import MobileNav from "@/components/mobile-nav";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MobileNav />
      <div className="flex flex-col lg:flex-row">
        <ProfileSidebar />
        <MainContent />
      </div>
    </div>
  );
}
