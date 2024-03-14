import sys
from netmiko import ConnectHandler

def get_interface_status(router_ip, username, password):
    # Define the router details
    router = {
        "device_type": "cisco_ios",
        "host": router_ip,
        "username": username,
        "password": password,
    }

    try:
        # Connect to the router
        net_connect = ConnectHandler(**router)

        # Enter privilege mode (if required)
        net_connect.enable()

        # Send the command to retrieve interface status
        output = net_connect.send_command("show ip int br")
        print(output)
        # Process the output to get the interface status
        # interface_status = {}
        # lines = output.strip().split('\n')
        #  for line in lines:
        #      values = line.split()
        #      interface = values[0]
        #      print("interfaces" + interfaces)
        #      status = values[1]
        #      interface_status[interface] = status
        #      print("interface_status" + interface_status)

        # Disconnect from the router
        net_connect.disconnect()

    except:
        print("Failed to connect to the router:")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Insufficient arguments! Usage: python script.py <router_ip> <username> <password>")
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]

    get_interface_status(router_ip, username, password)