import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_lambda as lambda, aws_iam as iam , aws_logs as logs} from "aws-cdk-lib";

export class TestCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    new lambda.Function(this, "HelloWorldFunc", {
      code: lambda.Code.fromAsset("HelloWorldFunction"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(5),
      memorySize: 1024,
      environment: {
        CRAZY_MESSAGE: "Dogs can fly!!",
      },
      logRetention: logs.RetentionDays.ONE_DAY,
    })
  }
}
