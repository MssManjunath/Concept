import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const sign_up = mutation({
  args: { username: v.string(), email: v.string(), hashed_password: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("user", {
      username: args.username,
      email: args.email,
      hashed_password: args.hashed_password,
    });
    return newTaskId;
  },
});


export const user_fetch_by_email = query({
  args : {email : v.string()},
  handler: async (ctx, args) => {
    const tasks = await ctx.db
    .query("user")  
    .filter((q) => q.eq(q.field("email"), args.email)).unique()
  return tasks;
  },
})