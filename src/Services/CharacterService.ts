
class CharacterService {
    public async getCharacters(): Promise<any> {
        try {
            const responce = await fetch('https://rickandmortyapi.com/api/character/')
            return await responce.json();
        }
        catch (error) {
            console.log(`Request for fetching characters is failed. ${error.message}`);
        }
    }

    public async getCharactersFromUrl(url: string | undefined): Promise<any> {
        try {
            const responce = await fetch(url ? url : "https://rickandmortyapi.com/api/character/")
            return await responce.json();
        }
        catch (error) {
            console.log(`Request for fetching characters is failed. ${error.message}`);
        }
    }
}

export default new CharacterService();