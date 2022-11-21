import * as Tone from "tone";

export module Types {
  
  interface KnobLevels { [key: string]: number }

  interface KnobDecay { [key: string]: number }
  
  interface KnobAttack { [key: string]: number }

  interface KnobTune { [key: string]: number }

  interface KnobTone { [key: string]: number }

  interface KnobSnappy { [key: string]: number }

  interface KnobTypes { [key: string]: { function: (value: number, percussion: string) => void, value: KnobLevels, max: number, min: number } }

  type Perc = {
    label: string,
    value: string[],
    knobs: Knobs[],
    percussion: number,
    button_labels: string[]
  }

  type Knobs = {
    label: string,
    type: string,
    key: string
  }

  type pitchShift = { [key: string]: Tone.PitchShift }

  type samples = { [key: string]: Tone.Player }

  type StepProps = {
    step: number,
    currentStep: number,
    action: string,
    instrument: string,
    percussions: samples,
    decayValues: KnobDecay,
    attackValue: KnobAttack,
    stepsValue: number,
    clear: boolean
  }

  type MidsectionProps = {
    tempoValue: number,
    stepsValue: number,
    handleClickStart: () => void,
    handleStepsCount: (val: number) => void,
    handleTempoChange: (val: number) => void,
  }

  type IStepInstrument = string[]

  interface PropsType {
    tempo: number,
    running: boolean,
    action: string,
    instrument: string,
    percussions: samples,
    decayValues: KnobDecay,
    attackValue: KnobAttack,
    stepsValue: number,
    clearValue: boolean
  }

  interface StateType {
    currentStep: number
  }
}

