import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_lambda as lambda,
  aws_logs as logs,
  aws_events as events,
  aws_events_targets as targets,
} from "aws-cdk-lib";

export class TestCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const helloWorldLambda = new lambda.Function(this, "HelloWorldFunc", {
      code: lambda.Code.fromAsset("HelloWorldFunction"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(5),
      memorySize: 1024,
      environment: {
        CRAZY_MESSAGE: "Dogs can fly!!",
      },
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    const eventRule = new events.Rule(this, "scheduleRule", {
      schedule: events.Schedule.cron({ minute: "0/1" }),
    });

    eventRule.addTarget(new targets.LambdaFunction(helloWorldLambda));
  }
}
