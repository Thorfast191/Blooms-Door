import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/actions/category.actions";

interface Props {
  categories: {
    id: string;
    name: string;
    _count: {
      products: number;
    };
  }[];
}

export default function CategoriesTable({ categories }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr className="text-left text-slate-700">
            <th className="p-4">Category</th>
            <th className="p-4 text-center">Products</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-slate-200 hover:bg-slate-50 transition"
            >
              <td className="p-4 font-semibold text-slate-900">
                {category.name}
              </td>

              <td className="p-4 text-center text-slate-700">
                {category._count.products}
              </td>

              <td className="p-4 text-center">
                <form
                  action={async () => {
                    "use server";
                    await deleteCategory(category.id);
                  }}
                >
                  <button
                    type="submit"
                    title="Delete category"
                    className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
