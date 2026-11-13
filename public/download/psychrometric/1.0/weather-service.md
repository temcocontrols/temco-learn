---
title: "Weather Service"
order: 470
---

This feature helps user for the following:

1. Building information

2. Outdoor Sensors data

3. Remote weather station

4. Humidity Self Calibration

**Building information**

Once you select the building in T3000 software, it shows other information (Country, State, City, Street, ZIP, Latitude, Longitude and Elevation) of the building. To grab all the information, your PC should have internet connection.

**Outdoor Sensor data**

You need to chhose the controller and its pannel (I/O) for temperature and humidity data. Once you chhose panel for temperature and humidity, you can see the real time value there seen in T3000.

**Remote Weather Station**

Based on the building location, it shows all the available weather stations with distance from the current building. You can chhose the nearest weather station to get the nearest weather station data. It dispalys the selected weather station location,  last updated duration and connection status whether it is GOOD or BAD. If there is internet disruption, it records the status in Log File, you can click and view.

**Humidity Self Calibration**

You must enable this service to use. It compares sensor humidity data from T3000 and Weather station and if data is different, it calibrates the sensor data with weather station data based on 'Maximum Adjustment Per day' entered by user. User can enter 0 to 1 % 'Maximum Adjustment Per day'. You can click 'Help' to understand better. Once you enter the value, you can see current offset %.
