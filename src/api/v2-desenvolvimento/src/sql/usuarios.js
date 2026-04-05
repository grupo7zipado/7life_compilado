const usuariosSql = {
    SelectDataId: `
    SELECT 
        usuarios.usu_id
       ,usuarios.usu_nome
       ,usuariosA.usu_email
       ,usuarios.usu_nascimento
       ,usuariosA.usu_tipo
       ,usuariosA.usu_status + 0 AS usu_status
    FROM usuarios 
    INNER JOIN usuariosA 
    ON usuarios.usu_id = usuariosA.usu_id 
    WHERE usuarios.usu_id = ?;
    `
    ,SelectData:`
    SELECT 
        usuarios.usu_id
       ,usuarios.usu_nome
       ,usuariosA.usu_email
       ,usuarios.usu_nascimento
       ,usuariosA.usu_tipo
       ,usuariosA.usu_status + 0 AS usu_status
    FROM usuarios 
    INNER JOIN usuariosA 
    ON usuarios.usu_id = usuariosA.usu_id;
    `
    ,InsertUsuarios:`
        CALL proc_criar_usuario( ?, ?, ?, ?, ? );
    `

}

export default usuariosSql