import pool from '../connect';

export const get = async () => {
    const sql = `SELECT c.*,
    GROUP_CONCAT(DISTINCT f.film_url) AS films,
    GROUP_CONCAT(DISTINCT v.vehicle_url) AS vehicles,
    GROUP_CONCAT(DISTINCT s.starship_url) AS starships,
    GROUP_CONCAT(DISTINCT sp.species_url) AS species
    FROM characters c
    LEFT JOIN films f ON c.id = f.character_id
    LEFT JOIN vehicles v ON c.id = v.character_id
    LEFT JOIN starships s ON c.id = s.character_id
    LEFT JOIN species sp ON c.id = sp.character_id
    GROUP BY c.id`;

    const connection = await pool.getConnection();
    const [results, fields] = await connection.query(sql);
    connection.release();
    return results;
};

export const save = async (tabla: any, object: any) => {
    const connection = await pool.getConnection();
    const [results, fields] = await connection.query(`INSERT INTO ${tabla} SET ?`, object);
    connection.release();
    // Verifico si results es un objeto y si tiene la propiedad insertId
    if (typeof results === 'object' && 'insertId' in results) {
        return results.insertId;
    } else {
        throw new Error('No se pudo obtener insertId');
    }
};
