import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import schema from "./schema";

export const create_notes = mutation({
  args: { title: v.string(), content: v.string(),html_content : v.string(), user_id : v.string()},
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("notes", {
        title: args.title,
        content: args.content,
        html_content: args.html_content,
        user_id : args.user_id
    });
    return newTaskId;
  },
});

export const get = query({
  handler: async ({ db }) => {
    return await db.query("notes").collect();
  },
});

export const fetch_document = query({
    args : {document_id : v.string()},
    handler: async (ctx, args) => {
      const document = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("_id"), args.document_id)).unique()
    return document;
    },
  })

export const update_notes = mutation({
    args : {
        id : v.id("notes"),
        fields : v.object(schema.tables.notes.validator.fields)
    },
    handler: async (ctx, args) => {
      const newTaskId = await ctx.db.patch(args.id,args.fields)
      return newTaskId;
    },
  });
  
