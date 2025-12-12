import {
    BedrockRuntimeClient,
    InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import * as dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

// Configure the AWS Bedrock client
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'eu-west-1',
    profile: process.env.AWS_PROFILE || 'default',
});

const modelIds = [
    'eu.anthropic.claude-sonnet-4-5-20250929-v1:0',
    'eu.anthropic.claude-haiku-4-5-20251001-v1:0',
];

const invokeClaude = async ({ modelId }: { modelId: string }) => {
    const prompt = `echo "Hello, world!" in a random language
    
    Show the following:
    
    # Language: <language>
    
    # Explanation:
    
    <explanation>`;

    const input = {
        modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            anthropic_version: 'bedrock-2023-05-31',
            max_tokens: 100,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    };

    try {
        console.log(`\nTesting model: ${modelId}`);
        const command = new InvokeModelCommand(input);
        const response = await client.send(command);

        // The response.body is a ReadableStream, so we need to read it
        const responseBody = new TextDecoder().decode(
            await new Response(response.body).arrayBuffer()
        );
        const result = JSON.parse(responseBody);
        console.log(`✓ Model accessible: ${modelId}`);
        console.log(
            `Response: 
-------------------------------------------------------------
${result.content?.[0]?.text || JSON.stringify(result)}`
        );
    } catch (err) {
        console.error(`✗ Error invoking model ${modelId}:`, err);
    }
};

for (const modelId of modelIds) await invokeClaude({ modelId });
