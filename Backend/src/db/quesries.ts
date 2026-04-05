import { db } from "./indext";
import { eq } from "drizzle-orm";
import { users,products,comment,type NewComment,type NewUser,type NewProduct } from "./schema";
import e from "express";

export const createUser = async (data:NewUser)=>{

    const [user]= await db.insert(users).values(data).returning();
    return user
}
export const getUsersById = async (id:string)=>{
    
    return db.query.users.findFirst({where: eq(users.id,id)})
}
export const createProduct = async (data:NewProduct)=>{
    const [product]= await db.insert(products).values(data).returning();
    return product
}
export const createComment = async (data:NewComment)=>{
    const [comments]= await db.insert(comment).values(data).returning();
    return comments
}
export const updateUser = async (id:string,data:Partial<NewUser>)=>{
    const existingUser = await getUsersById(id);
    if(!existingUser) {
         throw new Error('User not found');
    };
    const [user]= await db.update(users).set(data).where(eq(users.id,id)).returning()
    return user;
}
export const upsertUser = async (data:NewUser) =>{
    const existingUSer = await getUsersById(data.id);
    if(existingUSer) return updateUser(data.id,data);

    return createUser(data)
}
export const getAllProducts =  async ()=>{
    return db.query.products.findMany({with: {
        user:true
    },
     orderBy: (products, {desc})=>[
        desc(products.createdAt)
    ]})      
}

export const getProductById = async (id:string)=>{
    return db.query.products.findFirst({where: eq(products.id,id),with: {
        user:true,
        comment:{
                with:{user:true },
                orderBy: (comment, {desc})=>[                    desc(comment.createdAt)
                ]
        }
    }})
}

export const getProductsByUserId = async (userId:string)=>{
    return db.query.products.findMany({where: eq(products.userId,userId),with: {
        user:true
    }, orderBy: (products, {desc})=>[        desc(products.createdAt)
    ]})      
}
export const updateProduct = async (id:string,data:Partial<NewProduct>)=>{
    const existingProduct = await getProductById(id);
    if(!existingProduct) {
         throw new Error('Product not found');
    }
    const [product]= await db.update(products).set(data).where(eq(products.id,id)).returning()
    return product;
}   
export const deleteProduct = async (id:string)=>{
    const existingProduct = await getProductById(id);
    if(!existingProduct) {
         throw new Error('Product not found');
    }
    await db.delete(products).where(eq(products.id,id)).returning


}
export const deleteComment = async (id:string)=>{
    await db.delete(comment).where(eq(comment.id,id)).returning()
}   
export const updateComment = async (id:string,data:Partial<NewComment>)=>{
    const [comments]= await db.update(comment).set(data).where(eq(comment.id,id)).returning()
    return comments;
}
export const getCommentById = async (id:string)=>{
    return db.query.comment.findFirst({where: eq(comment.id,id),with: {
        user:true,
    }})
}