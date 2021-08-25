import React from "react";
import * as Tone from "tone";

import Step from "./Step";
import Grid from "@material-ui/core/Grid";

type samples = {
  bass_drum: Tone.Player,
  snare: Tone.Player,
  cl_hihat: Tone.Player,
  op_hihat: Tone.Player,
  low_tom: Tone.Player,
  mid_tom: Tone.Player,
  hi_tom: Tone.Player,
  crash: Tone.Player,
  ride: Tone.Player,
  rim: Tone.Player,
  clap: Tone.Player
}

interface PropsType {
  tempo: number,
  running: boolean,
  action: string,
  instrument: string,
  percussions: samples
}

interface StateType {
  currentStep: number
}

const steps: number[][] = [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16],
    ];


const synth = new Tone.Synth().toDestination();


class Tempo extends React.Component<PropsType, StateType>{
    private delay: number;
    public timer!: NodeJS.Timeout;
    private sound: any;
    private isRunning: boolean
    public state: StateType
    private minute: number
    private accumulated: number
    private count: number
    constructor(props: PropsType) {
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

    componentDidUpdate(prevProps: PropsType) {
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
      // if(currentStep === 1 || currentStep === 5 || currentStep === 9 || currentStep === 13) {
      //   synth.triggerAttackRelease("C4", "8n");
      //   this.accumulated = this.accumulated + (this.delay * 4)
      //   this.count = this.count + 1
      //   console.log(this.count, this.accumulated)
      //   if(this.accumulated >= this.minute) this.stop()
      // }
      this.setState((prevState) => {
        if(currentStep === 16) {
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
      return { action: action, instrument: instrument}
    }

    render() {
      const { currentStep } = this.state;
      const { action, instrument, percussions } = this.props;

      return steps.map((row) => {
      return (
        <Grid
          alignContent="space-between"
          alignItems="stretch"
          container
          spacing={4}
        >
          {row.map((step) => {
            return (
              <Grid item xs={1}>
                <Step percussions={percussions} action={action} currentStep={currentStep} step={step} instrument={instrument}/>
              </Grid>
            );
          })}
        </Grid>
      );
    });
    }

}

export default Tempo;