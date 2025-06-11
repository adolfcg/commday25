// Import the required CDK and S3 modules
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class DemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new Amazon S3 bucket
    const bucket = new s3.Bucket(this, 'DemoStackBucketCommday25', {
      bucketName: 'demo-stack-bucket-commday25',  
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}