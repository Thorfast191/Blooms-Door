import { changePassword } from "@/actions/settings.actions";

export default function PasswordSettings() {
  return (
    <form
      action={changePassword}
      className="space-y-6 rounded-2xl border border-slate-300 bg-white p-8 shadow-md"
    >
      <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>

      {/* CURRENT */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Current Password
        </label>

        <input
          type="password"
          name="currentPassword"
          required
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* NEW */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          New Password
        </label>

        <input
          type="password"
          name="newPassword"
          required
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-800 focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* BUTTON */}

      <button className="h-12 rounded-xl bg-amber-500 px-6 font-semibold text-white transition hover:bg-amber-600">
        Update Password
      </button>
    </form>
  );
}
