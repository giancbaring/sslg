-- Cloudflare D1 Schema for SSLG Governance Portal
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  is_verified BOOLEAN NOT NULL DEFAULT 0
);

-- Seed a default admin user for initial login
-- IMPORTANT: The password 'adminpassword' must be hashed using a separate script before insertion.
-- This is a placeholder for the hashed password.
INSERT INTO Users (username, password_hash, role, is_verified) VALUES ('admin', 'hashed_admin_password_placeholder', 'admin', 1);
