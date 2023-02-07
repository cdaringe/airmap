CREATE ROLE pca_read_only_role;
GRANT CONNECT ON DATABASE pca TO pca_read_only_role;
GRANT USAGE ON SCHEMA public TO pca_read_only_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO pca_read_only_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO pca_read_only_role;
CREATE USER pca_reader WITH PASSWORD 'secret_so_sorry';
GRANT pca_read_only_role to pca_reader;
