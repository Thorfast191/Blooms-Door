export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-4 text-sm uppercase tracking-[6px] text-amber-600">
          Support
        </p>

        <h1 className="mb-6 text-5xl font-black">Contact Us</h1>

        <p className="mb-10 max-w-2xl leading-8 text-slate-600">
          Have questions about your order, shipping, returns, or products? Our
          support team is here to help.
        </p>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Email</h2>

            <p className="text-slate-600">support@poshmanstyle.com</p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              Business Hours
            </h2>

            <p className="text-slate-600">
              Saturday – Thursday
              <br />
              10:00 AM – 8:00 PM
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Facebook</h2>

            <a
              href="https://www.facebook.com/Poshmanstyle"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-600 transition hover:text-amber-700"
            >
              facebook.com/Poshmanstyle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
