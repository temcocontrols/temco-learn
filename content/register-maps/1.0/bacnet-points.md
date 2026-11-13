---
title: "BACnet points by controller"
order: 70
---

What each T3 model exposes as BACnet objects, and how many of each. The object names are the ones the controller publishes, so they can be matched against a point list read from the device.

## T3-BB

| Item | Value | Notes |
|---|---|---|
| Controller | T3-BB Big Brother | Range |
| Total Channels | 56 |  |
| Universal Input | 32 |  |
| ANALOG_INPUT1 (IN1) | Select "Analog Units" or "No Units"for the corresponding Inputs | ANALOG_INPUT32 (IN32) |
| BINARY_INPUT1 (IN1) | Select "Digital Units" for the corresponding Inputs | BINARY_INPUT32 (IN32) |
| Relay Output | 12 |  |
| BINARY_OUTPUT1 (OUT1) | Select "Digital Units"for the corresponding Outputs | BINARY_OUTPUT12 (OUT12) |
| Analog Output | 12 |  |
| ANALOG_OUTPUT13 (OUT13) | Select "Analog Units"for the corresponding Outputs | ANALOG_OUTPUT24 (OUT24) |
| Variable | 128 |  |
| ANALOG_VALUE1 VAR1 | Select "Analog Units"for the corresponding VAR | ANALOG_VALUE128 VAR128 |
| BINARY_VALUE1 VAR1 | Select "Digital Units"for the corresponding VAR | BINARY_VALUE128 VAR128 |

## T3-LB

| Item | Value | Notes |
|---|---|---|
| Controller | T3-LB Little Brother | Range |
| Total Channels | 26 |  |
| Universal Input | 16 |  |
| ANALOG_INPUT1 (IN1) | Select "Analog Units" or "No Units"for the corresponding Inputs | ANALOG_INPUT16 (IN16) |
| BINARY_INPUT1 (IN1) | Select "Digital Units" for the corresponding Inputs | BINARY_INPUT16 (IN16) |
| Relay Output | 6 |  |
| BINARY_OUTPUT1 (OUT1) | Select "Digital Units"for the corresponding Outputs | BINARY_OUTPUT6 (OUT6) |
| Analog Output | 4 |  |
| ANALOG_OUTPUT7 (OUT7) | Select "Analog Units"for the corresponding Outputs | ANALOG_OUTPUT10 (OUT10) |
| Variable | 128 |  |
| ANALOG_VALUE1 VAR1 | Select "Analog Units"for the corresponding VAR | ANALOG_VALUE128 VAR128 |
| BINARY_VALUE1 VAR1 | Select "Digital Units"for the corresponding VAR | BINARY_VALUE128 VAR128 |

## T3-TB

| Item | Value | Notes |
|---|---|---|
| Controller | T3-TB Tiny Brother | Range |
| Total Channels | 22 |  |
| Universal Input | 8 |  |
| ANALOG_INPUT1 (IN1) | Select "Analog Units" or "No Units"for the corresponding Inputs | ANALOG_INPUT32 (IN32) |
| BINARY_INPUT1 (IN1) | Select "Digital Units" for the corresponding Inputs | BINARY_INPUT32 (IN32) |
| Relay Output | 8 |  |
| BINARY_OUTPUT1 (OUT1) | Select "Digital Units"for the corresponding Outputs | BINARY_OUTPUT8 (OUT8) |
| Analog Output | 6 |  |
| ANALOG_OUTPUT9 (OUT9) | Select "Analog Units"for the corresponding Outputs | ANALOG_OUTPUT14 (OUT14) |
| Variable | 128 |  |
| ANALOG_VALUE1 VAR1 | Select "Analog Units"for the corresponding VAR | ANALOG_VALUE128 VAR128 |
| BINARY_VALUE1 VAR1 | Select "Digital Units"for the corresponding VAR | BINARY_VALUE128 VAR128 |
