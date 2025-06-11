import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DemoStack } from './demo-stack';

export class DemoStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new DemoStack(this, 'DemoStack', {
      env: props?.env,
    });
  }
}