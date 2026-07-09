import { createCategory } from "@/actions/category.actions";

export default function CategoryForm() {
  return (
    <form
      action={createCategory}
      className="space-y-4 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-slate-900">Create Category</h2>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category Name
        </label>

        <input
          name="name"
          required
          placeholder="Shirts"
          className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <button className="h-12 rounded-lg bg-amber-500 px-6 font-semibold text-white transition hover:bg-amber-600">
        Create Category
      </button>
    </form>
  );
}
