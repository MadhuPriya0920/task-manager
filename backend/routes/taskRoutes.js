const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleComplete);

module.exports = router;