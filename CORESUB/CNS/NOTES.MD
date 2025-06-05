**Computer Networks and Security (CNS) – Exhaustive Interview Preparation Notes**

---

### 🟩 UNIT 1 & 2: Network Layer Concepts and Routing (OSI Layer 3)

#### 1. IP Addressing and Subnetting (Very Detailed)

* **IP Addressing**

  * IPv4: 32-bit numeric address, split into four 8-bit octets.

    * Format: Decimal dotted notation, e.g., 192.168.0.1
    * Binary form: 11000000.10101000.00000000.00000001
  * IPv6: 128-bit address using hexadecimal, e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334

    * Supports vastly more addresses than IPv4

* **Address Classes (IPv4)**

  * Class A: 0.0.0.0 to 127.255.255.255 – Large networks (16 million hosts)
  * Class B: 128.0.0.0 to 191.255.255.255 – Medium networks
  * Class C: 192.0.0.0 to 223.255.255.255 – Small networks
  * Class D: 224.0.0.0 to 239.255.255.255 – Multicasting
  * Class E: 240.0.0.0 to 255.255.255.255 – Reserved for future use

* **Subnetting and CIDR (Classless Inter-Domain Routing)**

  * CIDR notation: IP address + slash + number of network bits, e.g., 192.168.1.0/26
  * Subnet mask: 255.255.255.192 for /26
  * **Calculations**:

    * Number of subnets = 2^n (where n = borrowed bits)
    * Hosts per subnet = 2^(host bits) - 2 (subtract 2 for network and broadcast address)
    * Broadcast address = All host bits set to 1
    * First and last usable host = Network address +1 and Broadcast -1

#### 2. IPv4 Header Format (Detailed Structure)

* **Minimum 20 bytes; maximum 60 bytes**
* Fields:

  * Version (4 bits): Always 4 for IPv4
  * IHL (4 bits): Header length in 32-bit words
  * Type of Service (ToS): QoS
  * Total Length: Header + Data size
  * Identification: Used for fragmentation
  * Flags + Fragment Offset: For packet fragmentation
  * TTL (Time to Live): Prevents routing loops
  * Protocol: 1=ICMP, 6=TCP, 17=UDP
  * Header Checksum
  * Source and Destination IP Address

#### 3. Routing Algorithms

* **Distance Vector Routing (RIP)**:

  * Each router advertises its distance vector to neighbors
  * Bellman-Ford algorithm used
  * Hop count used as metric
  * Issues: Slow convergence, routing loops

* **Link State Routing (OSPF)**:

  * Each router advertises link-state info to all routers
  * Shortest path calculated using Dijkstra's algorithm
  * Faster convergence, loop-free

* **Path Vector Routing (BGP)**:

  * Used between autonomous systems (ASes)
  * Maintains the actual path information
  * Prevents routing loops using path info

#### 4. Protocols

* **ARP**: Resolves IP to MAC address using broadcast
* **RARP**: Legacy protocol to obtain IP using MAC (deprecated)
* **ICMP**: Used for diagnostics and error reporting (ping, traceroute)
* **IGMP**: Manages multicast group membership

#### 5. Advanced Concepts

* **MPLS**: Adds labels to packets; enables traffic engineering and faster forwarding
* **Mobile IP**:

  * Home Agent, Foreign Agent, Care-of Address
  * Allows mobility while retaining IP identity
* **Functions of Network Layer**:

  * Logical addressing, Routing, Fragmentation/Reassembly, Path determination

---

### 🔵 UNIT 3: Transport Layer (OSI Layer 4)

#### 1. TCP (Transmission Control Protocol)

* Reliable, connection-oriented, byte-stream protocol
* Features:

  * Error control (checksum, retransmission)
  * Flow control (sliding window)
  * Congestion control (AIMD, slow start, fast recovery)
  * Connection management (3-way handshake)
* **TCP Header Format**:

  * 20-60 bytes: Source/Destination Port, Sequence Number, Ack Number
  * Data Offset, Reserved, Flags (SYN, ACK, FIN, RST, PSH, URG)
  * Window Size, Checksum, Urgent Pointer, Options (e.g., MSS)

#### 2. TCP Connection Lifecycle

* **Connection Establishment (3-Way Handshake)**:

```
Client → SYN → Server
Client ← SYN-ACK ← Server
Client → ACK → Server
```

* **Connection Termination (4-Step Close)**
* **TCP State Machine**: 11 states including LISTEN, ESTABLISHED, TIME\_WAIT, etc.

#### 3. UDP (User Datagram Protocol)

* Connectionless, no guarantee of delivery/order
* Lower overhead, used in real-time apps
* **UDP Header**: Source Port, Destination Port, Length, Checksum

#### 4. RTP and SCTP

* **RTP**: Real-Time Protocol

  * Timestamp and sequence number
  * No guarantee of delivery, often used over UDP
* **SCTP**: Stream Control Transmission Protocol

  * Multi-homing, multi-streaming
  * Supports message-oriented communication

#### 5. Socket Programming (API)

* API for network communication
* **Client Side**:

  * socket(), connect(), send(), recv(), close()
* **Server Side**:

  * socket(), bind(), listen(), accept(), recv(), send(), close()
* **Socket Types**:

  * Stream (TCP), Datagram (UDP), Raw

---

### 🟨 UNIT 4, 5 & 6: Application Layer Protocols (OSI Layer 7)

#### 1. HTTP

* Stateless request-response protocol using TCP (port 80/443)
* **Methods**: GET, POST, PUT, DELETE, PATCH
* **HTTP Headers**:

  * Request Line: Method URI Version
  * Response Line: Status Code and Message
  * Headers: Host, Content-Type, Content-Length, User-Agent

#### 2. Email Protocols

* **SMTP (Simple Mail Transfer Protocol)**:

  * Push protocol, port 25
  * Only sending emails
* **POP3 (Post Office Protocol v3)**:

  * Download and delete from server (port 110)
* **IMAP (Internet Message Access Protocol)**:

  * Synchronize emails on multiple devices (port 143/993)

#### 3. DNS (Domain Name System)

* Translates domain names to IP addresses
* Hierarchical: Root → TLD → Authoritative
* Records: A, AAAA, MX, CNAME, NS
* Types of queries: Recursive and Iterative

#### 4. DHCP

* Dynamically assigns IP, subnet, gateway, DNS
* **Message Flow**: Discover → Offer → Request → Acknowledge
* Uses UDP, ports 67/68

#### 5. FTP

* File transfer over TCP (Ports 20/21)
* Two connections:

  * Control (commands), Data (files)
* Commands: USER, PASS, STOR, RETR, QUIT

#### 6. TELNET

* Remote terminal access (port 23)
* Sends unencrypted data
* Replaced by SSH in secure networks

#### 7. MIME

* Encodes non-ASCII data into ASCII for email
* Headers: Content-Type, Content-Transfer-Encoding
* Supports attachments, images, HTML mail

#### 8. SNMP

* Monitors and manages network devices
* Components: Manager, Agent, MIB (Management Info Base)
* Versions: v1, v2, v3 (v3 adds security)

---

### 🔴 UNIT 6: Network Security

#### 1. Network Security Model

* **Entities**:

  * Sender, Receiver, Channel, Attacker
* **Mechanisms**:

  * Cryptographic techniques, Firewalls, IDS/IPS

#### 2. Types of Attacks

* **Active Attacks**:

  * Modification, impersonation, DoS, replay
* **Passive Attacks**:

  * Traffic analysis, eavesdropping

#### 3. Cryptographic Techniques

* **Symmetric Key**:

  * Same key for encryption/decryption (e.g., AES, DES)
* **Asymmetric Key**:

  * Public/Private key pair (e.g., RSA)
  * Used for confidentiality, integrity, authentication

#### 4. IPSec

* Secures IP packets
* Modes:

  * Transport: Encrypts payload
  * Tunnel: Encrypts entire IP packet
* Protocols:

  * AH: Authentication only
  * ESP: Authentication + encryption

#### 5. SSL/TLS

* Security for HTTP (HTTPS)
* **Handshake Process**:

  * Client Hello → Server Cert → Key Exchange → Encrypted messages
* Provides: Confidentiality, Integrity, Authentication

#### 6. S/MIME

* Secure MIME extension for email
* Uses public key cryptography
* Ensures privacy, integrity, authentication

#### 7. IDS and Firewalls

* **IDS (Intrusion Detection System)**:

  * Monitors traffic for suspicious patterns
  * Types: Signature-based, Anomaly-based
* **Firewalls**:

  * Enforce security rules at network boundary
  * Types: Packet filter, Stateful, Proxy, NGFW

#### 8. HTTPS

* HTTP + SSL/TLS over port 443
* Encrypts data between browser and server

#### 9. Security Architecture (ITU-T X.800)

* Defines:

  * Security Services: Authentication, Access Control, Confidentiality, Integrity, Non-repudiation
  * Security Mechanisms: Encipherment, Digital Signatures, Authentication Exchange


