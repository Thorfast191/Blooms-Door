import { updateProfile } from "@/actions/settings.actions";

interface Props {
  admin: any;
}

export default function ProfileSettings({ admin }: Props) {
  return (
    <form
      action={updateProfile}
      className="space-y-6 rounded-2xl border border-slate-300 bg-white p-8 shadow-md"
    >
      <h2 className="text-2xl font-bold text-slate-800">Profile Settings</h2>

      {/* NAME */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <input
          name="name"
          defaultValue={admin.name || ""}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* EMAIL */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          defaultValue={admin.email}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* BUTTON */}

      <button className="h-12 rounded-xl bg-amber-500 px-6 font-semibold text-white transition hover:bg-amber-600">
        Save Changes
      </button>
    </form>
  );
}
