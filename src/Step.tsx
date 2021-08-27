import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button } from '@material-ui/core';
import CSS from "csstype";
import { Types } from "./types";

export default function Step(props: Types.StepProps) {
  const [stepInstruments, setStepInstruments] = useState<Types.IStepInstrument>([]);
    const { step, currentStep, action, instrument, percussions, decayValues, attackValue, stepsValue } = props;
    useEffect(() => {

      if(isCurrentStep() && stepsValue >= step) {
        stepInstruments.forEach(stepInstrument => {
          // console.log(stepInstrument)
          const offsetValue = attackValue[stepInstrument] ? attackValue[stepInstrument] / 1000 : undefined
          const durationValue = decayValues[stepInstrument] ? decayValues[stepInstrument] / 1000 : undefined
          percussions[stepInstrument].start(undefined, offsetValue, durationValue)
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
            <div style={ !(stepsValue >= step) ? chooseStepStyle : action === "" ? isCurrentStep() ? currentStepPowerStyle : powerStyle : !stepInstruments.includes(instrument) ? chooseStepStyle : powerStyle}>
            </div>
        </button>
    )

}

const stepStyle: CSS.Properties = {
    height: "60px",
    width: "60px",
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
    left: "10px",
    top: "5px"
}

const powerStyle: CSS.Properties = {
    width:"30px",
    height: "30px",
    backgroundColor: "yellow",
    position: "relative",
    left: "10px",
    top: "5px"
}

const currentStepPowerStyle: CSS.Properties = {
    width:"30px",
    height: "30px",
    backgroundColor: "orange",
    position: "relative",
    left: "10px",
    top: "5px"
}
