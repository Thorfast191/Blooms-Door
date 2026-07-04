import Link from "next/link";
import Image from "next/image";

export default function CampaignBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="relative overflow-hidden rounded-[48px] border border-slate-800 bg-black">
        {/* IMAGE */}

        <Image
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2070&auto=format&fit=crop"
          alt="Poshman Style Campaign"
          width={2070}
          height={1380}
          priority
          className="h-[700px] w-full object-cover"
        />

        {/* OVERLAYS */}

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        {/* GLOW EFFECTS */}

        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[180px]" />

        {/* CONTENT */}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-10 lg:px-20">
            <p className="text-sm uppercase tracking-[10px] text-blue-400">
              BloomsDoor
            </p>

            <h2 className="mt-8 text-5xl font-black leading-none md:text-6xl lg:text-7xl">
              ELEVATE
              <br />
              YOUR STYLE
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">
              Designed for modern lifestyles. Premium fabrics, timeless
              silhouettes, and effortless confidence in every piece.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-10 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-slate-200"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
