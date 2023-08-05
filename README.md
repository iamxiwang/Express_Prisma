# Express_Prisma
![Cover](https://github.com/iamxiwang/Express_Prisma/assets/104051053/d40ddeb4-9f06-445e-8e2a-61c7e36639b0)
#Prisma one to many relation

```javascript
model Joke {
  id Int @id @default(autoincrement())
  title String 
  content String @unique 
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  author User?  @relation(fields: [authorId], references: [id])
  authorId Int?
}
```
