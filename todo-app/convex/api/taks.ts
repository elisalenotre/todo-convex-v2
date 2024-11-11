import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const getAllTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const addTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      text: args.text,
      status: "todo",
      createdAt: Date.now(),
    });
  },
});

export const updateTaskStatus = mutation({
  args: { taskId: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const taskId = ctx.db.normalizeId("tasks", args.taskId);
    if (taskId) {
      await ctx.db.patch(taskId, { status: args.status });
    } else {
      throw new Error("Invalid taskId");
    }
  },
});

export const deleteTask = mutation({
  args: { taskId: v.string() },
  handler: async (ctx, args) => {
    const taskId = ctx.db.normalizeId("tasks", args.taskId);
    if (taskId) {
      await ctx.db.delete(taskId);
    } else {
      throw new Error("Invalid taskId");
    }
  },
});
