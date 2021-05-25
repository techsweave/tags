import type { AWS } from '@serverless/typescript';

import {
    scanTag,
    getTag,
    createTag,
    updateTag,
    deleteTag
} from '@functions/index';

const serverlessConfiguration: AWS = {
    service: 'tags-service',

    frameworkVersion: '2',

    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: 'dev',
        region: 'eu-central-1',
        lambdaHashingVersion: '20201221',

        apiGateway: {
            shouldStartNameWithService: true,
            minimumCompressionSize: 1024,
        },

        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            REGION: '${self:provider.region}',
            STAGE: '${self:provider.stage}',
            STRIPE_SECRET_KEY: '${self:custom.stripeSecretKey}',
            COGNITO_ARN: '${self:custom.cognitoArn}',
            TAGS_TABLE: '${self:custom.tagsTable}',
            USER_POOL_ID: '${self:custom.cognitoPoolID}'
        },

        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: [
                            'dynamodb:*',
                        ],
                        Resource: ['*']
                    }
                ]
            }
        }
    },

    custom: {
        region: '${opt:region, self:provider.region}',
        stage: '${opt:stage, self:provider.stage}',
        tagsTable: 'TbTags',
        stripeSecretKey: 'sk_test_51Ij41SF20K2KHUILxXq9l5A2CbPS6VtYNmH4Ij0PPZyxatNDMTyovfiFjdYtOaQvbrDCokLPhorse1BxVPNXt1jW0032wODV69',
        cognitoPoolID: 'eu-central-1_eciEUvwzp',
        cognitoArn: 'arn:aws:cognito-idp:eu-central-1:780844780884:userpool/eu-central-1_eciEUvwzp',
        dynamodb: {
            stages: ['dev'],
            start: {
                port: 8008,
                inMemory: true,
                migrate: true,
                seed: true,
                convertEmptyValues: true,
                // Uncomment only if you already have a DynamoDB running locally
                // noStart: true
            },
            migration: {
                dir: 'offline/migrations',
            },
            // customDomain: {
            //     domainName: 'api.techSWEave.shop',
            //     basePath: '${self:provider.stage}',
            //     stage: '${self:provider.stage}',
            //     createRoute53Record: true,
            // }
        },
        webpack: {
            includeModules: true,
        }
    },

    plugins: [
        'serverless-webpack',
        'serverless-offline',
        'serverless-dynamodb-local',
    ],

    package: {
        individually: true,
    },

    // import the function via paths
    functions: {
        scanTag,
        getTag,
        createTag,
        updateTag,
        deleteTag
    },
};

module.exports = serverlessConfiguration;