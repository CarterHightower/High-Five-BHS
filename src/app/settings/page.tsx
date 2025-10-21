export default function SettingsPage() {
  return (
    <section className="px-4 bg-white min-h-[calc(100vh-56px)]">
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-black/70 dark:text-white/70 mt-1">Placeholder settings per your mockup.</p>

        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-black/30">
            <h2 className="font-medium">Profile</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">Name</label>
                <input id="name" className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">Email</label>
                <input id="email" type="email" className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-black/30">
            <h2 className="font-medium">Notifications</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="size-4" /> Email updates</label>
              <label className="flex items-center gap-3 text-sm"><input type="checkbox" className="size-4" /> New review alerts</label>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90">Save changes</button>
          </div>
        </div>
      </div>
    </section>
  );
}




