INSERT INTO usuarios (id, usuario, clave, estado, nombre, apellido, correo, rol, creado, actualizado)
VALUES (4, 'admin', '$2a$10$64Mnsq0LSKSbPnzVcAHEKukWokkzk8JvwMk7xIL9Cn9dV6AmoRAg.', true, null, null, 'admin@admin.com', 'usuario', '2024-09-30 01:35:16.592739', null)
ON CONFLICT (id) DO NOTHING;
