import socket
import sys

HOST = ''
PORT = 8080
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket Intilized...'

# Bind socket
try:
    s.bind((HOST, PORT))
except socket.error as msg:
    print 'Binding Error: ' + str(msg[0]) + ' Message ' + msg[1]
    sys.exit()
print 'Binding Complete!'

# Listen on socket
s.listen(10)
print 'Socket now listening...'

# Keep Client alive
while 1:
    conn, addr = s.accept()
    print 'Connected with ' + addr[0] + ':' + str(addr[1])

s.close()
