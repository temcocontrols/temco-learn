---
title: "Building the firmware"
order: 280
---

ESP-IDF 5.5.3, two components moved into the IDF tree, and an Eclipse project that is imported rather than generated. The path matters: the IDF installer cannot cope with a path that contains spaces.

> **Start here:** Use the [developer guide](02-developer-build-guide.md) for the complete, reproducible workflow and the [beginner guide](01-user-update-guide.md) when the goal is only to install an existing application image on a Tstat11.

## Compiling

### ESP32 code
Please download the ESP idf integrated development environment from Espressif to compile the code, the version is **5.5.3**.
> #### 1.	Install the ESP-IDF tool installer
> Go to the
> <https://github.com/espressif/idf-installer/releases/download/offline-5.5.3/esp-idf-tools-setup-offline-5.5.3.exe>
>
> page where you can download the esp - idf - tools - setup.  The IDE should be installed in a path that does not contain spaces in the name.
> #### 2.  Run esp-idf-tools-setup-offline-5.5.3.exe
> You can change the default ESP IDF installation path, which will be used later.
> #### 3.  Once installed, you should get an ESP-IDF Eclipse, which is the compiler we used to compile ESP32 code.
> #### 4.  Move the two folders, temco_bacnet and temco_IO_control, from the code download on Github to the components directory in esp-idf, replacing the original driver folder. This is the change we made to the IDF.
> #### 5.  Open the ESP-IDF Eclipse program, File ->Import, Espressif ->Existing IDF Project, select the project directory downloaded from github, and click Finish to load the project into the compiler.
> #### 6.  Right click the project name and select Build Project to compile. This will take a while the first time.
> #### 7.  Once the compile is complete, you will see the 'temco_app.bin' file in the 'build' directory within your imported project.
> #### 6.  You can get more help from
> <https://esp32.com/index.php><br>
> <https://espressif-docs.readthedocs-hosted.com/projects/esp-idf/en/latest/index.html>

### T3-NANO's STM32 code
> Typically, Keil V5 ARM is used to compile and generate firmware.
> The project file is located at \T3-nano-stm\MDK-ARM
> Much of the code is generated using the STM32CubeMX software.
