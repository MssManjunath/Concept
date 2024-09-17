import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    content: v.string(),
    html_content: v.string(),
    title : v.string(),
    user_id : v.id("user")
  }),
  blogs: defineTable({
    content: v.string(),
    html_content: v.string(),
    title : v.string(),
    user_id : v.id("user")
  }),
});
