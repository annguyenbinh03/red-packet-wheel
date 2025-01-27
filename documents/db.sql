USE lucky_draw;

INSERT INTO role (name, description) VALUES
('USER', 'user description'),
('ADMIN', "admin description");

INSERT INTO permission (name, description) VALUES
('CREATE_FISH', 'create fish permission'),
('GET_USERS', 'get all user permission');

INSERT INTO role_permission (role_name, permission_name) VALUES
('ADMIN', 'CREATE_FISH');

INSERT INTO user (id, username, password, full_name, is_submit, is_received, is_deleted) VALUES
('19440096-1359-4971-83a5-e3df82d699f3', 'admin','$2b$10$ABEROdTJf2asJT8BUvO43uJ6h49vqPHWsN8j5mqKTP0fYi4h7dF6m', 'Admin name', false ,false, false); #admin123

INSERT INTO user_role (role_name, user_id) VALUES
('ADMIN', '19440096-1359-4971-83a5-e3df82d699f3');

