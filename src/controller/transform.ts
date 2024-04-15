import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { SwapiService } from "../application/swapi_service";

const swapiService = new SwapiService();

export const getCharacter: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  
  const characterId = parseInt(event.pathParameters?.id || '');

  if (!characterId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta el ID del personaje' }) };
  }
  try {
    const character = await swapiService.getCharacter(characterId);
    return {
      statusCode: 200,
      body: JSON.stringify(character),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch character data' }),
    };
  }
};