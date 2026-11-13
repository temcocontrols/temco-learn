---
title: "Trying the commands"
order: 60
---

The sequence to send by hand, in order, when you want to watch an update happen rather than trust it.

## 12. Testing Modbus Commands

### Modbus RTU (Serial) Example Commands

```
Python pseudo-code using Modbus:

# 1. Set expected MD5 checksum (registers 1995-1998)
write_registers(1995, [0xABCD, 0xEF12, 0x3456, 0x7890])

# 2. Initiate firmware update (START)
write_register(16, 0x1F)  # UPDATE_STATUS = 0x1F

# 3. Send firmware packets via protocol
# (In serial/TCP stream, not Modbus)

# 4. Check resume position if interrupted
result = read_registers(17, 2)  # READ UPDATE_PTR_HI/LO

# 5. Resume from last position (if needed)
write_register(16, 0x1F)  # UPDATE_STATUS = 0x1F (resume)

# 6. Complete update
write_register(16, 0x01)  # UPDATE_STATUS = 0x01

# 7. Read completion status
status = read_register(23)  # UPDATE_FLAG
if status == 0x55:
    print("Update successful!")
else:
    print("Update failed!")

# 8. Full erase if needed
write_register(16, 0x3F)  # UPDATE_STATUS = 0x3F (erase all)
```

---
