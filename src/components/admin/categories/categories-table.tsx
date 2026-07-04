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
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-950">
          <tr className="text-left">
            <th className="p-4">Category</th>
            <th className="p-4 text-center">Products</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t border-slate-800">
              <td className="p-4 font-semibold">{category.name}</td>

              <td className="p-4 text-center">{category._count.products}</td>

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
                    className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
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
