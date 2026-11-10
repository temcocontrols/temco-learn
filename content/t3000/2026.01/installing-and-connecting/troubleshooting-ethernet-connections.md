---
title: "Troubleshooting Ethernet Connections"
order: 270
---

If you're having troubles connecting you can isolate the PC and device from the main network with a small separate hub. Scan the network to discover the devices on your network by clicking the magnifying glass ![](media/images-drex_module_6_4_custom.png) on the menu bar. The default IP address of the controller is set to a static IP of 192.168.0.3 with DHCP disabled. T3000 can discover the device no matter what subnet your PC and device happen to be on by scanning the network with the magnifying glass tool.

If your network happens to be on a different subnet than 192.168.0.X a message will pop up asking if you want to change the IP address of the device to the same subnet as your PC.

![](media/images-drex_module_6_4_custom_2.png)

If you're still having problems connecting and don't happen to have a spare hub for isolating from the office/home lan you can try a direct connection as shown here, direct from the PC to the controller with no hub in between. The PC will normally have what is called auto MDI-X capability which means it can detect the direct connection to another host and will automatically flip the connections, no crossover cable is required.

![](media/images-drex_module_6_4_custom_3.png)

If there are sensors and actuators attached to the controller, try disconnecting them. In any system with many devices and multiple power supplies, it is easy to get 24vac crossed around. Disconnect all the field devices and also the RS485 networks and repeat the scan operation.

Finally, be sure you have the latest T3000 application, it is updated every two weeks, approximately. You can update the software by clicking the check update button.

![](media/images-drex_module_6_4_custom_4.png)
