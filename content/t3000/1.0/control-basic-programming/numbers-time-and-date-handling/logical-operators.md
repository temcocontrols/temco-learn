---
title: "Logical Operators"
order: 620
---

## 10.4.5 MATHEMATICAL OPERATORS

Mathematical Operators are discussed below in their order of priority. Operators of higher priority are executed before operators of lower priority. Within the same group, operators have the same priority and are evaluated left to right. The order of execution can be modified by the use of parenthesis. The general form for the use of operators is:

expression operator expression

Note that NOT has a unique form as shown in the next section.

NOT

NOT is a unique operator in that it only acts on one value which must be a variable. (All other operators act on 2 expressions). NOT per forms a logical not operation on an expression. If the expression is 0 the result is 1. If the expression is non-zero the result is 0.

Example:
10 IF NOT OUT1 THEN STOP OUT2

20 IF NOT ( OUT1 OR OUT2) THEN START OUT3

“^ ” (T3000 only)

The ^ symbol is used to raise a value to a power. Press shift and 6 on the PC keyboard.

Example:
10 A = IN1 ^ VAR1

* , / , \ , MOD

These operators perform multiplication and division.

* Multiplication.

/ Division.

<table>
  <tr><td>\</td><td>The integer portion of a division</td><td>(ie: 13 \ 5 = 2).</td></tr>
  <tr><td>MOD</td><td>The remainder of a division</td><td>(ie: 13 MOD 5 = 3 ).</td></tr>
</table>

+ , -

These operators perform addition and subtraction.

&lt; , > , &lt;= , >= , &lt;>

These operators per form comparisons. The result is 1 if the comparison is true, otherwise the result is 0.

<table>
  <tr><td>&lt;</td><td>Result is true if left expression is LESS THAN right expression.</td></tr>
  <tr><td>&gt;</td><td>Result is true if left expression is GREATER THAN right expression</td></tr>
  <tr><td>&lt;=</td><td>Result is true if left expression is LESS THAN OR EQUAL</td></tr>
  <tr><td>to right expression.</td></tr>
  <tr><td>&gt;=</td><td>Result is true if left expression is GREATER THAN OR EQUAL</td></tr>
  <tr><td>to right expression.</td></tr>
  <tr><td>=</td><td>Result is true if both expressions are EQUAL.</td></tr>
  <tr><td>&lt;&gt;</td><td>Result is true if expressions are NOT EQUAL.</td></tr>
  <tr><td>10.4.6 <strong>LOGIC</strong></td></tr>
  <tr><td><strong>AND</strong></td></tr>
</table>

AND per forms the logical “and” of the two expressions. The result is true (1) if both expressions are non-zero, otherwise the result is false (0).

OR

OR per forms the logical “or” of the two expressions. The result is true (1) if either or both expressions are non-zero, otherwise the result is false (0).

XOR

XOR performs the logical “exclusive or” of the two expressions. The result is true (1) if the two expressions are different, otherwise the result is false (0).
