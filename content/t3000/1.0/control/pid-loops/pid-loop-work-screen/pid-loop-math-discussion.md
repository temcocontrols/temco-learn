---
title: "PID LOOP MATH DISCUSSION"
order: 500
---

The output value of a controller is calculated according to the following formulas:

OUTPUT = Op + Oi + Od + Ob

Op = Proportional Output = A * 100 / Pb * ( I - S )

Oi = Integral Output = A * R * t/60 * ( I - S ) + Oi

Od = Derivative Output = A * D*(( I - S ) - ( It-1 - St-1 )) / t

Ob = Bias

A = Action (+1 for direct acting, -1 for reverse acting)

Pb = Proportional Band

I = Input

S = Setpoint

R = Reset Constant = Repeats per hour Definition: One repeat per hour will cause an output change of one over one hour for an error of one.

D = Rate Constant = Minutes Definition: One minute will cause an output of one for an error changing by one per minute.

T = Time in Minutes since last scan.

It-1 = Input on last scan.

St-1 = Setpoint on last scan.

Note: Controllers are executed once per second.

Output Limiting Procedure:

1. The sum of Op + Od + Ob is limited to 0-100.

2. Oi is added to the previous sum.

3. The output is again limited to 0-100.

4. Oi is adjusted by the amount that the output was limited in step 3.

Note: Oi is reset to zero when R is set to 0.

Oi is not reset when panel is shut off and on.
