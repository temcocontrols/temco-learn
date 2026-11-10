---
title: "ON- ERROR"
order: 920
---

<table>
  <tr><td>Purpose:</td><td>To redirect program execution if there was an error.</td></tr>
  <tr><td>Format:</td><td>ON-ERROR line</td></tr>
  <tr><td>Description:</td><td>line is the line number</td></tr>
  <tr><td>Example:</td><td>10 PHONE 555-1234</td></tr>
  <tr><td>20 ON-ERROR 100</td></tr>
  <tr><td>30 REM CONTINUES HERE IF NO ERROR</td></tr>
  <tr><td>40 REM PROCEDURE IF CALL NOT SUCCESSFUL</td></tr>
  <tr><td>Note:</td><td>ON-ERROR can be used after the following statements:</td></tr>
  <tr><td>PHONE REMOTE GET REMOTE</td><td>SET RUN-SYSTEM.</td></tr>
</table>
