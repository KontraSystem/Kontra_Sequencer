import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from '@material-ui/core';
import CSS from "csstype";

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

type StepProps = {
  step: number,
  currentStep: number,
  action: string,
  instrument: string,
  percussions: samples
}

type IStepInstrument = string[]

const stepStyle: CSS.Properties = {
    height: "80px",
    width: "70px",
    margin: "10px",
    marginLeft: "20px",
    marginRight: "20px",
    borderRadius:"initial"
}

const chooseStepStyle: CSS.Properties = {
    width:"30px",
    height: "30px",
    backgroundColor: "red",
    position: "relative",
    left: "15px",
    top: "15px"
}

const powerStyle: CSS.Properties = {
    width:"30px",
    height: "30px",
    backgroundColor: "yellow",
    position: "relative",
    left: "15px",
    top: "15px"
}

const currentStepPowerStyle: CSS.Properties = {
    width:"30px",
    height: "30px",
    backgroundColor: "orange",
    position: "relative",
    left: "15px",
    top: "15px"
}


export default function Step(props: StepProps) {
  const [stepInstruments, setStepInstruments] = useState<IStepInstrument>([]);
    const { step, currentStep, action, instrument, percussions } = props;
    useEffect(() => {

      if(isCurrentStep()) {
        stepInstruments.forEach(stepInstrument => {
          // console.log(stepInstrument)
          percussions[stepInstrument].start()
        })
      }
    }, [currentStep])

    const isCurrentStep = () => {
      return step === currentStep;
    }

    const handleAction = () => {
      if(action === "step_sound") {
        const instruments = stepInstruments;
        if(stepInstruments.includes(instrument)) {
          instruments.splice(instruments.indexOf(instrument), 1)
        } else {
          instruments.push(instrument)
        }
        setStepInstruments(instruments);
      }
      console.log(action, instrument);
    }

    return (
        <button onClick={handleAction} style={stepStyle}>
            <div style={action === "" ? isCurrentStep() ? currentStepPowerStyle : powerStyle : !stepInstruments.includes(instrument) ? chooseStepStyle : powerStyle}>
            </div>
        </button>
    )

}