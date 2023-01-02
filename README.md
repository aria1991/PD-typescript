# PD-typescript
Making a Patient Dashboard in Typescript (both Frontend & Backend) & deploying it on Ethereum network on AWS.

```markdown
                                                                                                    +---------------+
                                                                                                    |               |
                                                                                                    |  Ethereum     |
                                                                                                    |  Network      |
                                                                                                    |               |
                                                                                                    +---------------+
                                                                                                            |
                                                                                                            |
                                                 +-------------------------------------------------------+
                                                 |                                                       |
                                                 |                                                       |
                                                 |                                                       |
                                                 |                                                       |
                                                 |                                                       |
+---------------+                   +---------------+                   +---------------+                 |
|               |                   |               |                   |               |                 |
|  Frontend     |                   |  Backend      |                   |  AWS          |                 |
|  TypeScript   |                   |  TypeScript   |                   |               |                 |
|               |                   |               |                   |               |                 |
+---------------+                   +---------------+                   +---------------+                 |
  |                                     |                                     |                           |
  |                                     |                                     |                           |
  |  1. Display heart rate              |  1. Retrieve data from Ethereum      |  1. Deploy smart contract  |
  |  2. Display respiration rate        |  2. Process data                     |  2. Host website           |
  |  3. Display blood oxygen saturation |  3. Return processed data to frontend |                           |
  |  4. Display temperature             |                                      |                           |
  |  5. Display list of check-ups       |                                      |                           |
  |  6. Display blood analysis          |                                      |                           |
  |                                     |                                      |                           |
  +-------------------------------------+--------------------------------------+---------------------------+

```

<!--more-->

**Step 1:** Set up the TypeScript and React project

```javascript
# Create a new TypeScript and React project
npx create-react-app my-dashboard --template typescript

# Change into the project directory
cd my-dashboard

# Install additional dependencies
npm install @material-ui/core @material-ui/icons axios

```

<!--more-->

> This sets up a new TypeScript and React project using the `create-react-app tool`, and installs the additional dependencies that we will use in the project (@`material-ui/core` and @`material-ui/icons` for styling and layout, and `axios` for making HTTP requests).This sets up a new TypeScript and React project using the `create-react-app tool`, and installs the additional dependencies that we will use in the project (@`material-ui/core` and @`material-ui/icons` for styling and layout, and `axios` for making HTTP requests).


<!--more-->
**Step 2:** Define the patient data model
```javascript
export interface PatientData {
  heartRate: number;
  respirationRate: number;
  bloodOxygenSaturation: number;
  temperature: number;
  checkUps: CheckUp[];
  bloodAnalyses: BloodAnalysis[];
}

export interface CheckUp {
  date: Date;
  notes: string;
}

export interface BloodAnalysis {
  date: Date;
  results: { [name: string]: number };
}

```

<!--more-->

> This defines the `PatientData` model, which contains the heart rate, respiration rate, blood oxygen saturation, temperature, and lists of `check-ups` and blood analyses for a patient. It also defines the CheckUp and BloodAnalysis models, which contain the date and additional details for each check-up and blood analysis.This defines the `PatientData` model, which contains the heart rate, respiration rate, blood oxygen saturation, temperature, and lists of `check-ups` and blood analyses for a patient. It also defines the `CheckUp` and `BloodAnalysis` models, which contain the date and additional details for each check-up and blood analysis.

<!--more-->

**Part 3:** Create a service for loading patient data

```javascript
import axios from "axios";
import { PatientData } from "./patient-data";

const API_URL = "http://localhost:3000/api/patient";

export async function

```

<!--more-->

**Step 4**: Create a component for displaying the vital signs
```javascript
import React from "react";
import { PatientData } from "./patient-data";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "50%",
      margin: theme.spacing(2),
    },
    vitalSigns: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
  })
);

interface Props {
  data: PatientData;
}

export function VitalSigns(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Vital Signs
        </Typography>
        <div className={classes.vitalSigns}>
          <Typography variant="body1">Heart rate: {props.data.heartRate} BPM</Typography>
          <Typography variant="body1">Respiration rate: {props.data.respirationRate} BPM</Typography>
          <Typography variant="body1">
            Blood oxygen saturation: {props.data.bloodOxygenSaturation}%
          </Typography>
          <Typography variant="body1">Temperature: {props.data.temperature}°C</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

```

<!--more-->

**Step 5:** Create a component for displaying the check-ups list

```javascript
import React from "react";
import { PatientData } from "./patient-data";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "50%",
      margin: theme.spacing(2),
    },
  })
);

interface Props {
  data: PatientData;
}

export function CheckUpsList(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Check-ups
        </Typography>
        <List>
          {props.data.checkUps.map((checkUp) => (
            <ListItem key={checkUp.date.toISOString()}>
              <ListItemText
                primary={checkUp.date.toLocaleDateString()}
                secondary={checkUp.notes}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

```

<!--more-->

**Part 6:** Create a component for displaying the blood analyses list
```javascript
import React from "react";
import { PatientData } from "./patient-data";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "50%",
      margin: theme.spacing(2),
    },
  })
);

interface Props {
  data: PatientData;
}

export function BloodAnalysesList(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Blood Analyses
        </Typography>
        <List>
          {props.data.bloodAnalyses.map((analysis) => (
            <ListItem key={analysis.date.toISO

```

**Step 7:** Create the main component and render it

```javascript
import React from "react";
import { PatientData } from "./patient-data";
import { VitalSigns } from "./vital-signs";
import { CheckUpsList } from "./check-ups-list";
import { BloodAnalysesList } from "./blood-analyses-list";
import { getPatientData } from "./patient-data-service";

interface State {
  data: PatientData | null;
  error: string | null;
}

export class Dashboard extends React.Component<{}, State> {
  state: State = {
    data: null,
    error: null,
  };

  componentDidMount() {
    getPatientData().then(
      (data) => this.setState({ data }),
      (error) => this.setState({ error: error.message })
    );
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }

    if (!this.state.data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <VitalSigns data={this.state.data} />
        <CheckUpsList data={this.state.data} />
        <BloodAnalysesList data={this.state.data} />
      </div>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("root"));

```

<!--more-->

> This creates the main `Dashboard` component, which uses the `getPatientData` function to load the patient data from the backend API, and then renders the `VitalSigns`, `CheckUpsList`, and `BloodAnalysesList` components with the data. It also displays an error message or a loading message if the data is not yet available. Finally, it renders the `Dashboard` component to the` root` element of the HTML page.This creates the main `Dashboard` component, which uses the `getPatientData` function to load the patient data from the backend API, and then renders the `VitalSigns`, `CheckUpsList`, and `BloodAnalysesList` components with the data. It also displays an error message or a loading message if the data is not yet available. Finally, it renders the `Dashboard` component to the` root` element of the HTML page.

<!--more-->

```python
import boto3

# Create an RDS client
rds = boto3.client('rds')

# Set the parameters for the database
engine = 'mysql'
db_instance_identifier = 'mydb'
master_username = 'admin'
master_password = 'mypassword'
db_name = 'patient_data'

# Create the database instance
rds.create_db_instance(
    DBInstanceIdentifier=db_instance_identifier,
    MasterUsername=master_username,
    MasterUserPassword=master_password,
    AllocatedStorage=20,
    DBInstanceClass='db.t2.micro',
    Engine=engine,
    VpcSecurityGroupIds=['sg-12345678'],
    AvailabilityZone='us-west-2a',
    DBSubnetGroupName='mydbsubnetgroup'
)

# Wait for the database to become available
waiter = rds.get_waiter('db_instance_available')
waiter.wait(DBInstanceIdentifier=db_instance_identifier)

# Create a connection to the database
rds_conn = rds.connect(
    db_instance_identifier=db_instance_identifier,
    master_username=master_username,
    master_password=master_password,
    database=db_name
)

# Create the patient data table
rds_conn.execute(
    '''
    CREATE TABLE patient_data (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        medical_history TEXT,
        PRIMARY KEY (id)
    )
    '''
)

# Create the checkups table
rds_conn.execute(
    '''
    CREATE TABLE checkups (
        id INT NOT NULL AUTO_INCREMENT,
        patient_id INT NOT NULL,
        checkup_date DATE NOT NULL,
        height DECIMAL(5, 2),
        weight DECIMAL(5, 2),
        blood_pressure VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (patient_id) REFERENCES patient_data(id)
    )
    '''
)

# Create the blood analyses table
rds_conn.execute(
    '''
    CREATE TABLE blood_analyses (
        id INT NOT NULL AUTO_INCREMENT,
        patient_id INT NOT NULL,
        analysis_date DATE NOT NULL,
        hemoglobin DECIMAL(5, 2),
        white_blood_cells DECIMAL(5, 2),
        platelets DECIMAL(5, 2),
        PRIMARY KEY (id),
        FOREIGN KEY (patient_id) REFERENCES patient_data(id)
    )
    '''
)

# Create the vital signs table
rds_conn.execute(
    '''
    CREATE TABLE vital_signs (
        id INT NOT NULL AUTO_INCREMENT,
        patient_id
    id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    measurement_time DATETIME NOT NULL,
    heart_rate INT,
    blood_oxygen_saturation INT,
    temperature DECIMAL(5, 2),
    respiration_rate INT,
    PRIMARY KEY (id),
    FOREIGN KEY (patient_id) REFERENCES patient_data(id)
)

```

This table has columns for the patient's ID, the date the vital signs were taken, the patient's heart rate, blood oxygen saturation, temperature, and respiration rate. The `FOREIGN KEY` constraint specifies that the `patient_id` column references the `id` column in the `patient_data` table, which means that each row in the `vital_signs` table must have a corresponding row in the `patient_data` table.

<!--more-->
After creating the tables, you can use SQL INSERT statements to add data to the tables. For instance:

<!--more-->
### Database: 

```python
# Insert a row into the patient_data table
rds_conn.execute(
    '''
    INSERT INTO patient_data (name, address, medical_history)
    VALUES (%s, %s, %s)
    ''',
    ('John Smith', '123 Main St', 'Allergies: Penicillin')
)

# Insert a row into the checkups table
rds_conn.execute(
    '''
    INSERT INTO checkups (patient_id, checkup_date, height, weight, blood_pressure)
    VALUES (%s, %s, %s, %s, %s)
    ''',
    (1, '2022-01-01', 72, 180, '120/80')
)

# Insert a row into the blood_analyses table
rds_conn.execute(
    '''
    INSERT INTO blood_analyses (patient_id, analysis_date, hemoglobin, white_blood_cells, platelets)
    VALUES (%s, %s, %s, %s, %s)
    ''',
    (1, '2022-01-01', 12.5, 7.5, 250)
)

# Insert a row into the vital_signs table
rds_conn.execute(
    '''
    INSERT INTO vital_signs (patient_id, date, heart_rate, blood_oxygen_saturation, temperature, respiration_rate)
    VALUES (%s, %s, %s, %s, %s, %s)
    ''',
    (1, '2022-01-01', 70, 95, 98.6, 20)
)


```
You can then use `SELECT` statements to retrieve data from the tables, and `UPDATE` and `DELETE` statements to modify and delete data as needed:
```python
# Select all rows from the patient_data table
result = rds_conn.execute('SELECT * FROM patient_data')
for row in result:
    print(row)

# Select the checkup data for a particular patient
result = rds_conn.execute(
    '''
    SELECT checkup_date, height, weight, blood_pressure
    FROM checkups
    WHERE patient_id = %s
    ''',
    (1,)
)
for row in result:

```

#### Dockerfile:

You will need to create a Dockerfile that defines the steps for building the image. Here is an example Dockerfile for the backend code `pd.js`:
```yaml
# Start from the latest Node.js image
FROM node:latest

# Create a working directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the app's port
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]

```

<!--more-->

To build the Docker image, you can use the `docker build` command, specifying the path to the `Dockerfile` and the desired name and tag for the image:

```yaml
docker build -t my-backend:latest .

```
> This will build the Docker image and save it with the name `my-backend` and the tag latest.

You can then run the image as a container using the `docker run` command:

```yaml
docker run -p 3000:3000 -d my-backend:latest

```
> This will start the container and expose the app's port (3000) on the host machine. The `-d `flag runs the container in detached mode, allowing it to run in the background.

> You can also use a container orchestration tool like Docker Compose to manage the container, along with other containers for the frontend and any other dependencies.

### Ethereum on AWS

<!--more-->

#### Here is a sample of the script that deploys the backend of your patient dashboard application on the Ethereum blockchain using AWS:
```yaml
# Install the necessary dependencies
npm install --save truffle-hdwallet-provider web3

# Set up the truffle-config.js file with the necessary configuration
echo "module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    aws: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        'https://mainnet.infura.io/v3/' + process.env.INFURA_API_KEY
      ),
      network_id: 1,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: './contracts',
  contracts_build_directory: './build/contracts',
  compilers: {
    solc: {
      version: '0.6.12',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};" > truffle-config.js

# Set up the .env file with the necessary environment variables
echo "MNEMONIC=your mnemonic here
INFURA_API_KEY=your Infura API key here" > .env

# Compile and migrate the contract to the AWS network
truffle compile
truffle migrate --network aws

# Set up the AWS Elastic Beanstalk environment and application
aws elasticbeanstalk create-environment \
  --application-name "patient-dashboard-backend" \
  --environment-name "patient-dashboard-
  # Deploy the backend to the AWS Elastic Beanstalk environment
aws elasticbeanstalk create-application-version \
  --application-name "patient-dashboard-backend" \
  --version-label "$(date +%s)" \
  --source-bundle S3Bucket="patient-dashboard-backend-deployment",S3Key="backend.zip"
aws elasticbeanstalk update-environment \
  --environment-name "patient-dashboard-backend-production" \
  --version-label "$(date +%s)"

# Set up a script to build and deploy the backend on a regular basis
echo "
#!/bin/bash

# Build the backend
cd backend
npm install
zip -r backend.zip .

```
> This script installs the `truffle-hdwallet-provider` and `web3` libraries, which are necessary for connecting to the Ethereum blockchain and interacting with contracts. It then sets up the `truffle-config.js` file with the configuration for the AWS network, using the `truffle-hdwallet-provider` to connect to the Ethereum mainnet via Infura. Finally, it compiles and migrates the contract to the AWS network.

To deploy the backend, you will need to have a mnemonic for an Ethereum wallet and an API key for Infura, which you can obtain by creating an account on the Infura website. You will also need to have Truffle installed on your system.
<!--more-->


<!--more-->

```yaml
# Deploy the backend to the AWS Elastic Beanstalk environment
aws elasticbeanstalk create-application-version \
  --application-name "patient-dashboard-backend" \
  --version-label "$(date +%s)" \
  --source-bundle S3Bucket="patient-dashboard-backend-deployment",S3Key="backend.zip"
aws elasticbeanstalk update-environment \
  --environment-name "patient-dashboard-backend-production" \
  --version-label "$(date +%s)"

# Set up a script to build and deploy the backend on a regular basis
echo "
#!/bin/bash

# Build the backend
cd backend
npm install
zip -r backend.zip .

# Deploy the backend to AWS Elastic Beanstalk
aws s3 cp backend.zip s3://patient-dashboard-backend-deployment/backend.zip
aws elasticbeanstalk create-application-version \
  --application-name "patient-dashboard-backend" \
  --version-label "$(date +%s)" \
  --source-bundle S3Bucket="patient-dashboard-backend-deployment",S3Key="backend.zip"
aws elasticbeanstalk update-environment \
  --environment-name "patient-dashboard-backend-production" \
  --version-label "$(date +%s)"
" > deploy.sh
chmod +x deploy.sh

# Set up a cron job to run the deployment script every hour
(crontab -l ; echo "0 * * * * cd /path/to/project && ./deploy.sh") | crontab -

```

<!--more-->

> This script sets up an AWS Elastic Beanstalk environment and application for deploying the backend, and then deploys the backend to the environment. It also sets up a script for building and deploying the backend on a regular basis using a cron job, which will run the deployment script **every hour**.

To use this script, you will need to have the AWS CLI installed on your system and have your AWS credentials configured. You will also need to replace `/path/to/project` with the actual path to your project directory.

#### Monitoring and logging

To monitor the performance of your backend and debug any issues that may arise, you can set up monitoring and logging for your AWS Elastic Beanstalk environment. This can be done using AWS CloudWatch, which allows you to view metrics and logs for your application.

To set up monitoring and logging for your Elastic Beanstalk environment, you can use the following AWS CLI commands:

```yaml
# Enable detailed CloudWatch monitoring for the environment
aws elasticbeanstalk update-environment \
  --environment-name "patient-dashboard-backend-production" \
  --option-settings Namespace=aws:elasticbeanstalk:healthreporting:system,OptionName=ConfigDocument,Value='{"Version":1,"CloudWatchMetrics":{"Instance":{"CPUCreditBalance": {"Error":1.0,"Info":1.0,"Warn":1.0,"Success":1.0},"StatusCheckFailed": {"Error":1.0,"Info":1.0,"Warn":1.0,"Success":1.0}}}}'

# Enable logging to CloudWatch Logs for the environment
aws elasticbeanstalk update-environment \
  --environment-name "patient-dashboard-backend-production" \
  --option-settings Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true

```

<!--more-->

#### Auto scaling

To ensure that your backend can handle the workload and maintain good performance even during times of high traffic, you can set up auto scaling for your Elastic Beanstalk environment. This will allow the environment to automatically scale up or down the number of instances based on the workload.

To set up auto scaling for your Elastic Beanstalk environment, you can use the following AWS CLI commands:

```yaml
# Set up the scaling policy
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name "patient-dashboard-backend-asg" \
  --policy-name "patient-dashboard-backend-scale-up" \
  --policy-type "StepScaling" \
  --step-scaling-policy-configuration file

```

#### Load balancing

To distribute the workload among multiple instances and improve the availability and performance of your backend, you can set up a load balancer for your Elastic Beanstalk environment. This can be done using AWS Elastic Load Balancing (ELB).

To set up a load balancer for your Elastic Beanstalk environment, you can use the following AWS CLI commands:

```yaml
# Create the load balancer
aws elbv2 create-load-balancer \
  --name "patient-dashboard-backend-elb" \
  --type "application" \
  --subnets "subnet-12345678" "subnet-87654321"

# Register the instances with the load balancer
aws elbv2 register-instances-with-load-balancer \
  --load-balancer-arn "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/patient-dashboard-backend-elb/abcdef012345" \
  --instances "i-12345678" "i-87654321"

# Create a target group for the load balancer
aws elbv2 create-target-group \
  --name "patient-dashboard-backend-tg" \
  --protocol "HTTP" \
  --port 80 \
  --vpc-id "vpc-12345678"

# Associate the target group with the load balancer
aws elbv2 create-listener \
  --load-balancer-arn "arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/patient-dashboard-backend-elb/abcdef012345" \
  --protocol "HTTP" \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn="arn:aws:elasticloadbalancing:us-east-1

```

#### Automating the deployment process

To make it easier and more efficient to deploy updates to your backend, you can set up a continuous integration and delivery (CI/CD) pipeline using AWS CodePipeline and AWS CodeBuild.

To set up a CI/CD pipeline for your backend, you can use the following AWS CLI commands:
<!--more-->


```yaml
# Create an S3 bucket for storing the artifacts of the pipeline
aws s3 mb s3://patient-dashboard-backend-pipeline-artifacts

# Create an IAM role for the pipeline
aws iam create-role \
  --role-name "patient-dashboard-backend-pipeline-role" \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":["codepipeline.amazonaws.com"]},"Action":["sts:AssumeRole"]}]}'
aws iam attach-role-policy \
  --role-name "patient-dashboard-backend-pipeline-role" \
  --policy-arn "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess"
aws iam attach-role-policy \
  --role-name "patient-dashboard-backend-pipeline-role" \
  --policy-arn "arn:aws:iam::aws:policy/AWSCodePipelineFullAccess"
aws iam attach-role-policy \
  --role-name "patient-dashboard-backend-pipeline-role" \
  --policy-arn "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess"
aws iam attach-role-policy \
  --role-name "patient-dashboard-backend-pipeline-role" \
  --policy-arn "arn:aws:iam::aws:policy/AmazonS3FullAccess"

# Create a CodeBuild project for building and deploying the backend
aws codebuild create-project \
  --name "patient-dashboard-backend" \
  --description "Build and deploy the patient dashboard backend" \
  --source "type=S3,location=s3://patient-dashboard-backend-source" \
  --secondary-sources "type=S3,location=s3://patient-dashboard-backend-secondary-source" \
  --source-version "master" \
  --secondary-source-versions "dev" \
  --artifact "type=S3,location=s3://patient-dashboard-backend-pipeline-artifacts" \
  --environment "type=LINUX_CONTAINER,image=aws/codebuild/standard:4.0,computeType=BUILD_GENERAL1_SMALL" \
 

```

<!--more-->
#### Managing the deployment process

To manage the deployment process and ensure that it is running smoothly, you can set up deployment tracking and notification using AWS CodePipeline and AWS CloudWatch.

To set up deployment tracking and notification for your backend, you can use the following AWS CLI commands:

```yaml
# Create a CloudWatch Events rule for tracking deployments
aws events put-rule \
  --name "patient-dashboard-backend-deployment-tracking" \
  --event-pattern '{"source":["aws.codepipeline"],"detail-type":["CodePipeline Stage Execution State Change"],"detail":{"state":["SUCCEEDED","FAILED"]}}'

# Create a CloudWatch Events target for the rule
aws events put-targets \
  --rule "patient-dashboard-backend-deployment-tracking" \
  --targets '{"Id":"1","Arn":"arn:aws:sns:us-east-1:123456789012:patient-dashboard-backend-deployment-notification","Input":"{\"subject\": \"Patient Dashboard Backend Deployment\", \"message\": \"The deployment of the patient dashboard backend has succeeded or failed.\"}"}'

# Subscribe to the SNS topic for deployment notification
aws sns subscribe \
  --topic-arn "arn:aws:sns:us-east-1:123456789012:patient-dashboard-backend-deployment-notification" \
  --protocol "email" \
  --notification-endpoint "your@email.com"

```
> This will set up a CloudWatch Events rule that tracks the state of deployments in your CodePipeline, and sends a notification to an SNS topic when a deployment succeeds or fails. You can then subscribe to the SNS topic to receive email notifications about the deployment status.
