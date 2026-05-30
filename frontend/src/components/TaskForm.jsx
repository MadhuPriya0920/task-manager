import { useState } from "react";
import { X } from "lucide-react";

const priorities = ["low", "medium", "high"];

const TaskForm = ({ initial = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    priority: initial.priority || "medium",
    dueDate: initial.dueDate
      ? new Date(initial.dueDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const priorityColors = {
    low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Add a description (optional)"
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Priority
          </label>
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border capitalize transition ${
                  form.priority === p
                    ? priorityColors[p]
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-60"
        >
          {loading ? "Saving..." : initial._id ? "Update Task" : "Create Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition"
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;