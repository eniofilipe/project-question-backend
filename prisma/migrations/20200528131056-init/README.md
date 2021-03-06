# Migration `20200528131056-init`

This migration has been generated by Ênio Filipe at 5/28/2020, 1:10:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Avatar" ADD COLUMN "url" text   ;

ALTER TABLE "public"."User" DROP COLUMN "passwordHash",
ADD COLUMN "password" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200528131056-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,39 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Avatar {
+  id        Int      @default(autoincrement()) @id
+  path      String
+  url       String?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  User      User[]
+}
+
+model User {
+  id        Int        @default(autoincrement()) @id
+  createdAt DateTime?  @default(now())
+  updatedAt DateTime?  @updatedAt
+  email     String     @unique
+  name      String
+  password  String
+  image     Avatar?    @relation(fields: [avatarId], references: [id])
+  avatarId  Int?
+  Question  Question[]
+}
+
+model Question {
+  id        Int      @default(autoincrement()) @id
+  body      String
+  author    User     @relation(fields: [authorId], references: [id])
+  authorId  Int
+  reply     String?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```


