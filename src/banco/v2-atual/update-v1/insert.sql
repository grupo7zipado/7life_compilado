INSERT INTO usuariosA (
    usu_id
   ,usu_email
   ,usu_password
)
SELECT 
    u.usu_id
   ,COALESCE(ua.usu_email, CONCAT("teste", u.usu_id, "@teste.com")) AS usu_email
   ,u.usu_id AS usu_password
FROM usuarios u
LEFT JOIN usuariosA ua 
    ON ua.usu_id = u.usu_id
WHERE ua.usu_id IS NULL;