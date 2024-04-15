import { CharacterInterface } from '../domain/character.interface';
import { SwapiClient } from '../infrastructure/swapi_client';
import { save, get } from '../conecction/method/sql'
export class SwapiService {

  private swapiClient: SwapiClient;

  constructor() {
    this.swapiClient = new SwapiClient();
  }

  async getCharacter(id: number): Promise<Character> {
    const characterData = await this.swapiClient.getCharacter(id);
    const data = this.translateKeysToSpanish(characterData);
    return data;
  }

  translateKeysToSpanish = (character: Character): { [key: string]: any } => {
    const translations: { [key: string]: string } = {
      name: "nombre",
      height: "altura",
      mass: "masa",
      hair_color: "color_del_cabello",
      skin_color: "color_de_piel",
      eye_color: "color_de_ojos",
      birth_year: "fecha_nacimiento",
      gender: "genero",
      homeworld: "planeta_natal",
      films: "peliculas",
      species: "especies",
      vehicles: "vehiculos",
      starships: "naves_espaciales",
      created: "creado",
      edited: "editado",
      url: "url"
    };
    const translatedCharacter: { [key: string]: any } = {};

    for (const key in character) {
      if (Object.prototype.hasOwnProperty.call(character, key)) { // Verifico si la propiedad key está presente en el objeto character
        const translatedKey = translations[key] || key; // agrego la traduccion del key si existe en el objeto translations, caso contrario agrego la misma key
        translatedCharacter[translatedKey] = character[key]; // asigno los valores al nuevo key sea esapañol o ingles.
      }
    }
    return translatedCharacter;
  };

  async saveSwapi(body: CharacterInterface): Promise<any> {
    const characters = {
      name: body.nombre,
      height: body.altura,
      mass: body.masa,
      hair_color: body.color_del_cabello,
      skin_color: body.color_de_piel,
      eye_color: body.color_de_ojos,
      birth_year: body.fecha_nacimiento,
      gender: body.genero,
      homeworld: body.planeta_natal,
      created: new Date(body.creado).toISOString().slice(0, 19).replace('T', ' '),
      edited: new Date(body.editado).toISOString().slice(0, 19).replace('T', ' '),
      url: body.url
    }
    const lastId = await save('characters', characters) as number
    if (lastId > 0) {

      body?.peliculas.forEach(async url => {
        const peliculas = {
          character_id: lastId,
          film_url: url,
        }
        await save('films', peliculas)
      })
      body?.vehiculos.forEach(async url => {
        const vehiculo = {
          character_id: lastId,
          vehicle_url: url,
        }
        await save('vehicles', vehiculo)
      })
      body?.naves_espaciales.forEach(async url => {
        const naves = {
          character_id: lastId,
          starship_url: url,
        }
        await save('starships', naves)
      })
      body?.especies.forEach(async url => {
        const naves = {
          character_id: lastId,
          species_url: url,
        }
        await save('species', naves)
      })
    } else {
      console.log("Error al crear")
    }
    return lastId;
  }
  async getSwapi(): Promise<any> {
    const lista = await get() as any
    if (lista && lista.length > 0) {
      const characters: CharacterInterface[] = lista.map((row: any) => ({
        id: row.id,
        nombre: row.name,
        altura: row.height,
        masa: row.mass,
        color_del_cabello: row.hair_color,
        color_de_piel: row.skin_color,
        color_de_ojos: row.eye_color,
        fecha_nacimiento: row.birth_year,
        genero: row.gender,
        planeta_natal: row.homeworld,
        creado: row.created,
        editado: row.edited,
        url: row.url,
        peliculas: row?.films?.split(',') || [],
        especies: row?.species?.split(',') || [],
        vehiculos: row?.vehicles?.split(',') || [],
        naves_espaciales: row?.starships?.split(',') || []
      }));
      return characters
    }
  }
}