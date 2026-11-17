-- Add role/occupation column to reviews table
ALTER TABLE reviews 
ADD COLUMN customer_role TEXT;

-- Add a comment to describe the column
COMMENT ON COLUMN reviews.customer_role IS 'The role, position, or occupation of the reviewer (e.g., "Ayurveda Student", "BAMS Graduate")';
