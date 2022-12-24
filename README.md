# PD-typescript
Making a Patient Dashboard in Typescript (both Frontend & Backend) & deploy on ethereum network on AWS


#### Here is a TypeScript script for a patient's dashboard that shows `heart rate`, `respiration rate`, `blood oxygen saturation`, `temperature`, and a list of `check-ups` and `blood analysis`, broken down into 7 steps:
<!--more-->


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
