## protocol specification

Step 1: You need to send a request to something called a tracker, and the tracker will respond with a list of peers. More specifically, you tell the tracker which files you’re trying to download, and the tracker gives you the ip address of the users you download them from. Making a request to a tracker also adds your ip address to the list of users that can share that file.

Step 2: After you have the list of peer addresses, you want to connect to them directly and start downloading. This happens through an exchange of messages where they tell you what pieces they have, and you tell them which pieces you want.

# HTTP x UDP x TCP

The main difference is that tcp guarantees that when a user sends data, the other user will recieve that data in its entirety, uncorrupted, and in the correct order – but it must create a persistent connection between users before sending data and this can make tcp much slower than udp. In the case of upd, if the data being sent is small enough (less than 512 bytes) you don’t have to worry about receiving only part of the data or receiving data out of order. However, as we’ll see shortly, it’s possible that data sent will never reach its destination, and so you sometimes end up having to resend or re-request data.

# BEP

The BEP describes the connect request as follows:

Offset  Size            Name            Value
0       64-bit integer  connection_id   0x41727101980
8       32-bit integer  action          0 // connect
12      32-bit integer  transaction_id  ? // random
16