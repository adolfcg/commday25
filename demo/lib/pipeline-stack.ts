import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, ShellStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { SecretValue } from 'aws-cdk-lib';
import { DemoStage } from './demo-stage';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'DemoAppPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('adolfcg/commday25', 'main', {
          authentication: SecretValue.secretsManager('github-token'),
        }),
        commands: [
          'cd demo',   // Navigate to the demo directory
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: 'demo/cdk.out',  
      }),
    });

    pipeline.addStage(new DemoStage(this, 'DeployStage', {
       env: { account: '757611644377', region: 'us-east-1' }
    }));
  }
}


