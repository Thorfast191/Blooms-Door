import { createCategory } from "@/actions/category.actions";

export default function CategoryForm() {
  return (
    <form
      action={createCategory}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Category</h2>

      <div>
        <label className="block mb-2 text-sm">Category Name</label>

        <input
          name="name"
          required
          placeholder="Shirts"
          className="w-full h-12 px-4 rounded-lg bg-slate-950 border border-slate-800"
        />
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-lg">
        Create Category
      </button>
    </form>
  );
}
