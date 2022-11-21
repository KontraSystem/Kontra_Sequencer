import React from "react";
import * as Tone from "tone";

import Step from "./Step";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography"
import { Types } from "./types";

const steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

class Tempo extends React.Component<Types.PropsType, Types.StateType>{
  private delay: number;
  public timer!: NodeJS.Timeout;
  private sound: any;
  private isRunning: boolean
  public state: Types.StateType
  private minute: number
  private accumulated: number
  private count: number
  constructor(props: Types.PropsType) {
      super(props);
      this.delay = 150;
      this.isRunning = false;
      this.minute = 60000
      this.accumulated = 0
      this.count = 0
      this.state = {
        currentStep: 0
      }
      this.handleStep = this.handleStep.bind(this);
  }

  componentDidUpdate(prevProps: Types.PropsType) {
    const { tempo, running } = this.props;
    if(prevProps.tempo !== tempo) {
      const bpm: number = 60000/tempo/4;
      if(running) {
        this.setNewInterval(bpm);        
      }
    } else if(prevProps.running !== running) {
      this.start();
    }
  }


  start(): void {
     const { tempo, running } = this.props;
      if(running) {
          this.stop();
          const bpm: number = 60000/tempo/4;
          this.timer = setInterval(() => this.tick(), bpm)
          this.setState({
            currentStep: 1
          });
      } else {
          this.setState({
            currentStep: 0
          });
          this.stop();
      }
  }

  stop() {
      clearInterval(this.timer);
      this.isRunning = false;
  }

  setNewInterval(delay: number) {
      clearInterval(this.timer);
      this.timer = setInterval(() => this.tick(), delay)
  }

  private tick() {
    const { currentStep } = this.state;
    const { stepsValue } = this.props;
    console.log(currentStep);
    this.setState((prevState: Types.StateType) => {
      if(currentStep >= stepsValue) {
        return {
          currentStep: 1 
        }
      } else {
        return {
          currentStep: currentStep + 1
        }
      }
    })
      
  }

  handleStep() {
    const { action, instrument } = this.props;
    return { action: action, instrument: instrument }
  }

  render() {
    const { currentStep } = this.state;
    const { action, instrument, percussions, decayValues, attackValue, stepsValue, clearValue } = this.props;

    return (
      <Grid  
        container
        spacing={4} 
        item 
        justifyContent="space-around"
        xs={12}
        >
          {steps.map((step) => {
          return (
          <Step 
            attackValue={attackValue} 
            decayValues={decayValues} 
            percussions={percussions} 
            action={action} 
            stepsValue={stepsValue}
            currentStep={currentStep} 
            step={step} 
            instrument={instrument}
            clear={clearValue}
          />
        );
      })}
    </Grid>
  )}
}

export default Tempo;