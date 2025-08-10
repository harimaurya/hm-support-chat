import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AppConfig() {
  return (
    <div className="app-config w-full max-w-md p-5">
      <h1 className="text-xl font-bold mb-4">Application Configuration</h1>
      
      <form className="space-y-4">
        <div className="form-group space-y-2">
          <Label htmlFor="app-name">Application Name</Label>
          <Input
            id="app-name"
            name="app-name"
            type="text"
            placeholder="Enter application name"
            className="mt-1 block w-full"
          />
        </div>
        {/* OPENAI_API_KEY=sk-... */}
        <div className="form-group space-y-2">
          <Label htmlFor="openai-api-key">OpenAI API Key</Label>
          <Input
            id="openai-api-key"
            name="openai-api-key"
            type="password"
            placeholder="Enter OpenAI API Key"
            className="mt-1 block w-full"
          />
        </div>

        {/* SUPABASE_URL=https://YOUR-PROJECT.supabase.co */}
        <div className="form-group space-y-2">
          <Label htmlFor="supabase-url">Supabase URL</Label>
          <Input
            id="supabase-url"
            name="supabase-url"
            type="text"
            placeholder="Enter Supabase URL"
            className="mt-1 block w-full"
          />
        </div>
        {/* SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY */}
        <div className="form-group space-y-2">
          <Label htmlFor="supabase-service-role-key">
            Supabase Service Role Key
          </Label>
          <Input
            id="supabase-service-role-key"
            name="supabase-service-role-key"
            type="password"
            placeholder="Enter Supabase Service Role Key"
            className="mt-1 block w-full"
          />
        </div>
      </form>
    </div>
  );
}
