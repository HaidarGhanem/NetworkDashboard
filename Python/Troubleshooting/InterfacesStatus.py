import sys
from netmiko import ConnectHandler

def interface_action(router_ip, username, password, interface, action):
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

        # Send the command to shut down or no shut down the specified interface
        if action == "shutdown":
            command = f"interface {interface}\nshutdown"
        elif action == "no shutdown":
            command = f"interface {interface}\nno shutdown"
        else:
            print("Invalid action! Please use 'shutdown' or 'no shutdown'")
            net_connect.disconnect()
            return

        output = net_connect.send_config_set(command)
        print(output)

        # Disconnect from the router
        net_connect.disconnect()

    except:
        print("Failed to connect to the router:")

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print("Insufficient arguments! Usage: python script.py <router_ip> <username> <password> <interface> <action>")
        print("Valid actions: 'shutdown' or 'no shutdown'")
        sys.exit(1)
    
    router_ip = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    interface = sys.argv[4]
    action = sys.argv[5]

    interface_action(router_ip, username, password, interface, action)