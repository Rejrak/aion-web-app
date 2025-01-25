const BASE_URL: string ="http://localhost:9090/api";
const API_VERSION: string = "/v1";

export const getMovies = async () => {
    const response = await fetch(`${BASE_URL}+${API_VERSION}/users`);
    const data: Promise<Array<Object>> = response.json();
    return data;
}