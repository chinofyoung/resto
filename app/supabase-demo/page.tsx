import SupabaseDemo from "@/components/SupabaseDemo";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function SupabaseDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          title="Supabase Demo"
          subtitle="Database Integration Example"
          searchPlaceholder="Search demo features"
        />

        <div className="flex-1 overflow-auto">
          <SupabaseDemo />
        </div>
      </div>
    </div>
  );
}
