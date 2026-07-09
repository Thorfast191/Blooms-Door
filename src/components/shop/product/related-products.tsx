import Image from "next/image";
import Link from "next/link";

interface Props {
  products: {
    id: string;
    name: string;
    price: number;
    images: {
      imageUrl: string;
    }[];
  }[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      {/* HEADER */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-amber-600">
          You May Also Like
        </p>

        <h2 className="mt-2 text-4xl font-bold text-slate-900">
          Related Products
        </h2>

        <p className="mt-3 text-slate-500">
          Discover more products you might love.
        </p>
      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* IMAGE */}

            {product.images.length > 0 ? (
              <div className="overflow-hidden bg-slate-100">
                <Image
                  src={product.images[0].imageUrl}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-100 text-slate-400">
                No Image
              </div>
            )}

            {/* CONTENT */}

            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-semibold text-slate-800 transition group-hover:text-amber-600">
                {product.name}
              </h3>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                ৳ {product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
