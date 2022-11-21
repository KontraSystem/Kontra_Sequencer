import React, { useEffect, useState } from "react";
import { Types } from "./types";
import { Basic } from "react-dial-knob";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
export default function Midsection(props: Types.MidsectionProps) {
	const { tempoValue, handleTempoChange, stepsValue, handleStepsCount, handleClickStart } = props;
	return (
        <Grid container item xs={12} justifyContent="space-around">
          <Grid item>
            <button onClick={handleClickStart}>Start</button>
          </Grid>
          <Grid item>
            <Typography>Tempo</Typography>
            <Typography>{tempoValue}</Typography>
          </Grid>
          <Grid item>
            <Basic
              diameter={100}
              min={80}
              max={200}
              step={1}
              value={tempoValue}
              theme={{
                defaultColor: "#333",
                activeColor: "#f33",
              }}
              onValueChange={handleTempoChange}
              jumpLimit={0.5}
              ariaLabelledBy={"tempo-label"}
            />
            <Typography variant="caption">{"Tempo"}</Typography>
          </Grid>
          <Grid item>
            <Basic
              diameter={40}
              min={0}
              max={16}
              step={1}
              value={stepsValue}
              theme={{
                defaultColor: "#333",
                activeColor: "#f33",
              }}
              onValueChange={handleStepsCount}
              jumpLimit={0.5}
              ariaLabelledBy={"steps-label"}
            />
            <Typography variant="caption">{"Steps"}</Typography>
          </Grid>
          <Grid item>
            <Basic
              diameter={40}
              min={0}
              max={16}
              step={1}
              value={stepsValue}
              theme={{
                defaultColor: "#333",
                activeColor: "#f33",
              }}
              onValueChange={handleStepsCount}
              jumpLimit={0.5}
              ariaLabelledBy={"steps-label"}
            />
            <Typography  variant="caption">{"Swing"}</Typography>
          </Grid>
          <Grid item>
            <Basic
              diameter={100}
              min={0}
              max={16}
              step={1}
              value={stepsValue}
              theme={{
                defaultColor: "#333",
                activeColor: "#f33",
              }}
              onValueChange={handleStepsCount}
              jumpLimit={0.5}
              ariaLabelledBy={"steps-label"}
            />
            <Typography  variant="caption">{"Master Volume"}</Typography>
          </Grid>
        </Grid>
	)
}