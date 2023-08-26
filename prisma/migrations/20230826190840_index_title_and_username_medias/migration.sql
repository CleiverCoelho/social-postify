-- DropIndex
DROP INDEX "Media_title_username_key";

-- CreateIndex
CREATE INDEX "Media_title_username_idx" ON "Media"("title", "username");
