---
title: "PTP remote connection"
order: 1000
---

PTP is the connection T3000 makes to a panel that it cannot reach directly. Both ends are behind a router, so neither can open a socket to the other; instead, both talk to a meeting point — the Temco server — and the server tells the host where the panel can be found.

The panel keeps that conversation alive on its own. It is why a controller on a customer site can be reached from an office without a static address, a port forward or a VPN, and why nothing has to be configured on the customer's router.

## The exchange

The whole sequence is a handful of UDP packets. There is no session to keep, no handshake to repeat, and nothing in it is TCP.

1. **Find the server.** The host resolves the meeting point by name (historically `newfirmware.com`) and creates a UDP socket. If the name does not resolve, the attempt ends here with no connection.
2. **Log in.** The host sends a connect command carrying the user name, the password and the serial number of the panel it wants.
3. **Read the answer.** The server either accepts the login or names the reason it did not.
4. **Learn the address.** When the login is accepted, the server returns the panel's current UDP address and port as seen from the outside.
5. **Talk to the panel.** The host sends its packets straight to that address, and from then on the traffic is between the host and the panel, not through the server.
6. **Keep listening.** While the connection is up, incoming packets from the remote address are what T3000 reads; silence means the panel has gone.

## What is sent

The login is one fixed-size structure, so both sides agree on its shape without negotiating anything:

```cpp
struct stLoginMessage
{
    char userName[30];
    char password[20];
};

typedef union
{
    unsigned char all_data[T3000_CONNECT_LENGTH];
    struct
    {
        unsigned int   m_serial_number;   // the panel you want to reach
        stLoginMessage login_message;
        unsigned char  reserved_reg[46];
    } reg_date;
} Str_T3000_Connect;
```

The serial number is the address, not the IP. Two panels may share an address, and one panel may change address between connections — the serial number is the only part that stays true.

## The answers that fail

The server does not simply ignore a bad login; it names the fault, and T3000 shows it:

| Answer | What it means |
|---|---|
| `COMMAND_COMMAND_UNKNOWN` | the server did not recognise the request — usually a mismatched T3000 version |
| `COMMAND_PASSWORD_ERROR` | the user name or password is wrong for that panel |
| `COMMAND_DEVICE_NOT_CONNECT_ERROR` | the panel is not currently registered with the server, so it is switched off or offline |
| `COMMAND_DEVICE_NO_HEARTBEAT_ERROR` | the panel is registered but has stopped answering the server |

The last two are worth telling apart: the first says the controller has never checked in, the second says it has stopped. Both look like "remote connection is not working" from the operator's chair.

## Where the panel is

Once the login is accepted, the address is only a hint until the panel answers a packet. T3000 checks the UDP address and port it was given, sends to it, and waits. If nothing answers at that address, the connection is not established even though the login succeeded — the panel may have moved, or the server's record of it may be stale.

[PTP connection flowchart (PDF)](media/ptp-client-flowchart.pdf)

The chart is the same sequence drawn as a program: socket, login, check, send, listen.

## Related

- [T3000 Remote Connection](menu-items-and-tree/building-database/t3000-remote-connection.md) — the screen this protocol is behind.
- [How T3000 reads and saves data](data-flow.md) — what happens to the values once the connection is up.
