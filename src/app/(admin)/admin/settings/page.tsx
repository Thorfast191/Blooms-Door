import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

import ProfileSettings from "@/components/admin/settings/profile-settings";

import PasswordSettings from "@/components/admin/settings/password-settings";

export default async function SettingsPage() {
  const session = await auth();

  const admin = await prisma.admin.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="text-slate-400 mt-2">Manage admin account</p>
      </div>

      {/* PROFILE */}

      <ProfileSettings admin={admin} />

      {/* PASSWORD */}

      <PasswordSettings />
    </div>
  );
}
