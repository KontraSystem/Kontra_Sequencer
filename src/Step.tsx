import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Button, Typography } from '@material-ui/core';
import CSS from "csstype";
import { Types } from "./types";

export default function Step(props: Types.StepProps) {
  const [stepInstruments, setStepInstruments] = useState<Types.IStepInstrument>([]);
    const { step, currentStep, action, instrument, percussions, decayValues, attackValue, stepsValue, clear } = props;
    useEffect(() => {

      if(isCurrentStep() && stepsValue >= step) {
        stepInstruments.forEach(stepInstrument => {
          console.log(stepInstrument, percussions[stepInstrument].loaded)
          if(percussions[stepInstrument].loaded) {
            const offsetValue = attackValue[stepInstrument] ? attackValue[stepInstrument] / 1000 : undefined
            const durationValue = decayValues[stepInstrument] ? decayValues[stepInstrument] / 1000 : undefined
            percussions[stepInstrument].start(undefined, offsetValue, durationValue)
          }
        })
      }
    }, [currentStep])

    useEffect(() => {
      setStepInstruments([])
    }, [clear])

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
        <div style={divStyle}>
          <Typography>{step}</Typography>
          <button onClick={handleAction} style={step % 4 === 1 ? stepFourStyle : stepStyle}>
            <div style={ !(stepsValue >= step) ? chooseStepStyle : action === "" ? isCurrentStep() ? currentStepPowerStyle : powerStyle : !stepInstruments.includes(instrument) ? chooseStepStyle : powerStyle}>
            </div>
          </button>
        </div>
    )

}

const divStyle: CSS.Properties = {
  width: "5%",
  textAlign: "center"
}

const stepStyle: CSS.Properties = {
  width: "100%",
  height: "30%",
  borderRadius:"initial"
}

const stepFourStyle: CSS.Properties = {
  width: "100%",
  height: "30%",
  borderRadius: "initial",
  borderColor: "black",
  borderBottomStyle: "solid"
}

const chooseStepStyle: CSS.Properties = {
  width: "40%",
  height: "20%",
  backgroundColor: "red",
  position: "relative",
  left: "30%",
  top: "40%"
}

const powerStyle: CSS.Properties = {
  width: "40%",
  height: "20%",
  display: "flex",
  backgroundColor: "yellow",
  position: "relative",
  left: "30%",
  top: "40%"
}

const currentStepPowerStyle: CSS.Properties = {
  width: "40%",
  height: "20%",
  display: "flex",
  backgroundColor: "orange",
  position: "relative",
  left: "30%",
  top: "40%"
}
