import { APIGatewayProxyHandler } from "aws-lambda";
import { CharacterInterface } from '../domain/character.interface';
import { SwapiService } from "../application/swapiService";

const swapiService = new SwapiService();

export const saveSwapi: APIGatewayProxyHandler = async (event) => {
  try {
      if (!event.body) {
          throw new Error('No se encontraron datos en el cuerpo de la solicitud');
      }
      const response = await swapiService.saveSwapi(JSON.parse(event.body) as CharacterInterface) as number
      const message = response > 0 ? 'Elemento creado correctamente' : 'Error al crear el elemento';
      return {
          statusCode: 200,
          body: JSON.stringify(message, null, 2)
      };
  } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: error })
      };
  }
};
export const getSwapi: APIGatewayProxyHandler = async () => {
  try {
      const response = await swapiService.getSwapi()
      return {
          statusCode: 200,
          body: JSON.stringify(response, null, 2)
      };
  } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: error })
      };
  }
};