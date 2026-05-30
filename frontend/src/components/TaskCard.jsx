import { Check, Trash2, Pencil, Clock, AlertCircle } from "lucide-react";

const priorityConfig = {
  low: { label: "Low", className: "bg-emerald-50 text-emerald-700" },
  medium: { label: "Medium", className: "bg-amber-50 text-amber-700" },
  high: { label: "High", className: "bg-red-50 text-red-700" },
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date() && !isNaN(new Date(date));
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const overdue = isOverdue(task.dueDate) && !task.completed;

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
        task.completed
          ? "border-slate-100 opacity-70"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(task._id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? "bg-indigo-600 border-indigo-600"
                : "border-slate-300 hover:border-indigo-400"
            }`}
          >
            {task.completed && (
              <Check size={11} strokeWidth={3} className="text-white" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-sm leading-snug ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-800"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${priority.className}`}
              >
                {priority.label}
              </span>

              {task.dueDate && (
                <span
                  className={`flex items-center gap-1 text-xs ${
                    overdue ? "text-red-500" : "text-slate-400"
                  }`}
                >
                  {overdue ? (
                    <AlertCircle size={11} />
                  ) : (
                    <Clock size={11} />
                  )}
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;