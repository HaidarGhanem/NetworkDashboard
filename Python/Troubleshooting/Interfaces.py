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
        print("Interface \t Status")
        interface_status = {}
        lines = output.strip().split('\n')
        for line in lines[1:]:  # Skip the header line
            values = line.split()
            interface = values[0]
            status = values[4]
            interface_status[interface] = status
            print(f"{interface}\t{status}")

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