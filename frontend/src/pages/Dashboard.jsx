import { useState, useEffect, useCallback } from "react";
import { Plus, Search, X } from "lucide-react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const FILTERS = ["all", "pending", "completed"];
const PRIORITIES = ["all", "low", "medium", "high"];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("all");

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (priority !== "all") params.priority = priority;
      if (filter === "completed") params.completed = true;
      if (filter === "pending") params.completed = false;
      const { data } = await api.get("/tasks", { params });
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [search, filter, priority]);

  useEffect(() => {
    const timeout = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timeout);
  }, [fetchTasks]);

  const handleCreate = async (form) => {
    setFormLoading(true);
    try {
      const { data } = await api.post("/tasks", form);
      setTasks((prev) => [data, ...prev]);
      setShowForm(false);
      toast.success("Task created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    setFormLoading(true);
    try {
      const { data } = await api.put(`/tasks/${editTask._id}`, form);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      setEditTask(null);
      toast.success("Task updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/toggle`);
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-slate-700" },
            { label: "Pending", value: stats.pending, color: "text-amber-600" },
            { label: "Done", value: stats.completed, color: "text-emerald-600" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm"
            >
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition"
            />
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditTask(null);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-1 gap-1">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                  priority === p
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Form Modal */}
        {(showForm || editTask) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-800">
                  {editTask ? "Edit Task" : "New Task"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditTask(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  <X size={18} />
                </button>
              </div>
              <TaskForm
                initial={editTask || {}}
                onSubmit={editTask ? handleUpdate : handleCreate}
                onCancel={() => {
                  setShowForm(false);
                  setEditTask(null);
                }}
                loading={formLoading}
              />
            </div>
          </div>
        )}

        {/* Task List */}
        {loading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-white rounded-xl border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-medium text-slate-700">No tasks found</h3>
            <p className="text-slate-400 text-sm mt-1">
              {search
                ? "Try a different search"
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onEdit={(t) => {
                  setEditTask(t);
                  setShowForm(false);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;