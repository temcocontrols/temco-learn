---
title: "The screens that ship on the device"
order: 40
---

The controller can hold its screens as JSON rather than as compiled code, and these are the ones it ships with. Each is a document the device serves, so the Design Studio can open it, change it, and write it back — no firmware build. The counts below are measured from the files in `components/temco_dynamic_display/DefaultScreens/`.

| Screen | Root widget | Child widgets | Assets |
|---|---|---|---|
| `ddns_screen` | DdnsScreen | 6 | 1 bitmaps |
| `holiday_calender_screen` | HolidayCalenderScreen | 2 | 1 bitmaps |
| `home_screen` | HomeScreen | 12 | 9 bitmaps |
| `main_menu` | MainMenu | 5 | 6 bitmaps |
| `network_config` | NetworkConfig | 2 | 1 bitmaps |
| `parameters` | Parameters | 2 | 1 bitmaps |
| `protocols` | Protocols | 2 | 1 bitmaps |
| `schedule_edit_screen` | ScheduleEditScreen | 2 | 1 bitmaps |
| `schedule_screen` | ScheduleScreen | 3 | 1 bitmaps |
| `start_up_screen` | StartUpScreen | 2 | 0 bitmaps |
| `time` | Time | 8 | 1 bitmaps |
| `wifi_config` | WifiConfig | 2 | 1 bitmaps |
| `wireguard_screen` | WireGuardScreen | 12 | 1 bitmaps |

13 screens in total. A screen with hundreds of child widgets is a table or a calendar; one with a handful is a menu.

## Which one you are looking at

The **start-up screen** says `Tstat - 11` in a single label — that string is the cheapest way to confirm a device is running the Tstat11 image rather than the TSTAT10 one.
