import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, ShellStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { SecretValue } from 'aws-cdk-lib';
import { LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';
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
          'cd demo',
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
        primaryOutputDirectory: 'demo/cdk.out',  
      }),
      // This will ensure Node.js 18/20 compatibility for all CodeBuild projects
      codeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.STANDARD_7_0,
        },
      },
    });

    pipeline.addStage(new DemoStage(this, 'DeployStage', {
       env: { account: '757611644377', region: 'us-east-1' }
    }));
  }
}