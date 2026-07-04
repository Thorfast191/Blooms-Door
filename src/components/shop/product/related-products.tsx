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
    <div className="mt-20">
      <h2 className="mb-10 text-3xl font-bold">Related Products</h2>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:scale-[1.02] hover:border-blue-500"
          >
            {product.images.length > 0 ? (
              <Image
                src={product.images[0].imageUrl}
                alt={product.name}
                width={400}
                height={500}
                className="h-72 w-full object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-950 text-slate-500">
                No Image
              </div>
            )}

            <div className="p-4">
              <h3 className="line-clamp-2 font-bold">{product.name}</h3>

              <p className="mt-2 font-semibold text-slate-300">
                ৳ {product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
