---
title: "The Control Basic grammar"
order: 680
---

Control Basic has a formal grammar, and it shipped with the product: `T3000ControlBasicEBNF.EBNF` in the source repository is the complete language definition in EBNF — every command, every function, every operator, and the numbered range of every point type.

Nothing in the current documentation is derived from it, and it is not enforced by the controller (the editor does not parse against it), but it settles questions the reference pages answer only by example. Where a page here says "CON1 to CON64", this is the file that says so.

## The grammar in full

This is the file, unchanged:

```
CONTROL_BASIC ::= SentencesSequence | SubRoutine
SubRoutine ::= (LineNumber DECLARE EndLine SentencesSequence LineNumber END)
SentencesSequence ::= ProgramLine+
ProgramLine ::= EmptyLine | (LineNumber Sentence EndLine)
Sentence ::= (Comment | (Commands| Assignment | Branch | Loop) Comment?)
EmptyLine ::= LineNumber? EndLine
EndLine ::=  #xD | #xA
Comment ::= 'REM' StringLiteral+
Commands ::= Command (';' Command)*
Function ::= ABS | AVG | CONPROP | CONRATE | CONRESET | COM1 | DOM | DOW | DOY | INT | INTERVAL | LN | LN1 | MAX | MIN | POWERLOSS | SCANS | SQR | STATUS | TBL | TIME | TIMEOFF | TIMEON | WRON | WROFF | UNACK | USERA | USERB
Command ::= ALARM | ALARMAT | CALL | CLEAR | DALARM | DISABLE | ENABLE | END | HANGUP | PHONE | PRINT | PRINTAT | REMOTEGET | REMOTESET | RETURN | RUNMACRO | SETPRINTER | START | STOP | WAIT
ABS ::= 'ABS' PARIZQ Expression PARDER
ALARM ::= 'ALARM' Expression ComparisonOps Expression ',' Expression ',' StringLiteral*
ALARMAT ::= 'ALARM-AT' (PANELS | 'ALL')
AVG ::=  'AVG' PARIZQ Expression ExpressionListOpt PARDER
CALL ::= 'CALL' PRG (AssignOp ARG (Space ',' Space ARG)* )?
CLEAR ::= 'CLEAR'
CLOSE ::= 'CLOSE' Designator
CONPROP ::= 'CONPROP' PARIZQ CON ',' Expression PARDER 
CONRATE ::= 'CONRATE' PARIZQ CON ',' Expression PARDER 
CONRESET ::= 'CONRESET' PARIZQ CON ',' Expression PARDER 
CON ::= UPTO64
COM1 ::= 'COM1' PARIZQ BAUDRATE ',' PORT (CHARS+ | ',' EnclosedString) PARDER
BAUDRATE ::= '9600' | '115200'
PORT ::= '1' | 'Z' | 'Y' | 'X'
CHARS ::= ',' ( PrintableAscii | ['] [A-Za-z] ['] )
PrintableAscii ::= '3' [2-9] | [4-9][0-9] | '1' [0-9][0-9] | '2' [0-4][0-9] | '25' [0-5]
DALARM ::= 'DALARM' Expression ',' NumberLiteral ',' StringLiteral+
DECLARE ::= 'DECLARE' Identifier+
DISABLE ::= 'DISABLE' Identifier
DOM ::= 'DOM'
DOW ::= 'DOW'
DOY  ::= 'DOY'
ENABLE ::= 'ENABLE' Identifier
END ::= 'END'
HANGUP ::= 'HANGUP'
INT ::= 'INT' PARIZQ Expression PARDER
INTERVAL ::= 'INTERVAL' PARIZQ Expression PARDER
LET ::= 'LET' Assignment
LN ::= 'LN' PARIZQ Expression PARDER
LN1 ::= 'LN-1' PARIZQ Expression PARDER
MAX ::= 'MAX' PARIZQ Expression (Space ',' Space Expression)* PARDER
MIN ::= 'MIN' PARIZQ Expression (Space ',' Space Expression)* PARDER
ONALARM ::= 'ON-ALARM' LineNumber
ONERROR ::= 'ON-ERROR' LineNumber
OPEN ::= 'OPEN' Identifier
POWERLOSS ::= 'POWER-LOSS'
PHONE ::= 'PHONE' PhoneNumber
PRINT ::= 'PRINT' PrintableKeywords PrintListOpt
PrintListOpt ::= (';' PrintableKeywords) *
PrintableKeywords ::= 'DATE'|'TIME'|'USER-A'|'USER-B'| PointIdentifier| 'BEEP' | EnclosedString
EnclosedString ::= '"' StringLiteral+ '"'
PRINTAT ::= 'PRINT-AT' (PANELS | 'ALL')
REMOTEGET ::= 'REMOTE-GET' Designator AssignOp RemoteDesignator
REMOTESET ::= 'REMOTE-SET' RemoteDesignator AssignOp Designator
RETURN ::= 'RETURN'
RUNMACRO ::= 'RUN-SYSTEM' SYSPRG
SCANS ::= 'SCANS'
SETPRINTER ::= PRINTEVERYTHING | ONLYPRINTCOMMANDS
PRINTEVERYTHING ::= 'SET-PRINTER' ('A'|'B'|'0')
ONLYPRINTCOMMANDS ::= 'Set-Printer' ('a'|'b'|'0')
SQR ::= 'SQR' PARIZQ Expression PARDER
START ::= 'START' Designator
STATUS ::= 'STATUS' PARIZQ Expression PARDER
STOP ::= 'STOP' Designator
TBL ::= 'TBL' PARIZQ Expression ',' TABLENUMBER PARDER
TIME ::= 'TIME'
TIMEON ::= 'TIME-ON' PARIZQ Designator PARDER 
TIMEOFF ::= 'TIME-OFF' PARIZQ Designator PARDER
UNACK ::= 'UNACK'
USERA ::= 'USER-A'
USERB ::= 'USER-B'
WAIT ::= 'WAIT' Expression
WRON ::= 'WR-ON' PARIZQ SYSPRG ',' TIMER PARDER
WROFF ::= 'WR-OFF' PARIZQ SYSPRG ',' TIMER PARDER
Branch ::= IF | IFTRUE | IFFALSE | GOSUB | GOTO | ON | ONALARM | ONERROR
IF ::= 'IF' Expression 'THEN' IFCLAUSE ('ELSE' IFCLAUSE)?
IFTRUE ::= 'IF+' Expression 'THEN' IFCLAUSE ('ELSE' IFCLAUSE)?
IFFALSE ::= 'IF-' Expression 'THEN' IFCLAUSE ('ELSE' IFCLAUSE)?
IFCLAUSE ::= (Sentence | LineNumber)
ON ::= 'ON' IntegerTerm (GOTO | GOSUB) (',' LineNumber)*
GOSUB ::= 'GOSUB' LineNumber
GOTO ::= 'GOTO' LineNumber
Loop ::= FOR SentencesSequence ENDFOR
FOR ::= 'FOR' LoopVariable AssignOp Integer 'TO' Integer ('STEP' Integer)? EndLine
ENDFOR ::= 'NEXT' (LoopVariable (',' LoopVariable)*)?
LoopVariable ::= [A-K]
Space ::= #x9 #x20
StringLiteral ::= NonCtlAsciiChar+
NonCtlAsciiChar ::= Space | Punctuation | Letter | Digit | Other 
Punctuation ::= '.'|','|';'
Other ::= '*'|'_'|Parenthesis
LineNumber ::= Ordinal
Literal ::= NumbersLiteral | DatesLiteral | DaysLiteral | TimeLiteral
PhoneNumber ::= Integer ('-' Integer)*
NumbersLiteral ::= ('-')? Integer (('.'|'E' ('-')?)  Integer)?
DaysLiteral ::= 'SUN'|'MON'|'TUE'|'WED'|'THU'|'FRI'|'SAT'
DatesLiteral ::= MonthLiteral Space ([1-2] [1-9] | [3] [0-1])
MonthLiteral ::= 'JAN'|'FEB'|'MAR'|'APR'|'MAY'|'JUN'|'JUL'|'AUG'|'SEP'|'OCT'|'NOV'|'DEC'
Integer ::= Digit+
Digit ::= [0] | NonZeroDigit
NonZeroDigit ::= [1-9]
TimeLiteral ::= HH ':' MM ':' SS
HH ::= [0-1] Digit | [2] [0-3]
MM ::= [0-5] Digit
SS ::= [0-5] Digit

LogicOps ::= 'AND' | 'OR' | 'XOR'
ArithmeticOps ::= '^' | '*' | '/' | '\' | '+' | '-' | 'MOD'
ComparisonOps ::= '<' | '>' | '<=' | '>=' | '<>' | AssignOp
AssingOp ::= '='
UnaryOps ::= 'NOT'|'-'
BinaryOps ::= ArithmeticOps | ComparisonOps | LogicOps
Parenthesis ::= ParIzq | ParDer
ParIzq ::= '('
ParDer ::= ')'

Expression ::= Function | Literal | Designator | BinaryExpression | EnclosableExpression | UnaryExpression
EnclosableExpression ::= ParIzq Expression ParDer
UnaryExpression ::=  UnaryOps Expression
BinaryExpression ::= Expression BinaryOps Expression
ExpressionListOpt ::= (',' Expression)*

IntegerTerm ::= Function | Designator
Assignment ::= Designator AssignOp Expression 
Designator ::= Identifier | PointIdentifier | LocalVariable
RemoteDesignator ::= Designator
Identifier ::= (Letter | Digit ) ValidSymbol+
ValidSymbol ::= ('-')? ( Letter | Digit )+

PointIdentifier ::= VARS | CONS | WRS | ARS | OUTS | INS | PRG | GRP | DMON | AMON | ARR | PIDS

VARS ::= 'VAR' UPTO128
OUTS ::= 'OUT' UPTO128
INS ::= 'IN' UPTO128
CONS ::= 'CON' UPTO64
PIDS ::= 'PID' UPTO64
WRS ::= 'SCH' UPTO64
ARS ::= 'HOL' UPTO64
PRG ::= 'PRG' UPTO128
GRP ::= 'GRP' UPTO32
DMON ::= 'DMON' UPTO128
AMON ::= 'AMON' UPTO96
ARR ::= 'AY' UPTO48 "[" Ordinal "]"

LocalVariable ::= Letter
Letter ::= [A-Z]

PANEL ::= UPTO5
PANELS ::= PANEL+
ARG ::= Designator | Expression

Ordinal ::= NonZeroDigit Digit*

SYSPRG ::= UPTO16
TABLENUMBER ::= UPTO5
TIMER ::= UPTO4

UPTO128 ::= NonZeroDigit Digit? | [1] ( ([0-1] Digit ) | ([2] [0-8]))
UPTO96 ::= NonZeroDigit | [1-8] Digit | [9] [0-6]
UPTO64 ::= NonZeroDigit | [1-5] Digit | [6] [0-4]
UPTO48 ::= NonZeroDigit | [1-3] Digit | [4] [0-8]
UPTO32 ::= NonZeroDigit | [1-2] Digit | [3] [0-2]
UPTO16 ::= NonZeroDigit | [1] [0-6]
UPTO8 ::= [1-8]
UPTO4 ::= [1-4]
UPTO5 ::= [1-5]
```

## What the grammar pins down

**The numbered range of every point type.** These productions are the authoritative answer to "how many can I have", and they are not all the same:

| Point type | Prefix | Range |
| --- | --- | --- |
| Variables | `VAR` | 1–128 |
| Outputs | `OUT` | 1–128 |
| Inputs | `IN` | 1–128 |
| Programs | `PRG` | 1–128 |
| Digital monitors | `DMON` | 1–128 |
| Analog monitors | `AMON` | 1–96 |
| Controllers | `CON` | 1–64 |
| PIDs | `PID` | 1–64 |
| Schedules | `SCH` | 1–64 |
| Holidays | `HOL` | 1–64 |
| Groups | `GRP` | 1–32 |
| Arrays | `AY` | 1–48 |

The controller firmware's own ceilings are lower than some of these on the smaller models. The grammar gives the language's limit; the model table in the devices project on this site gives the hardware's.

**Loop variables are A to K, and nothing else.** `LoopVariable ::= [A-K]` — eleven single letters. A `FOR` loop that uses `L` will not parse, and a local variable outside A–K does not exist.

**A branch target is a line number or a sentence.** `IFCLAUSE ::= (Sentence | LineNumber)` is why `IF ... THEN START FAN1` works as well as `IF ... THEN 100`.

**`ON` takes a function or a designator, not an expression.** `IntegerTerm ::= Function | Designator`, so `ON VAR1 GOTO ...` is legal and `ON VAR1 + 1 GOTO ...` is not.

**Serial ports are a fixed menu.** `BAUDRATE ::= '9600' | '115200'` and `PORT ::= '1' | 'Z' | 'Y' | 'X'`. There is no arbitrary baud rate in `COM1(...)`.

**Commands are case sensitive where the grammar says so.** `SET-PRINTER` accepts `'A'|'B'|'0'`, and the second production, spelled `'Set-Printer'`, accepts `'a'|'b'|'0'`. That asymmetry is in the file.

**A subroutine needs a declaration.** `SubRoutine ::= (LineNumber DECLARE EndLine SentencesSequence LineNumber END)` — the `DECLARE` line and the `END` are both required, and the sequence sits between them.

## Two defects in the file

Worth knowing before you build a parser against it:

- `AssingOp ::= '='` — the production is misspelled, and `ComparisonOps` refers to it as `AssignOp` while `Let` and `Assignment` refer to `AssignOp` too. So the misspelling is in the definition only.
- `Space ::= #x9 #x20` defines space as a tab followed by a space, which is too narrow to describe the language as it is actually written. Treat it as documentation of intent rather than a token definition.

`CLOSE`, `OPEN` and `LET` are defined but do not appear in the `Command` production; they reach a sentence through `Assignment` and the branch paths instead. `COMMANDS AND FUNCTIONS` in the original manual lists them all in one place, which is why the split is easy to miss.

## Where the file came from

`T3000_CrossPlatform/Documentation/Grammar Definitions/T3000ControlBasicEBNF.EBNF`, 167 lines. It is the only formal definition of the language in the estate.
