import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const gameStateId =
    event.gameStateId ?? event.queryStringParameters?.gameStateId;

  if (gameStateId === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing required parameter: gameStateId",
      }),
    };
  }

  const params = {
    TableName: "GameStates",
    Key: {
      GameStateId: Number(gameStateId),
    },
  };

  try {
    const response = await docClient.send(new GetCommand(params));

    if (!response.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Game state with ID ${gameStateId} not found.`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
        data: response.Item,
      }),
    };
  } catch (error) {
    console.error("DynamoDB Fetch Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not retrieve record from the database.",
      }),
    };
  }
};
