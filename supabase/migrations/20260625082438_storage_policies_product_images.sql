/*
# Storage policies for product-images bucket

## Overview
Allows public read access and anon/authenticated upload to the
`product-images` storage bucket so the admin dashboard can upload
product images directly from the browser.

## Security
- SELECT (read): public — anyone can view product images (needed for storefront).
- INSERT (upload): anon + authenticated — admin dashboard uploads.
- UPDATE / DELETE: anon + authenticated — admin can replace/remove images.
*/

DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_upload_product_images" ON storage.objects;
CREATE POLICY "anon_upload_product_images" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_update_product_images" ON storage.objects;
CREATE POLICY "anon_update_product_images" ON storage.objects FOR UPDATE
  TO anon, authenticated USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "anon_delete_product_images" ON storage.objects;
CREATE POLICY "anon_delete_product_images" ON storage.objects FOR DELETE
  TO anon, authenticated USING (bucket_id = 'product-images');
