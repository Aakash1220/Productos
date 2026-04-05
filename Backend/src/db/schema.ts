import {  uuid,timestamp,pgTable,text } from "drizzle-orm/pg-core";
import { Relation, relations } from "drizzle-orm";

export const users = pgTable("users",{
    id:text('id').primaryKey(),
    email:text('email').notNull().unique(),
    name:text('name'),
    imageUrl:text('image_url'),
      createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()

})

export const products = pgTable("products",{
    id:uuid('id').defaultRandom().primaryKey(),
    title:text('title').notNull(),
    description:text('description').notNull(),
        imageUrl:text('image_url').notNull(),
        userId:text('user_id').notNull().references(()=> users.id,{onDelete:'cascade'}),
        createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow().$onUpdate(()=> new Date())

})

export const comment = pgTable('comment',{
     id:uuid('id').defaultRandom().primaryKey(),
    content:text('content').notNull(),
      userId:text('user_id').notNull().references(()=> users.id,{onDelete:'cascade'}),
            productId:text('product_id').notNull().references(()=> products.id,{onDelete:'cascade'}),

        createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
})


export  const userRelations =  relations(users,({many})=>({
    products:many(products),
    comment:many(comment)
}))
export  const productRelations =  relations(products,({many,one})=>({
    comment:many(products),
    user:one(users,{fields:[products.userId],references:[users.id]})
}))
export  const commentRelations =  relations(comment,({many,one})=>({
    products:one(products,{fields:[comment.productId],references:[products.id]}),
    user:one(users,{fields:[comment.userId],references:[users.id]})
}))

export type User = typeof users.$inferInsert;
export type NewUser = typeof users.$inferSelect

export type Product = typeof products.$inferInsert;
export type NewProduct = typeof products.$inferSelect

export type Comment = typeof comment.$inferInsert;
export type NewComment = typeof comment.$inferSelect