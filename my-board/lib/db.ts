import mysql from 'mysql2/promise'
import {QueryResult} from "mysql2";



const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,  // MariaDB 유저명
    password: process.env.DB_PASSWORD,  // MariaDB 비밀번호
    database: process.env.DB_DATABASE,
    port : process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3307,
    connectionLimit: 5,
    idleTimeout: 20 // 20초 동안 비활성 상태로 유지되면 연결 해제
});


export async function query<T extends QueryResult>(query:string, params:any[]=[]) {
    const formattedQuery = mysql.format(query, params);
    console.log('실행한쿼리:', formattedQuery);

        const [rows, fields] = await pool.execute<T>(query,params);
        return rows;
}


