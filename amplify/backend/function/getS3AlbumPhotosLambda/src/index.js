const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

// Set the AWS Region.
const REGION = "us-west-2";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
const BUCKET = "luffysfightclub";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const body = JSON.parse(event.body);

    const bucketParams = {
        Bucket: BUCKET,
        Prefix: body.album
    };

    let data;
    try {
        data = await s3Client.send(new ListObjectsV2Command(bucketParams));
        data = data.Contents.slice(1).reverse().map(({ Key }) => ({ path: Key }));
    } catch (err) {
        console.log("Error", err);
        return { statusCode: 500 }
    }

    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(data)
    };
};
